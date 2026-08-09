export interface FactoringBinomial {
  /** Coefficient of x */
  a: number
  /** Constant term */
  b: number
}

export interface FactoringProblem {
  id: string
  kind: 'quadratic' | 'cubic'
  /** Coefficients high degree → constant */
  coeffs: number[]
  factors: FactoringBinomial[]
  prompt: string
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

function coeffsKey(coeffs: number[]): string {
  return coeffs.join(',')
}

function addUniqueProblem(
  bank: Map<string, FactoringProblem>,
  factors: FactoringBinomial[],
  idCounter: { value: number },
  maxAbsCoeff: number,
): void {
  const coeffs = multiplyBinomials(factors)
  if (coeffs.some((value) => Math.abs(value) > maxAbsCoeff)) return

  const kind = factors.length === 2 ? 'quadratic' : 'cubic'
  const key = `${kind}:${coeffsKey(coeffs)}`
  if (bank.has(key)) return

  bank.set(key, {
    id: `f-${idCounter.value++}`,
    kind,
    coeffs,
    factors,
    prompt: formatPolynomial(coeffs),
  })
}

const MAX_ABS_COEFF = 36
const MAX_BANK_SIZE = 1000

function nonzeroInts(min: number, max: number): number[] {
  const values: number[] = []
  for (let n = min; n <= max; n += 1) {
    if (n !== 0) values.push(n)
  }
  return values
}

function buildQuestionBank(): FactoringProblem[] {
  const bank = new Map<string, FactoringProblem>()
  const idCounter = { value: 0 }

  const add = (factors: FactoringBinomial[]) =>
    addUniqueProblem(bank, factors, idCounter, MAX_ABS_COEFF)

  // Simple quadratics: (x + b)(x + c)
  for (const b1 of nonzeroInts(-7, 7)) {
    for (const b2 of nonzeroInts(-7, 7)) {
      add([
        { a: 1, b: b1 },
        { a: 1, b: b2 },
      ])
    }
  }

  // Quadratics with leading 2: (2x + b)(x + c)
  for (const b1 of nonzeroInts(-5, 5)) {
    for (const b2 of nonzeroInts(-5, 5)) {
      add([
        { a: 2, b: b1 },
        { a: 1, b: b2 },
      ])
    }
  }

  // Quadratics with leading 3: (3x + b)(x + c)
  for (const b1 of nonzeroInts(-4, 4)) {
    for (const b2 of nonzeroInts(-4, 4)) {
      add([
        { a: 3, b: b1 },
        { a: 1, b: b2 },
      ])
    }
  }

  const problems = Array.from(bank.values())
  return problems.length > MAX_BANK_SIZE
    ? shuffle(problems).slice(0, MAX_BANK_SIZE)
    : problems
}

let questionBankCache: FactoringProblem[] | null = null

export function getFactoringQuestionBank(): FactoringProblem[] {
  if (!questionBankCache) {
    questionBankCache = buildQuestionBank()
  }
  return questionBankCache
}

export function getFactoringQuestionCount(): number {
  return getFactoringQuestionBank().length
}

function shuffle<T>(items: T[]): T[] {
  const copy = [...items]
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
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
  signs?: ('+' | '-')[],
): FactoringBinomial[] | null {
  if (values.length % 2 !== 0) return null
  const bins: FactoringBinomial[] = []

  for (let i = 0; i < values.length; i += 2) {
    const a = parseBlank(values[i])
    const bRaw = parseBlank(values[i + 1])
    if (a === null || bRaw === null) return null
    if (a === 0) return null
    const sign = signs?.[i / 2] ?? '+'
    const b = sign === '-' ? -Math.abs(bRaw) : Math.abs(bRaw)
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

export function pickFactoringProblem(seen: Set<string>): FactoringProblem {
  const bank = getFactoringQuestionBank()
  const unseen = bank.filter((problem) => !seen.has(problem.id))

  if (unseen.length > 0) {
    return unseen[Math.floor(Math.random() * unseen.length)]
  }

  return bank[Math.floor(Math.random() * bank.length)]
}

export function getBlankCount(problem: FactoringProblem): number {
  return problem.factors.length * 2
}

export function getBinomialCount(problem: FactoringProblem): number {
  return problem.factors.length
}

let questionStatsCache: {
  total: number
  quadratics: number
} | null = null

export function getFactoringQuestionStats(): {
  total: number
  quadratics: number
} {
  if (questionStatsCache) return questionStatsCache

  const bank = getFactoringQuestionBank()
  questionStatsCache = {
    total: bank.length,
    quadratics: bank.length,
  }
  return questionStatsCache
}
