export type Continent =
  | 'Africa'
  | 'Asia'
  | 'Europe'
  | 'North America'
  | 'South America'
  | 'Oceania'
  | 'Antarctica'

export type PresetType = 'all' | Continent | 'ap-human-1'

export type QuizItemType = 'country' | 'feature'

export type QuizFormat = 'locate' | 'multiple-choice'

export interface Country {
  isoCode: string
  name: string
  continent: Continent
}

export interface CountryFeatureProperties {
  isoCode: string
  name: string
  continent: Continent
}

export interface CustomQuiz {
  id: string
  name: string
  countryCodes: string[]
  createdAt: string
  lastScore?: { correct: number; total: number }
}

export type QuizMode =
  | { type: 'preset'; preset: PresetType; format?: QuizFormat }
  | { type: 'custom'; countryCodes: string[]; name: string; quizId?: string; format?: QuizFormat }
  | { type: 'retry'; itemIds: string[]; name: string; format?: QuizFormat }

export interface QuizAnswer {
  targetId: string
  targetName: string
  targetType: QuizItemType
  clickedCode: string | null
  clickedName: string | null
  clickedLngLat: [number, number] | null
  distanceKm: number | null
  correct: boolean
  selectedOption?: string | null
}

export interface QuizSession {
  mode: QuizMode
  format: QuizFormat
  queue: string[]
  currentIndex: number
  score: number
  answers: QuizAnswer[]
  status: 'active' | 'complete'
  mcOptions: string[] | null
}

export type AppScreen =
  | { view: 'home' }
  | { view: 'custom-builder'; editId?: string }
  | { view: 'quiz'; session: QuizSession }
  | { view: 'results'; session: QuizSession }
  | { view: 'ap-human-reference' }
  | { view: 'factoring' }

export interface MapClickResult {
  lngLat: [number, number]
  countryCode: string | null
  countryName: string | null
}

export interface ValidationResult {
  matched: Country[]
  unmatched: string[]
  suggestions: Record<string, string[]>
}

export type Theme = 'light' | 'dark'

export interface HintView {
  center: [number, number]
  zoom: number
  highlightCountryCodes: string[]
}

export function makeItemId(type: QuizItemType, key: string): string {
  return `${type}:${key}`
}

export function parseItemId(id: string): { type: QuizItemType; key: string } {
  const [type, ...rest] = id.split(':')
  return { type: type as QuizItemType, key: rest.join(':') }
}
