import { getSessionTitle } from '../lib/quizEngine'
import type { QuizSession } from '../types'

interface ResultsScreenProps {
  session: QuizSession
  onRetryMissed: () => void
  onHome: () => void
}

export function ResultsScreen({ session, onRetryMissed, onHome }: ResultsScreenProps) {
  const total = session.queue.length
  const correct = session.score
  const percentage = total > 0 ? Math.round((correct / total) * 100) : 0
  const missed = session.answers.filter((a) => !a.correct)

  return (
    <div className="results-screen">
      <div className="results-card">
        <h1>Quiz Complete</h1>
        <p className="results-subtitle">{getSessionTitle(session)}</p>

        <div className="results-score-circle">
          <span className="results-percentage">{percentage}%</span>
          <span className="results-fraction">
            {correct} / {total}
          </span>
        </div>

        {missed.length > 0 && (
          <div className="missed-section">
            <h3>Missed ({missed.length})</h3>
            <ul className="missed-list">
              {missed.map((a) => (
                <li key={a.targetId}>
                  <span className="missed-type">{a.targetType === 'feature' ? '📍' : '🏳️'}</span>
                  {a.targetName}
                  {a.clickedName && a.targetType === 'country' && (
                    <span className="missed-detail"> — clicked {a.clickedName}</span>
                  )}
                  {a.distanceKm !== null && a.targetType === 'feature' && (
                    <span className="missed-detail"> — {a.distanceKm} km off</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        {missed.length === 0 && (
          <p className="perfect-score">Perfect score! You got everything right.</p>
        )}

        <div className="results-actions">
          {missed.length > 0 && (
            <button type="button" className="btn-primary" onClick={onRetryMissed}>
              Retry Missed ({missed.length})
            </button>
          )}
          <button type="button" className="btn-secondary" onClick={onHome}>
            Back to Home
          </button>
        </div>
      </div>
    </div>
  )
}
