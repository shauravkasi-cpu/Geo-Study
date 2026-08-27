import { useCallback, useState } from 'react'
import { SiteShell } from './components/SiteShell'
import { ApHumanReferenceMap } from './components/ApHumanReferenceMap'
import { ApHumanHub, HomeScreen, MathHub } from './components/HomeScreen'
import { FactoringPractice } from './components/FactoringPractice'
import { FactoringQuiz } from './components/FactoringQuiz'
import { BioPractice, BiologyTest1Hub } from './components/BioPractice'
import { QuizPanel } from './components/QuizPanel'
import { ResultsScreen } from './components/ResultsScreen'
import { WorldMap } from './components/WorldMap'
import { playAnswerSound } from './lib/answerSounds'
import { isCountryDataReady, loadCountryData } from './lib/countries'
import { getHintView } from './lib/hints'
import { getItemFocusView } from './lib/mapFocus'
import {
  createQuizSession,
  createRetrySession,
  getClickMarkerCoords,
  getCurrentItemId,
  getCurrentItemName,
  getCurrentItemType,
  getHighlightCountryCode,
  getHighlightFeatureCoords,
  getMcFeatureMarker,
  getMcHighlightCode,
  getWrongClickCountryCode,
  skipQuestion,
  submitAnswer,
  submitMcAnswer,
  submitTypedAnswer,
} from './lib/quizEngine'
import { saveQuizScore } from './lib/storage'
import { AppToggles } from './lib/soundToggle'
import type {
  AppScreen,
  FactoringDifficulty,
  HintView,
  MapClickResult,
  QuizAnswer,
  QuizFormat,
  QuizSession,
  SubjectId,
} from './types'
import type { BioPracticeTopic } from './lib/bioQuiz'
import './App.css'

