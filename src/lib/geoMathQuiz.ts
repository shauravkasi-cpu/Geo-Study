export type GeoMathTopic =
  | 'all'
  | 'central'
  | 'inscribed'
  | 'measure'
  | 'equation'
  | 'general'
  | 'volume'
  | 'density'

export type GeoMathQuestionTopic = Exclude<GeoMathTopic, 'all'>

export interface CirclePoint {
  id: string
  deg: number
  dist?: number
}

export interface CircleSpec {
  points: CirclePoint[]
  showCenter?: boolean
  centerId?: string
  lines: [string, string][]
  dashed?: [string, string][]
  arcLabels?: { from: string; to: string; text: string; major?: boolean }[]
  angleLabels?: { vertex: string; from: string; to: string; text: string }[]
  lengthLabels?: { from: string; to: string; text: string }[]
  shadeSector?: { from: string; to: string }
  shadeSegment?: { from: string; to: string }
}

export type GeoMathFigure =
  | { kind: 'circle'; spec: CircleSpec }
  | { kind: 'sector'; radiusLabel: string; angleLabel: string; degrees: number }
  | { kind: 'coord'; h: number; k: number; r: number; extra?: { x: number; y: number; label: string }[] }
  | { kind: 'cylinder'; r: string; h: string }
  | { kind: 'cone'; r: string; h?: string; slant?: string; angle?: string }
  | { kind: 'pyramid'; base: string; h: string }
  | { kind: 'sphere'; r?: string; v?: string }
  | { kind: 'prism'; l: string; w: string; h: string }
  | { kind: 'rect-circles'; r: string }
  | { kind: 'annulus'; inner: string; thick: string }
  | { kind: 'tire'; spoke: string; width: string; label: string }
  | { kind: 'semicircles' }

export interface GeoMathPracticeQuestion {
  id: string
  topic: GeoMathQuestionTopic
  prompt: string
  kind: 'mc' | 'typed'
  options?: string[]
  correctIndexes?: number[]
  accepted?: string[]
  value?: number
  tolerance?: number
  unit?: string
  prefix?: string
  math?: string
  explain: string
  figure?: GeoMathFigure
}

export const GEO_MATH_TOPICS: { id: GeoMathTopic; label: string; desc: string }[] = [
  { id: 'all', label: 'All questions', desc: 'Unit 1 mix from the circle geometry worksheets' },
  { id: 'central', label: 'Central angles & arcs', desc: 'Central angles, intercepted arcs, and chords' },
  { id: 'inscribed', label: 'Inscribed & tangent', desc: 'Inscribed angles, interior/exterior, tangents, segments' },
  { id: 'measure', label: 'Circumference & area', desc: 'Circumference, arc length, area, and sectors' },
  { id: 'equation', label: 'Circle equations', desc: 'Standard form, center, radius, and graphs' },
  { id: 'general', label: 'General form', desc: 'Expand, complete the square, center and radius' },
  { id: 'volume', label: 'Volume of solids', desc: 'Cylinders, cones, pyramids, spheres, Cavalieri' },
  { id: 'density', label: 'Density', desc: 'Mass, volume, density, and applications' },
]

export function circleFig(spec: CircleSpec): GeoMathFigure {
  return { kind: 'circle', spec }
}

export function mc(
  id: string,
  topic: GeoMathQuestionTopic,
  prompt: string,
  options: string[],
  correct: number,
  explain: string,
  extra?: Pick<GeoMathPracticeQuestion, 'figure' | 'math'>,
): GeoMathPracticeQuestion {
  return {
    id,
    topic,
    prompt,
    kind: 'mc',
    options,
    correctIndexes: [correct],
    explain,
    ...extra,
  }
}

export function multi(
  id: string,
  topic: GeoMathQuestionTopic,
  prompt: string,
  options: string[],
  correctIndexes: number[],
  explain: string,
  extra?: Pick<GeoMathPracticeQuestion, 'figure' | 'math'>,
): GeoMathPracticeQuestion {
  return {
    id,
    topic,
    prompt,
    kind: 'mc',
    options,
    correctIndexes,
    explain,
    ...extra,
  }
}

