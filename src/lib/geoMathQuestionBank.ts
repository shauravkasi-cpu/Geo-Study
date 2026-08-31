import { shuffle, shuffleOptions, type GeoMathPracticeQuestion, type GeoMathTopic } from './geoMathQuiz'
import { CENTRAL_QUESTIONS, INSCRIBED_QUESTIONS } from './geoMathQuestionsCircles'
import { EQUATION_QUESTIONS, GENERAL_QUESTIONS } from './geoMathQuestionsEquations'
import { MEASURE_QUESTIONS } from './geoMathQuestionsMeasure'
import { EXTRA_QUESTIONS } from './geoMathQuestionsMore'
import { DENSITY_QUESTIONS, VOLUME_QUESTIONS } from './geoMathQuestionsVolume'

const ALL_QUESTIONS: GeoMathPracticeQuestion[] = [
  ...CENTRAL_QUESTIONS,
  ...INSCRIBED_QUESTIONS,
  ...MEASURE_QUESTIONS,
  ...EQUATION_QUESTIONS,
  ...GENERAL_QUESTIONS,
  ...VOLUME_QUESTIONS,
  ...DENSITY_QUESTIONS,
  ...EXTRA_QUESTIONS,
]

export function getGeoMathQuestions(topic: GeoMathTopic): GeoMathPracticeQuestion[] {
  const pool = topic === 'all' ? ALL_QUESTIONS : ALL_QUESTIONS.filter((question) => question.topic === topic)
  return shuffle(pool).map(shuffleOptions)
}

export function getGeoMathCount(topic: GeoMathTopic = 'all'): number {
  if (topic === 'all') return ALL_QUESTIONS.length
  return ALL_QUESTIONS.filter((question) => question.topic === topic).length
}

export function getGeoMathQuestionsByIds(ids: string[]): GeoMathPracticeQuestion[] {
  const map = new Map(ALL_QUESTIONS.map((question) => [question.id, question]))
  return shuffle(
    ids.map((id) => map.get(id)).filter((question): question is GeoMathPracticeQuestion => Boolean(question)),
  ).map(shuffleOptions)
}
