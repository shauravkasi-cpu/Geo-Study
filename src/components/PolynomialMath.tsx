import type { ReactNode } from 'react'
import type {
  FactoringBinomial,
  FactoringQuadraticFactor,
} from '../lib/factoringProblems'

function termSignPrefix(coef: number, first: boolean): string {
  const positive = coef > 0
  if (first) {
    return positive ? '' : '−'
  }
  return positive ? ' + ' : ' − '
}

/** Render ax^n with proper superscript exponents */
export function PolynomialDisplay({ coeffs }: { coeffs: number[] }) {
  const degree = coeffs.length - 1
  const nodes: ReactNode[] = []
  let first = true

  for (let i = 0; i < coeffs.length; i += 1) {
    const power = degree - i
    const coef = coeffs[i]
    if (coef === 0) continue

    const abs = Math.abs(coef)
    const prefix = termSignPrefix(coef, first)

    if (power === 0) {
      nodes.push(
        <span key={`t-${i}`}>
          {prefix}
          {abs}
        </span>,
      )
    } else if (power === 1) {
      const body = abs === 1 ? 'x' : `${abs}x`
      nodes.push(
        <span key={`t-${i}`}>
          {prefix}
          {body}
        </span>,
      )
    } else {
      const body = abs === 1 ? 'x' : `${abs}x`
      nodes.push(
        <span key={`t-${i}`}>
          {prefix}
          {body}
          <sup className="math-exp">{power}</sup>
        </span>,
      )
    }

    first = false
  }

  return <span className="math-polynomial">{nodes.length ? nodes : '0'}</span>
}

function LinearFactorDisplay({ a, b }: FactoringBinomial) {
  const xPart = a === 1 ? 'x' : a === -1 ? '−x' : `${a}x`
  const constPart = b >= 0 ? ` + ${b}` : ` − ${Math.abs(b)}`
  return (
    <span>
      ({xPart}
      {constPart})
    </span>
  )
}

function QuadraticFactorDisplay({ a, b, c }: FactoringQuadraticFactor) {
  const nodes: ReactNode[] = []
  let first = true

  const pushTerm = (coef: number, power: number, key: string) => {
    if (coef === 0) return
    const abs = Math.abs(coef)
    const prefix = termSignPrefix(coef, first)

    if (power === 0) {
      nodes.push(
        <span key={key}>
          {prefix}
          {abs}
        </span>,
      )
    } else if (power === 1) {
      const body = abs === 1 ? 'x' : `${abs}x`
      nodes.push(
        <span key={key}>
          {prefix}
          {body}
        </span>,
      )
    } else {
      const body = abs === 1 ? 'x' : `${abs}x`
      nodes.push(
        <span key={key}>
          {prefix}
          {body}
          <sup className="math-exp">{power}</sup>
        </span>,
      )
    }

    first = false
  }

  nodes.push(<span key="open">(</span>)
  pushTerm(a, 2, 'a')
  pushTerm(b, 1, 'b')
  pushTerm(c, 0, 'c')
  nodes.push(<span key="close">)</span>)

  return <span>{nodes}</span>
}

export function FactoredAnswerDisplay({ factors }: { factors: FactoringBinomial[] }) {
  return (
    <span className="math-polynomial">
      {factors.map((factor, index) => (
        <LinearFactorDisplay key={index} {...factor} />
      ))}
    </span>
  )
}

export function CubicFactoredAnswerDisplay({
  cubicFactors,
}: {
  cubicFactors: { linear: FactoringBinomial; quadratic: FactoringQuadraticFactor }
}) {
  return (
    <span className="math-polynomial">
      <LinearFactorDisplay {...cubicFactors.linear} />
      <QuadraticFactorDisplay {...cubicFactors.quadratic} />
    </span>
  )
}

export function formatElapsed(ms: number): string {
  const seconds = ms / 1000
  if (seconds < 60) {
    return `${seconds.toFixed(1)}s`
  }
  const minutes = Math.floor(seconds / 60)
  const remainder = seconds % 60
  return `${minutes}:${remainder.toFixed(1).padStart(4, '0')}`
}
