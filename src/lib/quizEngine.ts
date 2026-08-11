import {
  AP_HUMAN_QUIZ_1_COUNTRY_CODES,
  AP_HUMAN_QUIZ_1_FEATURE_IDS,
  AP_HUMAN_QUIZ_1_NAME,
} from './apHumanQuiz1'
import {
  getAllQuizCountries,
  getCountriesByContinent,
  getCountryByCode,
  getCountryDisplayName,
} from './countries'
import { getCountryCentroid } from './hints'
import { getPhysicalFeature, haversineDistanceKm, isFeatureClickCorrect } from './physicalFeatures'
import {
  makeItemId,
  parseItemId,
  type MapClickResult,
  type PresetType,
  type QuizAnswer,
  type QuizFormat,
  type QuizItemType,
  type QuizMode,
  type QuizSession,
} from '../types'

function shuffle<T>(array: T[]): T[] {
  const copy = [...array]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

function getFormatFromMode(mode: QuizMode): QuizFormat {
  return mode.format ?? 'locate'
}

function buildQueueFromMode(mode: QuizMode): string[] {
  if (mode.type === 'retry') {
    const queue = [...mode.itemIds]
    return shuffle(queue)
  }

  if (mode.type === 'custom') {
    return shuffle(mode.countryCodes.map((code) => makeItemId('country', code)))
  }

  if (mode.preset === 'all') {
    return shuffle(
      getAllQuizCountries().map((c) => makeItemId('country', c.isoCode)),
    )
  }

  if (mode.preset === 'ap-human-1') {
    const allItems = [
      ...AP_HUMAN_QUIZ_1_COUNTRY_CODES.map((code) => makeItemId('country', code)),
      ...AP_HUMAN_QUIZ_1_FEATURE_IDS.map((id) => makeItemId('feature', id)),
    ]
    // Uniform random order: each of the 70 items has a 1/70 chance at every position.
    return shuffle(allItems)
  }

  return shuffle(
    getCountriesByContinent(mode.preset).map((c) =>
      makeItemId('country', c.isoCode),
    ),
  )
}

function getPoolCodes(session: QuizSession): string[] {
  return session.queue
    .filter((id) => parseItemId(id).type === 'country')
    .map((id) => parseItemId(id).key)
}

export function generateMcOptions(correctCode: string, poolCodes: string[]): string[] {
  const others = poolCodes.filter((c) => c !== correctCode)
  if (others.length === 0) return [correctCode]

  const correctCenter = getCountryCentroid(correctCode)

  let wrong: string[]

  if (correctCenter) {
    wrong = others
      .map((code) => {
        const center = getCountryCentroid(code)
        return {
          code,
          distance: center ? haversineDistanceKm(correctCenter, center) : Infinity,
        }
      })
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 3)
      .map((entry) => entry.code)
  } else {
    wrong = shuffle(others).slice(0, 3)
  }

  if (wrong.length < 3) {
    const used = new Set([correctCode, ...wrong])
    const extra = shuffle(others.filter((c) => !used.has(c))).slice(0, 3 - wrong.length)
    wrong = [...wrong, ...extra]
  }

  return shuffle([correctCode, ...wrong.slice(0, 3)])
}

function getPoolFeatureIds(session: QuizSession): string[] {
  return session.queue
    .filter((id) => parseItemId(id).type === 'feature')
    .map((id) => parseItemId(id).key)
}

export function generateMcFeatureOptions(correctId: string, poolIds: string[]): string[] {
  const others = poolIds.filter((id) => id !== correctId)
  if (others.length === 0) return [correctId]

  const correctFeature = getPhysicalFeature(correctId)
  const correctCoords = correctFeature?.coordinates

  let wrong: string[]

  if (correctCoords) {
    wrong = others
      .map((id) => {
        const coords = getPhysicalFeature(id)?.coordinates
        return {
          id,
          distance: coords ? haversineDistanceKm(correctCoords, coords) : Infinity,
        }
      })
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 3)
      .map((entry) => entry.id)
  } else {
    wrong = shuffle(others).slice(0, 3)
  }

  if (wrong.length < 3) {
    const used = new Set([correctId, ...wrong])
    const extra = shuffle(others.filter((id) => !used.has(id))).slice(0, 3 - wrong.length)
    wrong = [...wrong, ...extra]
  }

  return shuffle([correctId, ...wrong.slice(0, 3)])
}

