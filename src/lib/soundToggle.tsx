import { useEffect, useState } from 'react'
import { isSfxEnabled, setSfxEnabled, subscribeSfxEnabled } from './audio'
import { ThemeToggle } from './theme'

export function SoundToggle() {
  const [enabled, setEnabled] = useState(isSfxEnabled)

  useEffect(() => subscribeSfxEnabled(setEnabled), [])

  const toggle = () => {
    setSfxEnabled(!enabled)
  }

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggle}
      aria-label={enabled ? 'Disable sound effects' : 'Enable sound effects'}
      title={enabled ? 'Sound effects on' : 'Sound effects off'}
    >
      {enabled ? '🔊' : '🔇'}
    </button>
  )
}

export function AppToggles() {
  return (
    <div className="app-toggles">
      <SoundToggle />
      <ThemeToggle />
    </div>
  )
}
