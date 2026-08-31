import {
  guideAnswersMatch,
  shuffleGuide,
  shuffleGuideOptions,
  type ApHumanGuideQuestion,
  type ApHumanGuideTopic,
} from './apHumanGuide'
import { APHG_UNIT1_QUESTIONS } from './apHumanStudyQuestions'

export function getApHumanGuideQuestions(topic: ApHumanGuideTopic): ApHumanGuideQuestion[] {
  const pool =
    topic === 'all' ? APHG_UNIT1_QUESTIONS : APHG_UNIT1_QUESTIONS.filter((question) => question.topic === topic)
  return shuffleGuide(pool).map(shuffleGuideOptions)
}

export function getApHumanGuideCount(topic: ApHumanGuideTopic = 'all'): number {
  if (topic === 'all') return APHG_UNIT1_QUESTIONS.length
  return APHG_UNIT1_QUESTIONS.filter((question) => question.topic === topic).length
}

export function getApHumanGuideByIds(ids: string[]): ApHumanGuideQuestion[] {
  const map = new Map(APHG_UNIT1_QUESTIONS.map((question) => [question.id, question]))
  return shuffleGuide(
    ids.map((id) => map.get(id)).filter((question): question is ApHumanGuideQuestion => Boolean(question)),
  ).map(shuffleGuideOptions)
}

export { guideAnswersMatch }