export function getMcOptionLabel(itemType: QuizItemType, key: string): string {
  if (itemType === 'country') {
    return getCountryDisplayName(key)
  }
  return getPhysicalFeature(key)?.name ?? key
}

function buildMcOptions(session: QuizSession): string[] | null {
  if (session.format !== 'multiple-choice') return null
  const itemId = session.queue[session.currentIndex]
  if (!itemId) return null
  const { type, key } = parseItemId(itemId)
  if (type === 'country') {
    return generateMcOptions(key, getPoolCodes(session))
  }
  return generateMcFeatureOptions(key, getPoolFeatureIds(session))
}

export function createQuizSession(mode: QuizMode): QuizSession {
  const format = getFormatFromMode(mode)
  const session: QuizSession = {
    mode,
    format,
    queue: buildQueueFromMode(mode),
    currentIndex: 0,
    score: 0,
    answers: [],
    status: 'active',
    mcOptions: null,
  }
  session.mcOptions = buildMcOptions(session)
  return session
}

export function getCurrentItemId(session: QuizSession): string | null {
  if (session.status === 'complete') return null
  return session.queue[session.currentIndex] ?? null
}

export function getCurrentItemType(session: QuizSession): QuizItemType | null {
  const id = getCurrentItemId(session)
  if (!id) return null
  return parseItemId(id).type
}

export function getItemName(itemId: string): string {
  const { type, key } = parseItemId(itemId)
  if (type === 'country') {
    return getCountryDisplayName(key)
  }
  return getPhysicalFeature(key)?.name ?? key
}

export function getCurrentItemName(session: QuizSession): string | null {
  const id = getCurrentItemId(session)
  if (!id) return null
  return getItemName(id)
}

export function getProgress(session: QuizSession): { current: number; total: number } {
  return {
    current: Math.min(session.currentIndex + 1, session.queue.length),
    total: session.queue.length,
  }
}

export function submitAnswer(
  session: QuizSession,
  result: MapClickResult,
): QuizSession | null {
  const targetId = getCurrentItemId(session)
  if (!targetId || session.status === 'complete') return null

  const { type, key } = parseItemId(targetId)
  const targetName = getItemName(targetId)

  if (type === 'country' && !result.countryCode) {
    return null
  }

  let correct = false
  let distanceKm: number | null = null

  if (type === 'country') {
    correct = result.countryCode === key
  } else {
    const check = isFeatureClickCorrect(key, result.lngLat)
    correct = check.correct
    distanceKm = Math.round(check.distanceKm)
  }

  return advanceSession(session, {
    targetId,
    targetName,
    targetType: type,
    clickedCode: result.countryCode,
    clickedName: result.countryCode
      ? getCountryDisplayName(result.countryCode)
      : result.countryName,
    clickedLngLat: result.lngLat,
    distanceKm,
    correct,
  })
}

export function submitMcAnswer(
  session: QuizSession,
  selectedCode: string,
): QuizSession {
  const targetId = getCurrentItemId(session)
  if (!targetId || session.status === 'complete') return session

  const { type, key } = parseItemId(targetId)
  const correct = selectedCode === key
  const selectedName = getMcOptionLabel(type, selectedCode)

  return advanceSession(session, {
    targetId,
    targetName: getItemName(targetId),
    targetType: type,
    clickedCode: type === 'country' ? selectedCode : null,
    clickedName: selectedName,
    clickedLngLat: null,
    distanceKm: null,
    correct,
    selectedOption: selectedName,
  })
}

/** Case-insensitive, spelling-sensitive compare for Name It answers. */
export function normalizeTypedAnswer(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, ' ')
}

export function submitTypedAnswer(
  session: QuizSession,
  typedValue: string,
): QuizSession | null {
  const targetId = getCurrentItemId(session)
  if (!targetId || session.status === 'complete') return null
  if (session.format !== 'name-it') return null

  const typed = typedValue.trim()
  if (!typed) return null

  const { type } = parseItemId(targetId)
  const targetName = getItemName(targetId)
  const correct = normalizeTypedAnswer(typed) === normalizeTypedAnswer(targetName)

  return advanceSession(session, {
    targetId,
    targetName,
    targetType: type,
    clickedCode: null,
    clickedName: typed,
    clickedLngLat: null,
    distanceKm: null,
    correct,
    selectedOption: typed,
  })
}

