import { useEffect, useState } from 'react'
import { AP_HUMAN_QUIZ_1_NAME } from '../lib/apHumanQuiz1'
import { CONTINENTS } from '../lib/countries'
import { AppToggles } from '../lib/soundToggle'
import { deleteCustomQuiz, loadCustomQuizzes } from '../lib/storage'
import type { Continent, CustomQuiz, FactoringDifficulty, PresetType, QuizFormat } from '../types'

interface HomeScreenProps {
  onStartPreset: (preset: PresetType, format?: QuizFormat) => void
  onStartCustom: (countryCodes: string[], name: string, quizId?: string, format?: QuizFormat) => void
  onCreateCustom: () => void
  onEditCustom: (id: string) => void
  onViewApHumanReference: () => void
  onStartFactoring: (difficulty: FactoringDifficulty) => void
  onStartFactoringQuiz: () => void
}

const CONTINENT_ICONS: Partial<Record<Continent, string>> = {
  Africa: '🌍',
  Asia: '🌏',
  Europe: '🇪🇺',
  'North America': '🗽',
  'South America': '🌎',
  Oceania: '🏝️',
}

export function HomeScreen({
  onStartPreset,
  onStartCustom,
  onCreateCustom,
  onEditCustom,
  onViewApHumanReference,
  onStartFactoring,
  onStartFactoringQuiz,
}: HomeScreenProps) {
  const [savedQuizzes, setSavedQuizzes] = useState<CustomQuiz[]>([])

  useEffect(() => {
    setSavedQuizzes(loadCustomQuizzes())
  }, [])

  const handleDelete = (id: string) => {
    deleteCustomQuiz(id)
    setSavedQuizzes(loadCustomQuizzes())
  }

  return (
    <div className="home-screen">
      <header className="home-header">
        <div className="home-header-top">
          <h1>Geo Study</h1>
          <AppToggles />
        </div>
      </header>

      <section className="home-section">
        <h2>AP Human Geography</h2>
        <div className="ap-human-card">
          <div className="ap-human-card-main">
            <span className="card-icon">📚</span>
            <div className="ap-human-card-content">
              <span className="card-title">{AP_HUMAN_QUIZ_1_NAME}</span>
            </div>
          </div>
          <div className="mode-buttons">
            <button type="button" className="btn-primary btn-sm" onClick={() => onStartPreset('ap-human-1', 'locate')}>
              Click to Locate
            </button>
            <button type="button" className="btn-secondary btn-sm" onClick={() => onStartPreset('ap-human-1', 'multiple-choice')}>
              Multiple Choice
            </button>
            <button type="button" className="btn-secondary btn-sm" onClick={() => onStartPreset('ap-human-1', 'name-it')}>
              Name It
            </button>
            <button type="button" className="btn-secondary btn-sm" onClick={onViewApHumanReference}>
              View Study Map
            </button>
          </div>
        </div>
      </section>

      <section className="home-section">
        <h2>Preset Quizzes — Click to Locate</h2>
        <div className="card-grid">
          <button
            type="button"
            className="quiz-card featured"
            onClick={() => onStartPreset('all', 'locate')}
          >
            <span className="card-icon">🌐</span>
            <span className="card-title">All Countries</span>
          </button>

          {CONTINENTS.map((continent) => (
            <button
              key={continent}
              type="button"
              className="quiz-card"
              onClick={() => onStartPreset(continent, 'locate')}
            >
              <span className="card-icon">{CONTINENT_ICONS[continent] ?? '🗺️'}</span>
              <span className="card-title">{continent}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="home-section">
        <h2>Multiple Choice Mode</h2>
        <div className="card-grid">
          <button
            type="button"
            className="quiz-card mc-card"
            onClick={() => onStartPreset('all', 'multiple-choice')}
          >
            <span className="card-icon">🎯</span>
            <span className="card-title">All Countries</span>
          </button>

          {CONTINENTS.map((continent) => (
            <button
              key={continent}
              type="button"
              className="quiz-card mc-card"
              onClick={() => onStartPreset(continent, 'multiple-choice')}
            >
              <span className="card-icon">{CONTINENT_ICONS[continent] ?? '🗺️'}</span>
              <span className="card-title">{continent}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="home-section">
        <div className="section-header">
          <h2>Custom Quizzes</h2>
          <button type="button" className="btn-primary btn-sm" onClick={onCreateCustom}>
            + Create Quiz
          </button>
        </div>

        {savedQuizzes.length === 0 ? (
          <p className="empty-state">
            No saved quizzes yet. Create one with your own list of countries.
          </p>
        ) : (
          <ul className="saved-quiz-list">
            {savedQuizzes.map((quiz) => (
              <li key={quiz.id} className="saved-quiz-item">
                <div className="saved-quiz-info">
                  <span className="saved-quiz-name">{quiz.name}</span>
                  <span className="saved-quiz-meta">
                    {quiz.countryCodes.length} countries
                    {quiz.lastScore && (
                      <> · Last: {quiz.lastScore.correct}/{quiz.lastScore.total}</>
                    )}
                  </span>
                </div>
                <div className="saved-quiz-actions">
                  <button
                    type="button"
                    className="btn-primary btn-sm"
                    onClick={() => onStartCustom(quiz.countryCodes, quiz.name, quiz.id, 'locate')}
                  >
                    Locate
                  </button>
                  <button
                    type="button"
                    className="btn-secondary btn-sm"
                    onClick={() => onStartCustom(quiz.countryCodes, quiz.name, quiz.id, 'multiple-choice')}
                  >
                    MC
                  </button>
                  <button
                    type="button"
                    className="btn-secondary btn-sm"
                    onClick={() => onEditCustom(quiz.id)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btn-danger btn-sm"
                    onClick={() => handleDelete(quiz.id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="home-section">
        <h2>Math Practice</h2>
        <div className="ap-human-card factoring-home-card">
          <div className="ap-human-card-main">
            <span className="card-icon">✏️</span>
            <div className="ap-human-card-content">
              <span className="card-title">Factoring Practice</span>
            </div>
          </div>
          <div className="mode-buttons">
            <button
              type="button"
              className="btn-primary btn-sm"
              onClick={() => onStartFactoring('easy')}
            >
              Easy Mode
            </button>
            <button
              type="button"
              className="btn-secondary btn-sm"
              onClick={() => onStartFactoring('hard')}
            >
              Hard Mode
            </button>
            <button
              type="button"
              className="btn-secondary btn-sm"
              onClick={onStartFactoringQuiz}
            >
              Quiz Mode
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
