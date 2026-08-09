export interface FactoringBinomial {
  /** Coefficient of x */
  a: number
  /** Constant term */
  b: number
}

export interface FactoringQuadraticFactor {
  /** Coefficient of x² */
  a: number
  /** Coefficient of x */
  b: number
  /** Constant term */
  c: number
}

export type FactoringDifficulty = 'easy' | 'hard'

export type FactoringProblemKind = 'quadratic' | 'cubic'

/** Hard mode: chance each question is a cubic (x³) instead of a quadratic */
export const CUBIC_QUESTION_CHANCE = 0.2

export interface FactoringProblem {
  id: string
  kind: FactoringProblemKind
  /** Coefficients high degree → constant */
  coeffs: number[]
  /** Two-binomial quadratics */
  factors: FactoringBinomial[]
  /** Cubics that factor as (linear)(quadratic) — two parentheses */
  cubicFactors?: {
    linear: FactoringBinomial
    quadratic: FactoringQuadraticFactor
  }
  prompt: string
}

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

function multiplyLinearQuadratic(
  linear: FactoringBinomial,
  quadratic: FactoringQuadraticFactor,
): number[] {
  const { a: la, b: lb } = linear
  const { a: qa, b: qb, c: qc } = quadratic
  return [
    la * qa,
    la * qb + lb * qa,
    la * qc + lb * qb,
    lb * qc,
  ]
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

function getAcProduct(coeffs: number[]): number {
  if (coeffs.length < 3) return 0
  return coeffs[0] * coeffs[coeffs.length - 1]
}

function addUniqueQuadratic(
  bank: Map<string, FactoringProblem>,
  factors: FactoringBinomial[],
  idCounter: { value: number },
  maxAbsCoeff: number,
): void {
  const coeffs = multiplyBinomials(factors)
  if (coeffs.some((value) => Math.abs(value) > maxAbsCoeff)) return

  const key = `quadratic:${coeffsKey(coeffs)}`
  if (bank.has(key)) return

  bank.set(key, {
    id: `f-${idCounter.value++}`,
    kind: 'quadratic',
    coeffs,
    factors,
    prompt: formatPolynomial(coeffs),
  })
}

function addUniqueCubic(
  bank: Map<string, FactoringProblem>,
  linear: FactoringBinomial,
  quadratic: FactoringQuadraticFactor,
  idCounter: { value: number },
  maxAbsCoeff: number,
): void {
  const coeffs = multiplyLinearQuadratic(linear, quadratic)
  if (coeffs.length !== 4) return
  if (coeffs.some((value) => value === 0)) return
  if (coeffs.some((value) => Math.abs(value) > maxAbsCoeff)) return

  const key = `cubic:${coeffsKey(coeffs)}`
  if (bank.has(key)) return

  bank.set(key, {
    id: `f-${idCounter.value++}`,
    kind: 'cubic',
    coeffs,
    factors: [],
    cubicFactors: { linear, quadratic },
    prompt: formatPolynomial(coeffs),
  })
}

const MAX_ABS_COEFF = 36
const HARD_MAX_ABS_COEFF = 120
const CUBIC_MAX_ABS_COEFF = 80
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

function ints(min: number, max: number): number[] {
  const values: number[] = []
  for (let n = min; n <= max; n += 1) {
    values.push(n)
  }
  return values
}

function buildEasyQuestionBank(): FactoringProblem[] {
  const bank = new Map<string, FactoringProblem>()
  const idCounter = { value: 0 }

  const add = (factors: FactoringBinomial[]) =>
    addUniqueQuadratic(bank, factors, idCounter, MAX_ABS_COEFF)

  for (const b1 of nonzeroInts(-7, 7)) {
    for (const b2 of nonzeroInts(-7, 7)) {
      add([
        { a: 1, b: b1 },
        { a: 1, b: b2 },
      ])
    }
  }

  for (const b1 of nonzeroInts(-5, 5)) {
    for (const b2 of nonzeroInts(-5, 5)) {
      add([
        { a: 2, b: b1 },
        { a: 1, b: b2 },
      ])
    }
  }

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

function buildHardQuadraticBank(): FactoringProblem[] {
  const bank = new Map<string, FactoringProblem>()
  const idCounter = { value: 0 }

  const add = (factors: FactoringBinomial[]) => {
    const coeffs = multiplyBinomials(factors)
    const acProduct = getAcProduct(coeffs)
    if (acProduct < HARD_MIN_AC_PRODUCT || acProduct > HARD_MAX_AC_PRODUCT) return
    addUniqueQuadratic(bank, factors, idCounter, HARD_MAX_ABS_COEFF)
  }

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

function buildHardCubicBank(): FactoringProblem[] {
  const bank = new Map<string, FactoringProblem>()
  const idCounter = { value: 0 }

  // Cubics from (ax + b)(cx² + dx + e) — factor by grouping, two parentheses
  for (const la of nonzeroInts(1, 8)) {
    for (const lb of nonzeroInts(-10, 10)) {
      for (const qa of nonzeroInts(1, 8)) {
        for (const qb of ints(-10, 10)) {
          for (const qc of nonzeroInts(-10, 10)) {
            addUniqueCubic(
              bank,
              { a: la, b: lb },
              { a: qa, b: qb, c: qc },
              idCounter,
              CUBIC_MAX_ABS_COEFF,
            )
          }
        }
      }
    }
  }

  const problems = Array.from(bank.values())
  return problems.length > MAX_BANK_SIZE
    ? shuffle(problems).slice(0, MAX_BANK_SIZE)
    : problems
}

let easyBankCacheVar: FactoringProblem[] | null = null
let hardQuadraticBankCacheVar: FactoringProblem[] | null = null
let hardCubicBankCacheVar: FactoringProblem[] | null = null

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

export function getHardCubicQuestionBank(): FactoringProblem[] {
  if (!hardCubicBankCacheVar) hardCubicBankCacheVar = buildHardCubicBank()
  return hardCubicBankCacheVar
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

function flipQuadraticSign(f: FactoringQuadraticFactor): FactoringQuadraticFactor {
  return { a: -f.a, b: -f.b, c: -f.c }
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

function parseOptionalCoefBlank(value: string): number {
  const trimmed = value.trim()
  if (trimmed === '') return 0
  const n = parseBlank(trimmed)
  return n ?? 0
}

function normalizeBinomial({ a, b }: FactoringBinomial): FactoringBinomial {
  if (a < 0) return { a: -a, b: -b }
  return { a, b }
}

function normalizeQuadratic({ a, b, c }: FactoringQuadraticFactor): FactoringQuadraticFactor {
  if (a < 0) return { a: -a, b: -b, c: -c }
  return { a, b, c }
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

export function parseCubicFactoringInputs(
  linearValues: string[],
  linearSign: '+' | '-',
  quadValues: string[],
  quadSigns: ('+' | '-')[],
): { linear: FactoringBinomial; quadratic: FactoringQuadraticFactor } | null {
  if (linearValues.length !== 2 || quadValues.length !== 3) return null

  const la = parseCoefBlank(linearValues[0])
  const lbRaw = parseBlank(linearValues[1])
  if (la === null || lbRaw === null) return null

  const qa = parseCoefBlank(quadValues[0])
  const qbRaw = parseOptionalCoefBlank(quadValues[1])
  const qcRaw = parseBlank(quadValues[2])
  if (qa === null || qcRaw === null) return null

  return {
    linear: {
      a: la,
      b: linearSign === '-' ? -Math.abs(lbRaw) : Math.abs(lbRaw),
    },
    quadratic: {
      a: qa,
      b: quadSigns[0] === '-' ? -Math.abs(qbRaw) : Math.abs(qbRaw),
      c: quadSigns[1] === '-' ? -Math.abs(qcRaw) : Math.abs(qcRaw),
    },
  }
}

function matchesCubicTarget(
  linear: FactoringBinomial,
  quadratic: FactoringQuadraticFactor,
  target: number[],
): boolean {
  return coeffsEqual(
    normalizePolyCoeffs(multiplyLinearQuadratic(linear, quadratic)),
    target,
  )
}

export function checkFactoringAnswer(
  problem: FactoringProblem,
  userFactors: FactoringBinomial[],
): boolean {
  if (problem.kind === 'cubic') return false
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

export function checkCubicFactoringAnswer(
  problem: FactoringProblem,
  linear: FactoringBinomial,
  quadratic: FactoringQuadraticFactor,
): boolean {
  if (!problem.cubicFactors) return false

  const target = normalizePolyCoeffs(problem.coeffs)
  const candidates: { linear: FactoringBinomial; quadratic: FactoringQuadraticFactor }[] = [
    { linear, quadratic },
    { linear: flipSign(linear), quadratic },
    { linear, quadratic: flipQuadraticSign(quadratic) },
    { linear: flipSign(linear), quadratic: flipQuadraticSign(quadratic) },
    { linear: normalizeBinomial(linear), quadratic: normalizeQuadratic(quadratic) },
  ]

  return candidates.some(({ linear: l, quadratic: q }) => matchesCubicTarget(l, q, target))
}

export function formatCorrectAnswer(problem: FactoringProblem): string {
  if (problem.cubicFactors) {
    return formatCubicFactors(problem.cubicFactors.linear, problem.cubicFactors.quadratic)
  }

  return problem.factors
    .map(({ a, b }) => formatLinearFactor({ a, b }))
    .join('')
}

function formatLinearFactor({ a, b }: FactoringBinomial): string {
  const xPart = a === 1 ? 'x' : a === -1 ? '−x' : `${a}x`
  const constPart = b >= 0 ? ` + ${b}` : ` − ${Math.abs(b)}`
  return `(${xPart}${constPart})`
}

export function formatCubicFactors(
  linear: FactoringBinomial,
  quadratic: FactoringQuadraticFactor,
): string {
  return formatLinearFactor(linear) + formatQuadraticFactor(quadratic)
}

function formatQuadraticFactor({ a, b, c }: FactoringQuadraticFactor): string {
  let result = '('
  const x2Part = a === 1 ? 'x²' : a === -1 ? '−x²' : `${a}x²`
  result += x2Part

  if (b !== 0) {
    result +=
      b >= 0
        ? ` + ${b === 1 ? 'x' : `${b}x`}`
        : ` − ${Math.abs(b) === 1 ? 'x' : `${Math.abs(b)}x`}`
  }

  if (c !== 0) {
    result += c >= 0 ? ` + ${c}` : ` − ${Math.abs(c)}`
  }

  result += ')'
  return result
}

function pickFromBank(bank: FactoringProblem[], seen: Set<string>): FactoringProblem {
  const unseen = bank.filter((problem) => !seen.has(problem.id))
  const pickFrom = unseen.length > 0 ? unseen : bank
  return pickFrom[Math.floor(Math.random() * pickFrom.length)]
}

export function pickFactoringProblem(
  seen: Set<string>,
  difficulty: FactoringDifficulty = 'easy',
): FactoringProblem {
  if (difficulty === 'hard' && Math.random() < CUBIC_QUESTION_CHANCE) {
    const cubicBank = getHardCubicQuestionBank()
    if (cubicBank.length > 0) {
      return pickFromBank(cubicBank, seen)
    }
  }

  return pickFromBank(getFactoringQuestionBank(difficulty), seen)
}

export function isCubicProblem(problem: FactoringProblem): boolean {
  return problem.kind === 'cubic' && problem.cubicFactors !== undefined
}

export function getBlankCount(problem: FactoringProblem): number {
  if (isCubicProblem(problem)) return 5
  return problem.factors.length * 2
}

export function getBinomialCount(problem: FactoringProblem): number {
  if (isCubicProblem(problem)) return 2
  return problem.factors.length
}

export function getFactoringDifficultyLabel(difficulty: FactoringDifficulty): string {
  return difficulty === 'hard' ? 'Hard Mode' : 'Easy Mode'
}
