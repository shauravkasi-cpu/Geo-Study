export interface FactoringBinomial {
  /** Coefficient of the variable term (x or x²) */
  a: number
  /** Constant term */
  b: number
  /** Power of the variable term; default 1 (linear). Use 2 for ax² + b. */
  power?: number
}

export type FactoringDifficulty = 'easy' | 'hard'

export type FactoringProblemKind = 'quadratic' | 'grouping'

/** Hard mode: chance of a cubic grouping polynomial like (ax²+b)(cx+d) */
export const GROUPING_QUESTION_CHANCE = 0.25

export interface FactoringProblem {
  id: string
  kind: FactoringProblemKind
  coeffs: number[]
  factors: FactoringBinomial[]
  prompt: string
}

function variablePower(factor: FactoringBinomial): number {
  return factor.power ?? 1
}

/** Multiply binomials of the form (a x^p + b) */
function multiplyBinomials(factors: FactoringBinomial[]): number[] {
  let poly = [1]
  for (const factor of factors) {
    const power = variablePower(factor)
    const factorPoly = new Array(power + 1).fill(0)
    factorPoly[0] = factor.a
    factorPoly[power] = factor.b

    const next = new Array(poly.length + power).fill(0)
    for (let i = 0; i < poly.length; i += 1) {
      for (let j = 0; j < factorPoly.length; j += 1) {
        next[i + j] += poly[i] * factorPoly[j]
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

function gcd(a: number, b: number): number {
  let x = Math.abs(a)
  let y = Math.abs(b)
  while (y !== 0) {
    const t = y
    y = x % y
    x = t
  }
  return x
}

function isPerfectSquare(n: number): boolean {
  if (n < 0) return false
  const root = Math.round(Math.sqrt(n))
  return root * root === n
}

/** True when ax² + b factors further as a difference of squares over the integers. */
function isDifferenceOfSquaresBinomial(a: number, b: number): boolean {
  return a * b < 0 && isPerfectSquare(Math.abs(a)) && isPerfectSquare(Math.abs(b))
}

function addUniqueProblem(
  bank: Map<string, FactoringProblem>,
  factors: FactoringBinomial[],
  idCounter: { value: number },
  maxAbsCoeff: number,
  kind: FactoringProblemKind = 'quadratic',
): void {
  const coeffs = multiplyBinomials(factors)
  if (coeffs.some((value) => Math.abs(value) > maxAbsCoeff)) return
  if (coeffs[0] === 0) return

  // Prefer positive leading coefficient for the expanded polynomial.
  let storedFactors = factors
  let storedCoeffs = coeffs
  if (storedCoeffs[0] < 0) {
    storedFactors = factors.map(flipSign)
    storedCoeffs = multiplyBinomials(storedFactors)
  }

  const key = `${kind}:${coeffsKey(storedCoeffs)}`
  if (bank.has(key)) return

  bank.set(key, {
    id: `f-${idCounter.value++}`,
    kind,
    coeffs: storedCoeffs,
    factors: storedFactors,
    prompt: formatPolynomial(storedCoeffs),
  })
}

const EASY_MAX_LEADING = 5
const EASY_MAX_MIDDLE = 24
const EASY_MAX_CONSTANT = 40
const HARD_MAX_LEADING = 14
const HARD_MAX_ABS_COEFF = 120
/** Hard mode x-method: |leading × constant| must stay in this range. */
const HARD_MIN_AC_PRODUCT = 101
const HARD_MAX_AC_PRODUCT = 400
const GROUPING_MAX_ABS_COEFF = 120
const MAX_BANK_SIZE = 1000

function acProduct(coeffs: number[]): number {
  if (coeffs.length < 2) return 0
  return Math.abs(coeffs[0] * coeffs[coeffs.length - 1])
}

function isHardAcProductAllowed(coeffs: number[]): boolean {
  const product = acProduct(coeffs)
  return product >= HARD_MIN_AC_PRODUCT && product <= HARD_MAX_AC_PRODUCT
}

function nonzeroInts(min: number, max: number): number[] {
  const values: number[] = []
  for (let n = min; n <= max; n += 1) {
    if (n !== 0) values.push(n)
  }
  return values
}

function isMonicQuadratic(problem: FactoringProblem): boolean {
  return problem.coeffs.length === 3 && problem.coeffs[0] === 1
}

function buildEasyQuestionBank(): FactoringProblem[] {
  const bank = new Map<string, FactoringProblem>()
  const idCounter = { value: 0 }

  const add = (factors: FactoringBinomial[]) => {
    const coeffs = multiplyBinomials(factors)
    if (coeffs.length !== 3) return
    if (coeffs[0] < 1 || coeffs[0] > EASY_MAX_LEADING) return
    if (Math.abs(coeffs[1]) > EASY_MAX_MIDDLE) return
    if (Math.abs(coeffs[2]) > EASY_MAX_CONSTANT) return
    addUniqueProblem(bank, factors, idCounter, EASY_MAX_CONSTANT)
  }

  // Leading coefficient 1: (x + p)(x + q)
  for (const b of nonzeroInts(-12, 12)) {
    for (const c of nonzeroInts(-12, 12)) {
      add([
        { a: 1, b },
        { a: 1, b: c },
      ])
    }
  }

  for (const a of nonzeroInts(2, EASY_MAX_LEADING)) {
    for (const b of nonzeroInts(-10, 10)) {
      for (const c of nonzeroInts(-10, 10)) {
        add([
          { a, b },
          { a: 1, b: c },
        ])
      }
    }
  }

  for (const a of nonzeroInts(2, 4)) {
    for (const c of nonzeroInts(2, 4)) {
      for (const b of nonzeroInts(-8, 8)) {
        for (const d of nonzeroInts(-8, 8)) {
          add([
            { a, b },
            { a: c, b: d },
          ])
        }
      }
    }
  }

  const problems = Array.from(bank.values())
  return problems.length > MAX_BANK_SIZE
    ? shuffle(problems).slice(0, MAX_BANK_SIZE)
    : problems
}

function buildHardQuadraticBank(): FactoringProblem[] {
  const bank = new Map<string, FactoringProblem>()
  const idCounter = { value: 0 }

  const add = (factors: FactoringBinomial[]) => {
    const coeffs = multiplyBinomials(factors)
    if (coeffs.length !== 3) return
    if (coeffs[0] < 2 || coeffs[0] > HARD_MAX_LEADING) return
    if (!isHardAcProductAllowed(coeffs)) return
    addUniqueProblem(bank, factors, idCounter, HARD_MAX_ABS_COEFF)
  }

  for (const a of nonzeroInts(2, 8)) {
    for (const c of nonzeroInts(2, 8)) {
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

  for (const a of nonzeroInts(2, HARD_MAX_LEADING)) {
    for (const b of nonzeroInts(-25, 25)) {
      for (const c of nonzeroInts(-25, 25)) {
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

/**
 * Build cubics that factor by grouping into exactly two binomials:
 * (ax² + b)(cx + d) — two parentheses, two terms each (worksheet #31–34 style).
 */
function buildHardGroupingBank(): FactoringProblem[] {
  const bank = new Map<string, FactoringProblem>()
  const idCounter = { value: 0 }

  for (const a of nonzeroInts(1, 9)) {
    for (const b of nonzeroInts(-12, 12)) {
      if (gcd(a, b) !== 1) continue
      if (isDifferenceOfSquaresBinomial(a, b)) continue

      for (const c of nonzeroInts(1, 9)) {
        for (const d of nonzeroInts(-12, 12)) {
          if (gcd(c, d) !== 1) continue

          // Canonical positive-leading form (matches what students can enter).
          const factors: FactoringBinomial[] = [
            { a, b, power: 2 },
            { a: c, b: d, power: 1 },
          ]

          const coeffs = multiplyBinomials(factors)
          if (coeffs.length !== 4) continue
          // Require all four terms nonzero — true grouping cubics like the worksheet.
          if (coeffs.some((value) => value === 0)) continue
          if (coeffs.some((value) => Math.abs(value) > GROUPING_MAX_ABS_COEFF)) continue
          // Grouping cubics: only cap the product (no x-method minimum).
          if (acProduct(coeffs) > HARD_MAX_AC_PRODUCT) continue

          addUniqueProblem(
            bank,
            factors,
            idCounter,
            GROUPING_MAX_ABS_COEFF,
            'grouping',
          )
        }
      }
    }
  }

  return shuffle(Array.from(bank.values()))
}

let easyBankCacheVar: FactoringProblem[] | null = null
let hardQuadraticBankCacheVar: FactoringProblem[] | null = null
let hardGroupingBankCacheVar: FactoringProblem[] | null = null

export function getFactoringQuestionBank(
  difficulty: FactoringDifficulty = 'easy',
): FactoringProblem[] {
  if (difficulty === 'easy') {
    if (!easyBankCacheVar) easyBankCacheVar = buildEasyQuestionBank()
    return easyBankCacheVar
  }

  if (!hardQuadraticBankCacheVar) hardQuadraticBankCacheVar = buildHardQuadraticBank()
  return hardQuadraticBankCacheVar
}

export function getHardGroupingQuestionBank(): FactoringProblem[] {
  if (!hardGroupingBankCacheVar) hardGroupingBankCacheVar = buildHardGroupingBank()
  return hardGroupingBankCacheVar
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
  return { a: -f.a, b: -f.b, power: f.power }
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

function parseCoefBlank(value: string): number | null {
  const trimmed = value.trim()
  if (trimmed === '') return 1
  const n = parseBlank(trimmed)
  if (n === null || n === 0) return null
  return n
}

function normalizeBinomial(factor: FactoringBinomial): FactoringBinomial {
  if (factor.a < 0) return flipSign(factor)
  return factor
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
  powers?: number[],
): FactoringBinomial[] | null {
  if (values.length % 2 !== 0) return null
  const bins: FactoringBinomial[] = []

  for (let i = 0; i < values.length; i += 2) {
    const a = parseCoefBlank(values[i])
    const bRaw = parseBlank(values[i + 1])
    if (a === null || bRaw === null) return null
    const sign = signs?.[i / 2] ?? '+'
    const b = sign === '-' ? -Math.abs(bRaw) : Math.abs(bRaw)
    const power = powers?.[i / 2] ?? 1
    bins.push({ a, b, power })
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
    const swapped = [userFactors[1], userFactors[0]]
    if (matchesTarget(swapped)) return true
    for (const signed of withSignFlips(swapped)) {
      if (matchesTarget(signed.map(normalizeBinomial))) return true
    }
  }

  return false
}

export function formatCorrectAnswer(problem: FactoringProblem): string {
  return problem.factors
    .map((factor) => {
      const { a, b } = factor
      const power = variablePower(factor)
      let xPart: string
      if (power === 1) {
        xPart = a === 1 ? 'x' : a === -1 ? '−x' : `${a}x`
      } else {
        const coefPart = a === 1 ? 'x' : a === -1 ? '−x' : `${a}x`
        xPart = `${coefPart}${power}`
      }
      const constPart = b >= 0 ? ` + ${b}` : ` − ${Math.abs(b)}`
      return `(${xPart}${constPart})`
    })
    .join('')
}

function pickFromBank(bank: FactoringProblem[], seen: Set<string>): FactoringProblem {
  const unseen = bank.filter((problem) => !seen.has(problem.id))
  const pickFrom = unseen.length > 0 ? unseen : bank
  return pickFrom[Math.floor(Math.random() * pickFrom.length)]
}

function pickEasyProblem(
  seen: Set<string>,
  preferMonic: boolean | null = null,
): FactoringProblem {
  const bank = getFactoringQuestionBank('easy')
  const monic = bank.filter(isMonicQuadratic)
  const nonMonic = bank.filter((problem) => !isMonicQuadratic(problem))

  const wantMonic =
    preferMonic === null ? Math.random() < 0.5 : preferMonic

  if (wantMonic && monic.length > 0) {
    return pickFromBank(monic, seen)
  }
  if (!wantMonic && nonMonic.length > 0) {
    return pickFromBank(nonMonic, seen)
  }
  return pickFromBank(bank, seen)
}

export function pickFactoringProblem(
  seen: Set<string>,
  difficulty: FactoringDifficulty = 'easy',
): FactoringProblem {
  if (difficulty === 'easy') {
    // About half of easy practice questions are monic (x² coefficient 1).
    return pickEasyProblem(seen, null)
  }

  if (difficulty === 'hard' && Math.random() < GROUPING_QUESTION_CHANCE) {
    const groupingBank = getHardGroupingQuestionBank()
    if (groupingBank.length > 0) {
      return pickFromBank(groupingBank, seen)
    }
  }

  return pickFromBank(getFactoringQuestionBank(difficulty), seen)
}

/** Timed quiz: 3 easy + 1 hard, all shown together. */
export const FACTORING_QUIZ_EASY_COUNT = 3
export const FACTORING_QUIZ_HARD_COUNT = 1
/** How many of the easy quiz questions use leading coefficient 1. */
export const FACTORING_QUIZ_MONIC_EASY_COUNT = 2
export const FACTORING_QUIZ_DURATION_MS = 4 * 60 * 1000

export function createFactoringQuiz(): FactoringProblem[] {
  const seen = new Set<string>()
  const easyProblems: FactoringProblem[] = []

  for (let i = 0; i < FACTORING_QUIZ_MONIC_EASY_COUNT; i += 1) {
    const problem = pickEasyProblem(seen, true)
    seen.add(problem.id)
    easyProblems.push(problem)
  }

  for (let i = FACTORING_QUIZ_MONIC_EASY_COUNT; i < FACTORING_QUIZ_EASY_COUNT; i += 1) {
    const problem = pickEasyProblem(seen, false)
    seen.add(problem.id)
    easyProblems.push(problem)
  }

  const problems = shuffle(easyProblems)

  for (let i = 0; i < FACTORING_QUIZ_HARD_COUNT; i += 1) {
    const problem = pickFactoringProblem(seen, 'hard')
    seen.add(problem.id)
    problems.push(problem)
  }

  return problems
}

export function isGroupingProblem(problem: FactoringProblem): boolean {
  return problem.kind === 'grouping'
}

export function getBlankCount(problem: FactoringProblem): number {
  return problem.factors.length * 2
}

export function getBinomialCount(problem: FactoringProblem): number {
  return problem.factors.length
}

export function getFactorPowers(problem: FactoringProblem): number[] {
  return problem.factors.map(variablePower)
}

export function getFactoringDifficultyLabel(difficulty: FactoringDifficulty): string {
  return difficulty === 'hard' ? 'Hard Mode' : 'Easy Mode'
}
