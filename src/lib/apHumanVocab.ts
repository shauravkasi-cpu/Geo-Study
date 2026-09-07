export type VocabUnitId =
  | 'theories'
  | 'sectors'
  | 'measures'
  | 'maps'
  | 'data'
  | 'spatial'
  | 'hei'
  | 'scale'
  | 'regions'

export type VocabQuizMode = 'typed' | 'multiple-choice'
export type VocabQuizTopic = 'all' | VocabUnitId

export interface VocabTermDef {
  unit: VocabUnitId
  term: string
  aliases: string[]
  definition: string
}

export interface VocabQuestion {
  id: string
  unit: VocabUnitId
  term: string
  prompt: string
  distractors: [string, string, string]
  explain: string
}

export interface VocabPracticeQuestion {
  id: string
  unit: VocabUnitId
  term: string
  prompt: string
  kind: 'mc' | 'typed'
  options?: string[]
  correctIndexes?: number[]
  accepted: string[]
  explain: string
}

export const VOCAB_UNITS: { id: VocabUnitId; code: string; label: string; desc: string }[] = [
  { id: 'theories', code: '7.5', label: 'Theories of Development', desc: 'World-systems, dependency, commodity dependence' },
  { id: 'sectors', code: '7.2', label: 'Economic Sectors', desc: 'Primary through quinary activity' },
  { id: 'measures', code: '7.3', label: 'Measures of Development', desc: 'GNP, GNI, HDI, GII, and related indicators' },
  { id: 'maps', code: '1.1', label: 'Introduction to Maps', desc: 'Map types, scale, and location' },
  { id: 'data', code: '1.2–1.3', label: 'Geographic Data', desc: 'Fieldwork, remote sensing, GPS, GIS' },
  { id: 'spatial', code: '1.4', label: 'Spatial Concepts', desc: 'Place, site, situation, distance, pattern' },
  { id: 'hei', code: '1.5', label: 'Human-Environment Interaction', desc: 'Landscape, land use, determinism, possibilism' },
  { id: 'scale', code: '1.6', label: 'Scales of Analysis', desc: 'Global, world, national, regional, local' },
  { id: 'regions', code: '1.7', label: 'Regional Analysis', desc: 'Formal, functional, and vernacular regions' },
]

