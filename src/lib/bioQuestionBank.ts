import { shuffle, shuffleOptions, type BioPracticeQuestion, type BioPracticeTopic } from './bioQuiz'
import { MACRO_QUESTIONS } from './bioQuestionsMacros'
import { STRUCTURE_QUESTIONS } from './bioQuestions'
import { WATER_QUESTIONS } from './bioQuestionsWater'

const ALL_QUESTIONS: BioPracticeQuestion[] = [
  ...WATER_QUESTIONS,
  ...MACRO_QUESTIONS,
  ...STRUCTURE_QUESTIONS,
]

export function getBioTest1Questions(topic: BioPracticeTopic): BioPracticeQuestion[] {
  const pool = topic === 'all' ? ALL_QUESTIONS : ALL_QUESTIONS.filter((question) => question.topic === topic)
  return shuffle(pool).map(shuffleOptions)
}

export function getBioTest1Count(topic: BioPracticeTopic = 'all'): number {
  if (topic === 'all') return ALL_QUESTIONS.length
  return ALL_QUESTIONS.filter((question) => question.topic === topic).length
}

export function getBioQuestionsByIds(ids: string[]): BioPracticeQuestion[] {
  const map = new Map(ALL_QUESTIONS.map((question) => [question.id, question]))
  return shuffle(ids.map((id) => map.get(id)).filter((question): question is BioPracticeQuestion => Boolean(question))).map(
    shuffleOptions,
  )
}
