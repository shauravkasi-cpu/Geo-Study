import { useCallback, useEffect, useState } from 'react'
import { ApHumanReferenceMap } from './components/ApHumanReferenceMap'
import { CustomQuizBuilder } from './components/CustomQuizBuilder'
import { HomeScreen } from './components/HomeScreen'
import { QuizPanel } from './components/QuizPanel'
import { ResultsScreen } from './components/ResultsScreen'
import { WorldMap } from './components/WorldMap'
import { loadCountryData } from './lib/countries'
import { getHintView } from './lib/hints'
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
} from './lib/quizEngine'
import { saveQuizScore } from './lib/storage'
import { ThemeToggle } from './lib/theme'
import type {
  AppScreen,
  HintView,
  MapClickResult,
  PresetType,
  QuizAnswer,
  QuizFormat,
  QuizSession,
} from './types'
import './App.css'

function App() {
  const [screen, setScreen] = useState<AppScreen>({ view: 'home' })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [session, setSession] = useState<QuizSession | null>(null)
  const [lastAnswer, setLastAnswer] = useState<QuizAnswer | null>(null)
  const [awaitingNext, setAwaitingNext] = useState(false)
  const [hintView, setHintView] = useState<HintView | null>(null)
  const [hintUsed, setHintUsed] = useState(false)

  useEffect(() => {
    loadCountryData()
      .then(() => setLoading(false))
      .catch((err) => {
        setError(err instanceof Error ? err.message : 'Failed to load map data')
        setLoading(false)
      })
  }, [])

  const resetQuestionState = () => {
    setLastAnswer(null)
    setAwaitingNext(false)
    setHintView(null)
    setHintUsed(false)
  }

  const startPreset = useCallback((preset: PresetType, format: QuizFormat = 'locate') => {
    const newSession = createQuizSession({ type: 'preset', preset, format })
    setSession(newSession)
    resetQuestionState()
    setScreen({ view: 'quiz', session: newSession })
  }, [])

  const startCustom = useCallback(
    (countryCodes: string[], name: string, quizId?: string, format: QuizFormat = 'locate') => {
      const newSession = createQuizSession({
        type: 'custom',
        countryCodes,
        name,
        quizId,
        format,
      })
      setSession(newSession)
      resetQuestionState()
      setScreen({ view: 'quiz', session: newSession })
    },
    [],
  )

  const goHome = useCallback(() => {
    setSession(null)
    resetQuestionState()
    setScreen({ view: 'home' })
  }, [])

  const handleMapClick = useCallback(
    (result: MapClickResult) => {
      if (!session || awaitingNext || session.status === 'complete') return
      if (session.format === 'multiple-choice') return

      const updated = submitAnswer(session, result)
      if (!updated) return

      const answer = updated.answers[updated.answers.length - 1]
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
      setSession(updated)
      setLastAnswer(answer)
      setAwaitingNext(true)
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

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner" />
        <p>Loading world map...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="loading-screen">
        <p className="error-text">{error}</p>
      </div>
    )
  }

  if (screen.view === 'home') {
    return (
      <HomeScreen
        onStartPreset={startPreset}
        onStartCustom={startCustom}
        onCreateCustom={() => setScreen({ view: 'custom-builder' })}
        onEditCustom={(id) => setScreen({ view: 'custom-builder', editId: id })}
        onViewApHumanReference={() => setScreen({ view: 'ap-human-reference' })}
      />
    )
  }

  if (screen.view === 'ap-human-reference') {
    return (
      <div className="page-with-theme">
        <div className="page-theme-bar">
          <ThemeToggle />
        </div>
        <ApHumanReferenceMap onBack={goHome} />
      </div>
    )
  }

  if (screen.view === 'custom-builder') {
    return (
      <CustomQuizBuilder
        editId={screen.editId}
        onStart={(codes, name) => startCustom(codes, name)}
        onCancel={goHome}
      />
    )
  }

  if (screen.view === 'results' && session) {
    return (
      <div className="page-with-theme">
        <div className="page-theme-bar">
          <ThemeToggle />
        </div>
        <ResultsScreen
          session={session}
          onRetryMissed={handleRetryMissed}
          onHome={goHome}
        />
      </div>
    )
  }

  if (screen.view === 'quiz' && session) {
    const highlightCode = getHighlightCountryCode(lastAnswer)
    const wrongHighlightCode = getWrongClickCountryCode(lastAnswer)
    const mcHighlightCode = !awaitingNext ? getMcHighlightCode(session) : null
    const mcFeaturePoint = !awaitingNext ? getMcFeatureMarker(session) : null
    const highlightPoint = getHighlightFeatureCoords(lastAnswer)
    const clickPoint = getClickMarkerCoords(lastAnswer)
    const clickMode = getCurrentItemType(session) ?? 'country'

    return (
      <div className="quiz-layout">
        <div className="quiz-map">
          <div className="quiz-map-toolbar">
            <ThemeToggle />
          </div>
          <WorldMap
            onMapClick={handleMapClick}
            highlightCode={awaitingNext ? highlightCode : null}
            wrongHighlightCode={awaitingNext ? wrongHighlightCode : null}
            mcHighlightCode={mcHighlightCode}
            mcFeaturePoint={mcFeaturePoint}
            highlightPoint={awaitingNext ? highlightPoint : null}
            clickPoint={awaitingNext ? clickPoint : null}
            hintView={hintView}
            clickMode={clickMode}
            disabled={awaitingNext}
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
          onQuit={goHome}
          onMcSelect={handleMcSelect}
        />
      </div>
    )
  }

  return null
}

export default App
