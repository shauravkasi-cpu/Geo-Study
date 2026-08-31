import { useMemo, useState } from 'react'
import { playAnswerSound } from '../lib/answerSounds'
import {
  APHG_GUIDE_TOPICS,
  guideAnswersMatch,
  type ApHumanGuideQuestion,
  type ApHumanGuideTopic,
} from '../lib/apHumanGuide'
import {
  getApHumanGuideByIds,
  getApHumanGuideCount,
  getApHumanGuideQuestions,
} from '../lib/apHumanStudyBank'
import { AppToggles } from '../lib/soundToggle'
import { ApHumanStudyFigure } from './ApHumanStudyFigures'

interface ApHumanStudyGuideProps {
  topic: ApHumanGuideTopic
  onBack: () => void
}

export function ApHumanStudyGuide({ topic, onBack }: ApHumanStudyGuideProps) {
  const topicMeta = APHG_GUIDE_TOPICS.find((item) => item.id === topic)
  const [queue, setQueue] = useState(() => getApHumanGuideQuestions(topic))
  const [index, setIndex] = useState(0)
  const [picked, setPicked] = useState<number[]>([])
  const [checked, setChecked] = useState(false)
  const [correctCount, setCorrectCount] = useState(0)
  const [missedIds, setMissedIds] = useState<string[]>([])
  const [done, setDone] = useState(false)

  const question = queue[index]
  const isMulti = (question?.correctIndexes.length ?? 0) > 1
  const percent = queue.length === 0 ? 0 : Math.round(((done ? queue.length : index) / queue.length) * 100)

  const gradeCurrent = (selection: number[]) => {
    if (!question || checked) return
    const ok = guideAnswersMatch(selection, question.correctIndexes)
    playAnswerSound(ok)
    setChecked(true)
    if (ok) setCorrectCount((count) => count + 1)
    else setMissedIds((ids) => [...ids, question.id])
  }

  const handlePick = (optionIndex: number) => {
    if (!question || checked) return
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
    setChecked(false)
  }

  const restart = (ids?: string[]) => {
    const next = ids?.length ? getApHumanGuideByIds(ids) : getApHumanGuideQuestions(topic)
    setQueue(next)
    setIndex(0)
    setPicked([])
    setChecked(false)
    setCorrectCount(0)
    setMissedIds([])
    setDone(false)
  }

  if (queue.length === 0) {
    return (
      <div className="bio-study aphg-study">
        <header className="bio-study-header">
          <button type="button" className="btn-secondary btn-sm" onClick={onBack}>
            ← AP Human
          </button>
          <div className="bio-study-header-text">
            <p className="bio-study-kicker">Study Guide</p>
            <h1>No questions in this set</h1>
          </div>
        </header>
      </div>
    )
  }

  if (done) {
    return (
      <div className="bio-study aphg-study">
        <header className="bio-study-header">
          <button type="button" className="btn-secondary btn-sm" onClick={onBack}>
            ← AP Human
          </button>
          <div className="bio-study-header-text">
            <p className="bio-study-kicker">Study Guide</p>
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
              Back to AP Human
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bio-study aphg-study">
      <header className="bio-study-header">
        <button type="button" className="btn-secondary btn-sm" onClick={onBack}>
          ← AP Human
        </button>
        <div className="bio-study-header-text">
          <p className="bio-study-kicker">
            Study Guide · {topicMeta?.label}
            {isMulti ? ' · Choose all that apply' : ''}
          </p>
          <h1>Unit 1 Practice</h1>
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
        checked={checked}
        isMulti={isMulti}
        onPick={handlePick}
      />

      <div className="bio-study-actions">
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
  checked,
  isMulti,
  onPick,
}: {
  question: ApHumanGuideQuestion
  picked: number[]
  checked: boolean
  isMulti: boolean
  onPick: (index: number) => void
}) {
  return (
    <div className="bio-study-card">
      {isMulti && <p className="bio-multi-flag">Choose all that apply</p>}
      <p className="bio-study-plain">{question.prompt}</p>
      {question.figure ? <ApHumanStudyFigure id={question.figure} /> : null}
      <div className="bio-options">
        {question.options.map((option, optionIndex) => {
          const isCorrect = question.correctIndexes.includes(optionIndex)
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
      {checked && <p className="bio-study-explain">{question.explain}</p>}
    </div>
  )
}

export function ApHumanStudyHubCard({
  onStart,
}: {
  onStart: (topic: ApHumanGuideTopic) => void
}) {
  const total = useMemo(() => getApHumanGuideCount('all'), [])

  return (
    <>
      <section className="home-section">
        <h2>Study Guide</h2>
        <div className="ap-human-card">
          <div className="ap-human-card-main">
            <span className="card-icon">📝</span>
            <div className="ap-human-card-content">
              <span className="card-title">Study Guide</span>
              <span className="card-desc">
                Unit 1 · Thinking Geographically · {total} practice questions with map diagrams
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
          {APHG_GUIDE_TOPICS.filter((item) => item.id !== 'all').map((item) => (
            <button
              key={item.id}
              type="button"
              className="unit-card aphg-topic-card"
              onClick={() => onStart(item.id)}
            >
              <span className="unit-card-kicker">{getApHumanGuideCount(item.id)} questions</span>
              <span className="card-title">{item.label}</span>
              <span className="card-desc">{item.desc}</span>
            </button>
          ))}
        </div>
      </section>
    </>
  )
}
