import { DATA_QUESTIONS } from './apHumanQuestionsData'
import { DEVELOPMENT_QUESTIONS } from './apHumanQuestionsDevelopment'
import { MAP_QUESTIONS } from './apHumanQuestionsMaps'
import { SECTOR_QUESTIONS } from './apHumanQuestionsSectors'
import { STIMULUS_QUESTIONS } from './apHumanQuestionsStimulus'
import {
  shuffle,
  shuffleOptions,
  type ApHumanPracticeQuestion,
  type ApHumanStudyTopic,
} from './apHumanStudy'

const ALL_QUESTIONS: ApHumanPracticeQuestion[] = [
  ...MAP_QUESTIONS,
  ...DATA_QUESTIONS,
  ...SECTOR_QUESTIONS,
  ...DEVELOPMENT_QUESTIONS,
  ...STIMULUS_QUESTIONS,
]

function shuffleKeepingSets(pool: ApHumanPracticeQuestion[]): ApHumanPracticeQuestion[] {
  const groups = new Map<string, ApHumanPracticeQuestion[]>()
  for (const question of pool) {
    const key = question.setId ?? question.id
    const group = groups.get(key) ?? []
    group.push(question)
    groups.set(key, group)
  }
  return shuffle([...groups.values()]).flat().map(shuffleOptions)
}

export function getApHumanStudyQuestions(topic: ApHumanStudyTopic): ApHumanPracticeQuestion[] {
  const pool = topic === 'all' ? ALL_QUESTIONS : ALL_QUESTIONS.filter((question) => question.topic === topic)
  return shuffleKeepingSets(pool)
}

export function getApHumanStudyCount(topic: ApHumanStudyTopic = 'all'): number {
  if (topic === 'all') return ALL_QUESTIONS.length
  return ALL_QUESTIONS.filter((question) => question.topic === topic).length
}

export function getApHumanQuestionsByIds(ids: string[]): ApHumanPracticeQuestion[] {
  const map = new Map(ALL_QUESTIONS.map((question) => [question.id, question]))
  return shuffleKeepingSets(
    ids.map((id) => map.get(id)).filter((question): question is ApHumanPracticeQuestion => Boolean(question)),
  )
}
