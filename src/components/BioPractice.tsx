import { useMemo, useState } from 'react'
import { playAnswerSound } from '../lib/answerSounds'
import {
  BIO_TEST1_TOPICS,
  BIO_UNIT2_TOPICS,
  answersMatch,
  type BioPracticeQuestion,
  type BioPracticeTopic,
  type BioUnit2Topic,
  type BioUnitId,
} from '../lib/bioQuiz'
import {
  getBioQuestionsByIds,
  getBioTest1Count,
  getBioTest1Questions,
  getBioUnit2Count,
  getBioUnit2Questions,
} from '../lib/bioQuestionBank'
import { AppToggles } from '../lib/soundToggle'
import { BioStructure } from './BioStructures'

interface BioPracticeProps {
  unit: BioUnitId
  topic: BioPracticeTopic | BioUnit2Topic
  onBack: () => void
}

function loadQuestions(unit: BioUnitId, topic: BioPracticeTopic | BioUnit2Topic) {
  return unit === 1
    ? getBioTest1Questions(topic as BioPracticeTopic)
    : getBioUnit2Questions(topic as BioUnit2Topic)
}

export function BioPractice({ unit, topic, onBack }: BioPracticeProps) {
  const topicMeta =
    unit === 1
      ? BIO_TEST1_TOPICS.find((item) => item.id === topic)
      : BIO_UNIT2_TOPICS.find((item) => item.id === topic)
  const kicker = unit === 1 ? 'Unit 1' : 'Unit 2'
  const [queue, setQueue] = useState(() => loadQuestions(unit, topic))
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
    const ok = answersMatch(selection, question.correctIndexes)
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
    const next = ids?.length ? getBioQuestionsByIds(ids) : loadQuestions(unit, topic)
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
      <div className="bio-study">
        <header className="bio-study-header">
          <button type="button" className="btn-secondary btn-sm" onClick={onBack}>
            ← Unit {unit}
          </button>
          <div className="bio-study-header-text">
            <p className="bio-study-kicker">{kicker}</p>
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
            ← Unit {unit}
          </button>
          <div className="bio-study-header-text">
            <p className="bio-study-kicker">{kicker}</p>
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
              Back to Unit {unit}
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
          ← Unit {unit}
        </button>
        <div className="bio-study-header-text">
          <p className="bio-study-kicker">
            {kicker} · {topicMeta?.label}
            {isMulti ? ' · Choose all that apply' : ''}
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
  question: BioPracticeQuestion
  picked: number[]
  checked: boolean
  isMulti: boolean
  onPick: (index: number) => void
}) {
  return (
    <div className="bio-study-card">
      {isMulti && <p className="bio-multi-flag">Choose all that apply</p>}
      <p className="bio-study-plain">{question.prompt}</p>
      {question.structure ? <BioStructure id={question.structure} /> : null}
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

export function BiologyHub({
  onBack,
  onOpenUnit,
}: {
  onBack: () => void
  onOpenUnit: (unit: BioUnitId) => void
}) {
  const unit1 = useMemo(() => getBioTest1Count('all'), [])
  const unit2 = useMemo(() => getBioUnit2Count('all'), [])

  return (
    <div className="home-screen">
      <header className="subject-hub-header">
        <div className="subject-hub-header-main">
          <button type="button" className="btn-secondary btn-sm" onClick={onBack}>
            ← Subjects
          </button>
          <div className="subject-hub-header-text">
            <h1>Biology</h1>
            <p>Honors Bio · pick a unit for tests and practice.</p>
          </div>
        </div>
        <AppToggles />
      </header>

      <section className="home-section">
        <h2>Units</h2>
        <div className="bio-topic-grid">
          <button type="button" className="unit-card" onClick={() => onOpenUnit(1)}>
            <span className="unit-card-kicker">{unit1} questions</span>
            <span className="card-title">Unit 1</span>
            <span className="card-desc">Water, reactions, and macromolecules · Test 1 study</span>
          </button>
          <button type="button" className="unit-card" onClick={() => onOpenUnit(2)}>
            <span className="unit-card-kicker">{unit2} questions</span>
            <span className="card-title">Unit 2</span>
            <span className="card-desc">Cell membrane, transport, cell theory, and structure</span>
          </button>
        </div>
      </section>
    </div>
  )
}

export function BiologyUnit1Hub({
  onBack,
  onStart,
}: {
  onBack: () => void
  onStart: (topic: BioPracticeTopic) => void
}) {
  const total = useMemo(() => getBioTest1Count('all'), [])

  return (
    <div className="home-screen">
      <header className="subject-hub-header">
        <div className="subject-hub-header-main">
          <button type="button" className="btn-secondary btn-sm" onClick={onBack}>
            ← Biology
          </button>
          <div className="subject-hub-header-text">
            <h1>Biology Unit 1</h1>
            <p>Honors Bio Test 1 · water through macromolecules.</p>
          </div>
        </div>
        <AppToggles />
      </header>

      <section className="home-section">
        <h2>Full Unit 1 test</h2>
        <div className="ap-human-card biology-home-card">
          <div className="ap-human-card-main">
            <span className="card-icon">🧬</span>
            <div className="ap-human-card-content">
              <span className="card-title">All of Unit 1</span>
              <span className="card-desc">
                {total} multiple-choice questions · some choose-all · structure diagrams
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
          {BIO_TEST1_TOPICS.filter((item) => item.id !== 'all').map((item) => (
            <button
              key={item.id}
              type="button"
              className="unit-card"
              onClick={() => onStart(item.id)}
            >
              <span className="unit-card-kicker">{getBioTest1Count(item.id)} questions</span>
              <span className="card-title">{item.label}</span>
              <span className="card-desc">{item.desc}</span>
            </button>
          ))}
        </div>
      </section>
    </div>
  )
}

export function BiologyUnit2Hub({
  onBack,
  onStart,
}: {
  onBack: () => void
  onStart: (topic: BioUnit2Topic) => void
}) {
  const allCount = useMemo(() => getBioUnit2Count('all'), [])
  const part1Count = useMemo(() => getBioUnit2Count('part1'), [])
  const part2Count = useMemo(() => getBioUnit2Count('part2'), [])

  return (
    <div className="home-screen">
      <header className="subject-hub-header">
        <div className="subject-hub-header-main">
          <button type="button" className="btn-secondary btn-sm" onClick={onBack}>
            ← Biology
          </button>
          <div className="subject-hub-header-text">
            <h1>Biology Unit 2</h1>
            <p>Honors Bio · cell membrane, transport, cell theory, and structure.</p>
          </div>
        </div>
        <AppToggles />
      </header>

      <section className="home-section">
        <h2>Unit 2 tests</h2>
        <div className="bio-topic-grid">
          <div className="ap-human-card biology-home-card">
            <div className="ap-human-card-main">
              <span className="card-icon">🧪</span>
              <div className="ap-human-card-content">
                <span className="card-title">Part 1 only test</span>
                <span className="card-desc">
                  {part1Count} questions · membrane, passive transport, active transport
                </span>
              </div>
            </div>
            <div className="mode-buttons">
              <button type="button" className="btn-primary btn-sm" onClick={() => onStart('part1')}>
                Start Part 1 test
              </button>
            </div>
          </div>
          <div className="ap-human-card biology-home-card">
            <div className="ap-human-card-main">
              <span className="card-icon">🔬</span>
              <div className="ap-human-card-content">
                <span className="card-title">Part 2 only test</span>
                <span className="card-desc">
                  {part2Count} questions · cell theory, prokaryotes/eukaryotes, plant vs animal, viruses
                </span>
              </div>
            </div>
            <div className="mode-buttons">
              <button type="button" className="btn-primary btn-sm" onClick={() => onStart('part2')}>
                Start Part 2 test
              </button>
            </div>
          </div>
          <div className="ap-human-card biology-home-card">
            <div className="ap-human-card-main">
              <span className="card-icon">🧬</span>
              <div className="ap-human-card-content">
                <span className="card-title">All of Unit 2 test</span>
                <span className="card-desc">
                  {allCount} questions · Part 1 and Part 2 mixed and shuffled
                </span>
              </div>
            </div>
            <div className="mode-buttons">
              <button type="button" className="btn-primary btn-sm" onClick={() => onStart('all')}>
                Start all of Unit 2
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="home-section">
        <h2>Practice by section</h2>
        <div className="bio-topic-grid">
          {BIO_UNIT2_TOPICS.filter((item) => item.id !== 'all' && item.id !== 'part1' && item.id !== 'part2').map(
            (item) => (
              <button
                key={item.id}
                type="button"
                className="unit-card"
                onClick={() => onStart(item.id)}
              >
                <span className="unit-card-kicker">{getBioUnit2Count(item.id)} questions</span>
                <span className="card-title">{item.label}</span>
                <span className="card-desc">{item.desc}</span>
              </button>
            ),
          )}
        </div>
      </section>
    </div>
  )
}
