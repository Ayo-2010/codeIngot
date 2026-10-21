import type { CourseMeta, LearningPath, Quiz } from '~/types/content'
import { findQuiz } from '~/composables/useCourses'
import {
  type CourseProgress,
  type ProgressStorage,
  type StreakData,
  type UserProgress,
  createEmptyProgress,
  createProgressStorage,
  daysBetween,
  toIsoDate,
} from '~/utils/progress-storage'
import {
  type AchievementContext,
  achievementById,
  newAchievementIds,
  resolveAchievements,
} from '~/utils/achievements'

/** Single shared state instance: one learner, one progress object. */
const progress = ref<UserProgress>(createEmptyProgress())
const ready = ref(false)
const storage: ProgressStorage = createProgressStorage()
const toastQueue = ref<{ id: number; title: string; body?: string; xp?: number }[]>([])
let saveTimer: ReturnType<typeof setTimeout> | null = null
let toastSeqProvider = 0
const dismissedToasts = new Set<number>()

export type XpSource = 'lesson' | 'challenge' | 'quiz' | 'project' | 'streak' | 'achievement'

function pushToast(title: string, body?: string, xp?: number) {
  toastSeqProvider += 1
  const id = toastSeqProvider
  toastQueue.value = [...toastQueue.value.slice(-3), { id, title, body, xp }]
  if (import.meta.client) {
    setTimeout(() => {
      if (dismissedToasts.has(id)) return
      toastQueue.value = toastQueue.value.filter((toast) => toast.id !== id)
    }, 4200)
  }
}

