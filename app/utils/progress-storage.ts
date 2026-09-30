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

function coerce(value: unknown): UserProgress | null {
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
      return raw ? coerce(JSON.parse(raw)) : null
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

/**
 * Provider for the planned account system. Version 1 never selects this,
 * it only proves the swap is a one-line change.
 */
export class CloudProgressStorage implements ProgressStorage {
  readonly name = 'cloud'

  constructor(private readonly endpoint = '/api/progress') {}

  async load(): Promise<UserProgress | null> {
    if (!import.meta.client) return null
    try {
      const response = await fetch(this.endpoint, { credentials: 'include' })
      if (!response.ok) return null
      return coerce(await response.json())
    } catch {
      return null
    }
  }

  async save(progress: UserProgress): Promise<void> {
    if (!import.meta.client) return
    try {
      await fetch(this.endpoint, {
        method: 'PUT',
        credentials: 'include',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(progress),
      })
    } catch {
      /* offline: the local provider remains the source of truth */
    }
  }

  async clear(): Promise<void> {
    if (!import.meta.client) return
    try {
      await fetch(this.endpoint, { method: 'DELETE', credentials: 'include' })
    } catch {
      /* ignore */
    }
  }
}

/** Resolve the active provider. Swap this line to move the whole app to the cloud. */
export function createProgressStorage(): ProgressStorage {
  return new LocalProgressStorage()
}

/* --------------------------------- helpers --------------------------------- */

export function difficultyLabel(value: Difficulty): string {
  return value.charAt(0).toUpperCase() + value.slice(1)
}