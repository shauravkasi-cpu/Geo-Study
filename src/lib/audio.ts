import hoverBundled from '../assets/sounds/tf2-button-click-hover.mp3'
import correctBundled from '../assets/sounds/duolingo-correct.mp3'
import wrongBundled from '../assets/sounds/duolingo-wrong.mp3'

type SfxName = 'hover' | 'correct' | 'wrong'

const SFX_SRC: Record<SfxName, string> =
  import.meta.env.VITE_BUNDLE_SFX === 'true'
    ? {
        hover: hoverBundled,
        correct: correctBundled,
        wrong: wrongBundled,
      }
    : {
        hover: '/sounds/tf2-button-click-hover.mp3',
        correct: '/sounds/duolingo-correct.mp3',
        wrong: '/sounds/duolingo-wrong.mp3',
      }

const SFX_ENABLED_KEY = 'geo-study-sfx-enabled'
const SFX_VOLUME = 0.55
const HOVER_VOLUME = 0.08

let ctx: AudioContext | null = null
let masterGain: GainNode | null = null
let unlocked = false
let ready: Promise<void> | null = null
let sfxEnabled = readSfxEnabled()

const buffers = new Map<SfxName, AudioBuffer>()
const listeners = new Set<(enabled: boolean) => void>()

function readSfxEnabled(): boolean {
  try {
    const stored = localStorage.getItem(SFX_ENABLED_KEY)
    if (stored === 'false') return false
    if (stored === 'true') return true
  } catch {
    // ignore
  }
  return true
}

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

async function unlockAudio() {
  if (unlocked) return
  unlocked = true
  await ensureReady()
  const audioCtx = getContext()
  if (audioCtx.state === 'suspended') await audioCtx.resume()
}

export function isSfxEnabled() {
  return sfxEnabled
}

export function setSfxEnabled(enabled: boolean) {
  sfxEnabled = enabled
  try {
    localStorage.setItem(SFX_ENABLED_KEY, enabled ? 'true' : 'false')
  } catch {
    // ignore
  }
  for (const listener of listeners) listener(enabled)
}

export function subscribeSfxEnabled(listener: (enabled: boolean) => void) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

export function playSfx(name: SfxName) {
  if (!sfxEnabled) return

  const buffer = buffers.get(name)
  if (!buffer) {
    void ensureReady().then(() => {
      if (!sfxEnabled) return
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
