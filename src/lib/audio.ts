type SfxName = 'hover' | 'correct' | 'wrong'

const SFX_SRC: Record<SfxName, string> = {
  hover: '/sounds/tf2-button-click-hover.mp3',
  correct: '/sounds/duolingo-correct.mp3',
  wrong: '/sounds/duolingo-wrong.mp3',
}

const BACKGROUND_SRC = '/sounds/background-ambient.wav'
const SFX_VOLUME = 0.55
const HOVER_VOLUME = 0.08
const MUSIC_VOLUME = 0.24

let ctx: AudioContext | null = null
let masterGain: GainNode | null = null
let musicGain: GainNode | null = null
let musicSource: AudioBufferSourceNode | null = null
let musicBuffer: AudioBuffer | null = null
let unlocked = false
let musicStarted = false
let ready: Promise<void> | null = null

const buffers = new Map<SfxName, AudioBuffer>()

function getContext() {
  if (!ctx) {
    const AudioCtx = window.AudioContext || (window as typeof window & {
      webkitAudioContext?: typeof AudioContext
    }).webkitAudioContext
    if (!AudioCtx) throw new Error('Web Audio API unavailable')
    ctx = new AudioCtx()
    masterGain = ctx.createGain()
    masterGain.gain.value = 1
    masterGain.connect(ctx.destination)

    musicGain = ctx.createGain()
    musicGain.gain.value = MUSIC_VOLUME
    musicGain.connect(masterGain)
  }
  return ctx
}

async function decodeSrc(src: string) {
  const response = await fetch(src)
  const data = await response.arrayBuffer()
  return getContext().decodeAudioData(data.slice(0))
}

/** Trim near-silent leading samples so SFX feel immediate. */
function trimLeadingSilence(buffer: AudioBuffer, threshold = 0.015): AudioBuffer {
  const channels = buffer.numberOfChannels
  const length = buffer.length
  let start = 0

  outer: for (; start < length; start++) {
    for (let ch = 0; ch < channels; ch++) {
      if (Math.abs(buffer.getChannelData(ch)[start]) > threshold) break outer
    }
  }

  // Keep a tiny lead-in so attacks aren't clipped harshly.
  start = Math.max(0, start - Math.floor(buffer.sampleRate * 0.004))
  if (start < 64) return buffer

  const trimmedLength = Math.max(1, length - start)
  const trimmed = getContext().createBuffer(channels, trimmedLength, buffer.sampleRate)
  for (let ch = 0; ch < channels; ch++) {
    trimmed.copyToChannel(buffer.getChannelData(ch).subarray(start), ch)
  }
  return trimmed
}

async function ensureReady() {
  if (!ready) {
    ready = (async () => {
      getContext()
      const entries = await Promise.all(
        (Object.keys(SFX_SRC) as SfxName[]).map(async (name) => {
          const decoded = await decodeSrc(SFX_SRC[name])
          return [name, trimLeadingSilence(decoded)] as const
        }),
      )
      for (const [name, buffer] of entries) buffers.set(name, buffer)

      try {
        musicBuffer = await decodeSrc(BACKGROUND_SRC)
      } catch {
        musicBuffer = null
      }
    })().catch(() => {
      // Keep app usable if audio assets fail to load.
    })
  }
  return ready
}

function playBuffer(buffer: AudioBuffer, volume: number) {
  const audioCtx = getContext()
  if (audioCtx.state === 'suspended') void audioCtx.resume()

  const source = audioCtx.createBufferSource()
  source.buffer = buffer

  const gain = audioCtx.createGain()
  gain.gain.value = volume
  source.connect(gain)
  gain.connect(masterGain!)
  source.start(0)
}

function startMusic() {
  if (musicStarted || !musicBuffer || !musicGain) return
  const audioCtx = getContext()
  if (audioCtx.state === 'suspended') void audioCtx.resume()

  musicSource = audioCtx.createBufferSource()
  musicSource.buffer = musicBuffer
  musicSource.loop = true
  musicSource.connect(musicGain)
  musicSource.start(0)
  musicStarted = true
}

async function unlockAudio() {
  if (unlocked) return
  unlocked = true
  await ensureReady()
  const audioCtx = getContext()
  if (audioCtx.state === 'suspended') await audioCtx.resume()
  startMusic()
}

export function playSfx(name: SfxName) {
  const buffer = buffers.get(name)
  if (!buffer) {
    void ensureReady().then(() => {
      const readyBuffer = buffers.get(name)
      if (readyBuffer) playBuffer(readyBuffer, name === 'hover' ? HOVER_VOLUME : SFX_VOLUME)
    })
    return
  }
  playBuffer(buffer, name === 'hover' ? HOVER_VOLUME : SFX_VOLUME)
}

export function playAnswerSound(correct: boolean) {
  playSfx(correct ? 'correct' : 'wrong')
}

export function playHoverSfx() {
  playSfx('hover')
}

export function initAppAudio() {
  if (typeof window === 'undefined') return
  if ((window as Window & { __geoAppAudio?: boolean }).__geoAppAudio) return
  ;(window as Window & { __geoAppAudio?: boolean }).__geoAppAudio = true

  void ensureReady()

  const unlock = () => {
    void unlockAudio()
  }

  window.addEventListener('pointerdown', unlock, { once: true, capture: true })
  window.addEventListener('keydown', unlock, { once: true, capture: true })
}