function advanceSession(session: QuizSession, answer: QuizAnswer): QuizSession {
  const answers = [...session.answers, answer]
  const score = answer.correct ? session.score + 1 : session.score
  const nextIndex = session.currentIndex + 1
  const isComplete = nextIndex >= session.queue.length

  const next: QuizSession = {
    ...session,
    answers,
    score,
    currentIndex: nextIndex,
    status: isComplete ? 'complete' : 'active',
    mcOptions: null,
  }

  if (!isComplete) {
    next.mcOptions = buildMcOptions(next)
  }

  return next
}

export function skipQuestion(session: QuizSession): QuizSession {
  const targetId = getCurrentItemId(session)
  if (!targetId || session.status === 'complete') return session

  const { type } = parseItemId(targetId)

  return advanceSession(session, {
    targetId,
    targetName: getItemName(targetId),
    targetType: type,
    clickedCode: null,
    clickedName: null,
    clickedLngLat: null,
    distanceKm: null,
    correct: false,
  })
}

export function getMissedItemIds(session: QuizSession): string[] {
  return session.answers.filter((a) => !a.correct).map((a) => a.targetId)
}

export function createRetrySession(session: QuizSession): QuizSession {
  const missed = getMissedItemIds(session)
  const name =
    session.mode.type === 'custom'
      ? `${session.mode.name} (Retry)`
      : session.mode.type === 'preset' && session.mode.preset === 'ap-human-1'
        ? `${AP_HUMAN_QUIZ_1_NAME} (Retry)`
        : 'Retry Missed'

  return createQuizSession({
    type: 'retry',
    itemIds: missed,
    name,
    format: session.format,
  })
}

export function getPresetLabel(preset: PresetType): string {
  if (preset === 'all') return 'All Countries'
  if (preset === 'ap-human-1') return AP_HUMAN_QUIZ_1_NAME
  return preset
}

export function getSessionTitle(session: QuizSession): string {
  const base =
    session.mode.type === 'custom'
      ? session.mode.name
      : session.mode.type === 'retry'
        ? session.mode.name
        : getPresetLabel(session.mode.preset)

  if (session.format === 'multiple-choice') {
    return `${base} — Multiple Choice`
  }
  if (session.format === 'name-it') {
    return `${base} — Name It`
  }
  return base
}

export const getCurrentCountryName = getCurrentItemName

export const getCurrentCountryCode = (session: QuizSession): string | null => {
  const id = getCurrentItemId(session)
  if (!id) return null
  const { type, key } = parseItemId(id)
  return type === 'country' ? key : null
}

export function getHighlightCountryCode(lastAnswer: QuizAnswer | null): string | null {
  if (!lastAnswer || lastAnswer.targetType !== 'country') return null
  if (lastAnswer.correct) {
    return lastAnswer.clickedCode ?? parseItemId(lastAnswer.targetId).key
  }
  return parseItemId(lastAnswer.targetId).key
}

export function getWrongClickCountryCode(lastAnswer: QuizAnswer | null): string | null {
  if (!lastAnswer || lastAnswer.correct) return null
  if (lastAnswer.targetType === 'country' && lastAnswer.clickedCode) {
    if (lastAnswer.clickedCode !== parseItemId(lastAnswer.targetId).key) {
      return lastAnswer.clickedCode
    }
  }
  return null
}

function isRevealFormat(format: QuizFormat): boolean {
  return format === 'multiple-choice' || format === 'name-it'
}

export function getMcHighlightCode(session: QuizSession): string | null {
  if (!isRevealFormat(session.format)) return null
  const id = getCurrentItemId(session)
  if (!id) return null
  const { type, key } = parseItemId(id)
  return type === 'country' ? key : null
}

export function getMcFeatureMarker(session: QuizSession): [number, number] | null {
  if (!isRevealFormat(session.format)) return null
  const id = getCurrentItemId(session)
  if (!id) return null
  const { type, key } = parseItemId(id)
  if (type !== 'feature') return null
  return getPhysicalFeature(key)?.coordinates ?? null
}

export function getHighlightFeatureCoords(lastAnswer: QuizAnswer | null): [number, number] | null {
  if (!lastAnswer || lastAnswer.targetType !== 'feature') return null
  const { key } = parseItemId(lastAnswer.targetId)
  return getPhysicalFeature(key)?.coordinates ?? null
}

export function getClickMarkerCoords(lastAnswer: QuizAnswer | null): [number, number] | null {
  if (!lastAnswer || lastAnswer.targetType !== 'feature') return null
  return lastAnswer.clickedLngLat
}
