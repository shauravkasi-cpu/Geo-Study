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
  { unit: 'theories', term: 'World Systems Theory', aliases: ['world-systems theory', 'world system theory', 'wallerstein', "wallerstein's world systems theory", 'world systems'] },
  { unit: 'theories', term: 'Dependency Model', aliases: ['dependency theory', 'dependency'] },
  { unit: 'theories', term: 'Commodity Dependence', aliases: ['commodity dependent', 'commodity-dependence'] },

  { unit: 'sectors', term: 'Primary Sector', aliases: ['primary', 'primary economic sector'] },
  { unit: 'sectors', term: 'Secondary Sector', aliases: ['secondary', 'secondary economic sector'] },
  { unit: 'sectors', term: 'Tertiary Sector', aliases: ['tertiary', 'tertiary economic sector', 'service sector'] },
  { unit: 'sectors', term: 'Quaternary Sector', aliases: ['quaternary', 'quaternary economic sector'] },
  { unit: 'sectors', term: 'Quinary Sector', aliases: ['quinary', 'quinary economic sector'] },

  { unit: 'measures', term: 'Gross National Product (GNP)', aliases: ['gross national product', 'gnp'] },
  { unit: 'measures', term: 'Gross National Income (GNI)', aliases: ['gross national income', 'gni'] },
  { unit: 'measures', term: 'Remittances', aliases: ['remittance'] },
  { unit: 'measures', term: 'Purchasing Power Parity (PPP)', aliases: ['purchasing power parity', 'ppp'] },
  { unit: 'measures', term: 'Formal Sector', aliases: ['formal economy', 'formal economic sector'] },
  { unit: 'measures', term: 'Informal Sector', aliases: ['informal economy', 'informal economic sector'] },
  { unit: 'measures', term: 'Gini Coefficient', aliases: ['gini', 'gini index', 'gini coefficient of inequality'] },
  { unit: 'measures', term: 'Life Expectancy', aliases: ['life expectancy at birth'] },
  { unit: 'measures', term: 'Literacy Rate', aliases: ['literacy'] },
  { unit: 'measures', term: 'Gender Gap', aliases: ['gender gaps'] },
  { unit: 'measures', term: 'Gender Inequality Index (GII)', aliases: ['gender inequality index', 'gii'] },
  { unit: 'measures', term: 'Human Development Index (HDI)', aliases: ['human development index', 'hdi'] },

  { unit: 'maps', term: 'Physical Geography', aliases: ['physical geo'] },
  { unit: 'maps', term: 'Human Geography', aliases: ['human geo'] },
  { unit: 'maps', term: 'Reference Map', aliases: ['reference maps'] },
  { unit: 'maps', term: 'Thematic Map', aliases: ['thematic maps'] },
  { unit: 'maps', term: 'Choropleth Map', aliases: ['choropleth', 'choropleth maps'] },
  { unit: 'maps', term: 'Dot Distribution Map', aliases: ['dot map', 'dot density map', 'dot-distribution map', 'dot distribution'] },
  { unit: 'maps', term: 'Graduated Symbol Map', aliases: ['proportional symbol map', 'graduated symbols', 'graduated-symbol map'] },
  { unit: 'maps', term: 'Isoline Map', aliases: ['isoline', 'isoline maps', 'isopleth map'] },
  { unit: 'maps', term: 'Topographic Map', aliases: ['topo map', 'topographic maps'] },
  { unit: 'maps', term: 'Cartogram', aliases: ['cartograms'] },
  { unit: 'maps', term: 'Cartographic Scale', aliases: ['map scale'] },
  { unit: 'maps', term: 'Small-Scale Maps', aliases: ['small scale map', 'small-scale map', 'small scale maps'] },
  { unit: 'maps', term: 'Absolute Location', aliases: ['absolute loc'] },
  { unit: 'maps', term: 'Relative Location', aliases: ['relative loc'] },

  { unit: 'data', term: 'Field Observations', aliases: ['field observation', 'fieldwork', 'field work'] },
  { unit: 'data', term: 'Remote Sensing', aliases: ['remotely sensed data'] },
  { unit: 'data', term: 'Global Positioning System (GPS)', aliases: ['global positioning system', 'gps'] },
  { unit: 'data', term: 'Geographic Information Systems (GIS)', aliases: ['geographic information system', 'geographic information systems', 'gis'] },

  { unit: 'spatial', term: 'Space', aliases: ['geographic space'] },
  { unit: 'spatial', term: 'Location', aliases: [] },
  { unit: 'spatial', term: 'Place', aliases: [] },
  { unit: 'spatial', term: 'Site', aliases: ['site factors'] },
  { unit: 'spatial', term: 'Situation', aliases: ['situation factors'] },
  { unit: 'spatial', term: 'Sense of Place', aliases: ['sense-of-place'] },
  { unit: 'spatial', term: 'Toponyms', aliases: ['toponym', 'place names', 'place name'] },
  { unit: 'spatial', term: 'Time-Space Compression', aliases: ['time space compression', 'space-time compression', 'time-space convergence'] },
  { unit: 'spatial', term: 'Friction of Distance', aliases: ['distance friction'] },
  { unit: 'spatial', term: 'Distance Decay', aliases: ['distance-decay'] },
  { unit: 'spatial', term: 'Pattern', aliases: ['spatial pattern'] },

  { unit: 'hei', term: 'Human Environment Interaction', aliases: ['human-environment interaction', 'human environment interactions'] },
  { unit: 'hei', term: 'Sustainability', aliases: ['sustainable'] },
  { unit: 'hei', term: 'Land Use', aliases: ['land-use'] },
  { unit: 'hei', term: 'Built Environment', aliases: ['built-environment'] },
  { unit: 'hei', term: 'Cultural Landscape', aliases: ['cultural landscapes'] },
  { unit: 'hei', term: 'Environmental Determinism', aliases: ['determinism'] },
  { unit: 'hei', term: 'Possibilism', aliases: ['environmental possibilism'] },

  { unit: 'scale', term: 'Global Scale', aliases: ['global'] },
  { unit: 'scale', term: 'World Scale', aliases: ['world'] },
  { unit: 'scale', term: 'National Scale', aliases: ['national', 'country scale'] },
  { unit: 'scale', term: 'Regional Scale', aliases: ['regional'] },
  { unit: 'scale', term: 'Local Scale', aliases: ['local'] },

  { unit: 'regions', term: 'Region', aliases: ['regions'] },
  { unit: 'regions', term: 'Formal Region', aliases: ['uniform region', 'homogeneous region', 'formal regions'] },
  { unit: 'regions', term: 'Functional Region', aliases: ['nodal region', 'functional regions'] },
  { unit: 'regions', term: 'Vernacular Region', aliases: ['perceptual region', 'vernacular regions', 'perceptual regions'] },
]

const TERM_LOOKUP = new Map(VOCAB_TERMS.map((item) => [item.term, item]))

export function getTermDef(term: string): VocabTermDef {
  const found = TERM_LOOKUP.get(term)
  if (!found) {
    throw new Error(`Unknown AP Human vocab term: ${term}`)
  }
  return found
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
