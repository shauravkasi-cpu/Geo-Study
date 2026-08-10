import { useEffect, useState } from 'react'
import { getCountryByCode, getCountryDisplayName, parseCountryList } from '../lib/countries'
import {
  addCustomQuiz,
  loadCustomQuizzes,
  updateCustomQuiz,
} from '../lib/storage'
import { AppToggles } from '../lib/soundToggle'

interface CustomQuizBuilderProps {
  editId?: string
  onStart: (countryCodes: string[], name: string) => void
  onCancel: () => void
}

export function CustomQuizBuilder({ editId, onStart, onCancel }: CustomQuizBuilderProps) {
  const [name, setName] = useState('')
  const [text, setText] = useState('')

  useEffect(() => {
    const quizzes = loadCustomQuizzes()

    if (editId) {
      const quiz = quizzes.find((q) => q.id === editId)
      if (quiz) {
        setName(quiz.name)
        setText(
          quiz.countryCodes
            .map((code) => getCountryDisplayName(code))
            .join('\n'),
        )
      }
    }
  }, [editId])

  const validation = parseCountryList(text)

  const handleSave = () => {
    if (!name.trim() || validation.matched.length === 0) return

    const codes = validation.matched.map((c) => c.isoCode)

    if (editId) {
      updateCustomQuiz(editId, { name: name.trim(), countryCodes: codes })
    } else {
      addCustomQuiz({ name: name.trim(), countryCodes: codes })
    }
  }

  const handleStart = () => {
    if (validation.matched.length === 0) return
    const codes = validation.matched.map((c) => c.isoCode)
    onStart(codes, name.trim() || 'Custom Quiz')
  }

  return (
    <div className="custom-builder">
      <div className="custom-builder-card">
        <div className="builder-header">
          <h1>{editId ? 'Edit Custom Quiz' : 'Create Custom Quiz'}</h1>
          <div className="builder-header-actions">
            <AppToggles />
            <button type="button" className="btn-text" onClick={onCancel}>
              ← Back
            </button>
          </div>
        </div>

        <label className="field-label" htmlFor="quiz-name">
          Quiz Name
        </label>
        <input
          id="quiz-name"
          className="text-input"
          type="text"
          placeholder="e.g. Countries I need to study"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label className="field-label" htmlFor="country-list">
          Countries (one per line or comma-separated)
        </label>
        <textarea
          id="country-list"
          className="text-area"
          rows={10}
          placeholder={'France\nGermany\nJapan\nBrazil\n...'}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        {validation.matched.length > 0 && (
          <p className="validation-ok">
            ✓ {validation.matched.length} countries recognized
          </p>
        )}

        {validation.unmatched.length > 0 && (
          <div className="validation-errors">
            <p>Could not match:</p>
            <ul>
              {validation.unmatched.map((entry) => (
                <li key={entry}>
                  <strong>{entry}</strong>
                  {validation.suggestions[entry]?.length > 0 && (
                    <span>
                      {' '}
                      — did you mean: {validation.suggestions[entry].join(', ')}?
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="builder-actions">
          <button
            type="button"
            className="btn-primary"
            disabled={validation.matched.length === 0}
            onClick={handleStart}
          >
            Start Quiz ({validation.matched.length})
          </button>
          <button
            type="button"
            className="btn-secondary"
            disabled={!name.trim() || validation.matched.length === 0}
            onClick={handleSave}
          >
            Save Quiz
          </button>
        </div>
      </div>
    </div>
  )
}
