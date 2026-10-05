import type { Difficulty } from '~/types/content'

export interface CourseProgress {
  courseId: string
  completedLessons: string[]
  completedChallenges: string[]
  completedProjects: string[]
  startedAt?: string
  completedAt?: string
}

export interface PathProgress {
  pathId: string
  completedCourses: string[]
}

export interface StreakData {
  current: number
  longest: number
  lastActiveDate: string | null
  /** ISO date (YYYY-MM-DD) of every day with recorded activity. */
  days: string[]
}

export interface UserProgress {
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
  dailyGoal: number
  dailyGoalDate: string
  dailyXp: number
  xpBySource: Record<string, number>
}

export const PROGRESS_KEY = 'app-learning-progress'

export interface ProgressSnapshot {
  progress: UserProgress
  updatedAt: number
}

/**
 * Storage abstraction for learner progress.
 *
 * Version 1 ships `LocalProgressStorage` (localStorage, offline-first, no account).
 * A future `CloudProgressStorage` can implement the same contract and replace it in
 * `useLearningProgress` without any component or page changing.
 */
export interface ProgressStorage {
  readonly name: string
  load(): Promise<UserProgress | null>
  save(progress: UserProgress): Promise<void>
  clear(): Promise<void>
}

export function createEmptyProgress(): UserProgress {
  return {
    completedLessons: [],
    completedChallenges: [],
    completedProjects: [],
    quizScores: {},
    courseProgress: {},
    pathProgress: {},
    xp: 0,
    streak: { current: 0, longest: 0, lastActiveDate: null, days: [] },
    achievements: [],
    dailyGoal: 50,
    dailyGoalDate: today(),
    dailyXp: 0,
    xpBySource: {},
  }
}

export function today(date = new Date()): string {
  return toIsoDate(date)
}