export const VOCAB_TERMS: VocabTermDef[] = [
  {
    unit: 'theories',
    term: 'World Systems Theory',
    aliases: ['world-systems theory', 'world system theory'],
    definition: 'A model of the capitalist world-economy that groups places as core, semi-periphery, or periphery based on their roles and relationships.',
  },
  {
    unit: 'theories',
    term: 'Dependency Model',
    aliases: ['dependency theory'],
    definition: 'The idea that wealthy countries stay wealthy because poorer peripheral countries remain dependent on them.',
  },
  {
    unit: 'theories',
    term: 'Commodity Dependence',
    aliases: ['commodity-dependence'],
    definition: 'When a country’s economy and export earnings rely on one or two raw materials whose prices are set abroad.',
  },

  {
    unit: 'sectors',
    term: 'Primary Sector',
    aliases: ['primary economic sector'],
    definition: 'Work that extracts materials from Earth’s surface: farming, mining, fishing, and forestry.',
  },
  {
    unit: 'sectors',
    term: 'Secondary Sector',
    aliases: ['secondary economic sector'],
    definition: 'Work that manufactures products by processing, transforming, or assembling raw materials.',
  },
  {
    unit: 'sectors',
    term: 'Tertiary Sector',
    aliases: ['tertiary economic sector', 'service sector'],
    definition: 'Work that provides services for payment, including transportation, communications, utilities, shops, and restaurants.',
  },
  {
    unit: 'sectors',
    term: 'Quaternary Sector',
    aliases: ['quaternary economic sector'],
    definition: 'Information and high-tech work that is not tied to a resource site and can locate almost anywhere because of telecommunications.',
  },
  {
    unit: 'sectors',
    term: 'Quinary Sector',
    aliases: ['quinary economic sector'],
    definition: 'The highest-level decision-making jobs: top executives, senior government officials, and other leaders who set strategy.',
  },

  {
    unit: 'measures',
    term: 'Gross National Product',
    aliases: ['gnp'],
    definition: 'The total market value of all goods and services produced by a nation’s people and companies during a period, even if some of that production is abroad.',
  },
  {
    unit: 'measures',
    term: 'Gross National Income',
    aliases: ['gni'],
    definition: 'The total income received by a country’s residents, including wages and profits that come from other countries.',
  },
  {
    unit: 'measures',
    term: 'Remittances',
    aliases: ['remittance'],
    definition: 'Money migrants send back to family or community in their home country.',
  },
  {
    unit: 'measures',
    term: 'Purchasing Power Parity',
    aliases: ['ppp'],
    definition: 'An adjustment that equalizes what money can buy in different countries by comparing local prices, not just the exchange rate.',
  },
  {
    unit: 'measures',
    term: 'Formal Sector',
    aliases: ['formal economy'],
    definition: 'Legal, taxed, and government-regulated economic activity that shows up in official statistics.',
  },
  {
    unit: 'measures',
    term: 'Informal Sector',
    aliases: ['informal economy'],
    definition: 'Unregistered or untaxed work that official GDP often undercounts, such as street vending or cash jobs.',
  },
  {
    unit: 'measures',
    term: 'Gini Coefficient',
    aliases: ['gini', 'gini index'],
    definition: 'A 0-to-1 score of how evenly income is spread. Closer to 0 is more equal; closer to 1 is more unequal.',
  },
  {
    unit: 'measures',
    term: 'Life Expectancy',
    aliases: ['life expectancy at birth'],
    definition: 'The average number of years a newborn is expected to live, used as a health measure of development.',
  },
  {
    unit: 'measures',
    term: 'Literacy Rate',
    aliases: [],
    definition: 'The percent of people who can read and write, used as a social measure of development.',
  },
  {
    unit: 'measures',
    term: 'Gender Gap',
    aliases: ['gender gaps'],
    definition: 'A measurable difference between males and females in access, roles, or outcomes such as jobs, school, or land.',
  },
  {
    unit: 'measures',
    term: 'Gender Inequality Index',
    aliases: ['gii'],
    definition: 'A UN composite that gets worse when maternal health is poor, women hold few political seats, and female labor-force participation lags.',
  },
  {
    unit: 'measures',
    term: 'Human Development Index',
    aliases: ['hdi'],
    definition: 'A UN composite of life expectancy, education, and income used to compare well-being, not money alone.',
  },

  {
    unit: 'maps',
    term: 'Physical Geography',
    aliases: [],
    definition: 'The study of Earth’s natural systems: landforms, climate, water, soils, and plants.',
  },
  {
    unit: 'maps',
    term: 'Human Geography',
    aliases: [],
    definition: 'The study of how people organize Earth: population, culture, politics, cities, and economic activity.',
  },
  {
    unit: 'maps',
    term: 'Reference Map',
    aliases: ['reference maps'],
    definition: 'A map whose main job is to show location: names, boundaries, roads, and physical features.',
  },
  {
    unit: 'maps',
    term: 'Thematic Map',
    aliases: ['thematic maps'],
    definition: 'A map that shows the spatial distribution of one or more data themes, such as income or language.',
  },
  {
    unit: 'maps',
    term: 'Choropleth Map',
    aliases: ['choropleth', 'choropleth maps'],
    definition: 'A map that shades enumeration areas in proportion to a statistical variable, usually a rate or percent.',
  },
  {
    unit: 'maps',
    term: 'Dot Distribution Map',
    aliases: ['dot map', 'dot density map', 'dot-distribution map'],
    definition: 'A map that uses dots to show concentration or counts, so clustering is visible inside units.',
  },
  {
    unit: 'maps',
    term: 'Graduated Symbol Map',
    aliases: ['proportional symbol map', 'graduated-symbol map'],
    definition: 'A map that sizes a symbol, usually a circle, by the value of a variable at a point or place.',
  },
  {
    unit: 'maps',
    term: 'Isoline Map',
    aliases: ['isoline', 'isoline maps', 'isopleth map'],
    definition: 'A map that connects points of equal value with lines, as on most weather maps.',
  },
  {
    unit: 'maps',
    term: 'Topographic Map',
    aliases: ['topo map', 'topographic maps'],
    definition: 'A detailed reference map that uses contour lines to show elevation plus streams, roads, and buildings.',
  },
  {
    unit: 'maps',
    term: 'Cartogram',
    aliases: ['cartograms'],
    definition: 'A map that resizes areas by a data value, such as population or electoral votes, while keeping a recognizable geographic form.',
  },
  {
    unit: 'maps',
    term: 'Cartographic Scale',
    aliases: ['map scale'],
    definition: 'The relationship between distance on a map and distance on Earth, often written as a representative fraction.',
  },
  {
    unit: 'maps',
    term: 'Small-Scale Maps',
    aliases: ['small scale map', 'small-scale map', 'small scale maps'],
    definition: 'Maps with a small representative fraction that show a large area with little detail.',
  },
  {
    unit: 'maps',
    term: 'Absolute Location',
    aliases: [],
    definition: 'The exact spot of something, usually given as latitude and longitude or a street address.',
  },
  {
    unit: 'maps',
    term: 'Relative Location',
    aliases: [],
    definition: 'Where something is compared with other human or physical features, such as “near the strait” or “15 minutes from downtown.”',
  },

  {
    unit: 'data',
    term: 'Field Observations',
    aliases: ['field observation', 'fieldwork', 'field work'],
    definition: 'Data gathered by going to the place: watching, counting, sketching, or interviewing on the ground.',
  },
  {
    unit: 'data',
    term: 'Remote Sensing',
    aliases: ['remotely sensed data'],
    definition: 'Collecting data about Earth’s surface from a satellite, aircraft, or other long-distance sensor.',
  },
  {
    unit: 'data',
    term: 'Global Positioning System',
    aliases: ['gps'],
    definition: 'A satellite system that reports the precise position of a receiver on Earth.',
  },
  {
    unit: 'data',
    term: 'Geographic Information Systems',
    aliases: ['geographic information system', 'gis'],
    definition: 'Computer software that stores, stacks, analyzes, and displays layers of geographic data.',
  },

  {
    unit: 'spatial',
    term: 'Space',
    aliases: [],
    definition: 'The geometric surface of Earth: distances, gaps, and how things are arranged, before asking what a place means.',
  },
  {
    unit: 'spatial',
    term: 'Location',
    aliases: [],
    definition: 'The position of something on Earth, either exact or compared with other features.',
  },
  {
    unit: 'spatial',
    term: 'Place',
    aliases: [],
    definition: 'A location with distinctive human and physical character that makes it different from other locations.',
  },
  {
    unit: 'spatial',
    term: 'Site',
    aliases: ['site factors'],
    definition: 'The physical character of a place: land, water, climate, soil, and other on-the-ground traits.',
  },
  {
    unit: 'spatial',
    term: 'Situation',
    aliases: ['situation factors'],
    definition: 'The location of a place relative to other places, routes, and connections.',
  },
  {
    unit: 'spatial',
    term: 'Sense of Place',
    aliases: ['sense-of-place'],
    definition: 'The feelings, memories, and meaning people attach to a location.',
  },
  {
    unit: 'spatial',
    term: 'Toponyms',
    aliases: ['toponym', 'place name', 'place names'],
    definition: 'The names given to places on Earth, which often record culture, power, or history.',
  },
  {
    unit: 'spatial',
    term: 'Time-Space Compression',
    aliases: ['time space compression', 'space-time compression'],
    definition: 'When better transport and communication shrink the time it takes to connect distant places.',
  },
  {
    unit: 'spatial',
    term: 'Friction of Distance',
    aliases: [],
    definition: 'The time, cost, and effort required to overcome distance, which makes far interaction harder.',
  },
  {
    unit: 'spatial',
    term: 'Distance Decay',
    aliases: ['distance-decay'],
    definition: 'The drop in a phenomenon’s importance or interaction as distance from its origin increases.',
  },
  {
    unit: 'spatial',
    term: 'Pattern',
    aliases: ['spatial pattern'],
    definition: 'The geometric arrangement of something on Earth’s surface, such as clustered, linear, or dispersed.',
  },

  {
    unit: 'hei',
    term: 'Human Environment Interaction',
    aliases: ['human-environment interaction'],
    definition: 'The two-way relationship in which people use and change Earth, and Earth shapes what people can do.',
  },
  {
    unit: 'hei',
    term: 'Sustainability',
    aliases: [],
    definition: 'Using resources so present needs are met without destroying the ability of future generations to meet theirs.',
  },
  {
    unit: 'hei',
    term: 'Land Use',
    aliases: ['land-use'],
    definition: 'How a parcel of Earth’s surface is allocated: farming, housing, industry, parks, or conservation.',
  },
  {
    unit: 'hei',
    term: 'Built Environment',
    aliases: ['built-environment'],
    definition: 'The human-made physical surroundings of a city or settlement: buildings, roads, parks, and other improvements.',
  },
  {
    unit: 'hei',
    term: 'Cultural Landscape',
    aliases: ['cultural landscapes'],
    definition: 'The natural landscape as fashioned by a cultural group: fields, houses, streets, and sacred sites.',
  },
  {
    unit: 'hei',
    term: 'Environmental Determinism',
    aliases: [],
    definition: 'The rejected idea that the physical environment causes human activity and culture.',
  },
  {
    unit: 'hei',
    term: 'Possibilism',
    aliases: ['environmental possibilism'],
    definition: 'The theory that the environment sets limits, but people can choose among many ways to adjust.',
  },

  {
    unit: 'scale',
    term: 'Global Scale',
    aliases: [],
    definition: 'Analysis that treats Earth as one connected system rather than a list of separate countries.',
  },
  {
    unit: 'scale',
    term: 'World Scale',
    aliases: [],
    definition: 'Analysis that compares countries or places across the entire world on one frame.',
  },
  {
    unit: 'scale',
    term: 'National Scale',
    aliases: ['country scale'],
    definition: 'Analysis that uses one country as the unit, such as a single national rate or law.',
  },
  {
    unit: 'scale',
    term: 'Regional Scale',
    aliases: [],
    definition: 'Analysis of a multi-place area larger than local but smaller than the whole country or world, such as a belt of states.',
  },
  {
    unit: 'scale',
    term: 'Local Scale',
    aliases: [],
    definition: 'Analysis of a city, neighborhood, or other small place, where details a national average would hide can appear.',
  },

  {
    unit: 'regions',
    term: 'Region',
    aliases: ['regions'],
    definition: 'An area distinguished by a unique combination of trends or features so it can be studied as a unit.',
  },
  {
    unit: 'regions',
    term: 'Formal Region',
    aliases: ['uniform region', 'homogeneous region', 'formal regions', 'formal/uniform region'],
    definition: 'An area in which everyone shares one or more distinctive, measurable characteristics.',
  },
  {
    unit: 'regions',
    term: 'Functional Region',
    aliases: ['nodal region', 'functional regions', 'functional/nodal region'],
    definition: 'An area organized around a node or focal point and the flows that serve it.',
  },
  {
    unit: 'regions',
    term: 'Vernacular Region',
    aliases: ['perceptual region', 'vernacular regions', 'perceptual regions', 'perceptual/vernacular region'],
    definition: 'An area people believe exists as part of their cultural identity, even if the borders are fuzzy.',
  },
]

