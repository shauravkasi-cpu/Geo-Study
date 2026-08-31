import { useMemo, useState } from 'react'
import { playAnswerSound } from '../lib/answerSounds'
import { getGeoMathCount, getGeoMathQuestions, getGeoMathQuestionsByIds } from '../lib/geoMathQuestionBank'
import {
  GEO_MATH_TOPICS,
  answersMatch,
  checkTypedAnswer,
  typedAnswerDisplay,
  type GeoMathPracticeQuestion,
  type GeoMathTopic,
} from '../lib/geoMathQuiz'
import { AppToggles } from '../lib/soundToggle'
import { GeoMathFigureView } from './GeoMathFigures'

interface GeoMathPracticeProps {
  topic: GeoMathTopic
  onBack: () => void
}

export function GeoMathPractice({ topic, onBack }: GeoMathPracticeProps) {
  const topicMeta = GEO_MATH_TOPICS.find((item) => item.id === topic)
  const [queue, setQueue] = useState(() => getGeoMathQuestions(topic))
  const [index, setIndex] = useState(0)
  const [picked, setPicked] = useState<number[]>([])
  const [typedValue, setTypedValue] = useState('')
  const [checked, setChecked] = useState(false)
  const [typedCorrect, setTypedCorrect] = useState(false)
  const [correctCount, setCorrectCount] = useState(0)
  const [missedIds, setMissedIds] = useState<string[]>([])
  const [done, setDone] = useState(false)

  const question = queue[index]
  const isMulti = (question?.correctIndexes?.length ?? 0) > 1
  const isTyped = question?.kind === 'typed'
  const percent = queue.length === 0 ? 0 : Math.round(((done ? queue.length : index) / queue.length) * 100)

  const gradeCurrent = (selection: number[]) => {
    if (!question || checked || question.kind !== 'mc' || !question.correctIndexes) return
    const ok = answersMatch(selection, question.correctIndexes)
    playAnswerSound(ok)
    setChecked(true)
    if (ok) setCorrectCount((count) => count + 1)
    else setMissedIds((ids) => [...ids, question.id])
  }

  const gradeTyped = () => {
    if (!question || checked || question.kind !== 'typed') return
    const ok = checkTypedAnswer(question, typedValue)
    playAnswerSound(ok)
    setTypedCorrect(ok)
    setChecked(true)
    if (ok) setCorrectCount((count) => count + 1)
    else setMissedIds((ids) => [...ids, question.id])
  }

  const handlePick = (optionIndex: number) => {
    if (!question || checked || question.kind !== 'mc') return
    if (isMulti) {
      setPicked((prev) =>
        prev.includes(optionIndex) ? prev.filter((item) => item !== optionIndex) : [...prev, optionIndex],
      )
      return
    }
    const selection = [optionIndex]
    setPicked(selection)
    gradeCurrent(selection)
  }

  const goNext = () => {
    if (index >= queue.length - 1) {
      setDone(true)
      return
    }
    setIndex((value) => value + 1)
    setPicked([])
    setTypedValue('')
    setChecked(false)
    setTypedCorrect(false)
  }

  const restart = (ids?: string[]) => {
    const next = ids?.length ? getGeoMathQuestionsByIds(ids) : getGeoMathQuestions(topic)
    setQueue(next)
    setIndex(0)
    setPicked([])
    setTypedValue('')
    setChecked(false)
    setTypedCorrect(false)
    setCorrectCount(0)
    setMissedIds([])
    setDone(false)
  }

  if (queue.length === 0) {
    return (
      <div className="bio-study math-study">
        <header className="bio-study-header">
          <button type="button" className="btn-secondary btn-sm" onClick={onBack}>
            ← Math
          </button>
          <div className="bio-study-header-text">
            <p className="bio-study-kicker">Geometry Unit 1</p>
            <h1>No questions in this set</h1>
          </div>
        </header>
      </div>
    )
  }

  if (done) {
    return (
      <div className="bio-study math-study">
        <header className="bio-study-header">
          <button type="button" className="btn-secondary btn-sm" onClick={onBack}>
            ← Math
          </button>
          <div className="bio-study-header-text">
            <p className="bio-study-kicker">Geometry Unit 1</p>
            <h1>Quiz complete</h1>
          </div>
          <AppToggles />
        </header>
        <div className="bio-study-card bio-study-done">
          <p className="bio-study-plain">
            {topicMeta?.label ?? 'Practice'} · {correctCount} / {queue.length} correct
          </p>
          <p className="bio-study-score">
            Score: <strong>{Math.round((correctCount / queue.length) * 100)}%</strong>
          </p>
          <div className="bio-study-actions">
            {missedIds.length > 0 && (
              <button type="button" className="btn-primary" onClick={() => restart(missedIds)}>
                Retry missed ({missedIds.length})
              </button>
            )}
            <button type="button" className="btn-primary" onClick={() => restart()}>
              New shuffle
            </button>
            <button type="button" className="btn-secondary" onClick={onBack}>
              Back to Math
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bio-study math-study">
      <header className="bio-study-header">
        <button type="button" className="btn-secondary btn-sm" onClick={onBack}>
          ← Math
        </button>
        <div className="bio-study-header-text">
          <p className="bio-study-kicker">
            Geometry Unit 1 · {topicMeta?.label}
            {isMulti ? ' · Choose all that apply' : isTyped ? ' · Type your answer' : ''}
          </p>
          <h1>Practice</h1>
        </div>
        <span className="bio-practice-score">
          {correctCount} / {index + (checked ? 1 : 0)}
        </span>
        <AppToggles />
      </header>

      <div className="bio-progress" aria-hidden>
        <div className="bio-progress-bar math-progress-bar" style={{ width: `${percent}%` }} />
      </div>
      <p className="bio-progress-label">
        Question {index + 1} / {queue.length}
      </p>

      <QuestionCard
        question={question}
        picked={picked}
        typedValue={typedValue}
        checked={checked}
        typedCorrect={typedCorrect}
        isMulti={isMulti}
        isTyped={isTyped}
        onPick={handlePick}
        onTypedChange={setTypedValue}
        onTypedSubmit={gradeTyped}
      />

      <div className="bio-study-actions">
        {isTyped && !checked ? (
          <button type="button" className="btn-primary" onClick={gradeTyped} disabled={!typedValue.trim()}>
            Check answer
          </button>
        ) : null}
        {isMulti && !checked ? (
          <button
            type="button"
            className="btn-primary"
            onClick={() => gradeCurrent(picked)}
            disabled={picked.length === 0}
          >
            Check answer
          </button>
        ) : null}
        {checked ? (
          <button type="button" className="btn-primary" onClick={goNext}>
            {index === queue.length - 1 ? 'See score' : 'Next'}
          </button>
        ) : isTyped ? (
          <p className="bio-study-wait">Type the number or expression. Units are already shown.</p>
        ) : !isMulti ? (
          <p className="bio-study-wait">Pick an answer to continue.</p>
        ) : (
          <p className="bio-study-wait">Select every correct option, then check.</p>
        )}
      </div>
    </div>
  )
}

function QuestionCard({
  question,
  picked,
  typedValue,
  checked,
  typedCorrect,
  isMulti,
  isTyped,
  onPick,
  onTypedChange,
  onTypedSubmit,
}: {
  question: GeoMathPracticeQuestion
  picked: number[]
  typedValue: string
  checked: boolean
  typedCorrect: boolean
  isMulti: boolean
  isTyped: boolean
  onPick: (index: number) => void
  onTypedChange: (value: string) => void
  onTypedSubmit: () => void
}) {
  return (
    <div className="bio-study-card">
      {isMulti && <p className="bio-multi-flag">Choose all that apply</p>}
      {isTyped && !isMulti && <p className="bio-multi-flag">Type the answer · units provided</p>}
      <p className="bio-study-plain">{question.prompt}</p>
      {question.math ? <p className="geo-math-eq">{question.math}</p> : null}
      {question.figure ? (
        <div className="bio-struct">
          <GeoMathFigureView figure={question.figure} />
        </div>
      ) : null}
      {isTyped ? (
        <form
          className="geo-math-typed"
          onSubmit={(event) => {
            event.preventDefault()
            onTypedSubmit()
          }}
        >
          {question.prefix ? <span className="geo-math-prefix">{question.prefix}</span> : null}
          <input
            className={[
              'geo-math-input',
              checked && typedCorrect ? 'geo-math-input-correct' : '',
              checked && !typedCorrect ? 'geo-math-input-wrong' : '',
            ]
              .filter(Boolean)
              .join(' ')}
            value={typedValue}
            onChange={(event) => onTypedChange(event.target.value)}
            disabled={checked}
            autoComplete="off"
            spellCheck={false}
            aria-label="Answer"
          />
          {question.unit ? <span className="geo-math-unit">{question.unit}</span> : null}
        </form>
      ) : (
        <div className="bio-options">
          {(question.options ?? []).map((option, optionIndex) => {
            const isCorrect = question.correctIndexes?.includes(optionIndex)
            const isPicked = picked.includes(optionIndex)
            const className = [
              'bio-option',
              isPicked && !checked ? 'bio-option-picked' : '',
              checked && isCorrect ? 'bio-option-correct' : '',
              checked && isPicked && !isCorrect ? 'bio-option-wrong' : '',
              checked && !isPicked && isCorrect ? 'bio-option-missed' : '',
            ]
              .filter(Boolean)
              .join(' ')
            return (
              <button
                key={`${question.id}-${option}`}
                type="button"
                className={className}
                onClick={() => onPick(optionIndex)}
                disabled={checked}
              >
                {option}
              </button>
            )
          })}
        </div>
      )}
      {checked && (
        <p className="bio-study-explain">
          {isTyped && !typedCorrect ? `Correct answer: ${typedAnswerDisplay(question)}. ` : ''}
          {question.explain}
        </p>
      )}
    </div>
  )
}

export function GeoMathHubCard({ onStart }: { onStart: (topic: GeoMathTopic) => void }) {
  const total = useMemo(() => getGeoMathCount('all'), [])

  return (
    <>
      <section className="home-section">
        <h2>Geometry Unit 1</h2>
        <div className="ap-human-card factoring-home-card">
          <div className="ap-human-card-main">
            <span className="card-icon">⭕</span>
            <div className="ap-human-card-content">
              <span className="card-title">Circles, volume, and density</span>
              <span className="card-desc">
                {total} practice questions · about 2/3 multiple choice · 1/3 typed (units given)
              </span>
            </div>
          </div>
          <div className="mode-buttons">
            <button type="button" className="btn-primary btn-sm" onClick={() => onStart('all')}>
              Start all questions
            </button>
          </div>
        </div>
      </section>

      <section className="home-section">
        <h2>Practice by topic</h2>
        <div className="bio-topic-grid">
          {GEO_MATH_TOPICS.filter((item) => item.id !== 'all').map((item) => (
            <button key={item.id} type="button" className="unit-card" onClick={() => onStart(item.id)}>
              <span className="unit-card-kicker">{getGeoMathCount(item.id)} questions</span>
              <span className="card-title">{item.label}</span>
              <span className="card-desc">{item.desc}</span>
            </button>
          ))}
        </div>
      </section>
    </>
  )
}
