export type BioUnitId = 1 | 2

export type BioPracticeTopic =
  | 'all'
  | 'water'
  | 'reactions'
  | 'carbs'
  | 'lipids'
  | 'proteins'
  | 'nucleic'
  | 'structures'

export type BioUnit2Topic =
  | 'all'
  | 'part1'
  | 'part2'
  | 'membrane'
  | 'passive'
  | 'active'
  | 'history'
  | 'prok-euk'
  | 'plant-animal'
  | 'surfaces'

export type BioQuestionTopic =
  | Exclude<BioPracticeTopic, 'all'>
  | Exclude<BioUnit2Topic, 'all' | 'part1' | 'part2'>

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
  | 'bilayer'
  | 'fluid-mosaic'
  | 'channel-carrier'
  | 'diffusion-starch'
  | 'osmosis-beaker'
  | 'hypertonic-cell'
  | 'animal-tonicity'
  | 'plant-tonicity'
  | 'nak-pump'
  | 'endo-exo'
  | 'prok-cell'
  | 'plant-animal-cells'
  | 'virus-struct'

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
  { id: 'all', label: 'All questions', desc: 'Full Unit 1 mix, shuffled' },
  { id: 'water', label: 'Water & pH', desc: 'Polarity, properties, acids and bases' },
  { id: 'reactions', label: 'Reactions', desc: 'Organic, monomers, dehydration, hydrolysis' },
  { id: 'carbs', label: 'Carbohydrates', desc: 'Sugars, starch, glycogen, cellulose' },
  { id: 'lipids', label: 'Lipids', desc: 'Fats, phospholipids, steroids' },
  { id: 'proteins', label: 'Proteins', desc: 'Amino acids, folding, functions' },
  { id: 'nucleic', label: 'Nucleic acids', desc: 'DNA, RNA, nucleotides' },
  { id: 'structures', label: 'Structures', desc: 'Identify diagrams you have to memorize' },
]

export const BIO_UNIT2_TOPICS: { id: BioUnit2Topic; label: string; desc: string }[] = [
  { id: 'all', label: 'All of Unit 2', desc: 'Part 1 and Part 2 mixed, shuffled' },
  { id: 'part1', label: 'Part 1 test', desc: 'Cell membrane and all transport' },
  { id: 'part2', label: 'Part 2 test', desc: 'Cell theory and cell structure' },
  { id: 'membrane', label: 'Cell membrane', desc: 'Bilayer, proteins, cholesterol, fluid mosaic, permeability' },
  { id: 'passive', label: 'Passive transport', desc: 'Diffusion, osmosis, tonicity, facilitated diffusion' },
  { id: 'active', label: 'Active transport', desc: 'Pumps, endocytosis, exocytosis, Na+/K+ pump' },
  { id: 'history', label: 'Cell history & theory', desc: 'Hooke through Virchow and the 3 parts of cell theory' },
  { id: 'prok-euk', label: 'Prokaryotes vs eukaryotes', desc: 'Shared parts, size, DNA, organelles, reproduction' },
  { id: 'plant-animal', label: 'Plant vs animal cells', desc: 'Walls, vacuoles, chloroplasts, lysosomes, centrioles' },
  { id: 'surfaces', label: 'Cell surfaces & viruses', desc: 'Junctions, plasmodesmata, virus structure' },
]

export const BIO_UNIT2_PART1_TOPICS: BioQuestionTopic[] = ['membrane', 'passive', 'active']
export const BIO_UNIT2_PART2_TOPICS: BioQuestionTopic[] = ['history', 'prok-euk', 'plant-animal', 'surfaces']

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
