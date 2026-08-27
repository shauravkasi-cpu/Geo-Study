export type BioPracticeTopic =
  | 'all'
  | 'water'
  | 'reactions'
  | 'carbs'
  | 'lipids'
  | 'proteins'
  | 'nucleic'
  | 'structures'

export type BioQuestionTopic = Exclude<BioPracticeTopic, 'all'>

export type BioStructureId =
  | 'water-polar'
  | 'water-hbonds'
  | 'glucose'
  | 'disaccharide'
  | 'polysaccharide'
  | 'amino-acid'
  | 'dipeptide'
  | 'triglyceride'
  | 'phospholipid'
  | 'steroid'
  | 'sat-fa'
  | 'unsat-fa'
  | 'glycerol'
  | 'nucleotide'
  | 'dna'
  | 'dehydration'
  | 'hydrolysis'
  | 'fatty-compare'

export interface BioPracticeQuestion {
  id: string
  topic: BioQuestionTopic
  prompt: string
  options: string[]
  correctIndexes: number[]
  explain: string
  structure?: BioStructureId
}

export const BIO_TEST1_TOPICS: { id: BioPracticeTopic; label: string; desc: string }[] = [
  { id: 'all', label: 'All questions', desc: 'Full Test 1 mix, shuffled' },
  { id: 'water', label: 'Water & pH', desc: 'Polarity, properties, acids and bases' },
  { id: 'reactions', label: 'Reactions', desc: 'Organic, monomers, dehydration, hydrolysis' },
  { id: 'carbs', label: 'Carbohydrates', desc: 'Sugars, starch, glycogen, cellulose' },
  { id: 'lipids', label: 'Lipids', desc: 'Fats, phospholipids, steroids' },
  { id: 'proteins', label: 'Proteins', desc: 'Amino acids, folding, functions' },
  { id: 'nucleic', label: 'Nucleic acids', desc: 'DNA, RNA, nucleotides' },
  { id: 'structures', label: 'Structures', desc: 'Identify diagrams you have to memorize' },
]

export function mc(
  id: string,
  topic: BioQuestionTopic,
  prompt: string,
  options: string[],
  correct: number,
  explain: string,
  structure?: BioStructureId,
): BioPracticeQuestion {
  return { id, topic, prompt, options, correctIndexes: [correct], explain, structure }
}

export function multi(
  id: string,
  topic: BioQuestionTopic,
  prompt: string,
  options: string[],
  correctIndexes: number[],
  explain: string,
  structure?: BioStructureId,
): BioPracticeQuestion {
  return { id, topic, prompt, options, correctIndexes, explain, structure }
}

export function shuffle<T>(array: T[]): T[] {
  const copy = [...array]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

export function shuffleOptions(question: BioPracticeQuestion): BioPracticeQuestion {
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
