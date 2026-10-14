import { describe, expect, it } from 'vitest'
import {
  coerceProgress,
  createEmptyProgress,
  mergeProgress,
  toIsoDate,
} from '~/utils/progress-storage'

describe('coerceProgress', () => {
  it('fills in every field for a record that is missing them', () => {
    const coerced = coerceProgress({ completedLessons: ['l1'] })
    expect(coerced).not.toBeNull()
    expect(coerced!.completedLessons).toEqual(['l1'])
    expect(coerced!.completedExercises).toEqual([])
    expect(coerced!.xp).toBe(0)
    expect(coerced!.streak.days).toEqual([])
  })

  it('rejects anything that is not an object', () => {
    expect(coerceProgress(null)).toBeNull()
    expect(coerceProgress('progress')).toBeNull()
    expect(coerceProgress(42)).toBeNull()
  })

  it('drops malformed arrays rather than keeping them', () => {
    const coerced = coerceProgress({ completedLessons: 'l1,l2' })
    expect(coerced!.completedLessons).toEqual([])
  })
})

describe('mergeProgress', () => {
  it('unions completion lists so a lesson is never counted twice', () => {
    const base = createEmptyProgress()
    base.completedLessons = ['a', 'b']
    const incoming = createEmptyProgress()
    incoming.completedLessons = ['b', 'c']
    const merged = mergeProgress(base, incoming)
    expect(merged.completedLessons).toEqual(['a', 'b', 'c'])
  })

  it('unions exercise completions separately from challenges', () => {
    const base = createEmptyProgress()
    base.completedChallenges = ['challenge-1']
    const incoming = createEmptyProgress()
    incoming.completedExercises = ['exercise-1']
    const merged = mergeProgress(base, incoming)
    expect(merged.completedChallenges).toEqual(['challenge-1'])
    expect(merged.completedExercises).toEqual(['exercise-1'])
  })

  it('keeps the best quiz score rather than the newest', () => {
    const base = createEmptyProgress()
    base.quizScores = { 'quiz-s1': 40 }
    const incoming = createEmptyProgress()
    incoming.quizScores = { 'quiz-s1': 90 }
    expect(mergeProgress(base, incoming).quizScores['quiz-s1']).toBe(90)
    expect(mergeProgress(incoming, base).quizScores['quiz-s1']).toBe(90)
  })

  it('does not let yesterday\'s daily XP survive as today\'s', () => {
    const base = createEmptyProgress()
    base.dailyGoalDate = '1999-01-01'
    base.dailyXp = 500
    const incoming = createEmptyProgress()
    const merged = mergeProgress(base, incoming)
    expect(merged.dailyXp).toBe(0)
    expect(merged.dailyGoalDate).toBe(toIsoDate(new Date()))
  })
})
