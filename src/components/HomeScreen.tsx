import { AP_HUMAN_QUIZ_1_NAME, AP_HUMAN_QUIZ_1_STATS } from '../lib/apHumanQuiz1'
import { BIOLOGY_UNITS, getBiologyUnit } from '../lib/biologyUnits'
import { BIO_UNIT_1_PROGRESS_KEY } from '../lib/bioUnit1Lesson'
import { AppToggles } from '../lib/soundToggle'
import type { BiologyUnitId, FactoringDifficulty, QuizFormat, SubjectId } from '../types'

interface HomeScreenProps {
  onOpenSubject: (subject: SubjectId) => void
}

interface HubHeaderProps {
  title: string
  description: string
  onBack: () => void
  backLabel?: string
}

interface ApHumanHubProps {
  onBack: () => void
  onStartQuiz: (format: QuizFormat) => void
  onViewStudyMap: () => void
}

interface MathHubProps {
  onBack: () => void
  onStartFactoring: (difficulty: FactoringDifficulty) => void
  onStartFactoringQuiz: () => void
}

interface BiologyHubProps {
  onBack: () => void
  onOpenUnit: (unitId: BiologyUnitId) => void
}

interface BiologyUnitPageProps {
  unitId: BiologyUnitId
  onBack: () => void
  onStartStudy: () => void
}

function HubHeader({ title, description, onBack, backLabel = '← Subjects' }: HubHeaderProps) {
  return (
    <header className="subject-hub-header">
      <div className="subject-hub-header-main">
        <button type="button" className="btn-secondary btn-sm" onClick={onBack}>
          {backLabel}
        </button>
        <div className="subject-hub-header-text">
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
      </div>
      <AppToggles />
    </header>
  )
}

function ComingLaterNote() {
  return <p className="subject-later-note">More activities can be added to this section later.</p>
}

export function HomeScreen({ onOpenSubject }: HomeScreenProps) {
  return (
    <div className="home-screen">
      <header className="home-header">
        <div className="home-header-top">
          <div>
            <h1>Geo Study</h1>
            <p className="home-tagline">Choose a subject to practice.</p>
          </div>
          <AppToggles />
        </div>
      </header>

      <div className="subject-grid">
        <button
          type="button"
          className="subject-card subject-card-aphuman"
          onClick={() => onOpenSubject('ap-human')}
        >
          <span className="card-icon">🗺️</span>
          <span className="card-title">AP Human Geography</span>
          <span className="card-desc">Map quiz practice and more</span>
        </button>

        <button
          type="button"
          className="subject-card subject-card-math"
          onClick={() => onOpenSubject('math')}
        >
          <span className="card-icon">✏️</span>
          <span className="card-title">Math</span>
          <span className="card-desc">Factoring practice and more</span>
        </button>

        <button
          type="button"
          className="subject-card subject-card-biology"
          onClick={() => onOpenSubject('biology')}
        >
          <span className="card-icon">🧬</span>
          <span className="card-title">Biology</span>
          <span className="card-desc">Unit 1 biochemistry and more</span>
        </button>
      </div>
    </div>
  )
}

export function ApHumanHub({ onBack, onStartQuiz, onViewStudyMap }: ApHumanHubProps) {
  return (
    <div className="home-screen">
      <HubHeader
        title="AP Human Geography"
        description="Map quiz practice for class. More activities can be added later."
        onBack={onBack}
      />

      <section className="home-section">
        <h2>Map Quiz Practice</h2>
        <div className="ap-human-card">
          <div className="ap-human-card-main">
            <span className="card-icon">📚</span>
            <div className="ap-human-card-content">
              <span className="card-title">{AP_HUMAN_QUIZ_1_NAME}</span>
              <span className="card-desc">
                {AP_HUMAN_QUIZ_1_STATS.countries} countries · {AP_HUMAN_QUIZ_1_STATS.features}{' '}
                physical features
              </span>
            </div>
          </div>
          <div className="mode-buttons">
            <button type="button" className="btn-primary btn-sm" onClick={() => onStartQuiz('locate')}>
              Click to Locate
            </button>
            <button
              type="button"
              className="btn-secondary btn-sm"
              onClick={() => onStartQuiz('multiple-choice')}
            >
              Multiple Choice
            </button>
            <button type="button" className="btn-secondary btn-sm" onClick={() => onStartQuiz('name-it')}>
              Name It
            </button>
            <button type="button" className="btn-secondary btn-sm" onClick={onViewStudyMap}>
              View Study Map
            </button>
          </div>
        </div>
      </section>

      <ComingLaterNote />
    </div>
  )
}

