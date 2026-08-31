export type ApHumanStudyTopic =
  | 'all'
  | 'maps'
  | 'patterns'
  | 'projections'
  | 'data'
  | 'sectors'
  | 'measures'
  | 'theories'

export type ApHumanQuestionTopic = Exclude<ApHumanStudyTopic, 'all'>

export interface ApHumanPracticeQuestion {
  id: string
  topic: ApHumanQuestionTopic
  prompt: string
  options: string[]
  correctIndexes: number[]
  explain: string
}

export const AP_HUMAN_STUDY_TOPICS: { id: ApHumanStudyTopic; label: string; desc: string }[] = [
  { id: 'all', label: 'All questions', desc: 'Full mix from the class notes, shuffled' },
  { id: 'maps', label: 'Types of maps', desc: 'Reference vs thematic, choropleth, cartogram, isoline' },
  { id: 'patterns', label: 'Spatial patterns', desc: 'Absolute vs relative, clustering, dispersal' },
  { id: 'projections', label: 'Map projections', desc: 'SADD, Mercator, Gall-Peters, Robinson' },
  { id: 'data', label: 'Geographic data', desc: 'Fieldwork, census, GIS, GPS, remote sensing' },
  { id: 'sectors', label: 'Economic sectors', desc: 'Primary through quinary and development' },
  { id: 'measures', label: 'Development measures', desc: 'GDP, GNI, HDI, GII, and social indicators' },
  { id: 'theories', label: 'Development theories', desc: 'Wallerstein, dependency, Brandt Line, BRICS' },
]

export function mc(
  id: string,
  topic: ApHumanQuestionTopic,
  prompt: string,
  options: string[],
  correct: number,
  explain: string,
): ApHumanPracticeQuestion {
  return { id, topic, prompt, options, correctIndexes: [correct], explain }
}

export function multi(
  id: string,
  topic: ApHumanQuestionTopic,
  prompt: string,
  options: string[],
  correctIndexes: number[],
  explain: string,
): ApHumanPracticeQuestion {
  return { id, topic, prompt, options, correctIndexes, explain }
}

export function shuffle<T>(array: T[]): T[] {
  const copy = [...array]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

export function shuffleOptions(question: ApHumanPracticeQuestion): ApHumanPracticeQuestion {
  const order = shuffle(question.options.map((_, index) => index))
  return {
    ...question,
    options: order.map((index) => question.options[index]),
    correctIndexes: question.correctIndexes.map((index) => order.indexOf(index)).sort((a, b) => a - b),
  }
}

export function answersMatch(picked: number[], correctIndexes: number[]): boolean {
  if (picked.length !== correctIndexes.length) return false
  const a = [...picked].sort((x, y) => x - y)
  const b = [...correctIndexes].sort((x, y) => x - y)
  return a.every((value, index) => value === b[index])
}