const TERM_LOOKUP = new Map(VOCAB_TERMS.map((item) => [item.term, item]))

export function getTermDef(term: string): VocabTermDef {
  const found = TERM_LOOKUP.get(term)
  if (!found) {
    throw new Error(`Unknown AP Human vocab term: ${term}`)
  }
  return found
}

export function isVocabTerm(term: string): boolean {
  return TERM_LOOKUP.has(term)
}

export function q(
  id: string,
  unit: VocabUnitId,
  term: string,
  prompt: string,
  distractors: [string, string, string],
  explain: string,
): VocabQuestion {
  getTermDef(term)
  for (const distractor of distractors) {
    if (!TERM_LOOKUP.has(distractor)) {
      throw new Error(`Distractor "${distractor}" is not on the vocab list`)
    }
    if (distractor === term) {
      throw new Error(`Distractor repeats the correct term on ${id}`)
    }
  }
  return { id, unit, term, prompt, distractors, explain }
}

export function shuffle<T>(array: T[]): T[] {
  const copy = [...array]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

export function answersMatch(picked: number[], correctIndexes: number[]): boolean {
  if (picked.length !== correctIndexes.length) return false
  const a = [...picked].sort((x, y) => x - y)
  const b = [...correctIndexes].sort((x, y) => x - y)
  return a.every((value, index) => value === b[index])
}

export function normalizeVocabAnswer(raw: string): string {
  return raw
    .trim()
    .toLowerCase()
    .replace(/[’']/g, "'")
    .replace(/[()]/g, ' ')
    .replace(/[.,/#!?$%^&*;:{}=_`~]/g, ' ')
    .replace(/-/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

export function acceptedAnswersFor(term: string): string[] {
  const def = getTermDef(term)
  return [def.term, ...def.aliases]
}

export function checkTypedVocab(term: string, raw: string): boolean {
  const typed = normalizeVocabAnswer(raw)
  if (!typed) return false
  return acceptedAnswersFor(term).some((item) => normalizeVocabAnswer(item) === typed)
}

export function toPracticeQuestion(question: VocabQuestion, mode: VocabQuizMode): VocabPracticeQuestion {
  const accepted = acceptedAnswersFor(question.term)
  if (mode === 'typed') {
    return {
      id: question.id,
      unit: question.unit,
      term: question.term,
      prompt: question.prompt,
      kind: 'typed',
      accepted,
      explain: question.explain,
    }
  }

  const options = shuffle([question.term, ...question.distractors])
  return {
    id: question.id,
    unit: question.unit,
    term: question.term,
    prompt: question.prompt,
    kind: 'mc',
    options,
    correctIndexes: [options.indexOf(question.term)],
    accepted,
    explain: question.explain,
  }
}