export function MathHub({ onBack, onStartFactoring, onStartFactoringQuiz }: MathHubProps) {
  return (
    <div className="home-screen">
      <HubHeader
        title="Math"
        description="Factoring practice for now. More activities can be added later."
        onBack={onBack}
      />

      <section className="home-section">
        <h2>Algebra</h2>
        <div className="ap-human-card factoring-home-card">
          <div className="ap-human-card-main">
            <span className="card-icon">✏️</span>
            <div className="ap-human-card-content">
              <span className="card-title">Factoring Practice</span>
              <span className="card-desc">Easy, hard, and timed quiz modes</span>
            </div>
          </div>
          <div className="mode-buttons">
            <button type="button" className="btn-primary btn-sm" onClick={() => onStartFactoring('easy')}>
              Easy Mode
            </button>
            <button type="button" className="btn-secondary btn-sm" onClick={() => onStartFactoring('hard')}>
              Hard Mode
            </button>
            <button type="button" className="btn-secondary btn-sm" onClick={onStartFactoringQuiz}>
              Quiz Mode
            </button>
          </div>
        </div>
      </section>

      <ComingLaterNote />
    </div>
  )
}

export function BiologyHub({ onBack, onOpenUnit }: BiologyHubProps) {
  return (
    <div className="home-screen">
      <HubHeader
        title="Biology"
        description="Pick a unit. More units can be added later."
        onBack={onBack}
      />

      <section className="home-section">
        <h2>Units</h2>
        <div className="unit-card-list">
          {BIOLOGY_UNITS.map((unit) => (
            <button
              key={unit.id}
              type="button"
              className="unit-card"
              onClick={() => onOpenUnit(unit.id)}
            >
              <span className="unit-card-kicker">Unit {unit.number}</span>
              <span className="card-title">{unit.title}</span>
              <span className="card-desc">{unit.subtitle}</span>
            </button>
          ))}
        </div>
      </section>
    </div>
  )
}

export function BiologyUnitPage({ unitId, onBack, onStartStudy }: BiologyUnitPageProps) {
  const unit = getBiologyUnit(unitId)
  const hasSavedStudy = (() => {
    try {
      return Boolean(localStorage.getItem(BIO_UNIT_1_PROGRESS_KEY))
    } catch {
      return false
    }
  })()

  return (
    <div className="home-screen">
      <HubHeader
        title={`Unit ${unit.number}: ${unit.title}`}
        description={unit.subtitle}
        onBack={onBack}
        backLabel="← Biology"
      />

      <section className="home-section">
        <h2>What you will learn</h2>
        <ul className="bio-topic-list">
          {unit.topics.map((topic) => (
            <li key={topic}>{topic}</li>
          ))}
        </ul>
      </section>

      <section className="home-section">
        <h2>Learning guide</h2>
        <div className="ap-human-card biology-home-card">
          <div className="ap-human-card-main">
            <span className="card-icon">📖</span>
            <div className="ap-human-card-content">
              <span className="card-title">Study</span>
              <span className="card-desc">
                Plain-English teaching, short animations, and check questions after each idea.
              </span>
            </div>
          </div>
          <div className="mode-buttons">
            <button type="button" className="btn-primary btn-sm" onClick={onStartStudy}>
              {hasSavedStudy ? 'Continue study' : 'Start study'}
            </button>
          </div>
        </div>
      </section>

      <ComingLaterNote />
    </div>
  )
}