export function typed(
  id: string,
  topic: GeoMathQuestionTopic,
  prompt: string,
  accepted: string[],
  explain: string,
  extra?: Pick<GeoMathPracticeQuestion, 'figure' | 'math' | 'value' | 'tolerance' | 'unit' | 'prefix'>,
): GeoMathPracticeQuestion {
  return {
    id,
    topic,
    prompt,
    kind: 'typed',
    accepted,
    explain,
    ...extra,
  }
}

export function shuffle<T>(array: T[]): T[] {
  const copy = [...array]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

export function shuffleOptions(question: GeoMathPracticeQuestion): GeoMathPracticeQuestion {
  if (question.kind !== 'mc' || !question.options || !question.correctIndexes) return question
  const order = shuffle(question.options.map((_, index) => index))
  return {
    ...question,
    options: order.map((index) => question.options![index]),
    correctIndexes: question.correctIndexes.map((index) => order.indexOf(index)).sort((a, b) => a - b),
  }
}

export function answersMatch(picked: number[], correctIndexes: number[]): boolean {
  if (picked.length !== correctIndexes.length) return false
  const a = [...picked].sort((x, y) => x - y)
  const b = [...correctIndexes].sort((x, y) => x - y)
  return a.every((value, index) => value === b[index])
}

export function normalizeTyped(raw: string): string {
  return raw
    .trim()
    .toLowerCase()
    .replace(/π/g, 'pi')
    .replace(/√/g, 'sqrt')
    .replace(/×/g, '*')
    .replace(/·/g, '')
    .replace(/∠/g, '')
    .replace(/[−–—]/g, '-')
    .replace(/^angle/, '')
    .replace(/²/g, '^2')
    .replace(/³/g, '^3')
    .replace(/\s+/g, '')
    .replace(/[{}]/g, '')
    .replace(/\*/g, '')
}

export function parseFlexibleNumber(raw: string): number | null {
  const t = normalizeTyped(raw).replace(/,/g, '')
  if (!t) return null
  if (/^-?\d+(\.\d+)?$/.test(t)) return Number(t)
  const frac = t.match(/^(-?\d+(?:\.\d+)?)\/(-?\d+(?:\.\d+)?)$/)
  if (frac) {
    const den = Number(frac[2])
    if (!den) return null
    return Number(frac[1]) / den
  }
  const piOnly = t.match(/^(-?\d*\.?\d*)pi$/)
  if (piOnly) {
    const coef = piOnly[1] === '' || piOnly[1] === '-' ? (piOnly[1] === '-' ? -1 : 1) : Number(piOnly[1])
    if (Number.isNaN(coef)) return null
    return coef * Math.PI
  }
  const sqrtOnly = t.match(/^(-?\d*\.?\d*)sqrt\(?(\d+(?:\.\d+)?)\)?$/)
  if (sqrtOnly) {
    const coef = sqrtOnly[1] === '' || sqrtOnly[1] === '-' ? (sqrtOnly[1] === '-' ? -1 : 1) : Number(sqrtOnly[1])
    if (Number.isNaN(coef)) return null
    return coef * Math.sqrt(Number(sqrtOnly[2]))
  }
  return null
}

export function checkTypedAnswer(question: GeoMathPracticeQuestion, raw: string): boolean {
  const normalized = normalizeTyped(raw)
  if (!normalized) return false
  if (question.accepted?.some((item) => normalizeTyped(item) === normalized)) return true
  if (question.value != null) {
    const parsed = parseFlexibleNumber(raw)
    if (parsed != null && Math.abs(parsed - question.value) <= (question.tolerance ?? 0.03)) return true
  }
  return false
}

export function typedAnswerDisplay(question: GeoMathPracticeQuestion): string {
  const main = question.accepted?.[0] ?? (question.value != null ? String(question.value) : '')
  return question.unit ? `${main} ${question.unit}` : main
}
