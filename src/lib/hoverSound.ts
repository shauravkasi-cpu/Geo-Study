const HOVER_SOUND_SRC = '/sounds/tf2-button-click-hover.mp3'
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

let audio: HTMLAudioElement | null = null
let unlocked = false
let lastTarget: EventTarget | null = null
let lastPlayedAt = 0

function getAudio() {
  if (!audio) {
    audio = new Audio(HOVER_SOUND_SRC)
    audio.preload = 'auto'
    audio.volume = 0.45
  }
  return audio
}

function unlockAudio() {
  if (unlocked) return
  const el = getAudio()
  const prev = el.volume
  el.volume = 0
  el
    .play()
    .then(() => {
      el.pause()
      el.currentTime = 0
      el.volume = prev
      unlocked = true
    })
    .catch(() => {
      el.volume = prev
    })
}

function playHoverSound() {
  const now = performance.now()
  if (now - lastPlayedAt < 40) return
  lastPlayedAt = now

  const el = getAudio()
  el.currentTime = 0
  void el.play().catch(() => {
    // Browsers may block until a user gesture unlocks audio.
  })
}

function isHoverable(target: EventTarget | null): target is Element {
  return target instanceof Element && Boolean(target.closest(HOVER_SELECTOR))
}

export function initHoverSounds() {
  if (typeof window === 'undefined') return
  if ((window as Window & { __geoHoverSounds?: boolean }).__geoHoverSounds) return
  ;(window as Window & { __geoHoverSounds?: boolean }).__geoHoverSounds = true

  window.addEventListener('pointerdown', unlockAudio, { once: true, capture: true })
  window.addEventListener('keydown', unlockAudio, { once: true, capture: true })

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
