export interface FactoringBinomial {
  /** Coefficient of x */
  a: number
  /** Constant term */
  b: number
}

export interface FactoringProblem {
  id: string
  kind: 'quadratic' | 'cubic'
  /** Coefficients high degree → constant: [x²], [x¹], [x⁰] or cubic */
  coeffs: number[]
  factors: FactoringBinomial[]
  prompt: string
}

function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function pickNonZero(min: number, max: number): number {
  let n = 0
  while (n === 0) n = randInt(min, max)
  return n
}

/** Polynomial coeffs in descending degree order */
function multiplyBinomials(factors: FactoringBinomial[]): number[] {
  let poly = [1]
  for (const { a, b } of factors) {
    const linear = [a, b]
    const next = new Array(poly.length + 1).fill(0)
    for (let i = 0; i < poly.length; i += 1) {
      for (let j = 0; j < linear.length; j += 1) {
        next[i + j] += poly[i] * linear[j]
      }
    }
    poly = next
  }
  return poly
}

function formatTerm(coef: number, power: number, first: boolean): string {
  if (coef === 0) return ''

  const abs = Math.abs(coef)
  let part = ''

  if (power === 0) {
    part = String(abs)
  } else if (power === 1) {
    part = abs === 1 ? 'x' : `${abs}x`
  } else {
    part = abs === 1 ? `x${power}` : `${abs}x${power}`
  }

  if (first) {
    return coef < 0 ? `−${part}` : part
  }
  return coef < 0 ? ` − ${part}` : ` + ${part}`
}

export function formatPolynomial(coeffs: number[]): string {
  const degree = coeffs.length - 1
  const parts: string[] = []
  let first = true

  for (let i = 0; i < coeffs.length; i += 1) {
    const power = degree - i
    const term = formatTerm(coeffs[i], power, first)
    if (term) {
      parts.push(term)
      first = false
    }
  }

  return parts.join('') || '0'
}

