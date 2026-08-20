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
    subtitle: 'Why water matters, and the molecules that build you.',
    topics: [
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
