import { useMemo, useState } from 'react'
import { playAnswerSound } from '../lib/answerSounds'
import { BIO_UNIT_1_LESSON, getBioQuestionCount } from '../lib/bioUnit1Lesson'
import { getBiologyUnit } from '../lib/biologyUnits'
import type { BiologyUnitId } from '../types'
import { BioVisual } from './BioVisuals'

const PROGRESS_KEY = 'bio-unit-1-study-progress'

interface BioStudyProps {
  unitId: BiologyUnitId
  onBack: () => void
}

interface SavedProgress {
  stepIndex: number
  correct: number
  answered: number
  answers: Record<string, number>
}

function loadProgress(): SavedProgress | null {
  try {
    const raw = localStorage.getItem(PROGRESS_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as SavedProgress
    if (
      typeof parsed.stepIndex !== 'number' ||
      parsed.stepIndex < 0 ||
      parsed.stepIndex >= BIO_UNIT_1_LESSON.length
    ) {
      return null
    }
    return {
      stepIndex: parsed.stepIndex,
      correct: parsed.correct ?? 0,
      answered: parsed.answered ?? 0,
      answers: parsed.answers ?? {},
    }
  } catch {
    return null
  }
}

function saveProgress(progress: SavedProgress) {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress))
}

function clearProgress() {
  localStorage.removeItem(PROGRESS_KEY)
}

export function BioStudy({ unitId, onBack }: BioStudyProps) {
  const unit = getBiologyUnit(unitId)
  const steps = BIO_UNIT_1_LESSON
  const questionTotal = useMemo(() => getBioQuestionCount(steps), [steps])
  const saved = useMemo(() => loadProgress(), [])

  const [index, setIndex] = useState(saved?.stepIndex ?? 0)
  const [correct, setCorrect] = useState(saved?.correct ?? 0)
  const [answered, setAnswered] = useState(saved?.answered ?? 0)
  const [answers, setAnswers] = useState<Record<string, number>>(saved?.answers ?? {})
  const [done, setDone] = useState(false)

  const step = steps[index]
  const picked = step?.type === 'question' ? (answers[step.id] ?? null) : null
  const percent = Math.round(((done ? steps.length : index) / steps.length) * 100)

  const persist = (
    nextIndex: number,
    nextCorrect: number,
    nextAnswered: number,
    nextAnswers: Record<string, number>,
  ) => {
    saveProgress({
      stepIndex: nextIndex,
      correct: nextCorrect,
      answered: nextAnswered,
      answers: nextAnswers,
    })
  }

  const goNext = () => {
    if (index >= steps.length - 1) {
      clearProgress()
      setDone(true)
      return
    }
    const nextIndex = index + 1
    setIndex(nextIndex)
    persist(nextIndex, correct, answered, answers)
  }

  const goPrev = () => {
    if (index === 0) return
    setDone(false)
    const nextIndex = index - 1
    setIndex(nextIndex)
    persist(nextIndex, correct, answered, answers)
  }

  const handlePick = (optionIndex: number) => {
    if (!step || step.type !== 'question' || answers[step.id] !== undefined) return
    const isCorrect = optionIndex === step.correctIndex
    playAnswerSound(isCorrect)
    const nextAnswers = { ...answers, [step.id]: optionIndex }
    const nextCorrect = correct + (isCorrect ? 1 : 0)
    const nextAnswered = answered + 1
    setAnswers(nextAnswers)
    setCorrect(nextCorrect)
    setAnswered(nextAnswered)
    persist(index, nextCorrect, nextAnswered, nextAnswers)
  }

  const restart = () => {
    clearProgress()
    setIndex(0)
    setCorrect(0)
    setAnswered(0)
    setAnswers({})
    setDone(false)
  }

  if (done) {
    return (
      <div className="bio-study">
        <header className="bio-study-header">
          <button type="button" className="btn-secondary btn-sm" onClick={onBack}>
            ← Unit 1
          </button>
          <div className="bio-study-header-text">
            <p className="bio-study-kicker">Unit {unit.number}</p>
            <h1>You finished the study path</h1>
          </div>
        </header>
        <div className="bio-study-card bio-study-done">
          <p className="bio-study-plain">
            You walked through all of {unit.title} in plain English, with checks along the way.
          </p>
          <p className="bio-study-score">
            Check questions: <strong>{correct}</strong> / {questionTotal} correct
            {answered < questionTotal ? ` (${answered} answered)` : ''}
          </p>
          <div className="bio-study-actions">
            <button type="button" className="btn-primary" onClick={restart}>
              Study again
            </button>
            <button type="button" className="btn-secondary" onClick={onBack}>
              Back to Unit 1
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (!step) return null

  return (
    <div className="bio-study">
      <header className="bio-study-header">
        <button type="button" className="btn-secondary btn-sm" onClick={onBack}>
          ← Unit 1
        </button>
        <div className="bio-study-header-text">
          <p className="bio-study-kicker">
            Unit {unit.number} · Part {step.chapterNum} of 4 · {step.chapter}
          </p>
          <h1>{step.type === 'teach' ? step.title : 'Check yourself'}</h1>
        </div>
      </header>

      <div className="bio-progress" aria-hidden>
        <div className="bio-progress-bar" style={{ width: `${percent}%` }} />
      </div>
      <p className="bio-progress-label">
        {index + 1} / {steps.length}
        {answered > 0 ? ` · checks ${correct}/${answered}` : ''}
      </p>

      <div key={step.id} className="bio-study-card">
        {step.type === 'teach' ? (
          <>
            <p className="bio-study-plain">{step.plain}</p>
            <BioVisual id={step.visual} />
            <ul className="bio-study-points">
              {step.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
            {step.remember && <p className="bio-study-remember">{step.remember}</p>}
          </>
        ) : (
          <>
            <p className="bio-study-plain">{step.prompt}</p>
            <div className="bio-options">
              {step.options.map((option, optionIndex) => {
                const show = picked !== null
                const isCorrect = optionIndex === step.correctIndex
                const isPicked = picked === optionIndex
                const className = [
                  'bio-option',
                  show && isCorrect ? 'bio-option-correct' : '',
                  show && isPicked && !isCorrect ? 'bio-option-wrong' : '',
                ]
                  .filter(Boolean)
                  .join(' ')
                return (
                  <button
                    key={option}
                    type="button"
                    className={className}
                    onClick={() => handlePick(optionIndex)}
                    disabled={picked !== null}
                  >
                    {option}
                  </button>
                )
              })}
            </div>
            {picked !== null && <p className="bio-study-explain">{step.explain}</p>}
          </>
        )}
      </div>

      <div className="bio-study-actions">
        <button type="button" className="btn-secondary" onClick={goPrev} disabled={index === 0}>
          Back
        </button>
        {step.type === 'teach' || picked !== null ? (
          <button type="button" className="btn-primary" onClick={() => goNext()}>
            {index === steps.length - 1 ? 'Finish' : 'Continue'}
          </button>
        ) : (
          <p className="bio-study-wait">Pick an answer to continue.</p>
        )}
      </div>
    </div>
  )
}
