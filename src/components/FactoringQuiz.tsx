import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  FACTORING_QUIZ_DURATION_MS,
  checkFactoringAnswer,
  createFactoringQuiz,
  getBinomialCount,
  getBlankCount,
  getFactorPowers,
  isGroupingProblem,
  parseBinomialInputs,
  type FactoringProblem,
} from '../lib/factoringProblems'
import { FactoredAnswerDisplay, PolynomialDisplay } from './PolynomialMath'

interface FactoringQuizProps {
  onBack: () => void
}

type BinomialSign = '+' | '-'

interface QuestionState {
  blanks: string[]
  signs: BinomialSign[]
  correct: boolean | null
}

function emptyBlanks(count: number): string[] {
  return Array.from({ length: count }, () => '')
}

function emptySigns(count: number): BinomialSign[] {
  return Array.from({ length: count }, () => '+')
}

function createQuestionState(problem: FactoringProblem): QuestionState {
  return {
    blanks: emptyBlanks(getBlankCount(problem)),
    signs: emptySigns(getBinomialCount(problem)),
    correct: null,
  }
}

function formatCountdown(ms: number): string {
  const totalSeconds = Math.max(0, Math.ceil(ms / 1000))
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${minutes}:${String(seconds).padStart(2, '0')}`
}

function startQuizState() {
  const problems = createFactoringQuiz()
  return {
    problems,
    answers: problems.map(createQuestionState),
    quizStart: Date.now(),
  }
}

export function FactoringQuiz({ onBack }: FactoringQuizProps) {
  const [session, setSession] = useState(startQuizState)
  const [answers, setAnswers] = useState<QuestionState[]>(session.answers)
  const [remainingMs, setRemainingMs] = useState(FACTORING_QUIZ_DURATION_MS)
  const [timeUpPopup, setTimeUpPopup] = useState(false)
  const [continuedAfterTime, setContinuedAfterTime] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const continuedRef = useRef(false)
  const submittedRef = useRef(false)

  const { problems, quizStart } = session

  useEffect(() => {
    if (submitted) return undefined

    const tick = () => {
      const left = FACTORING_QUIZ_DURATION_MS - (Date.now() - quizStart)
      setRemainingMs(left)
      if (left <= 0 && !continuedRef.current && !submittedRef.current) {
        setTimeUpPopup(true)
      }
    }

    tick()
    const id = window.setInterval(tick, 100)
    return () => window.clearInterval(id)
  }, [quizStart, submitted])

  const updateBlank = useCallback(
    (questionIndex: number, blankIndex: number, value: string) => {
      if (submitted || !/^\d*$/.test(value)) return
      setAnswers((prev) =>
        prev.map((answer, index) => {
          if (index !== questionIndex) return answer
          const blanks = [...answer.blanks]
          blanks[blankIndex] = value
          return { ...answer, blanks }
        }),
      )
    },
    [submitted],
  )

  const toggleSign = useCallback(
    (questionIndex: number, binomialIndex: number) => {
      if (submitted) return
      setAnswers((prev) =>
        prev.map((answer, index) => {
          if (index !== questionIndex) return answer
          const signs = [...answer.signs]
          signs[binomialIndex] = signs[binomialIndex] === '+' ? '-' : '+'
          return { ...answer, signs }
        }),
      )
    },
    [submitted],
  )

  const gradeQuiz = useCallback(() => {
    submittedRef.current = true
    setAnswers((prev) =>
      prev.map((answer, index) => {
        const problem = problems[index]
        const parsed = parseBinomialInputs(
          answer.blanks,
          answer.signs,
          getFactorPowers(problem),
        )
        if (!parsed) {
          return { ...answer, correct: false }
        }
        return {
          ...answer,
          correct: checkFactoringAnswer(problem, parsed),
        }
      }),
    )
    setSubmitted(true)
    setTimeUpPopup(false)
  }, [problems])

  const handleContinueTrying = useCallback(() => {
    continuedRef.current = true
    setContinuedAfterTime(true)
    setTimeUpPopup(false)
  }, [])

  const handleNewQuiz = useCallback(() => {
    const next = startQuizState()
    continuedRef.current = false
    submittedRef.current = false
    setSession(next)
    setAnswers(next.answers)
    setRemainingMs(FACTORING_QUIZ_DURATION_MS)
    setTimeUpPopup(false)
    setContinuedAfterTime(false)
    setSubmitted(false)
  }, [])

  const score = useMemo(() => {
    if (!submitted) return null
    const correct = answers.filter((answer) => answer.correct).length
    return { correct, total: answers.length }
  }, [answers, submitted])

  const timerUrgent = remainingMs <= 30_000 && remainingMs > 0
  const timerExpired = remainingMs <= 0
  const easyCount = problems.length - 1

  return (
    <div className="factoring-page factoring-quiz-page">
      <header className="factoring-page-header">
        <button type="button" className="btn-secondary btn-sm" onClick={onBack}>
          ← Back
        </button>
        <div className="factoring-page-header-text">
          <h1>Factoring Quiz</h1>
          <p>
            {easyCount} easy · 1 hard · 4 minutes
          </p>
        </div>
        <span
          className={[
            'factoring-stopwatch',
            'factoring-quiz-timer',
            timerUrgent ? 'factoring-quiz-timer-urgent' : '',
            timerExpired || submitted ? 'factoring-stopwatch-done' : '',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          ⏱{' '}
          {timerExpired && continuedAfterTime && !submitted
            ? 'Overtime'
            : formatCountdown(remainingMs)}
        </span>
      </header>

      {score && (
        <p className="factoring-quiz-score">
          Score: <strong>{score.correct}/{score.total}</strong>
        </p>
      )}

      <div className="factoring-quiz-list">
        {problems.map((problem, questionIndex) => {
          const answer = answers[questionIndex]
          const binomialCount = getBinomialCount(problem)
          const factorPowers = getFactorPowers(problem)
          const isHard = questionIndex >= easyCount
          const isGrouping = isGroupingProblem(problem)

          return (
            <section
              key={`${quizStart}-${problem.id}`}
              className={[
                'factoring-card',
                'factoring-quiz-card',
                answer.correct === true ? 'factoring-quiz-card-correct' : '',
                answer.correct === false ? 'factoring-quiz-card-wrong' : '',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              <div className="factoring-card-top">
                <p className="factoring-prompt-label">
                  Question {questionIndex + 1}
                  {isHard ? ' · Hard' : ' · Easy'}
                  {isGrouping ? ' · Grouping' : ''}
                </p>
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
                        value={answer.blanks[aIndex]}
                        onChange={(e) =>
                          updateBlank(questionIndex, aIndex, e.target.value)
                        }
                        aria-label={`Q${questionIndex + 1} coefficient of x${power > 1 ? `^${power}` : ''} in binomial ${binomialIndex + 1}`}
                        disabled={submitted}
                      />
                      <span className="factoring-x">
                        x
                        {power > 1 ? <sup className="math-exp">{power}</sup> : null}
                      </span>
                      <button
                        type="button"
                        className="factoring-sign-toggle"
                        onClick={() => toggleSign(questionIndex, binomialIndex)}
                        disabled={submitted}
                        aria-label={`Q${questionIndex + 1} toggle sign in binomial ${binomialIndex + 1}`}
                      >
                        {answer.signs[binomialIndex]}
                      </button>
                      <input
                        type="text"
                        inputMode="numeric"
                        className="factoring-blank"
                        value={answer.blanks[bIndex]}
                        onChange={(e) =>
                          updateBlank(questionIndex, bIndex, e.target.value)
                        }
                        aria-label={`Q${questionIndex + 1} constant in binomial ${binomialIndex + 1}`}
                        disabled={submitted}
                      />
                      )
                    </span>
                  )
                })}
              </div>

              {submitted && answer.correct === true && (
                <p className="factoring-feedback factoring-feedback-correct">Correct!</p>
              )}
              {submitted && answer.correct === false && (
                <div className="factoring-feedback factoring-feedback-wrong">
                  <p>Incorrect</p>
                  <p className="factoring-solution">
                    Answer:{' '}
                    <strong>
                      <FactoredAnswerDisplay factors={problem.factors} />
                    </strong>
                  </p>
                </div>
              )}
            </section>
          )
        })}
      </div>

      <div className="factoring-quiz-footer">
        {!submitted ? (
          <button type="button" className="btn-primary" onClick={gradeQuiz}>
            Submit Quiz
          </button>
        ) : (
          <>
            <button type="button" className="btn-primary" onClick={handleNewQuiz}>
              New Quiz
            </button>
            <button type="button" className="btn-secondary" onClick={onBack}>
              Back Home
            </button>
          </>
        )}
      </div>

      {timeUpPopup && !submitted && (
        <div className="factoring-quiz-modal-backdrop" role="presentation">
          <div
            className="factoring-quiz-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="factoring-time-up-title"
          >
            <h2 id="factoring-time-up-title">Time’s up</h2>
            <p>4 minutes are done. Give up and see your score, or keep trying?</p>
            <div className="factoring-quiz-modal-actions">
              <button type="button" className="btn-secondary" onClick={gradeQuiz}>
                Give Up
              </button>
              <button type="button" className="btn-primary" onClick={handleContinueTrying}>
                Continue Trying
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
