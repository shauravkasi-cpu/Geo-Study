export type ApHumanGuideTopic =
  | 'all'
  | 'maps'
  | 'data'
  | 'spatial'
  | 'environment'
  | 'scale'
  | 'regions'

export type ApHumanGuideQuestionTopic = Exclude<ApHumanGuideTopic, 'all'>

export type ApHumanFigureId =
  | 'choropleth'
  | 'dot-density'
  | 'graduated-symbol'
  | 'cartogram'
  | 'isoline'
  | 'mercator-area'
  | 'gis-layers'
  | 'distance-decay'
  | 'scale-nested'
  | 'three-regions'
  | 'cluster-disperse'
  | 'site-situation'

export interface ApHumanGuideQuestion {
  id: string
  topic: ApHumanGuideQuestionTopic
  prompt: string
  options: string[]
  correctIndexes: number[]
  explain: string
  figure?: ApHumanFigureId
}

export const APHG_GUIDE_TOPICS: { id: ApHumanGuideTopic; label: string; desc: string }[] = [
  { id: 'all', label: 'All questions', desc: 'Full Unit 1 mix, shuffled' },
  { id: 'maps', label: 'Maps & projections', desc: 'Thematic maps, distortion, spatial patterns' },
  { id: 'data', label: 'Geographic data', desc: 'GIS, GPS, remote sensing, census, fieldwork' },
  { id: 'spatial', label: 'Spatial concepts', desc: 'Location, site, situation, distance decay' },
  { id: 'environment', label: 'Human–environment', desc: 'Determinism, possibilism, sustainability' },
  { id: 'scale', label: 'Scales of analysis', desc: 'Local to global and why scale changes the story' },
  { id: 'regions', label: 'Regions', desc: 'Formal, functional, and vernacular regions' },
]

export function guideMc(
  id: string,
  topic: ApHumanGuideQuestionTopic,
  prompt: string,
  options: string[],
  correct: number,
  explain: string,
  figure?: ApHumanFigureId,
): ApHumanGuideQuestion {
  return { id, topic, prompt, options, correctIndexes: [correct], explain, figure }
}

export function shuffleGuide<T>(array: T[]): T[] {
  const copy = [...array]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

export function shuffleGuideOptions(question: ApHumanGuideQuestion): ApHumanGuideQuestion {
  const order = shuffleGuide(question.options.map((_, index) => index))
  return {
    ...question,
    options: order.map((index) => question.options[index]),
    correctIndexes: question.correctIndexes.map((index) => order.indexOf(index)).sort((a, b) => a - b),
  }
}

export function guideAnswersMatch(picked: number[], correctIndexes: number[]): boolean {
  if (picked.length !== correctIndexes.length) return false
  const a = [...picked].sort((x, y) => x - y)
  const b = [...correctIndexes].sort((x, y) => x - y)
  return a.every((value, index) => value === b[index])
}