export function toIsoDate(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export function daysBetween(a: string, b: string): number {
  const first = new Date(`${a}T00:00:00`).getTime()
  const second = new Date(`${b}T00:00:00`).getTime()
  return Math.round((second - first) / 86_400_000)
}

/** Normalise an untrusted record into a well-formed progress object. */
export function coerceProgress(value: unknown): UserProgress | null {
  if (!value || typeof value !== 'object') return null
  const raw = value as Partial<UserProgress>
  const base = createEmptyProgress()
  return {
    ...base,
    ...raw,
    completedLessons: Array.isArray(raw.completedLessons) ? raw.completedLessons : [],
    completedChallenges: Array.isArray(raw.completedChallenges) ? raw.completedChallenges : [],
    completedProjects: Array.isArray(raw.completedProjects) ? raw.completedProjects : [],
    quizScores: raw.quizScores && typeof raw.quizScores === 'object' ? raw.quizScores : {},
    courseProgress:
      raw.courseProgress && typeof raw.courseProgress === 'object' ? raw.courseProgress : {},
    pathProgress: raw.pathProgress && typeof raw.pathProgress === 'object' ? raw.pathProgress : {},
    xp: typeof raw.xp === 'number' && Number.isFinite(raw.xp) ? raw.xp : 0,
    streak: {
      ...base.streak,
      ...(raw.streak && typeof raw.streak === 'object' ? raw.streak : {}),
      days: Array.isArray(raw.streak?.days) ? raw.streak!.days : [],
    },
    achievements: Array.isArray(raw.achievements) ? raw.achievements : [],
    dailyGoal: typeof raw.dailyGoal === 'number' ? raw.dailyGoal : 50,
    dailyXp: typeof raw.dailyXp === 'number' ? raw.dailyXp : 0,
    dailyGoalDate: typeof raw.dailyGoalDate === 'string' ? raw.dailyGoalDate : base.dailyGoalDate,
    xpBySource:
      raw.xpBySource && typeof raw.xpBySource === 'object' ? raw.xpBySource : {},
  }
}

/** Offline-first default provider: everything stays in this browser. */
export class LocalProgressStorage implements ProgressStorage {
  readonly name = 'local'
  private readonly key: string

  constructor(key: string = PROGRESS_KEY) {
    this.key = key
  }

  async load(): Promise<UserProgress | null> {
    if (!import.meta.client) return null
    try {
      const raw = window.localStorage.getItem(this.key)
      return raw ? coerceProgress(JSON.parse(raw)) : null
    } catch {
      return null
    }
  }

  async save(progress: UserProgress): Promise<void> {
    if (!import.meta.client) return
    try {
      window.localStorage.setItem(this.key, JSON.stringify(progress))
    } catch {
      /* storage full or blocked: learning continues, progress is not persisted */
    }
  }

  async clear(): Promise<void> {
    if (!import.meta.client) return
    try {
      window.localStorage.removeItem(this.key)
    } catch {
      /* ignore */
    }
  }
}

/* ------------------------------ cloud plumbing ------------------------------ */

/**
 * The Firestore-backed provider, registered by the Firebase plugin once the
 * client SDK is up. It stays null on the server and whenever the plugin is
 * absent, which is what keeps the app fully usable without an account.
 */
let cloudStorage: ProgressStorage | null = null

export function registerCloudStorage(storage: ProgressStorage | null): void {
  cloudStorage = storage
}

export function getCloudStorage(): ProgressStorage | null {
  return cloudStorage
}

/**
 * Local and cloud are merged rather than one replacing the other, because a
 * learner can do a lot of work before ever signing in. Sets are unioned and
 * counters take the larger value, so the guest progress joins the account
 * instead of overwriting it, and the same lesson is never counted twice.
 */
export function mergeProgress(base: UserProgress, incoming: UserProgress): UserProgress {
  const now = today()

  const quizScores: Record<string, number> = { ...base.quizScores }
  for (const [id, score] of Object.entries(incoming.quizScores)) {
    quizScores[id] = Math.max(quizScores[id] ?? 0, score)
  }

  const xpBySource: Record<string, number> = { ...base.xpBySource }
  for (const [key, value] of Object.entries(incoming.xpBySource)) {
    xpBySource[key] = Math.max(xpBySource[key] ?? 0, value)
  }

  const courseProgress: Record<string, CourseProgress> = {}
  for (const id of union(Object.keys(base.courseProgress), Object.keys(incoming.courseProgress))) {
    const a = base.courseProgress[id]
    const b = incoming.courseProgress[id]
    courseProgress[id] = {
      courseId: b?.courseId ?? a?.courseId ?? id,
      completedLessons: union(a?.completedLessons ?? [], b?.completedLessons ?? []),
      completedChallenges: union(a?.completedChallenges ?? [], b?.completedChallenges ?? []),
      completedProjects: union(a?.completedProjects ?? [], b?.completedProjects ?? []),
      startedAt: earliest(a?.startedAt, b?.startedAt),
      completedAt: latest(a?.completedAt, b?.completedAt),
    }
  }

  const pathProgress: Record<string, PathProgress> = {}
  for (const id of union(Object.keys(base.pathProgress), Object.keys(incoming.pathProgress))) {
    const a = base.pathProgress[id]
    const b = incoming.pathProgress[id]
    pathProgress[id] = {
      pathId: b?.pathId ?? a?.pathId ?? id,
      completedCourses: union(a?.completedCourses ?? [], b?.completedCourses ?? []),
    }
  }

  // Only today's tally means anything, so the two daily counters are compared
  // rather than added: yesterday's XP would otherwise survive as today's.
  let dailyGoalDate = now
  let dailyXp = 0
  if (base.dailyGoalDate === now) {
    dailyGoalDate = now
    dailyXp = base.dailyXp
  }
  if (incoming.dailyGoalDate === now) {
    dailyGoalDate = now
    dailyXp = Math.max(dailyXp, incoming.dailyXp)
  }

  return {
    completedLessons: union(base.completedLessons, incoming.completedLessons),
    completedChallenges: union(base.completedChallenges, incoming.completedChallenges),
    completedProjects: union(base.completedProjects, incoming.completedProjects),
    quizScores,
    courseProgress,
    pathProgress,
    xp: Math.max(base.xp, incoming.xp),
    streak: {
      current: Math.max(base.streak.current, incoming.streak.current),
      longest: Math.max(base.streak.longest, incoming.streak.longest),
      lastActiveDate: latest(base.streak.lastActiveDate, incoming.streak.lastActiveDate) ?? null,
      days: union(base.streak.days, incoming.streak.days).sort(),
    },
    achievements: union(base.achievements, incoming.achievements),
    lastVisitedLesson: incoming.lastVisitedLesson ?? base.lastVisitedLesson,
    lastActiveAt: latest(base.lastActiveAt, incoming.lastActiveAt),
    dailyGoal: incoming.dailyGoal || base.dailyGoal,
    dailyGoalDate,
    dailyXp,
    xpBySource,
  }
}

/**
 * The provider the app actually uses. Learning without an account is local only;
 * once a cloud provider is registered the same record is written to both, so the
 * browser stays the fast source of truth and the account is the durable one.
 */
export class SyncedProgressStorage implements ProgressStorage {
  readonly name = 'synced'

  constructor(private readonly local: ProgressStorage) {}

  async load(): Promise<UserProgress | null> {
    const local = await this.local.load()
    const remote = await cloudStorage?.load()
    if (!remote) return local
    if (!local) return remote
    return mergeProgress(local, remote)
  }

  async save(progress: UserProgress): Promise<void> {
    // Local first: if the network is gone the learner's own device still has it.
    await this.local.save(progress)
    try {
      await cloudStorage?.save(progress)
    } catch {
      /* offline or signed out: nothing to sync to, learning continues */
    }
  }

  async clear(): Promise<void> {
    await this.local.clear()
    try {
      await cloudStorage?.clear()
    } catch {
      /* ignore */
    }
  }
}

/** Resolve the active provider. Swap this line to move the whole app to the cloud. */
export function createProgressStorage(): ProgressStorage {
  return new SyncedProgressStorage(new LocalProgressStorage())
}

function union(a: string[], b: string[]): string[] {
  return [...new Set([...a, ...b])]
}

function earliest(a?: string | null, b?: string | null): string | undefined {
  if (!a) return b ?? undefined
  if (!b) return a
  return a < b ? a : b
}

function latest(a?: string | null, b?: string | null): string | undefined {
  if (!a) return b ?? undefined
  if (!b) return a
  return a > b ? a : b
}

/* --------------------------------- helpers --------------------------------- */

export function difficultyLabel(value: Difficulty): string {
  return value.charAt(0).toUpperCase() + value.slice(1)
}