import type { ReactNode } from 'react'
import type { FactoringBinomial } from '../lib/factoringProblems'

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

function formatFactorVariable(a: number, power: number): ReactNode {
  const abs = Math.abs(a)
  const sign = a < 0 ? '−' : ''
  const coef = abs === 1 ? '' : String(abs)

  if (power === 1) {
    return (
      <>
        {sign}
        {coef}
        x
      </>
    )
  }

  return (
    <>
      {sign}
      {coef}
      x<sup className="math-exp">{power}</sup>
    </>
  )
}

export function FactoredAnswerDisplay({ factors }: { factors: FactoringBinomial[] }) {
  return (
    <span className="math-polynomial">
      {factors.map((factor, index) => {
        const { a, b } = factor
        const power = factor.power ?? 1
        const constPart = b >= 0 ? ` + ${b}` : ` − ${Math.abs(b)}`
        return (
          <span key={index}>
            ({formatFactorVariable(a, power)}
            {constPart})
          </span>
        )
      })}
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
