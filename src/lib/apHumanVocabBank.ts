import { VOCAB_DATA_QUESTIONS } from './apHumanVocabData'
import { VOCAB_HEI_QUESTIONS } from './apHumanVocabHei'
import { VOCAB_MAP_QUESTIONS } from './apHumanVocabMaps'
import { VOCAB_MEASURE_QUESTIONS } from './apHumanVocabMeasures'
import { VOCAB_REGION_QUESTIONS } from './apHumanVocabRegions'
import { VOCAB_SCALE_QUESTIONS } from './apHumanVocabScale'
import { VOCAB_SECTOR_QUESTIONS } from './apHumanVocabSectors'
import { VOCAB_SPATIAL_QUESTIONS } from './apHumanVocabSpatial'
import { VOCAB_THEORY_QUESTIONS } from './apHumanVocabTheories'
import {
  VOCAB_TERMS,
  checkTypedVocab,
  normalizeVocabAnswer,
  shuffle,
  toPracticeQuestion,
  type VocabPracticeQuestion,
  type VocabQuestion,
  type VocabQuizMode,
  type VocabQuizTopic,
} from './apHumanVocab'

export const ALL_VOCAB_QUESTIONS: VocabQuestion[] = [
  ...VOCAB_THEORY_QUESTIONS,
  ...VOCAB_SECTOR_QUESTIONS,
  ...VOCAB_MEASURE_QUESTIONS,
  ...VOCAB_MAP_QUESTIONS,
  ...VOCAB_DATA_QUESTIONS,
  ...VOCAB_SPATIAL_QUESTIONS,
  ...VOCAB_HEI_QUESTIONS,
  ...VOCAB_SCALE_QUESTIONS,
  ...VOCAB_REGION_QUESTIONS,
]

function poolFor(topic: VocabQuizTopic): VocabQuestion[] {
  return topic === 'all' ? ALL_VOCAB_QUESTIONS : ALL_VOCAB_QUESTIONS.filter((question) => question.unit === topic)
}

export function getVocabQuestions(topic: VocabQuizTopic, mode: VocabQuizMode): VocabPracticeQuestion[] {
  return shuffle(poolFor(topic)).map((question) => toPracticeQuestion(question, mode))
}

export function getVocabCount(topic: VocabQuizTopic = 'all'): number {
  return poolFor(topic).length
}

export function getVocabQuestionsByIds(
  ids: string[],
  mode: VocabQuizMode,
): VocabPracticeQuestion[] {
  const map = new Map(ALL_VOCAB_QUESTIONS.map((question) => [question.id, question]))
  return shuffle(
    ids.map((id) => map.get(id)).filter((question): question is VocabQuestion => Boolean(question)),
  ).map((question) => toPracticeQuestion(question, mode))
}

export function gradeVocabTyped(question: VocabPracticeQuestion, raw: string): boolean {
  return checkTypedVocab(question.term, raw)
}

export interface VocabValidationIssue {
  id?: string
  term?: string
  message: string
}

export function validateVocabBank(): VocabValidationIssue[] {
  const issues: VocabValidationIssue[] = []
  const ids = new Set<string>()
  const byTerm = new Map<string, VocabQuestion[]>()

  for (const question of ALL_VOCAB_QUESTIONS) {
    if (ids.has(question.id)) {
      issues.push({ id: question.id, message: 'Duplicate question id' })
    }
    ids.add(question.id)

    if (question.distractors.length !== 3) {
      issues.push({ id: question.id, message: 'Must have exactly 3 distractors' })
    }
    if (new Set([question.term, ...question.distractors]).size !== 4) {
      issues.push({ id: question.id, term: question.term, message: 'Correct answer repeats a distractor' })
    }

    const promptNorm = normalizeVocabAnswer(question.prompt)
    const termNorm = normalizeVocabAnswer(question.term)
    if (promptNorm.includes(termNorm)) {
      issues.push({ id: question.id, term: question.term, message: 'Prompt contains the answer term' })
    }

    const acronym = question.term.match(/\(([^)]+)\)/)?.[1]
    if (acronym && acronym.length <= 4) {
      const boxed = new RegExp(`\\b${acronym}\\b`, 'i')
      if (boxed.test(question.prompt)) {
        issues.push({ id: question.id, term: question.term, message: `Prompt contains acronym ${acronym}` })
      }
    }

    const list = byTerm.get(question.term) ?? []
    list.push(question)
    byTerm.set(question.term, list)
  }

  for (const def of VOCAB_TERMS) {
    const list = byTerm.get(def.term) ?? []
    if (list.length < 3) {
      issues.push({
        term: def.term,
        message: `Expected at least 3 questions, found ${list.length}`,
      })
    }
    if (list.some((question) => question.unit !== def.unit)) {
      issues.push({ term: def.term, message: 'Question unit does not match catalog unit' })
    }
  }

  for (const term of byTerm.keys()) {
    if (!VOCAB_TERMS.some((item) => item.term === term)) {
      issues.push({ term, message: 'Question uses a term that is not on the vocab list' })
    }
  }

  return issues
}
