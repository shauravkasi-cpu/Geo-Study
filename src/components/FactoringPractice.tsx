import { useCallback, useEffect, useMemo, useState } from 'react'
import { playAnswerSound } from '../lib/answerSounds'
import {
  checkFactoringAnswer,
  getBinomialCount,
  getBlankCount,
  getFactorPowers,
  getFactoringDifficultyLabel,
  isGroupingProblem,
  parseBinomialInputs,
  pickFactoringProblem,
  type FactoringDifficulty,
  type FactoringProblem,
} from '../lib/factoringProblems'
import {
  FactoredAnswerDisplay,
  formatElapsed,
  PolynomialDisplay,
} from './PolynomialMath'

interface FactoringPracticeProps {
  difficulty: FactoringDifficulty
  onBack: () => void
}

type BinomialSign = '+' | '-'

function emptyBlanks(count: number): string[] {
  return Array.from({ length: count }, () => '')
}

function emptySigns(count: number): BinomialSign[] {
  return Array.from({ length: count }, () => '+')
}

export function FactoringPractice({ difficulty, onBack }: FactoringPracticeProps) {
  const [problem, setProblem] = useState<FactoringProblem>(() =>
    pickFactoringProblem(new Set(), difficulty),
  )
  const [blanks, setBlanks] = useState<string[]>(() =>
    emptyBlanks(getBlankCount(problem)),
  )
  const [signs, setSigns] = useState<BinomialSign[]>(() =>
    emptySigns(getBinomialCount(problem)),
  )
  const [checked, setChecked] = useState(false)
  const [correct, setCorrect] = useState<boolean | null>(null)
  const [score, setScore] = useState({ correct: 0, total: 0 })
  const [seen, setSeen] = useState<Set<string>>(() => new Set([problem.id]))
  const [questionStart, setQuestionStart] = useState(() => Date.now())
  const [elapsedMs, setElapsedMs] = useState(0)
  const [finalTimeMs, setFinalTimeMs] = useState<number | null>(null)

  const binomialCount = getBinomialCount(problem)
  const factorPowers = getFactorPowers(problem)
  const modeLabel = getFactoringDifficultyLabel(difficulty)
  const isGrouping = isGroupingProblem(problem)

  useEffect(() => {
    if (checked) return undefined

    const tick = () => setElapsedMs(Date.now() - questionStart)
    tick()
    const id = window.setInterval(tick, 100)
    return () => window.clearInterval(id)
  }, [checked, questionStart])

  const resetTimer = useCallback(() => {
    setQuestionStart(Date.now())
    setElapsedMs(0)
    setFinalTimeMs(null)
  }, [])

  const updateBlank = useCallback((index: number, value: string) => {
    if (!/^\d*$/.test(value)) return
    setBlanks((prev) => {
      const next = [...prev]
      next[index] = value
      return next
    })
    setChecked(false)
    setCorrect(null)
    setFinalTimeMs(null)
  }, [])

  const toggleSign = useCallback((binomialIndex: number) => {
    setSigns((prev) => {
      const next = [...prev]
      next[binomialIndex] = next[binomialIndex] === '+' ? '-' : '+'
      return next
    })
    setChecked(false)
    setCorrect(null)
    setFinalTimeMs(null)
  }, [])

  const handleCheck = useCallback(() => {
    const timeMs = Date.now() - questionStart
    setFinalTimeMs(timeMs)
    setElapsedMs(timeMs)

    const parsed = parseBinomialInputs(blanks, signs, getFactorPowers(problem))
    if (!parsed) {
      playAnswerSound(false)
      setChecked(true)
      setCorrect(false)
      return
    }
    const isCorrect = checkFactoringAnswer(problem, parsed)
    playAnswerSound(isCorrect)
    setChecked(true)
    setCorrect(isCorrect)
    setScore((prev) => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1,
    }))
  }, [blanks, problem, questionStart, signs])

  const handleNext = useCallback(() => {
    const nextSeen = new Set(seen)
    nextSeen.add(problem.id)
    const nextProblem = pickFactoringProblem(nextSeen, difficulty)
    nextSeen.add(nextProblem.id)
    setSeen(nextSeen)
    setProblem(nextProblem)
    setBlanks(emptyBlanks(getBlankCount(nextProblem)))
    setSigns(emptySigns(getBinomialCount(nextProblem)))
    setChecked(false)
    setCorrect(null)
    resetTimer()
  }, [difficulty, problem.id, seen, resetTimer])

  const canCheck = useMemo(() => {
    for (let i = 0; i < binomialCount; i += 1) {
      if (blanks[i * 2 + 1].trim() === '') return false
    }
    return true
  }, [blanks, binomialCount])

  const displayTimeMs = finalTimeMs ?? elapsedMs
  const inputsLocked = checked && correct === true

  return (
    <div className="factoring-page">
      <header className="factoring-page-header">
        <button type="button" className="btn-secondary btn-sm" onClick={onBack}>
          ← Back
        </button>
        <div className="factoring-page-header-text">
          <h1>Factoring Practice</h1>
          <p>{modeLabel}</p>
        </div>
        <span className="factoring-score">
          Score: {score.correct}/{score.total}
        </span>
      </header>

      <div className="factoring-card">
        <div className="factoring-card-top">
          <p className="factoring-prompt-label">
            {isGrouping ? 'Factor by grouping' : 'Factor completely'}
          </p>
          <span className={`factoring-stopwatch ${checked ? 'factoring-stopwatch-done' : ''}`}>
            ⏱ {formatElapsed(displayTimeMs)}
          </span>
        </div>
        <p className="factoring-prompt">
          <PolynomialDisplay coeffs={problem.coeffs} />
        </p>

        <div className="factoring-answer-row">
          {Array.from({ length: binomialCount }, (_, binomialIndex) => {
            const aIndex = binomialIndex * 2
            const bIndex = aIndex + 1
            const power = factorPowers[binomialIndex] ?? 1
            return (
              <span key={binomialIndex} className="factoring-binomial">
                (
                <input
                  type="text"
                  inputMode="numeric"
                  className="factoring-blank"
                  value={blanks[aIndex]}
                  onChange={(e) => updateBlank(aIndex, e.target.value)}
                  aria-label={`Coefficient of x${power > 1 ? `^${power}` : ''} in binomial ${binomialIndex + 1}`}
                  disabled={inputsLocked}
                />
                <span className="factoring-x">
                  x
                  {power > 1 ? <sup className="math-exp">{power}</sup> : null}
                </span>
                <button
                  type="button"
                  className="factoring-sign-toggle"
                  onClick={() => toggleSign(binomialIndex)}
                  disabled={inputsLocked}
                  aria-label={`Toggle sign for constant in binomial ${binomialIndex + 1}`}
                >
                  {signs[binomialIndex]}
                </button>
                <input
                  type="text"
                  inputMode="numeric"
                  className="factoring-blank"
                  value={blanks[bIndex]}
                  onChange={(e) => updateBlank(bIndex, e.target.value)}
                  aria-label={`Constant in binomial ${binomialIndex + 1}`}
                  disabled={inputsLocked}
                />
                )
              </span>
            )
          })}
        </div>

        {checked && (
          <p className="factoring-time-result">
            Time: <strong>{formatElapsed(displayTimeMs)}</strong>
          </p>
        )}

        {checked && correct === true && (
          <p className="factoring-feedback factoring-feedback-correct">Correct!</p>
        )}
        {checked && correct === false && (
          <div className="factoring-feedback factoring-feedback-wrong">
            <p>Not quite — try again or see the answer below.</p>
            <p className="factoring-solution">
              Answer:{' '}
              <strong>
                <FactoredAnswerDisplay factors={problem.factors} />
              </strong>
            </p>
          </div>
        )}

        <div className="factoring-actions">
          {!checked || correct === false ? (
            <button
              type="button"
              className="btn-primary btn-sm"
              onClick={handleCheck}
              disabled={!canCheck}
            >
              Check Answer
            </button>
          ) : (
            <button type="button" className="btn-primary btn-sm" onClick={handleNext}>
              Next Question
            </button>
          )}
          {checked && correct === false && (
            <button type="button" className="btn-secondary btn-sm" onClick={handleNext}>
              Next Question
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