function App() {
  const [screen, setScreen] = useState<AppScreen>({ view: 'home' })
  const [mapLoading, setMapLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [session, setSession] = useState<QuizSession | null>(null)
  const [lastAnswer, setLastAnswer] = useState<QuizAnswer | null>(null)
  const [awaitingNext, setAwaitingNext] = useState(false)
  const [hintView, setHintView] = useState<HintView | null>(null)
  const [hintUsed, setHintUsed] = useState(false)

  const resetQuestionState = () => {
    setLastAnswer(null)
    setAwaitingNext(false)
    setHintView(null)
    setHintUsed(false)
  }

  const ensureMapData = useCallback(async () => {
    if (isCountryDataReady()) return true

    setMapLoading(true)
    setError(null)
    try {
      await loadCountryData()
      setMapLoading(false)
      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load map data')
      setMapLoading(false)
      return false
    }
  }, [])

  const startApHumanQuiz = useCallback(
    async (format: QuizFormat = 'locate') => {
      const ready = await ensureMapData()
      if (!ready) return

      const newSession = createQuizSession({ type: 'preset', preset: 'ap-human-1', format })
      setSession(newSession)
      resetQuestionState()
      setScreen({ view: 'quiz', session: newSession })
    },
    [ensureMapData],
  )

  const openStudyMap = useCallback(async () => {
    const ready = await ensureMapData()
    if (!ready) return
    setScreen({ view: 'ap-human-reference' })
  }, [ensureMapData])

  const goHome = useCallback(() => {
    setSession(null)
    resetQuestionState()
    setError(null)
    setScreen({ view: 'home' })
  }, [])

  const goToSubject = useCallback((subject: SubjectId) => {
    setSession(null)
    resetQuestionState()
    setError(null)
    setScreen({ view: 'subject', subject })
  }, [])

  const goApHuman = useCallback(() => goToSubject('ap-human'), [goToSubject])
  const goMath = useCallback(() => goToSubject('math'), [goToSubject])
  const goBiology = useCallback(() => goToSubject('biology'), [goToSubject])

  const startBioPractice = useCallback((topic: BioPracticeTopic) => {
    setScreen({ view: 'biology-practice', topic })
  }, [])

  const startFactoring = useCallback((difficulty: FactoringDifficulty) => {
    setScreen({ view: 'factoring', difficulty })
  }, [])

  const handleMapClick = useCallback(
    (result: MapClickResult) => {
      if (!session || awaitingNext || session.status === 'complete') return
      if (session.format === 'multiple-choice' || session.format === 'name-it') return

      const updated = submitAnswer(session, result)
      if (!updated) return

      const answer = updated.answers[updated.answers.length - 1]
      playAnswerSound(answer.correct)
      setSession(updated)
      setLastAnswer(answer)
      setAwaitingNext(true)
      setHintView(null)
    },
    [session, awaitingNext],
  )

  const handleMcSelect = useCallback(
    (code: string) => {
      if (!session || awaitingNext || session.status === 'complete') return

      const updated = submitMcAnswer(session, code)
      const answer = updated.answers[updated.answers.length - 1]
      playAnswerSound(answer.correct)
      setSession(updated)
      setLastAnswer(answer)
      setAwaitingNext(true)
    },
    [session, awaitingNext],
  )

  const handleTypedSubmit = useCallback(
    (value: string) => {
      if (!session || awaitingNext || session.status === 'complete') return

      const updated = submitTypedAnswer(session, value)
      if (!updated) return

      const answer = updated.answers[updated.answers.length - 1]
      playAnswerSound(answer.correct)
      setSession(updated)
      setLastAnswer(answer)
      setAwaitingNext(true)
      setHintView(null)
    },
    [session, awaitingNext],
  )

  const handleHint = useCallback(() => {
    if (!session || hintUsed) return
    const itemId = getCurrentItemId(session)
    if (!itemId) return
    const hint = getHintView(itemId)
    if (hint) {
      setHintView(hint)
      setHintUsed(true)
    }
  }, [session, hintUsed])

  const handleNext = useCallback(() => {
    if (!session) return

    if (session.status === 'complete') {
      if (session.mode.type === 'custom' && session.mode.quizId) {
        saveQuizScore(session.mode.quizId, session.score, session.queue.length)
      }
      setScreen({ view: 'results', session })
      return
    }

    setAwaitingNext(false)
    setLastAnswer(null)
    setHintView(null)
    setHintUsed(false)
  }, [session])

  const handleSkip = useCallback(() => {
    if (!session || awaitingNext) return

    const updated = skipQuestion(session)
    const answer = updated.answers[updated.answers.length - 1]
    playAnswerSound(answer.correct)
    setSession(updated)
    setLastAnswer(answer)
    setAwaitingNext(true)
    setHintView(null)
  }, [session, awaitingNext])

  const handleRetryMissed = useCallback(() => {
    if (!session) return
    const retrySession = createRetrySession(session)
    setSession(retrySession)
    resetQuestionState()
    setScreen({ view: 'quiz', session: retrySession })
  }, [session])

  if (mapLoading) {
    return (
      <SiteShell>
        <div className="loading-screen">
          <div className="loading-spinner" />
          <p>Loading map...</p>
        </div>
      </SiteShell>
    )
  }

  if (error) {
    return (
      <SiteShell>
        <div className="loading-screen">
          <p className="error-text">{error}</p>
          <button type="button" className="btn-secondary" onClick={goHome}>
            Back to Home
          </button>
        </div>
      </SiteShell>
    )
  }

  if (screen.view === 'home') {
    return (
      <SiteShell>
        <HomeScreen onOpenSubject={goToSubject} />
      </SiteShell>
    )
  }

  if (screen.view === 'subject' && screen.subject === 'ap-human') {
    return (
      <SiteShell>
        <ApHumanHub
          onBack={goHome}
          onStartQuiz={startApHumanQuiz}
          onViewStudyMap={openStudyMap}
        />
      </SiteShell>
    )
  }

  if (screen.view === 'subject' && screen.subject === 'math') {
    return (
      <SiteShell>
        <MathHub
          onBack={goHome}
          onStartFactoring={startFactoring}
          onStartFactoringQuiz={() => setScreen({ view: 'factoring-quiz' })}
        />
      </SiteShell>
    )
  }

  if (screen.view === 'subject' && screen.subject === 'biology') {
    return (
      <SiteShell>
        <BiologyTest1Hub onBack={goHome} onStart={startBioPractice} />
      </SiteShell>
    )
  }

  if (screen.view === 'biology-practice') {
    return (
      <SiteShell>
        <BioPractice topic={screen.topic} onBack={goBiology} />
      </SiteShell>
    )
  }

  if (screen.view === 'factoring') {
    return (
      <SiteShell>
        <div className="page-with-theme">
          <div className="page-theme-bar">
            <AppToggles />
          </div>
          <FactoringPractice difficulty={screen.difficulty} onBack={goMath} />
        </div>
      </SiteShell>
    )
  }

  if (screen.view === 'factoring-quiz') {
    return (
      <SiteShell>
        <div className="page-with-theme">
          <div className="page-theme-bar">
            <AppToggles />
          </div>
          <FactoringQuiz onBack={goMath} />
        </div>
      </SiteShell>
    )
  }

  if (screen.view === 'ap-human-reference') {
    return (
      <SiteShell>
        <div className="page-with-theme">
          <div className="page-theme-bar">
            <AppToggles />
          </div>
          <ApHumanReferenceMap onBack={goApHuman} />
        </div>
      </SiteShell>
    )
  }

  if (screen.view === 'results' && session) {
    return (
      <SiteShell>
        <div className="page-with-theme">
          <div className="page-theme-bar">
            <AppToggles />
          </div>
          <ResultsScreen
            session={session}
            onRetryMissed={handleRetryMissed}
            onHome={goApHuman}
            homeLabel="Back to AP Human"
          />
        </div>
      </SiteShell>
    )
  }

  if (screen.view === 'quiz' && session) {
    const highlightCode = getHighlightCountryCode(lastAnswer)
    const wrongHighlightCode = getWrongClickCountryCode(lastAnswer)
    const revealHighlightCode = !awaitingNext ? getMcHighlightCode(session) : null
    const revealFeaturePoint = !awaitingNext ? getMcFeatureMarker(session) : null
    const highlightPoint = getHighlightFeatureCoords(lastAnswer)
    const clickPoint = getClickMarkerCoords(lastAnswer)
    const clickMode = getCurrentItemType(session) ?? 'country'
    const focusItemId = awaitingNext
      ? (lastAnswer?.targetId ?? null)
      : getCurrentItemId(session)
    const focusView =
      session.format === 'name-it' ? getItemFocusView(focusItemId) : null

    return (
      <SiteShell>
        <div className="quiz-layout">
          <div className="quiz-map">
            <div className="quiz-map-toolbar">
              <AppToggles />
            </div>
            <WorldMap
              onMapClick={handleMapClick}
              highlightCode={awaitingNext ? highlightCode : null}
              wrongHighlightCode={awaitingNext ? wrongHighlightCode : null}
              mcHighlightCode={revealHighlightCode}
              mcFeaturePoint={revealFeaturePoint}
              highlightPoint={awaitingNext ? highlightPoint : null}
              clickPoint={awaitingNext ? clickPoint : null}
              hintView={hintView}
              focusView={focusView}
              focusKey={focusItemId}
              clickMode={clickMode}
              disabled={awaitingNext || session.format === 'name-it'}
            />
          </div>
          <QuizPanel
            session={session}
            currentItemName={getCurrentItemName(session)}
            lastAnswer={lastAnswer}
            awaitingNext={awaitingNext}
            hintActive={hintUsed}
            onHint={handleHint}
            onSkip={handleSkip}
            onNext={handleNext}
            onQuit={goApHuman}
            onMcSelect={handleMcSelect}
            onTypedSubmit={handleTypedSubmit}
          />
        </div>
      </SiteShell>
    )
  }

  return null
}

export default App
