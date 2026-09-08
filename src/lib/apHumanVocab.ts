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
    definition: 'The theory that the global economy is divided into core, semi-periphery, and periphery countries, with unequal economic relationships between them.',
  },
  {
    unit: 'theories',
    term: 'Dependency Model',
    aliases: ['dependency theory'],
    definition: 'A theory that poorer countries remain economically dependent on wealthier countries because of unequal economic relationships and historical colonial relationships.',
  },
  {
    unit: 'theories',
    term: 'Commodity Dependence',
    aliases: ['commodity-dependence'],
    definition: 'When a country relies heavily on exporting raw materials or primary commodities, making its economy vulnerable to changes in global commodity prices.',
  },

  {
    unit: 'sectors',
    term: 'Primary Sector',
    aliases: ['primary economic sector'],
    definition: 'The part of the economy that extracts raw materials and natural resources, including agriculture, fishing, forestry, and mining.',
  },
  {
    unit: 'sectors',
    term: 'Secondary Sector',
    aliases: ['secondary economic sector'],
    definition: 'The part of the economy that processes and manufactures raw materials into finished or usable products.',
  },
  {
    unit: 'sectors',
    term: 'Tertiary Sector',
    aliases: ['tertiary economic sector', 'service sector'],
    definition: 'The part of the economy that provides services to people and businesses, including transportation, retail, education, and health care.',
  },
  {
    unit: 'sectors',
    term: 'Quaternary Sector',
    aliases: ['quaternary economic sector'],
    definition: 'The part of the economy based on information, knowledge, research, and other specialized intellectual services.',
  },
  {
    unit: 'sectors',
    term: 'Quinary Sector',
    aliases: ['quinary economic sector'],
    definition: 'The part of the economy involving the highest-level decision-making, leadership, and highly specialized services.',
  },

  {
    unit: 'measures',
    term: 'Gross National Product',
    aliases: ['gnp'],
    definition: "The total value of goods and services produced by a country's people and businesses, including production and income from outside the country's borders.",
  },
  {
    unit: 'measures',
    term: 'Gross National Income',
    aliases: ['gni'],
    definition: "The total income earned by a country's residents and businesses, including income earned from abroad.",
  },
  {
    unit: 'measures',
    term: 'Remittances',
    aliases: ['remittance'],
    definition: 'Money sent by migrants to people or communities in their home countries.',
  },
  {
    unit: 'measures',
    term: 'Purchasing Power Parity',
    aliases: ['ppp'],
    definition: 'A measure that compares the purchasing power of different currencies by determining how much currency is needed to buy the same goods and services.',
  },
  {
    unit: 'measures',
    term: 'Formal Sector',
    aliases: ['formal economy'],
    definition: 'The part of the economy that is officially regulated, monitored, and taxed by the government.',
  },
  {
    unit: 'measures',
    term: 'Informal Sector',
    aliases: ['informal economy'],
    definition: 'The part of the economy that operates outside official government regulation and taxation.',
  },
  {
    unit: 'measures',
    term: 'Gini Coefficient',
    aliases: ['gini', 'gini index'],
    definition: 'A measure of income inequality in which 0 represents complete equality and 1 represents complete inequality.',
  },
  {
    unit: 'measures',
    term: 'Life Expectancy',
    aliases: ['life expectancy at birth'],
    definition: 'The average number of years a person is expected to live based on current mortality rates.',
  },
  {
    unit: 'measures',
    term: 'Literacy Rate',
    aliases: [],
    definition: 'The percentage of people in a population who can read and write.',
  },
  {
    unit: 'measures',
    term: 'Gender Gap',
    aliases: ['gender gaps'],
    definition: 'The measurable difference between males and females in areas such as opportunities, rights, income, education, and social outcomes.',
  },
  {
    unit: 'measures',
    term: 'Gender Inequality Index',
    aliases: ['gii'],
    definition: 'A measure of gender inequality based on reproductive health, empowerment, and participation in the labor market.',
  },
  {
    unit: 'measures',
    term: 'Human Development Index',
    aliases: ['hdi'],
    definition: 'A measure of development based on health, education, and standard of living, using life expectancy, education, and GNI per capita.',
  },

  {
    unit: 'maps',
    term: 'Physical Geography',
    aliases: [],
    definition: "The branch of geography that studies Earth's natural features and physical processes.",
  },
  {
    unit: 'maps',
    term: 'Human Geography',
    aliases: [],
    definition: 'The study of where and why human activities are located and how people interact with places, space, and the environment.',
  },
  {
    unit: 'maps',
    term: 'Reference Map',
    aliases: ['reference maps'],
    definition: 'A map designed to show the locations of geographic features and places for general reference.',
  },
  {
    unit: 'maps',
    term: 'Thematic Map',
    aliases: ['thematic maps'],
    definition: 'A map that focuses on the spatial distribution or pattern of a specific topic or variable.',
  },
  {
    unit: 'maps',
    term: 'Choropleth Map',
    aliases: ['choropleth', 'choropleth maps'],
    definition: 'A thematic map that uses different shades or patterns within areas to represent the value of a variable.',
  },
  {
    unit: 'maps',
    term: 'Dot Distribution Map',
    aliases: ['dot map', 'dot density map', 'dot-distribution map'],
    definition: 'A map that uses dots to show the location and distribution of a phenomenon, with each dot representing a specific quantity.',
  },
  {
    unit: 'maps',
    term: 'Graduated Symbol Map',
    aliases: ['proportional symbol map', 'graduated-symbol map'],
    definition: 'A map that uses symbols of different sizes to represent different amounts of a variable.',
  },
  {
    unit: 'maps',
    term: 'Isoline Map',
    aliases: ['isoline', 'isoline maps', 'isopleth map'],
    definition: 'A map that uses lines connecting points of equal value to show the distribution of a variable.',
  },
  {
    unit: 'maps',
    term: 'Topographic Map',
    aliases: ['topo map', 'topographic maps'],
    definition: 'A map that shows elevation and landforms using contour lines that connect points of equal elevation.',
  },
  {
    unit: 'maps',
    term: 'Cartogram',
    aliases: ['cartograms'],
    definition: 'A map in which the size or shape of geographic areas is distorted according to a particular variable.',
  },
  {
    unit: 'maps',
    term: 'Cartographic Scale',
    aliases: ['map scale'],
    definition: "The relationship between a distance on a map and the corresponding distance on Earth's surface.",
  },
  {
    unit: 'maps',
    term: 'Small-Scale Maps',
    aliases: ['small scale map', 'small-scale map', 'small scale maps'],
    definition: 'Maps that show a large area with relatively little detail.',
  },
  {
    unit: 'maps',
    term: 'Absolute Location',
    aliases: [],
    definition: "The exact position of a place on Earth's surface, usually identified by coordinates such as latitude and longitude.",
  },
  {
    unit: 'maps',
    term: 'Relative Location',
    aliases: [],
    definition: 'The position of a place in relation to other places or geographic features.',
  },

  {
    unit: 'data',
    term: 'Field Observations',
    aliases: ['field observation', 'fieldwork', 'field work'],
    definition: 'Data collected by directly observing and recording geographic information at a location.',
  },
  {
    unit: 'data',
    term: 'Remote Sensing',
    aliases: ['remotely sensed data'],
    definition: "The collection of information about Earth's surface from a distance using satellites, aircraft, or other sensors.",
  },
  {
    unit: 'data',
    term: 'Global Positioning System',
    aliases: ['gps'],
    definition: "A satellite-based system used to determine the precise location of something on Earth's surface.",
  },
  {
    unit: 'data',
    term: 'Geographic Information Systems',
    aliases: ['geographic information system', 'gis'],
    definition: 'Computer-based systems used to collect, store, analyze, and display geographically referenced data.',
  },

  {
    unit: 'spatial',
    term: 'Space',
    aliases: [],
    definition: 'The area or physical extent between and around locations, objects, or phenomena.',
  },
  {
    unit: 'spatial',
    term: 'Location',
    aliases: [],
    definition: "The position of something on Earth's surface.",
  },
  {
    unit: 'spatial',
    term: 'Place',
    aliases: [],
    definition: 'A specific location distinguished by its unique physical and human characteristics.',
  },
  {
    unit: 'spatial',
    term: 'Site',
    aliases: ['site factors'],
    definition: 'The physical characteristics of a place, such as climate, terrain, soil, and water.',
  },
  {
    unit: 'spatial',
    term: 'Situation',
    aliases: ['situation factors'],
    definition: 'The location of a place relative to other places and its connections to surrounding areas.',
  },
  {
    unit: 'spatial',
    term: 'Sense of Place',
    aliases: ['sense-of-place'],
    definition: 'The feelings, meanings, and attachments that people associate with a particular place.',
  },
  {
    unit: 'spatial',
    term: 'Toponyms',
    aliases: ['toponym', 'toponymy', 'place name', 'place names'],
    definition: 'The names given to places, and the study of how places are named.',
  },
  {
    unit: 'spatial',
    term: 'Time-Space Compression',
    aliases: ['time space compression', 'space-time compression'],
    definition: 'The reduction in the time needed to connect distant places because of improvements in transportation and communication.',
  },
  {
    unit: 'spatial',
    term: 'Friction of Distance',
    aliases: [],
    definition: 'The increase in time, cost, or difficulty that usually occurs as distance between places increases.',
  },
  {
    unit: 'spatial',
    term: 'Distance Decay',
    aliases: ['distance-decay'],
    definition: 'The decline in interaction or connection between places as distance increases.',
  },
  {
    unit: 'spatial',
    term: 'Pattern',
    aliases: ['spatial pattern'],
    definition: 'The general arrangement or distribution of geographic phenomena across space.',
  },

  {
    unit: 'hei',
    term: 'Human Environment Interaction',
    aliases: ['human-environment interaction'],
    definition: 'The connection and exchange between humans and the natural environment.',
  },
  {
    unit: 'hei',
    term: 'Sustainability',
    aliases: [],
    definition: 'The use of resources in ways that meet current needs without preventing future generations from meeting their needs.',
  },
  {
    unit: 'hei',
    term: 'Land Use',
    aliases: ['land-use'],
    definition: 'The way humans use, modify, and organize land for different purposes.',
  },
  {
    unit: 'hei',
    term: 'Built Environment',
    aliases: ['built-environment'],
    definition: 'The human-made surroundings created by people, including buildings, roads, and other structures.',
  },
  {
    unit: 'hei',
    term: 'Cultural Landscape',
    aliases: ['cultural landscapes'],
    definition: 'The visible imprint of human culture and activity on the natural landscape.',
  },
  {
    unit: 'hei',
    term: 'Environmental Determinism',
    aliases: [],
    definition: 'The belief that the physical environment strongly controls or determines human behavior and societal development.',
  },
  {
    unit: 'hei',
    term: 'Possibilism',
    aliases: ['environmental possibilism'],
    definition: 'The view that the environment creates limits or opportunities, but humans can adapt and choose from different possibilities.',
  },

  {
    unit: 'scale',
    term: 'Global Scale',
    aliases: [],
    definition: 'The scale of analysis that examines geographic patterns and processes across the entire world.',
  },
  {
    unit: 'scale',
    term: 'World Scale',
    aliases: [],
    definition: 'The scale of analysis that examines a large world region or multiple countries, such as North America or South Asia.',
  },
  {
    unit: 'scale',
    term: 'National Scale',
    aliases: ['country scale'],
    definition: 'The scale of analysis that examines geographic patterns and processes within a single country.',
  },
  {
    unit: 'scale',
    term: 'Regional Scale',
    aliases: [],
    definition: 'The scale of analysis that examines geographic patterns and processes within a particular region, which may include multiple countries or areas within a country.',
  },
  {
    unit: 'scale',
    term: 'Local Scale',
    aliases: [],
    definition: 'The scale of analysis that examines a small area, such as a city, neighborhood, county, or community.',
  },

  {
    unit: 'regions',
    term: 'Region',
    aliases: ['regions'],
    definition: 'An area distinguished by one or more shared characteristics or patterns.',
  },
  {
    unit: 'regions',
    term: 'Formal Region',
    aliases: ['uniform region', 'homogeneous region', 'formal regions', 'formal/uniform region'],
    definition: 'An area in which places share one or more measurable characteristics, such as language, climate, or political boundaries.',
  },
  {
    unit: 'regions',
    term: 'Functional Region',
    aliases: ['nodal region', 'functional regions', 'functional/nodal region'],
    definition: 'An area organized around a central node or focal point and connected through interactions or flows.',
  },
  {
    unit: 'regions',
    term: 'Vernacular Region',
    aliases: ['perceptual region', 'vernacular regions', 'perceptual regions', 'perceptual/vernacular region'],
    definition: "An area defined by people's perceptions or beliefs about the area's identity and boundaries.",
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