export function useLearningProgress() {
  const storageName = storage.name

  async function init() {
    if (ready.value) return
    const loaded = await storage.load()
    progress.value = loaded ?? createEmptyProgress()
    ready.value = true
  }

  function persist() {
    if (saveTimer) clearTimeout(saveTimer)
    saveTimer = setTimeout(() => {
      void storage.save(progress.value)
    }, 120)
  }

  function commit() {
    progress.value.lastActiveAt = new Date().toISOString()
    refreshDailyXp()
    persist()
  }

  function refreshDailyXp() {
    const now = toIsoDate(new Date())
    if (progress.value.dailyGoalDate !== now) {
      progress.value.dailyGoalDate = now
      progress.value.dailyXp = 0
    }
  }

  function awardXp(amount: number, source: XpSource) {
    if (amount <= 0) return
    refreshDailyXp()
    progress.value.xp += amount
    progress.value.dailyXp += amount
    progress.value.xpBySource[source] = (progress.value.xpBySource[source] ?? 0) + amount
  }

  function touchStreak() {
    const streak = progress.value.streak
    const now = toIsoDate(new Date())
    if (streak.lastActiveDate === now) return
    if (!streak.lastActiveDate) {
      streak.current = 1
    } else {
      const gap = daysBetween(streak.lastActiveDate, now)
      streak.current = gap === 1 ? streak.current + 1 : gap > 1 ? 1 : streak.current
    }
    streak.lastActiveDate = now
    if (!streak.days.includes(now)) {
      streak.days = [...streak.days, now].slice(-400)
    }
    streak.longest = Math.max(streak.longest, streak.current)
  }

  /**
   * Keyed by course slug, which is the stable public identifier.
   * Every read and write of a per-course record has to agree on
   * the key or the record is invisible.
   */
  function courseRecord(courseSlug: string): CourseProgress {
    let record = progress.value.courseProgress[courseSlug]
    if (!record) {
      record = {
        courseSlug,
        completedLessons: [],
        completedChallenges: [],
        completedExercises: [],
        completedProjects: [],
      }
      progress.value.courseProgress[courseSlug] = record
    }
    return record
  }

  /* ------------------------------ derived state ----------------------------- */

  const isLessonComplete = (lessonId: string) => progress.value.completedLessons.includes(lessonId)
  const isChallengeComplete = (id: string) => progress.value.completedChallenges.includes(id)
  const isExerciseComplete = (id: string) => progress.value.completedExercises.includes(id)
  const isProjectComplete = (id: string) => progress.value.completedProjects.includes(id)

  function completedLessonsInCourse(course: CourseMeta): string[] {
    return course.sections
      .flatMap((section) => section.lessons.map((lesson) => lesson.id))
      .filter((id) => progress.value.completedLessons.includes(id))
  }

  function courseProgressPercent(course: CourseMeta): number {
    const total = course.sections.reduce((sum, s) => sum + s.lessons.length, 0)
    if (total === 0) return 0
    return Math.round((completedLessonsInCourse(course).length / total) * 100)
  }

  function isCourseComplete(course: CourseMeta): boolean {
    return courseProgressPercent(course) === 100
  }

  function pathProgressPercent(path: LearningPath): number {
    if (path.steps.length === 0) return 0
    const done = path.steps.filter((step) => {
      const course = getCourseSafe(step.courseSlug)
      return course ? isCourseComplete(course) : false
    }).length
    return Math.round((done / path.steps.length) * 100)
  }

  function pathCoursesCompleted(path: LearningPath): number {
    return path.steps.filter((step) => {
      const course = getCourseSafe(step.courseSlug)
      return course ? isCourseComplete(course) : false
    }).length
  }

  function courseStatus(courseSlug: string): 'available' | 'in-progress' | 'completed' {
    const course = getCourseSafe(courseSlug)
    if (!course) return 'available'
    if (isCourseComplete(course)) return 'completed'
    const record = progress.value.courseProgress[course.slug]
    if (record && record.completedLessons.length > 0) return 'in-progress'
    return 'available'
  }

  /* -------------------------------- mutations ------------------------------- */

  function completeLesson(lesson: { id: string; xp: number; title?: string }, course?: CourseMeta) {
    if (isLessonComplete(lesson.id)) return false
    progress.value.completedLessons = [...progress.value.completedLessons, lesson.id]
    if (course) {
      const record = courseRecord(course.slug)
      if (!record.completedLessons.includes(lesson.id)) {
        record.completedLessons = [...record.completedLessons, lesson.id]
        record.startedAt = record.startedAt ?? new Date().toISOString()
      }
    }
    awardXp(lesson.xp, 'lesson')
    touchStreak()
    evaluateAchievements()
    commit()
    pushToast('Lesson complete', lesson.title ?? undefined, lesson.xp)
    return true
  }

  function completeExercise(exerciseId: string, xp: number, course?: CourseMeta) {
    if (isExerciseComplete(exerciseId)) return false
    progress.value.completedExercises = [...progress.value.completedExercises, exerciseId]
    if (course) {
      const record = courseRecord(course.slug)
      if (!record.completedExercises.includes(exerciseId)) {
        record.completedExercises = [...record.completedExercises, exerciseId]
        record.startedAt = record.startedAt ?? new Date().toISOString()
      }
    }
    awardXp(xp, 'challenge')
    touchStreak()
    evaluateAchievements()
    commit()
    pushToast('Challenge passed', undefined, xp)
    return true
  }

  function recordQuiz(quiz: Quiz, score: number, course?: CourseMeta) {
    const previous = progress.value.quizScores[quiz.id]
    if (previous !== undefined && previous >= score) return false
    progress.value.quizScores = { ...progress.value.quizScores, [quiz.id]: score }
    if (course) courseRecord(course.slug)
    if (previous === undefined) {
      awardXp(Math.round(score / 5) + 10, 'quiz')
      touchStreak()
    }
    evaluateAchievements()
    commit()
    return true
  }

  function quizPassed(quiz: Pick<Quiz, 'id' | 'passingScore'>): boolean {
    const score = progress.value.quizScores[quiz.id]
    return score !== undefined && score >= quiz.passingScore
  }

  function completeProject(projectId: string, xp: number) {
    if (isProjectComplete(projectId)) return false
    progress.value.completedProjects = [...progress.value.completedProjects, projectId]
    awardXp(xp, 'project')
    touchStreak()
    evaluateAchievements()
    commit()
    pushToast('Project submitted', undefined, xp)
    return true
  }

  function setDailyGoal(goal: number) {
    progress.value.dailyGoal = Math.max(10, Math.round(goal))
    commit()
  }

  function visitLesson(lessonId: string) {
    progress.value.lastVisitedLesson = lessonId
    commit()
  }

  /* ------------------------------- achievements ----------------------------- */

  /**
   * A quiz counts as passed only at its own passing score, which is
   * per quiz rather than one global threshold.
   */
  function passedQuizCount(): number {
    let passed = 0
    for (const [id, score] of Object.entries(progress.value.quizScores)) {
      const quiz = findQuiz(id)
      if (quiz && score >= quiz.passingScore) passed += 1
    }
    return passed
  }

  function buildContext(): AchievementContext {
    const courses = allCoursesList()
    return {
      courseCompletedIds: courses.filter((course) => isCourseComplete(course)).map((c) => c.slug),
      courseLessonTotals: Object.fromEntries(
        courses.map((course) => [course.slug, course.sections.reduce((n, s) => n + s.lessons.length, 0)]),
      ),
      challengeTotal: allChallenges().length,
      quizzesPassed: passedQuizCount(),
    }
  }

  function evaluateAchievements() {
    const fresh = newAchievementIds(progress.value, buildContext())
    if (fresh.length === 0) return
    progress.value.achievements = [...progress.value.achievements, ...fresh]
    let xp = 0
    for (const id of fresh) {
      xp += achievementById(id)?.xp ?? 0
    }
    if (xp > 0) awardXp(xp, 'achievement')
    const last = fresh[fresh.length - 1]!
    const definition = achievementById(last)
    pushToast('Achievement unlocked', definition?.title, xp)
  }

  const achievements = computed(() => resolveAchievements(progress.value, buildContext()))

  /* --------------------------------- streak --------------------------------- */

  const streak = computed<StreakData>(() => progress.value.streak)

  const streakWeek = computed(() => {
    const days = progress.value.streak.days
    const out: { date: string; label: string; active: boolean }[] = []
    const now = new Date()
    for (let i = 6; i >= 0; i -= 1) {
      const date = new Date(now)
      date.setDate(now.getDate() - i)
      const iso = toIsoDate(date)
      out.push({
        date: iso,
        label: date.toLocaleDateString(undefined, { weekday: 'narrow' }),
        active: days.includes(iso),
      })
    }
    return out
  })

  const dailyGoalRatio = computed(() =>
    Math.max(0, Math.min(1, progress.value.dailyXp / Math.max(1, progress.value.dailyGoal))),
  )

  const totals = computed(() => ({
    lessons: progress.value.completedLessons.length,
    challenges: progress.value.completedChallenges.length,
    exercises: progress.value.completedExercises.length,
    projects: progress.value.completedProjects.length,
    quizzes: Object.values(progress.value.quizScores).length,
    quizzesPassed: passedQuizCount(),
    averageQuizScore:
      Object.values(progress.value.quizScores).length > 0
        ? Math.round(
            Object.values(progress.value.quizScores).reduce((a, b) => a + b, 0) /
              Object.values(progress.value.quizScores).length,
          )
        : 0,
    xp: progress.value.xp,
  }))

  /* --------------------------------- helpers -------------------------------- */

  function continueTarget() {
    const last = progress.value.lastVisitedLesson
    if (last) {
      const lesson = getLessonById(last)
      if (lesson) return lesson
    }
    const courses = allCoursesList()
    const started = courses.find((course) => {
      const record = progress.value.courseProgress[course.slug]
      return record && record.completedLessons.length > 0 && !isCourseComplete(course)
    })
    const target = started ?? courses[0]!
    const nextLessonIn = target.sections
      .flatMap((section) => section.lessons)
      .find((lesson) => !isLessonComplete(lesson.id))
    if (!nextLessonIn) return undefined
    return getLessonById(nextLessonIn.id)
  }

  function continuePath() {
    const paths = allPathsList()
    const active =
      paths.find((path) => path.steps.some((step) => courseStatus(step.courseSlug) === 'in-progress')) ??
      paths[0]
    return active
  }

  function nextCourseInPath(path: LearningPath) {
    const step =
      path.steps.find((item) => courseStatus(item.courseSlug) === 'in-progress') ??
      path.steps.find((item) => courseStatus(item.courseSlug) === 'available')
    return step
  }

  /**
   * Re-read through the storage chain. Signing in widens that chain from local
   * only to local-plus-cloud, so the merged record is pulled in here rather
   * than waiting for the next lesson to be completed.
   */
  async function refreshFromStorage() {
    const loaded = await storage.load()
    if (loaded) {
      progress.value = loaded
      persist()
    }
  }

  async function resetProgress() {
    progress.value = createEmptyProgress()
    await storage.clear()
    pushToast('Progress cleared', 'Everything is back to zero.')
  }

  function exportProgress(): string {
    return JSON.stringify(progress.value, null, 2)
  }

  return {
    progress,
    ready,
    storageName,
    toasts: toastQueue,
    init,
    isLessonComplete,
    isChallengeComplete,
    isExerciseComplete,
    isProjectComplete,
    completedLessonsInCourse,
    courseProgressPercent,
    isCourseComplete,
    pathProgressPercent,
    pathCoursesCompleted,
    courseStatus,
    completeLesson,
    completeExercise,
    recordQuiz,
    quizPassed,
    completeProject,
    setDailyGoal,
    visitLesson,
    achievements,
    streak,
    streakWeek,
    dailyGoalRatio,
    totals,
    continueTarget,
    continuePath,
    nextCourseInPath,
    resetProgress,
    refreshFromStorage,
    exportProgress,
  }
}

function getCourseSafe(slug: string) {
  return allCoursesList().find((course) => course.slug === slug)
}