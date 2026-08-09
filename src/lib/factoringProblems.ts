export interface FactoringBinomial {
  /** Coefficient of x */
  a: number
  /** Constant term */
  b: number
}

export type FactoringDifficulty = 'easy' | 'hard'

export const GROUPING_QUESTION_CHANCE = 0.2

export interface FactoringProblem {
  id: string
  kind: 'quadratic'
  /** Coefficients high degree → constant */
  coeffs: number[]
  factors: FactoringBinomial[]
  prompt: string
  /** When set, show 4-term grouping form (acx² + adx + bcx + bd) */
  groupingTerms?: [number, number, number, number]
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

function formatGroupingPolynomial(terms: [number, number, number, number]): string {
  const [ac, ad, bc, bd] = terms
  return (
    formatTerm(ac, 2, true) +
    formatTerm(ad, 1, false) +
    formatTerm(bc, 1, false) +
    formatTerm(bd, 0, false)
  )
}

function getGroupingTerms(factors: FactoringBinomial[]): [number, number, number, number] | null {
  if (factors.length !== 2) return null
  const [f1, f2] = factors
  const ac = f1.a * f2.a
  const ad = f1.a * f2.b
  const bc = f1.b * f2.a
  const bd = f1.b * f2.b
  if (ad === 0 || bc === 0) return null
  return [ac, ad, bc, bd]
}

function applyGroupingDisplay(problem: FactoringProblem): FactoringProblem {
  const groupingTerms = getGroupingTerms(problem.factors)
  if (!groupingTerms) return problem

  return {
    ...problem,
    groupingTerms,
    prompt: formatGroupingPolynomial(groupingTerms),
  }
}

function coeffsKey(coeffs: number[]): string {
  return coeffs.join(',')
}

function getAcProduct(coeffs: number[]): number {
  if (coeffs.length < 3) return 0
  return coeffs[0] * coeffs[coeffs.length - 1]
}

function addUniqueProblem(
  bank: Map<string, FactoringProblem>,
  factors: FactoringBinomial[],
  idCounter: { value: number },
  maxAbsCoeff: number,
): void {
  const coeffs = multiplyBinomials(factors)
  if (coeffs.some((value) => Math.abs(value) > maxAbsCoeff)) return

  const key = coeffsKey(coeffs)
  if (bank.has(key)) return

  bank.set(key, {
    id: `f-${idCounter.value++}`,
    kind: 'quadratic',
    coeffs,
    factors,
    prompt: formatPolynomial(coeffs),
  })
}

const MAX_ABS_COEFF = 36
const HARD_MAX_ABS_COEFF = 120
const HARD_MIN_AC_PRODUCT = 101
const HARD_MAX_AC_PRODUCT = 499
const MAX_BANK_SIZE = 1000

function nonzeroInts(min: number, max: number): number[] {
  const values: number[] = []
  for (let n = min; n <= max; n += 1) {
    if (n !== 0) values.push(n)
  }
  return values
}

function buildEasyQuestionBank(): FactoringProblem[] {
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

function buildHardQuestionBank(): FactoringProblem[] {
  const bank = new Map<string, FactoringProblem>()
  const idCounter = { value: 0 }

  const add = (factors: FactoringBinomial[]) => {
    const coeffs = multiplyBinomials(factors)
    const acProduct = getAcProduct(coeffs)
    if (acProduct < HARD_MIN_AC_PRODUCT || acProduct > HARD_MAX_AC_PRODUCT) return
    addUniqueProblem(bank, factors, idCounter, HARD_MAX_ABS_COEFF)
  }

  // Hard quadratics like (5x + 9)(6x + 7) — two binomial factors, bigger numbers
  for (const a of nonzeroInts(2, 16)) {
    for (const c of nonzeroInts(2, 16)) {
      for (const b of nonzeroInts(-20, 20)) {
        for (const d of nonzeroInts(-20, 20)) {
          add([
            { a, b },
            { a: c, b: d },
          ])
        }
      }
    }
  }

  for (const a of nonzeroInts(4, 16)) {
    for (const b of nonzeroInts(-20, 20)) {
      for (const c of nonzeroInts(-20, 20)) {
        add([
          { a, b },
          { a: 1, b: c },
        ])
      }
    }
  }

  const problems = Array.from(bank.values())
  return problems.length > MAX_BANK_SIZE
    ? shuffle(problems).slice(0, MAX_BANK_SIZE)
    : problems
}

const questionBankCache: Partial<Record<FactoringDifficulty, FactoringProblem[]>> = {}

export function getFactoringQuestionBank(
  difficulty: FactoringDifficulty = 'easy',
): FactoringProblem[] {
  if (!questionBankCache[difficulty]) {
    questionBankCache[difficulty] =
      difficulty === 'hard' ? buildHardQuestionBank() : buildEasyQuestionBank()
  }
  return questionBankCache[difficulty]!
}

export function getFactoringQuestionCount(
  difficulty: FactoringDifficulty = 'easy',
): number {
  return getFactoringQuestionBank(difficulty).length
}

function shuffle<T>(items: T[]): T[] {
  const copy = [...items]
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
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

/** Blank or 1 → coefficient 1 (x and 1x are the same) */
function parseCoefBlank(value: string): number | null {
  const trimmed = value.trim()
  if (trimmed === '') return 1
  const n = parseBlank(trimmed)
  if (n === null || n === 0) return null
  return n
}

function normalizeBinomial({ a, b }: FactoringBinomial): FactoringBinomial {
  if (a < 0) return { a: -a, b: -b }
  return { a, b }
}

function normalizePolyCoeffs(coeffs: number[]): number[] {
  while (coeffs.length > 1 && coeffs[0] === 0) {
    coeffs = coeffs.slice(1)
  }
  return coeffs
}

function coeffsEqual(a: number[], b: number[]): boolean {
  const left = normalizePolyCoeffs([...a])
  const right = normalizePolyCoeffs([...b])
  if (left.length !== right.length) return false
  return left.every((value, index) => value === right[index])
}

export function parseBinomialInputs(
  values: string[],
  signs?: ('+' | '-')[],
): FactoringBinomial[] | null {
  if (values.length % 2 !== 0) return null
  const bins: FactoringBinomial[] = []

  for (let i = 0; i < values.length; i += 2) {
    const a = parseCoefBlank(values[i])
    const bRaw = parseBlank(values[i + 1])
    if (a === null || bRaw === null) return null
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

  const target = normalizePolyCoeffs(problem.coeffs)

  const matchesTarget = (factors: FactoringBinomial[]) =>
    coeffsEqual(
      normalizePolyCoeffs(multiplyBinomials(factors)),
      target,
    )

  if (matchesTarget(userFactors)) return true

  for (const signed of withSignFlips(userFactors)) {
    if (matchesTarget(signed.map(normalizeBinomial))) return true
  }

  if (userFactors.length === 2) {
    if (matchesTarget([userFactors[1], userFactors[0]])) return true
    for (const signed of withSignFlips([userFactors[1], userFactors[0]])) {
      if (matchesTarget(signed.map(normalizeBinomial))) return true
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

export function pickFactoringProblem(
  seen: Set<string>,
  difficulty: FactoringDifficulty = 'easy',
): FactoringProblem {
  const bank = getFactoringQuestionBank(difficulty)
  const unseen = bank.filter((problem) => !seen.has(problem.id))
  const pickFrom = unseen.length > 0 ? unseen : bank

  const wantGrouping =
    difficulty === 'hard' && Math.random() < GROUPING_QUESTION_CHANCE

  if (wantGrouping) {
    const groupable = pickFrom.filter(
      (problem) => getGroupingTerms(problem.factors) !== null,
    )
    if (groupable.length > 0) {
      const base = groupable[Math.floor(Math.random() * groupable.length)]
      return applyGroupingDisplay(base)
    }
  }

  const base = pickFrom[Math.floor(Math.random() * pickFrom.length)]
  return base
}

export function isGroupingProblem(problem: FactoringProblem): boolean {
  return problem.groupingTerms !== undefined
}

export function getBlankCount(problem: FactoringProblem): number {
  return problem.factors.length * 2
}

export function getBinomialCount(problem: FactoringProblem): number {
  return problem.factors.length
}

export function getFactoringDifficultyLabel(difficulty: FactoringDifficulty): string {
  return difficulty === 'hard' ? 'Hard Mode' : 'Easy Mode'
}
