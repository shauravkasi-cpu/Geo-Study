import {
  BIO_UNIT2_PART1_TOPICS,
  BIO_UNIT2_PART2_TOPICS,
  shuffle,
  shuffleOptions,
  type BioPracticeQuestion,
  type BioPracticeTopic,
  type BioUnit2Topic,
} from './bioQuiz'
import { ACTIVE_QUESTIONS } from './bioQuestionsActive'
import { MACRO_QUESTIONS } from './bioQuestionsMacros'
import { MEMBRANE_QUESTIONS } from './bioQuestionsMembrane'
import { PASSIVE_QUESTIONS } from './bioQuestionsPassive'
import { STRUCTURE_QUESTIONS } from './bioQuestions'
import {
  HISTORY_QUESTIONS,
  PLANT_ANIMAL_QUESTIONS,
  PROK_EUK_QUESTIONS,
  SURFACES_VIRUS_QUESTIONS,
} from './bioQuestionsUnit2Part2'
import { WATER_QUESTIONS } from './bioQuestionsWater'

const UNIT1_QUESTIONS: BioPracticeQuestion[] = [
  ...WATER_QUESTIONS,
  ...MACRO_QUESTIONS,
  ...STRUCTURE_QUESTIONS,
]

const UNIT2_QUESTIONS: BioPracticeQuestion[] = [
  ...MEMBRANE_QUESTIONS,
  ...PASSIVE_QUESTIONS,
  ...ACTIVE_QUESTIONS,
  ...HISTORY_QUESTIONS,
  ...PROK_EUK_QUESTIONS,
  ...PLANT_ANIMAL_QUESTIONS,
  ...SURFACES_VIRUS_QUESTIONS,
]

const ALL_QUESTIONS: BioPracticeQuestion[] = [...UNIT1_QUESTIONS, ...UNIT2_QUESTIONS]

function poolForUnit2(topic: BioUnit2Topic): BioPracticeQuestion[] {
  if (topic === 'all') return UNIT2_QUESTIONS
  if (topic === 'part1') {
    return UNIT2_QUESTIONS.filter((question) => BIO_UNIT2_PART1_TOPICS.includes(question.topic))
  }
  if (topic === 'part2') {
    return UNIT2_QUESTIONS.filter((question) => BIO_UNIT2_PART2_TOPICS.includes(question.topic))
  }
  return UNIT2_QUESTIONS.filter((question) => question.topic === topic)
}

export function getBioTest1Questions(topic: BioPracticeTopic): BioPracticeQuestion[] {
  const pool = topic === 'all' ? UNIT1_QUESTIONS : UNIT1_QUESTIONS.filter((question) => question.topic === topic)
  return shuffle(pool).map(shuffleOptions)
}

export function getBioTest1Count(topic: BioPracticeTopic = 'all'): number {
  if (topic === 'all') return UNIT1_QUESTIONS.length
  return UNIT1_QUESTIONS.filter((question) => question.topic === topic).length
}

export function getBioUnit2Questions(topic: BioUnit2Topic): BioPracticeQuestion[] {
  return shuffle(poolForUnit2(topic)).map(shuffleOptions)
}

export function getBioUnit2Count(topic: BioUnit2Topic = 'all'): number {
  return poolForUnit2(topic).length
}

export function getBioQuestionsByIds(ids: string[]): BioPracticeQuestion[] {
  const map = new Map(ALL_QUESTIONS.map((question) => [question.id, question]))
  return shuffle(ids.map((id) => map.get(id)).filter((question): question is BioPracticeQuestion => Boolean(question))).map(
    shuffleOptions,
  )
}
