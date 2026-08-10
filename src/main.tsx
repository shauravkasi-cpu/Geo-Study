import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Analytics } from '@vercel/analytics/react'
import App from './App'
import { initAppAudio } from './lib/audio'
import { initHoverSounds } from './lib/hoverSound'
import { ThemeProvider } from './lib/theme'
import './index.css'

initAppAudio()
initHoverSounds()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <App />
      <Analytics />
    </ThemeProvider>
  </StrictMode>,
)
