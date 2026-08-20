import type { BiologyUnitId } from '../types'

export interface BiologyUnit {
  id: BiologyUnitId
  number: number
  title: string
  subtitle: string
  topics: string[]
}

export const BIOLOGY_UNITS: BiologyUnit[] = [
  {
    id: 'unit-1',
    number: 1,
    title: 'Biochemistry',
    subtitle: 'What makes something alive, how experiments work, why water matters, and the molecules that build you.',
    topics: [
      'Characteristics of Life',
      'Graphing, Measurements & Experimental Design',
      'Properties of Water',
      'Reactions & Biomolecules',
    ],
  },
]

export function getBiologyUnit(id: BiologyUnitId): BiologyUnit {
  const unit = BIOLOGY_UNITS.find((item) => item.id === id)
  if (!unit) throw new Error(`Unknown biology unit: ${id}`)
  return unit
}