function shuffle<T>(items: T[]): T[] {
  const copy = [...items]
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

function generateQuadratic(): FactoringProblem {
  const a1 = randInt(1, 4)
  const b1 = pickNonZero(-9, 9)
  const a2 = randInt(1, 4)
  const b2 = pickNonZero(-9, 9)
  const factors: FactoringBinomial[] = [
    { a: a1, b: b1 },
    { a: a2, b: b2 },
  ]
  const coeffs = multiplyBinomials(factors)
  return {
    id: `q-${a1}${b1}-${a2}${b2}-${Date.now()}-${Math.random()}`,
    kind: 'quadratic',
    coeffs,
    factors,
    prompt: formatPolynomial(coeffs),
  }
}

function generateCubic(): FactoringProblem {
  const factors: FactoringBinomial[] = shuffle([
    { a: randInt(1, 3), b: pickNonZero(-6, 6) },
    { a: 1, b: pickNonZero(-6, 6) },
    { a: 1, b: pickNonZero(-6, 6) },
  ])
  const coeffs = multiplyBinomials(factors)
  return {
    id: `c-${Date.now()}-${Math.random()}`,
    kind: 'cubic',
    coeffs,
    factors,
    prompt: formatPolynomial(coeffs),
  }
}

export function generateFactoringProblem(): FactoringProblem {
  return Math.random() < 0.65 ? generateQuadratic() : generateCubic()
}

function permute<T>(items: T[]): T[][] {
  if (items.length <= 1) return [items]
  const result: T[][] = []
  for (let i = 0; i < items.length; i += 1) {
    const rest = [...items.slice(0, i), ...items.slice(i + 1)]
    for (const p of permute(rest)) {
      result.push([items[i], ...p])
    }
  }
  return result
}

function flipSign(f: FactoringBinomial): FactoringBinomial {
  return { a: -f.a, b: -f.b }
}

function withSignFlips(factors: FactoringBinomial[]): FactoringBinomial[][] {
  const variants: FactoringBinomial[][] = [factors]
  const n = factors.length
  for (let mask = 1; mask < 1 << n; mask += 1) {
    variants.push(
      factors.map((f, i) => (mask & (1 << i) ? flipSign(f) : f)),
    )
  }
  return variants
}

function parseBlank(value: string): number | null {
  const trimmed = value.trim()
  if (trimmed === '' || trimmed === '-' || trimmed === '+') return null
  const n = Number(trimmed)
  return Number.isFinite(n) && Number.isInteger(n) ? n : null
}

export function parseBinomialInputs(
  values: string[],
): FactoringBinomial[] | null {
  if (values.length % 2 !== 0) return null
  const bins: FactoringBinomial[] = []

  for (let i = 0; i < values.length; i += 2) {
    const a = parseBlank(values[i])
    const b = parseBlank(values[i + 1])
    if (a === null || b === null) return null
    if (a === 0) return null
    bins.push({ a, b })
  }

  return bins
}

export function checkFactoringAnswer(
  problem: FactoringProblem,
  userFactors: FactoringBinomial[],
): boolean {
  if (userFactors.length !== problem.factors.length) return false

  const target = problem.coeffs
  const permutations = permute(userFactors)

  for (const order of permutations) {
    for (const signed of withSignFlips(order)) {
      const expanded = multiplyBinomials(signed)
      if (
        expanded.length === target.length &&
        expanded.every((v, i) => v === target[i])
      ) {
        return true
      }
    }
  }

  return false
}

export function formatCorrectAnswer(problem: FactoringProblem): string {
  return problem.factors
    .map(({ a, b }) => {
      const xPart = a === 1 ? 'x' : a === -1 ? '−x' : `${a}x`
      const constPart = b >= 0 ? ` + ${b}` : ` − ${Math.abs(b)}`
      return `(${xPart}${constPart})`
    })
    .join('')
}

function buildSample(id: string, factors: FactoringBinomial[], prompt?: string): FactoringProblem {
  const coeffs = multiplyBinomials(factors)
  return {
    id,
    kind: factors.length === 2 ? 'quadratic' : 'cubic',
    coeffs,
    factors,
    prompt: prompt ?? formatPolynomial(coeffs),
  }
}

export const WORKSHEET_PROBLEMS: FactoringProblem[] = [
  buildSample('ws-1', [{ a: 2, b: 3 }, { a: 4, b: 1 }], '8x² + 14x + 3'),
  buildSample('ws-2', [{ a: 1, b: 2 }, { a: 1, b: 5 }], 'x² + 7x + 10'),
  buildSample('ws-3', [{ a: 1, b: 1 }, { a: 2, b: 3 }, { a: 1, b: 2 }], '2x³ + 9x² + 13x + 6'),
  buildSample('ws-4', [{ a: 1, b: 3 }, { a: 1, b: 4 }], 'x² + 7x + 12'),
  buildSample('ws-5', [{ a: 2, b: 1 }, { a: 1, b: 5 }], '2x² + 11x + 5'),
  buildSample('ws-6', [{ a: 1, b: 2 }, { a: 1, b: 3 }, { a: 1, b: 1 }], 'x³ + 6x² + 11x + 6'),
  buildSample('ws-7', [{ a: 3, b: 2 }, { a: 1, b: 4 }], '3x² + 14x + 8'),
  buildSample('ws-8', [{ a: 2, b: 1 }, { a: 1, b: 3 }, { a: 1, b: 2 }], '2x³ + 7x² + 7x + 2'),
]

export function pickFactoringProblem(seen: Set<string>): FactoringProblem {
  const pool = shuffle(WORKSHEET_PROBLEMS)
  const fresh = pool.find((p) => !seen.has(p.id))
  if (fresh) return fresh
  const generated = generateFactoringProblem()
  return generated
}

export function getBlankCount(problem: FactoringProblem): number {
  return problem.factors.length * 2
}

export function getBinomialCount(problem: FactoringProblem): number {
  return problem.factors.length
}
