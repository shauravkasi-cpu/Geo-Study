const CORRECT_SOUND_SRC = '/sounds/duolingo-correct.mp3'
const WRONG_SOUND_SRC = '/sounds/duolingo-wrong.mp3'

const cache = new Map<string, HTMLAudioElement>()

function getAudio(src: string) {
  let audio = cache.get(src)
  if (!audio) {
    audio = new Audio(src)
    audio.preload = 'auto'
    audio.volume = 0.55
    cache.set(src, audio)
  }
  return audio
}

function playSound(src: string) {
  const audio = getAudio(src)
  audio.currentTime = 0
  void audio.play().catch(() => {
    // Browsers may block until a user gesture unlocks audio.
  })
}

export function playAnswerSound(correct: boolean) {
  playSound(correct ? CORRECT_SOUND_SRC : WRONG_SOUND_SRC)
}
