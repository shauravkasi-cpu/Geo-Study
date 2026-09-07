import { useMemo, useState } from 'react'
import { playAnswerSound } from '../lib/answerSounds'
import {
  getVocabCount,
  getVocabQuestions,
  getVocabQuestionsByIds,
  gradeVocabTyped,
} from '../lib/apHumanVocabBank'
import {
  VOCAB_UNITS,
  answersMatch,
  type VocabPracticeQuestion,
  type VocabQuizMode,
  type VocabQuizTopic,
} from '../lib/apHumanVocab'
import { AppToggles } from '../lib/soundToggle'

interface ApHumanVocabPracticeProps {
  topic: VocabQuizTopic
  mode: VocabQuizMode
  onBack: () => void
}

export function ApHumanVocabPractice({ topic, mode, onBack }: ApHumanVocabPracticeProps) {
  const topicMeta =
    topic === 'all'
      ? { label: 'All units', desc: 'Full Vocab Quiz 1 mix' }
      : VOCAB_UNITS.find((item) => item.id === topic)
  const modeLabel = mode === 'typed' ? 'Typing Quiz' : 'Multiple Choice'
  const [queue, setQueue] = useState(() => getVocabQuestions(topic, mode))
  const [index, setIndex] = useState(0)
  const [picked, setPicked] = useState<number[]>([])
  const [typedValue, setTypedValue] = useState('')
  const [checked, setChecked] = useState(false)
  const [typedCorrect, setTypedCorrect] = useState(false)
  const [correctCount, setCorrectCount] = useState(0)
  const [missedIds, setMissedIds] = useState<string[]>([])
  const [done, setDone] = useState(false)

  const question = queue[index]
  const isTyped = mode === 'typed'
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
    const ok = gradeVocabTyped(question, typedValue)
    playAnswerSound(ok)
    setTypedCorrect(ok)
    setChecked(true)
    if (ok) setCorrectCount((count) => count + 1)
    else setMissedIds((ids) => [...ids, question.id])
  }

  const handlePick = (optionIndex: number) => {
    if (!question || checked || question.kind !== 'mc') return
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
    const next = ids?.length ? getVocabQuestionsByIds(ids, mode) : getVocabQuestions(topic, mode)
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
      <div className="bio-study">
        <header className="bio-study-header">
          <button type="button" className="btn-secondary btn-sm" onClick={onBack}>
            ← Vocab Quiz 1
          </button>
          <div className="bio-study-header-text">
            <p className="bio-study-kicker">Vocab Quiz 1</p>
            <h1>No questions in this set</h1>
          </div>
        </header>
      </div>
    )
  }

  if (done) {
    return (
      <div className="bio-study">
        <header className="bio-study-header">
          <button type="button" className="btn-secondary btn-sm" onClick={onBack}>
            ← Vocab Quiz 1
          </button>
          <div className="bio-study-header-text">
            <p className="bio-study-kicker">Vocab Quiz 1 · {modeLabel}</p>
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
              Back to Vocab Quiz 1
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bio-study">
      <header className="bio-study-header">
        <button type="button" className="btn-secondary btn-sm" onClick={onBack}>
          ← Vocab Quiz 1
        </button>
        <div className="bio-study-header-text">
          <p className="bio-study-kicker">
            Vocab Quiz 1 · {topicMeta?.label} · {modeLabel}
            {isTyped ? ' · Type the concept' : ''}
          </p>
          <h1>Practice</h1>
        </div>
        <span className="bio-practice-score">
          {correctCount} / {index + (checked ? 1 : 0)}
        </span>
        <AppToggles />
      </header>

      <div className="bio-progress" aria-hidden>
        <div className="bio-progress-bar" style={{ width: `${percent}%` }} />
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
        {checked ? (
          <button type="button" className="btn-primary" onClick={goNext}>
            {index === queue.length - 1 ? 'See score' : 'Next'}
          </button>
        ) : isTyped ? (
          <p className="bio-study-wait">Type the vocabulary concept, then check.</p>
        ) : (
          <p className="bio-study-wait">Pick an answer to continue.</p>
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
  isTyped,
  onPick,
  onTypedChange,
  onTypedSubmit,
}: {
  question: VocabPracticeQuestion
  picked: number[]
  typedValue: string
  checked: boolean
  typedCorrect: boolean
  isTyped: boolean
  onPick: (index: number) => void
  onTypedChange: (value: string) => void
  onTypedSubmit: () => void
}) {
  return (
    <div className="bio-study-card">
      {isTyped ? <p className="bio-multi-flag">Type the vocabulary concept</p> : null}
      <p className="bio-study-plain">{question.prompt}</p>
      {isTyped ? (
        <form
          className="geo-math-typed"
          onSubmit={(event) => {
            event.preventDefault()
            onTypedSubmit()
          }}
        >
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
            aria-label="Vocabulary answer"
            placeholder="Vocabulary concept"
          />
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
          {isTyped
            ? typedCorrect
              ? `Correct. The concept is ${question.term}. `
              : `Incorrect. The correct answer is ${question.term}. `
            : picked[0] != null && question.correctIndexes && !question.correctIndexes.includes(picked[0])
              ? `Incorrect. The correct answer is ${question.term}. `
              : 'Correct. '}
          {question.explain}
        </p>
      )}
    </div>
  )
}

export function ApHumanVocabHub({
  onBack,
  onStart,
}: {
  onBack: () => void
  onStart: (mode: VocabQuizMode, topic: VocabQuizTopic) => void
}) {
  const total = useMemo(() => getVocabCount('all'), [])

  return (
    <div className="home-screen">
      <header className="subject-hub-header">
        <div className="subject-hub-header-main">
          <button type="button" className="btn-secondary btn-sm" onClick={onBack}>
            ← AP Human
          </button>
          <div className="subject-hub-header-text">
            <h1>Vocab Quiz 1</h1>
            <p>Application questions from Units 7.5, 7.2, 7.3, and 1.1–1.7.</p>
          </div>
        </div>
        <AppToggles />
      </header>

      <section className="home-section">
        <h2>Choose a quiz type</h2>
        <div className="bio-topic-grid">
          <div className="ap-human-card biology-home-card">
            <div className="ap-human-card-main">
              <span className="card-icon">⌨️</span>
              <div className="ap-human-card-content">
                <span className="card-title">Typing Quiz</span>
                <span className="card-desc">
                  {total} scenarios · type the exact vocabulary concept
                </span>
              </div>
            </div>
            <div className="mode-buttons">
              <button type="button" className="btn-primary btn-sm" onClick={() => onStart('typed', 'all')}>
                Start typing quiz
              </button>
            </div>
          </div>
          <div className="ap-human-card biology-home-card">
            <div className="ap-human-card-main">
              <span className="card-icon">📝</span>
              <div className="ap-human-card-content">
                <span className="card-title">Multiple Choice</span>
                <span className="card-desc">
                  {total} scenarios · 4 choices · related AP Human distractors
                </span>
              </div>
            </div>
            <div className="mode-buttons">
              <button
                type="button"
                className="btn-primary btn-sm"
                onClick={() => onStart('multiple-choice', 'all')}
              >
                Start multiple choice
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="home-section">
        <h2>Practice by unit</h2>
        <div className="bio-topic-grid">
          {VOCAB_UNITS.map((item) => (
            <div key={item.id} className="ap-human-card biology-home-card">
              <div className="ap-human-card-main">
                <div className="ap-human-card-content">
                  <span className="unit-card-kicker">
                    {item.code} · {getVocabCount(item.id)} questions
                  </span>
                  <span className="card-title">{item.label}</span>
                  <span className="card-desc">{item.desc}</span>
                </div>
              </div>
              <div className="mode-buttons">
                <button
                  type="button"
                  className="btn-primary btn-sm"
                  onClick={() => onStart('typed', item.id)}
                >
                  Typing
                </button>
                <button
                  type="button"
                  className="btn-secondary btn-sm"
                  onClick={() => onStart('multiple-choice', item.id)}
                >
                  Multiple Choice
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
