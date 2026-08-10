import { playSfx } from './audio'

const HOVER_SELECTOR = [
  'button',
  'a[href]',
  'input[type="button"]',
  'input[type="submit"]',
  'input[type="reset"]',
  'summary',
  '[role="button"]',
  '.quiz-card',
  '.ap-human-card',
  '.saved-quiz-item',
  '.mode-buttons button',
].join(', ')

let lastTarget: EventTarget | null = null
let lastPlayedAt = 0

function playHoverSound() {
  const now = performance.now()
  if (now - lastPlayedAt < 40) return
  lastPlayedAt = now
  playSfx('hover')
}

function isHoverable(target: EventTarget | null): target is Element {
  return target instanceof Element && Boolean(target.closest(HOVER_SELECTOR))
}

export function initHoverSounds() {
  if (typeof window === 'undefined') return
  if ((window as Window & { __geoHoverSounds?: boolean }).__geoHoverSounds) return
  ;(window as Window & { __geoHoverSounds?: boolean }).__geoHoverSounds = true

  document.addEventListener(
    'pointerover',
    (event) => {
      if (event.pointerType === 'touch') return
      if (!isHoverable(event.target)) {
        lastTarget = null
        return
      }

      const hoverRoot = (event.target as Element).closest(HOVER_SELECTOR)
      if (!hoverRoot || hoverRoot === lastTarget) return
      lastTarget = hoverRoot
      playHoverSound()
    },
    true,
  )

  document.addEventListener(
    'pointerout',
    (event) => {
      const related = event.relatedTarget
      if (related instanceof Node && lastTarget instanceof Node && lastTarget.contains(related)) {
        return
      }
      if (!isHoverable(related)) {
        lastTarget = null
      }
    },
    true,
  )
}
