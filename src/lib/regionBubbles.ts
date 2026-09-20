export type RegionMapId = 'big-picture' | 'closer-look'

export interface RegionBubble {
  id: string
  answerId: string
  name: string
  aliases: string[]
  map: RegionMapId
  coordinates: [number, number]
  wide?: boolean
}

export interface RegionAnswer {
  id: string
  name: string
  aliases: string[]
  map: RegionMapId
  coordinates: [number, number]
}

function bubble(
  id: string,
  name: string,
  map: RegionMapId,
  coordinates: [number, number],
  options?: { aliases?: string[]; wide?: boolean; answerId?: string },
): RegionBubble {
  return {
    id,
    answerId: options?.answerId ?? id,
    name,
    aliases: options?.aliases ?? [],
    map,
    coordinates,
    wide: options?.wide,
  }
}

export const REGION_BUBBLES: RegionBubble[] = [
  // Big Picture — matches the blank worksheet + textbook page 44
  bubble('north-america', 'North America', 'big-picture', [-100, 56]),
  bubble('latin-america', 'Latin America', 'big-picture', [-78, 16], {
    aliases: ['latin america', 'central america and south america'],
  }),
  bubble('south-america', 'South America', 'big-picture', [-85, -18]),
  bubble('europe', 'Europe', 'big-picture', [10, 51]),
  bubble('africa', 'Africa', 'big-picture', [18, 8]),
  bubble('sub-saharan-africa', 'Sub-Saharan Africa', 'big-picture', [24, -6], {
    aliases: ['sub saharan africa', 'subsaharan africa'],
    wide: true,
  }),
  bubble('asia', 'Asia', 'big-picture', [88, 40]),
  bubble('russian-federation', 'Russian Federation', 'big-picture', [90, 64], {
    aliases: ['russia', 'russian federation', 'russian'],
    wide: true,
  }),
  bubble('oceania', 'Oceania', 'big-picture', [138, -24], {
    aliases: ['oceania', 'australia and oceania'],
  }),
  bubble('antarctica', 'Antarctica', 'big-picture', [10, -72], { wide: true }),
  bubble('arctic-ocean', 'Arctic Ocean', 'big-picture', [20, 78]),
  bubble('atlantic-ocean', 'Atlantic Ocean', 'big-picture', [-32, 22]),
  bubble('pacific-ocean-east', 'Pacific Ocean', 'big-picture', [-138, 12], {
    answerId: 'pacific-ocean',
    aliases: ['pacific', 'pacific ocean'],
  }),
  bubble('pacific-ocean-west', 'Pacific Ocean', 'big-picture', [168, 8], {
    answerId: 'pacific-ocean',
    aliases: ['pacific', 'pacific ocean'],
  }),
  bubble('indian-ocean', 'Indian Ocean', 'big-picture', [78, -18]),
  bubble('southern-ocean', 'Southern Ocean', 'big-picture', [8, -58], { wide: true }),

  // Closer Look — matches the labeled textbook subregions
  bubble('canada', 'Canada', 'closer-look', [-96, 60]),
  bubble('united-states', 'United States', 'closer-look', [-100, 40], {
    aliases: ['united states', 'usa', 'us', 'united states of america'],
  }),
  bubble('latin-america-close', 'Latin America', 'closer-look', [-72, -12], {
    aliases: ['latin america', 'spanish america'],
  }),
  bubble('brazil', 'Brazil', 'closer-look', [-52, -10], {
    aliases: ['brazil', 'brasil'],
  }),
  bubble('caribbean', 'Caribbean', 'closer-look', [-72, 18], {
    aliases: ['caribbean', 'the caribbean', 'west indies'],
  }),
  bubble('western-europe', 'Western Europe', 'closer-look', [4, 48], {
    aliases: ['western europe', 'west europe'],
  }),
  bubble('eastern-europe', 'Eastern Europe', 'closer-look', [28, 50], {
    aliases: ['eastern europe', 'east europe'],
  }),
  bubble('north-africa', 'North Africa', 'closer-look', [12, 28], {
    aliases: ['north africa', 'northern africa', 'maghreb'],
  }),
  bubble('west-africa', 'West Africa', 'closer-look', [-6, 10], {
    aliases: ['west africa', 'western africa'],
  }),
  bubble('central-africa', 'Central Africa', 'closer-look', [18, 2], {
    aliases: ['central africa', 'middle africa'],
  }),
  bubble('east-africa', 'East Africa', 'closer-look', [38, 2], {
    aliases: ['east africa', 'eastern africa'],
  }),
  bubble('southern-africa', 'Southern Africa', 'closer-look', [24, -16], {
    aliases: ['southern africa'],
  }),
  bubble('middle-east', 'Middle East', 'closer-look', [46, 28], {
    aliases: ['middle east', 'southwest asia', 'south west asia', 'sw asia', 'near east'],
  }),
  bubble('siberia', 'Siberia', 'closer-look', [100, 62], {
    aliases: ['siberia', 'siberian'],
    wide: true,
  }),
  bubble('central-asia', 'Central Asia', 'closer-look', [66, 42], {
    aliases: ['central asia', 'the stans'],
  }),
  bubble('south-asia', 'South Asia', 'closer-look', [78, 22], {
    aliases: ['south asia', 'southern asia', 'indian subcontinent'],
  }),
  bubble('east-asia', 'East Asia', 'closer-look', [114, 36], {
    aliases: ['east asia', 'eastern asia'],
    wide: true,
  }),
  bubble('southeast-asia', 'Southeast Asia', 'closer-look', [112, 6], {
    aliases: ['southeast asia', 'south east asia', 'se asia'],
  }),
  bubble('australia', 'Australia', 'closer-look', [134, -25], {
    aliases: ['australia', 'australia and new zealand', 'australasia'],
  }),
  bubble('melanesia', 'Melanesia', 'closer-look', [160, -12], {
    aliases: ['melanesia', 'melanesian'],
  }),
  bubble('micronesia', 'Micronesia', 'closer-look', [158, 8], {
    aliases: ['micronesia', 'micronesian'],
  }),
  bubble('polynesia', 'Polynesia', 'closer-look', [-155, 8], {
    aliases: ['polynesia', 'polynesian'],
  }),
]

