import type { CustomQuiz } from '../types'

const STORAGE_KEY = 'geo-study-custom-quizzes'

export function loadCustomQuizzes(): CustomQuiz[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as CustomQuiz[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function saveCustomQuizzes(quizzes: CustomQuiz[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(quizzes))
}

export function addCustomQuiz(quiz: Omit<CustomQuiz, 'id' | 'createdAt'>): CustomQuiz {
  const quizzes = loadCustomQuizzes()
  const newQuiz: CustomQuiz = {
    ...quiz,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  }
  quizzes.unshift(newQuiz)
  saveCustomQuizzes(quizzes)
  return newQuiz
}

export function updateCustomQuiz(id: string, updates: Partial<CustomQuiz>): CustomQuiz | null {
  const quizzes = loadCustomQuizzes()
  const index = quizzes.findIndex((q) => q.id === id)
  if (index === -1) return null

  quizzes[index] = { ...quizzes[index], ...updates }
  saveCustomQuizzes(quizzes)
  return quizzes[index]
}

export function deleteCustomQuiz(id: string): void {
  const quizzes = loadCustomQuizzes().filter((q) => q.id !== id)
  saveCustomQuizzes(quizzes)
}

export function saveQuizScore(id: string, correct: number, total: number): void {
  updateCustomQuiz(id, { lastScore: { correct, total } })
}
