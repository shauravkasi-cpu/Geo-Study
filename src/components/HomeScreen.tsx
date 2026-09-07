import { ApHumanNotesHub } from './ApHumanPractice'
import { AP_HUMAN_QUIZ_1_NAME, AP_HUMAN_QUIZ_1_STATS } from '../lib/apHumanQuiz1'
import { getVocabCount } from '../lib/apHumanVocabBank'
import type { ApHumanStudyTopic } from '../lib/apHumanStudy'
import { AppToggles } from '../lib/soundToggle'
import { GeoMathHubCard } from './GeoMathPractice'
import type { GeoMathTopic } from '../lib/geoMathQuiz'
import type { FactoringDifficulty, QuizFormat, SubjectId } from '../types'

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
  onStartStudy: (topic: ApHumanStudyTopic) => void
  onOpenVocab: () => void
}

interface MathHubProps {
  onBack: () => void
  onStartFactoring: (difficulty: FactoringDifficulty) => void
  onStartFactoringQuiz: () => void
  onStartGeoMath: (topic: GeoMathTopic) => void
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

export function HomeScreen({ onOpenSubject }: HomeScreenProps) {
  return (
    <div className="home-screen">
      <header className="home-header">
        <div className="home-header-top">
          <div>
            <p className="home-kicker">Study that feels like the exam</p>
            <h1>Geo Study</h1>
            <p className="home-tagline">
              AP Human scenarios, map drills, and practice quizzes built to make you want to keep going.
            </p>
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
          <span className="card-desc">Scenario vocab, notes quiz, and map drills</span>
        </button>

        <button
          type="button"
          className="subject-card subject-card-math"
          onClick={() => onOpenSubject('math')}
        >
          <span className="card-icon">✏️</span>
          <span className="card-title">Math</span>
          <span className="card-desc">Factoring plus Geometry Unit 1 practice</span>
        </button>

        <button
          type="button"
          className="subject-card subject-card-biology"
          onClick={() => onOpenSubject('biology')}
        >
          <span className="card-icon">🧬</span>
          <span className="card-title">Biology</span>
          <span className="card-desc">Honors Bio Unit 1 and Unit 2 tests and practice</span>
        </button>
      </div>
    </div>
  )
}

export function ApHumanHub({
  onBack,
  onStartQuiz,
  onViewStudyMap,
  onStartStudy,
  onOpenVocab,
}: ApHumanHubProps) {
  return (
    <div className="home-screen">
      <HubHeader
        title="AP Human Geography"
        description="Scenario vocab, notes quiz, and map drills — built like AP items, not flashcards."
        onBack={onBack}
      />

      <section className="home-section">
        <h2>Vocab Quiz</h2>
        <div className="bio-topic-grid">
          <button type="button" className="unit-card vocab-feature-card" onClick={onOpenVocab}>
            <span className="unit-card-kicker vocab-unit-kicker">
              {getVocabCount('all')} scenarios · Units 7.5, 7.2, 7.3, 1.1–1.7
            </span>
            <span className="card-title">Vocab Quiz 1</span>
            <span className="card-desc">
              Read a map, city, or data table — then name the concept. Typing or multiple choice.
            </span>
          </button>
        </div>
      </section>

      <ApHumanNotesHub onStart={onStartStudy} />

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
    </div>
  )
}

export function MathHub({ onBack, onStartFactoring, onStartFactoringQuiz, onStartGeoMath }: MathHubProps) {
  return (
    <div className="home-screen">
      <HubHeader
        title="Math"
        description="Factoring practice and Geometry Unit 1 quizzes with diagrams and equations."
        onBack={onBack}
      />

      <GeoMathHubCard onStart={onStartGeoMath} />

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
    </div>
  )
}