const bubbleById = new Map(REGION_BUBBLES.map((item) => [item.id, item]))

export const REGION_MAP_TITLES: Record<RegionMapId, string> = {
  'big-picture': 'World Regions — A Big Picture View',
  'closer-look': 'World Regions — A Closer Look',
}

export function getRegionBubble(id: string): RegionBubble | undefined {
  return bubbleById.get(id)
}

export function getBubblesForMap(map: RegionMapId): RegionBubble[] {
  return REGION_BUBBLES.filter((item) => item.map === map)
}

export function getBubblesForAnswer(answerId: string): RegionBubble[] {
  return REGION_BUBBLES.filter((item) => item.answerId === answerId)
}

export function getRegionAnswers(): RegionAnswer[] {
  const seen = new Map<string, RegionAnswer>()
  for (const item of REGION_BUBBLES) {
    if (seen.has(item.answerId)) continue
    seen.set(item.answerId, {
      id: item.answerId,
      name: item.name,
      aliases: item.aliases,
      map: item.map,
      coordinates: item.coordinates,
    })
  }
  return [...seen.values()]
}

export function getRegionAnswer(answerId: string): RegionAnswer | undefined {
  return getRegionAnswers().find((item) => item.id === answerId)
}

export function getRegionAnswerIds(): string[] {
  return getRegionAnswers().map((item) => item.id)
}

export function getRegionMapForAnswer(answerId: string): RegionMapId | null {
  return getRegionAnswer(answerId)?.map ?? null
}

export function normalizeRegionAnswer(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[-_]/g, ' ')
    .replace(/[.,'/]/g, '')
    .replace(/\s+/g, ' ')
}

export function isRegionNameCorrect(answerId: string, typedValue: string): boolean {
  const answer = getRegionAnswer(answerId)
  if (!answer) return false
  const typed = normalizeRegionAnswer(typedValue)
  if (!typed) return false
  if (normalizeRegionAnswer(answer.name) === typed) return true
  return answer.aliases.some((alias) => normalizeRegionAnswer(alias) === typed)
}

export function isRegionBubbleCorrect(answerId: string, bubbleId: string): boolean {
  const bubble = getRegionBubble(bubbleId)
  return bubble?.answerId === answerId
}

export function getNearbyRegionAnswerIds(answerId: string, count = 4): string[] {
  const answer = getRegionAnswer(answerId)
  if (!answer) return [answerId]

  const ranked = getRegionAnswers()
    .filter((item) => item.map === answer.map && item.id !== answerId)
    .map((item) => {
      const dx = item.coordinates[0] - answer.coordinates[0]
      const dy = item.coordinates[1] - answer.coordinates[1]
      return { id: item.id, distance: dx * dx + dy * dy }
    })
    .sort((a, b) => a.distance - b.distance)
    .slice(0, Math.max(count - 1, 0))
    .map((item) => item.id)

  return [answerId, ...ranked]
}

export const REGION_QUIZ_STATS = {
  bigPicture: getRegionAnswers().filter((item) => item.map === 'big-picture').length,
  closerLook: getRegionAnswers().filter((item) => item.map === 'closer-look').length,
  total: getRegionAnswers().length,
}
