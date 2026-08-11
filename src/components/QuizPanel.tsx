import { useEffect, useState } from 'react'
import { formatLngLat } from '../lib/mapCoords'
import { getPhysicalFeature } from '../lib/physicalFeatures'
import {
  getProgress,
  getSessionTitle,
  getCurrentItemType,
  getMcOptionLabel,
} from '../lib/quizEngine'
import { parseItemId, type QuizAnswer, type QuizSession } from '../types'

interface QuizPanelProps {
  session: QuizSession
  currentItemName: string | null
  lastAnswer: QuizAnswer | null
  awaitingNext: boolean
  hintActive: boolean
  onHint: () => void
  onSkip: () => void
  onNext: () => void
  onQuit: () => void
  onMcSelect?: (countryCode: string) => void
  onTypedSubmit?: (value: string) => void
}

export function QuizPanel({
  session,
  currentItemName,
  lastAnswer,
  awaitingNext,
  hintActive,
  onHint,
  onSkip,
  onNext,
  onQuit,
  onMcSelect,
  onTypedSubmit,
}: QuizPanelProps) {
  const { current, total } = getProgress(session)
  const itemType = getCurrentItemType(session)
  const isMc = session.format === 'multiple-choice'
  const isNameIt = session.format === 'name-it'
  const [typedAnswer, setTypedAnswer] = useState('')

  useEffect(() => {
    setTypedAnswer('')
  }, [session.currentIndex, session.format])

  const featureFeedback = (answer: QuizAnswer) => {
    const { key } = parseItemId(answer.targetId)
    const featureCoords = getPhysicalFeature(key)?.coordinates ?? null
    return (
      <>
        {featureCoords && (
          <p className="feedback-sub">
            <strong>{answer.targetName}</strong> is at {formatLngLat(featureCoords)}
          </p>
        )}
        {answer.clickedLngLat && (
          <p className="feedback-sub">
            You clicked {formatLngLat(answer.clickedLngLat)}
            {answer.clickedName ? ` (${answer.clickedName})` : ''}
          </p>
        )}
        {answer.distanceKm !== null && (
          <p className="feedback-sub">Distance: {answer.distanceKm} km</p>
        )}
        {!isNameIt && (
          <p className="feedback-sub">Green dot = feature location · Red dot = your click</p>
        )}
      </>
    )
  }

  const submitTyped = () => {
    if (!typedAnswer.trim()) return
    onTypedSubmit?.(typedAnswer)
  }

  return (
    <div className="quiz-panel">
      <div className="quiz-panel-header">
        <span className="quiz-title">{getSessionTitle(session)}</span>
        <button type="button" className="btn-text" onClick={onQuit}>
          Quit
        </button>
      </div>

      <div className="score-display">
        <span className="score-label">Score</span>
        <span className="score-value">
          {session.score} / {session.answers.length}
        </span>
        <span className="progress-label">
          Question {Math.min(current, total)} of {total}
        </span>
      </div>

      {!awaitingNext && isMc && session.mcOptions && (
        <div className="prompt-card">
          <p className="prompt-label">
            {itemType === 'feature'
              ? 'What physical feature is marked on the map?'
              : 'Which country is highlighted?'}
          </p>
          <div className="mc-options">
            {session.mcOptions.map((key) => {
              const name = getMcOptionLabel(itemType ?? 'country', key)
              return (
                <button
                  key={key}
                  type="button"
                  className="mc-option"
                  onClick={() => onMcSelect?.(key)}
                >
                  {name}
                </button>
              )
            })}
          </div>
        </div>
      )}

      {!awaitingNext && isNameIt && (
        <div className="prompt-card">
          <p className="prompt-label">
            {itemType === 'feature'
              ? 'Name the highlighted physical feature'
              : 'Name the highlighted country'}
          </p>
          <form
            className="name-it-form"
            onSubmit={(event) => {
              event.preventDefault()
              submitTyped()
            }}
          >
            <input
              type="text"
              className="name-it-input"
              value={typedAnswer}
              onChange={(event) => setTypedAnswer(event.target.value)}
              placeholder={itemType === 'feature' ? 'Type feature name…' : 'Type country name…'}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
              autoFocus
            />
            <button
              type="submit"
              className="btn-primary"
              disabled={!typedAnswer.trim()}
            >
              Check
            </button>
          </form>
          <p className="prompt-hint">Spelling matters · capitalization does not</p>
        </div>
      )}

      {!awaitingNext && !isMc && !isNameIt && currentItemName && (
        <div className="prompt-card">
          <p className="prompt-label">{itemType === 'feature' ? 'Locate' : 'Where is'}</p>
          <h2 className="prompt-country">{currentItemName}?</h2>
        </div>
      )}

      {awaitingNext && lastAnswer && (
        <div className={`feedback-card ${lastAnswer.correct ? 'correct' : 'wrong'}`}>
          {lastAnswer.correct ? (
            <>
              <span className="feedback-icon">✓</span>
              <p className="feedback-text">Correct!</p>
              {lastAnswer.targetType === 'country' && !isMc && !isNameIt && lastAnswer.clickedName && (
                <p className="feedback-sub">
                  You picked <strong>{lastAnswer.clickedName}</strong>
                </p>
              )}
              {lastAnswer.targetType === 'feature' && !isNameIt && featureFeedback(lastAnswer)}
              {(isMc || isNameIt) && lastAnswer.selectedOption && (
                <p className="feedback-sub">
                  You answered <strong>{lastAnswer.selectedOption}</strong>
                </p>
              )}
              {isNameIt && lastAnswer.targetType === 'feature' && featureFeedback(lastAnswer)}
            </>
          ) : (
            <>
              <span className="feedback-icon">✗</span>
              {lastAnswer.targetType === 'country' && !isMc && !isNameIt && (
                <p className="feedback-text">
                  You picked: <strong>{lastAnswer.clickedName ?? 'Nothing (ocean)'}</strong>
                </p>
              )}
              {(isMc || isNameIt) && lastAnswer.selectedOption && (
                <p className="feedback-text">
                  You answered: <strong>{lastAnswer.selectedOption}</strong>
                </p>
              )}
              {lastAnswer.targetType === 'feature' && !isNameIt && !isMc && (
                <>
                  <p className="feedback-text">Not quite — check the map</p>
                  {featureFeedback(lastAnswer)}
                </>
              )}
              {lastAnswer.targetType === 'feature' && isNameIt && (
                <>
                  <p className="feedback-text">Not quite</p>
                  {featureFeedback(lastAnswer)}
                </>
              )}
              <p className="feedback-sub">
                Correct answer: <strong>{lastAnswer.targetName}</strong>
              </p>
              {lastAnswer.targetType === 'country' && !isMc && !isNameIt && lastAnswer.clickedName && (
                <p className="feedback-sub">
                  Green = correct country · Red = where you clicked
                </p>
              )}
            </>
          )}
          <button type="button" className="btn-primary" onClick={onNext}>
            {session.status === 'complete' ? 'See Results' : 'Next Question'}
          </button>
        </div>
      )}

      {!awaitingNext && session.status === 'active' && !isMc && (
        <div className="quiz-actions">
          {!isNameIt && (
            <button
              type="button"
              className="btn-hint"
              onClick={onHint}
              disabled={hintActive}
            >
              {hintActive ? 'Hint shown on map' : '💡 Show Hint'}
            </button>
          )}
          <button type="button" className="btn-secondary" onClick={onSkip}>
            Skip
          </button>
        </div>
      )}
    </div>
  )
}
