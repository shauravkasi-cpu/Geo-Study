import type { Feature, FeatureCollection, Geometry } from 'geojson'
import type { Continent, Country, CountryFeatureProperties } from '../types'
import { getFullCountryName, NE_NAME_TO_ISO } from './countryNames'
import { mergeExtraCountries } from './extraMapCountries'

// ISO 3166-1 alpha-3 to continent mapping (Natural Earth aligned)
const ISO_TO_CONTINENT: Record<string, Continent> = {
  AFG: 'Asia', ALB: 'Europe', DZA: 'Africa', AND: 'Europe', AGO: 'Africa',
  ATG: 'North America', ARG: 'South America', ARM: 'Asia', AUS: 'Oceania',
  AUT: 'Europe', AZE: 'Asia', BHS: 'North America', BHR: 'Asia', BGD: 'Asia',
  BRB: 'North America', BLR: 'Europe', BEL: 'Europe', BLZ: 'North America',
  BEN: 'Africa', BTN: 'Asia', BOL: 'South America', BIH: 'Europe', BWA: 'Africa',
  BRA: 'South America', BRN: 'Asia', BGR: 'Europe', BFA: 'Africa', BDI: 'Africa',
  CPV: 'Africa', KHM: 'Asia', CMR: 'Africa', CAN: 'North America', CAF: 'Africa',
  TCD: 'Africa', CHL: 'South America', CHN: 'Asia', COL: 'South America',
  COM: 'Africa', COD: 'Africa', COG: 'Africa', CRI: 'North America', CIV: 'Africa',
  HRV: 'Europe', CUB: 'North America', CYP: 'Asia', CZE: 'Europe', DNK: 'Europe',
  DJI: 'Africa', DMA: 'North America', DOM: 'North America', ECU: 'South America',
  EGY: 'Africa', SLV: 'North America', GNQ: 'Africa', ERI: 'Africa', EST: 'Europe',
  SWZ: 'Africa', ETH: 'Africa', FJI: 'Oceania', FIN: 'Europe', FRA: 'Europe',
  GAB: 'Africa', GMB: 'Africa', GEO: 'Asia', DEU: 'Europe', GHA: 'Africa',
  GRC: 'Europe', GRD: 'North America', GTM: 'North America', GIN: 'Africa',
  GNB: 'Africa', GUY: 'South America', HTI: 'North America', HND: 'North America',
  HUN: 'Europe', ISL: 'Europe', IND: 'Asia', IDN: 'Asia', IRN: 'Asia',
  IRQ: 'Asia', IRL: 'Europe', ISR: 'Asia', ITA: 'Europe', JAM: 'North America',
  JPN: 'Asia', JOR: 'Asia', KAZ: 'Asia', KEN: 'Africa', KIR: 'Oceania',
  PRK: 'Asia', KOR: 'Asia', KWT: 'Asia', KGZ: 'Asia', LAO: 'Asia',
  LVA: 'Europe', LBN: 'Asia', LSO: 'Africa', LBR: 'Africa', LBY: 'Africa',
  LIE: 'Europe', LTU: 'Europe', LUX: 'Europe', MDG: 'Africa', MWI: 'Africa',
  MYS: 'Asia', MDV: 'Asia', MLI: 'Africa', MLT: 'Europe', MHL: 'Oceania',
  MRT: 'Africa', MUS: 'Africa', MEX: 'North America', FSM: 'Oceania', MDA: 'Europe',
  MCO: 'Europe', MNG: 'Asia', MNE: 'Europe', MAR: 'Africa', MOZ: 'Africa',
  MMR: 'Asia', NAM: 'Africa', NRU: 'Oceania', NPL: 'Asia', NLD: 'Europe',
  NZL: 'Oceania', NIC: 'North America', NER: 'Africa', NGA: 'Africa', MKD: 'Europe',
  NOR: 'Europe', OMN: 'Asia', PAK: 'Asia', PLW: 'Oceania', PAN: 'North America',
  PNG: 'Oceania', PRY: 'South America', PER: 'South America', PHL: 'Asia',
  POL: 'Europe', PRT: 'Europe', QAT: 'Asia', ROU: 'Europe', RUS: 'Europe',
  RWA: 'Africa', KNA: 'North America', LCA: 'North America', VCT: 'North America',
  WSM: 'Oceania', SMR: 'Europe', STP: 'Africa', SAU: 'Asia', SEN: 'Africa',
  SRB: 'Europe', SYC: 'Africa', SLE: 'Africa', SGP: 'Asia', SVK: 'Europe',
  SVN: 'Europe', SLB: 'Oceania', SOM: 'Africa', ZAF: 'Africa', SSD: 'Africa',
  ESP: 'Europe', LKA: 'Asia', SDN: 'Africa', SUR: 'South America', SWE: 'Europe',
  CHE: 'Europe', SYR: 'Asia', TJK: 'Asia', TZA: 'Africa', THA: 'Asia',
  TLS: 'Asia', TGO: 'Africa', TON: 'Oceania', TTO: 'North America', TUN: 'Africa',
  TUR: 'Asia', TKM: 'Asia', TUV: 'Oceania', UGA: 'Africa', UKR: 'Europe',
  ARE: 'Asia', GBR: 'Europe', USA: 'North America', URY: 'South America',
  UZB: 'Asia', VUT: 'Oceania', VAT: 'Europe', VEN: 'South America', VNM: 'Asia',
  YEM: 'Asia', ZMB: 'Africa', ZWE: 'Africa', TWN: 'Asia', PSE: 'Asia',
  XKX: 'Europe', HKG: 'Asia', MAC: 'Asia', PRI: 'North America', GRL: 'North America',
  ATA: 'Antarctica', FLK: 'South America', CYN: 'Asia', SOL: 'Oceania',
}

// Natural Earth numeric id to ISO alpha-3
const NE_ID_TO_ISO: Record<string, string> = {
  '004': 'AFG', '008': 'ALB', '010': 'ATA', '012': 'DZA', '016': 'ASM',
  '020': 'AND', '024': 'AGO', '028': 'ATG', '031': 'AZE', '032': 'ARG',
  '036': 'AUS', '040': 'AUT', '044': 'BHS', '048': 'BHR', '050': 'BGD',
  '051': 'ARM', '052': 'BRB', '056': 'BEL', '060': 'BMU', '064': 'BTN',
  '068': 'BOL', '070': 'BIH', '072': 'BWA', '076': 'BRA', '084': 'BLZ',
  '090': 'SLB', '092': 'VGB', '096': 'BRN', '100': 'BGR', '104': 'MMR',
  '108': 'BDI', '112': 'BLR', '116': 'KHM', '120': 'CMR', '124': 'CAN',
  '132': 'CPV', '140': 'CAF', '144': 'LKA', '148': 'TCD', '152': 'CHL',
  '156': 'CHN', '158': 'TWN', '170': 'COL', '174': 'COM', '178': 'COG',
  '180': 'COD', '188': 'CRI', '191': 'HRV', '192': 'CUB', '196': 'CYP',
  '203': 'CZE', '204': 'BEN', '208': 'DNK', '212': 'DMA', '214': 'DOM',
  '218': 'ECU', '222': 'SLV', '226': 'GNQ', '231': 'ETH', '232': 'ERI',
  '233': 'EST', '234': 'FRO', '238': 'FLK', '242': 'FJI', '246': 'FIN',
  '250': 'FRA', '254': 'GUF', '258': 'PYF', '262': 'DJI', '266': 'GAB',
  '268': 'GEO', '270': 'GMB', '275': 'PSE', '276': 'DEU', '288': 'GHA',
  '296': 'KIR', '300': 'GRC', '304': 'GRL', '308': 'GRD', '312': 'GLP',
  '320': 'GTM', '324': 'GIN', '328': 'GUY', '332': 'HTI', '336': 'VAT',
  '340': 'HND', '348': 'HUN', '352': 'ISL', '356': 'IND', '360': 'IDN',
  '364': 'IRN', '368': 'IRQ', '372': 'IRL', '376': 'ISR', '380': 'ITA',
  '384': 'CIV', '388': 'JAM', '392': 'JPN', '398': 'KAZ', '400': 'JOR',
  '404': 'KEN', '408': 'PRK', '410': 'KOR', '414': 'KWT', '417': 'KGZ',
  '418': 'LAO', '422': 'LBN', '426': 'LSO', '428': 'LVA', '430': 'LBR',
  '434': 'LBY', '438': 'LIE', '440': 'LTU', '442': 'LUX', '450': 'MDG',
  '454': 'MWI', '458': 'MYS', '462': 'MDV', '466': 'MLI', '470': 'MLT',
  '478': 'MRT', '480': 'MUS', '484': 'MEX', '492': 'MCO', '496': 'MNG',
  '498': 'MDA', '499': 'MNE', '504': 'MAR', '508': 'MOZ', '512': 'OMN',
  '516': 'NAM', '520': 'NRU', '524': 'NPL', '528': 'NLD', '540': 'NCL',
  '548': 'VUT', '554': 'NZL', '558': 'NIC', '562': 'NER', '566': 'NGA',
  '578': 'NOR', '586': 'PAK', '591': 'PAN', '598': 'PNG', '600': 'PRY',
  '604': 'PER', '608': 'PHL', '616': 'POL', '620': 'PRT', '624': 'GNB',
  '626': 'TLS', '634': 'QAT', '642': 'ROU', '643': 'RUS', '646': 'RWA',
  '682': 'SAU', '686': 'SEN', '688': 'SRB', '690': 'SYC', '694': 'SLE',
  '702': 'SGP', '703': 'SVK', '704': 'VNM', '705': 'SVN', '706': 'SOM',
  '710': 'ZAF', '716': 'ZWE', '724': 'ESP', '728': 'SSD', '729': 'SDN',
  '732': 'ESH', '740': 'SUR', '748': 'SWZ', '752': 'SWE', '756': 'CHE',
  '760': 'SYR', '762': 'TJK', '764': 'THA', '768': 'TGO', '776': 'TON',
  '780': 'TTO', '784': 'ARE', '788': 'TUN', '792': 'TUR', '795': 'TKM',
  '798': 'TUV', '800': 'UGA', '804': 'UKR', '807': 'MKD', '826': 'GBR',
  '834': 'TZA', '840': 'USA', '854': 'BFA', '858': 'URY', '860': 'UZB',
  '862': 'VEN', '882': 'WSM', '887': 'YEM', '894': 'ZMB', '-99': 'SOL',
  '260': 'ATA', '630': 'PRI', '818': 'EGY',
}

const ALIASES: Record<string, string> = {
  usa: 'USA',
  us: 'USA',
  'u.s.': 'USA',
  'u.s.a.': 'USA',
  'united states': 'USA',
  'united states of america': 'USA',
  america: 'USA',
  uk: 'GBR',
  'u.k.': 'GBR',
  britain: 'GBR',
  'great britain': 'GBR',
  'united kingdom': 'GBR',
  england: 'GBR',
  scotland: 'GBR',
  wales: 'GBR',
  russia: 'RUS',
  'russian federation': 'RUS',
  'south korea': 'KOR',
  korea: 'KOR',
  'north korea': 'PRK',
  'drc': 'COD',
  'democratic republic of the congo': 'COD',
  'dr congo': 'COD',
  congo: 'COG',
  'republic of the congo': 'COG',
  singapore: 'SGP',
  'ivory coast': 'CIV',
  "cote d'ivoire": 'CIV',
  'czech republic': 'CZE',
  czechia: 'CZE',
  'bosnia': 'BIH',
  'bosnia and herzegovina': 'BIH',
  uae: 'ARE',
  'united arab emirates': 'ARE',
  vietnam: 'VNM',
  'viet nam': 'VNM',
  laos: 'LAO',
  syria: 'SYR',
  iran: 'IRN',
  tanzania: 'TZA',
  myanmar: 'MMR',
  burma: 'MMR',
  eswatini: 'SWZ',
  swaziland: 'SWZ',
  macedonia: 'MKD',
  'north macedonia': 'MKD',
  taiwan: 'TWN',
  palestine: 'PSE',
  kosovo: 'XKX',
  holland: 'NLD',
  'the netherlands': 'NLD',
  netherlands: 'NLD',
}

// Full names shown in quizzes — use comprehensive ISO map
export { getFullCountryName as getCountryDisplayName } from './countryNames'

let countriesCache: Country[] = []
let featuresCache: Feature<Geometry, CountryFeatureProperties>[] = []
const nameToCodeCache = new Map<string, string>()

export function getCountries(): Country[] {
  return countriesCache
}

export function getCountryByName(name: string): Country | undefined {
  const code = nameToCodeCache.get(name)
  return code ? getCountryByCode(code) : undefined
}

export function getCountryFeatures(): Feature<Geometry, CountryFeatureProperties>[] {
  return featuresCache
}

export function getCountryByCode(code: string): Country | undefined {
  return countriesCache.find((c) => c.isoCode === code)
}

export function getIsoCodeForGeoName(geoName: string): string | null {
  return nameToCodeCache.get(geoName) ?? NE_NAME_TO_ISO[geoName] ?? null
}

export function getIsoCodeForNeId(id: string | number | undefined | null): string | null {
  if (id == null || id === '') return null
  const neId = String(id).padStart(3, '0')
  const iso = NE_ID_TO_ISO[neId]
  if (!iso || iso === 'SOL') return null
  return iso
}

export function getCountriesByContinent(continent: Continent): Country[] {
  return countriesCache.filter((c) => c.continent === continent)
}

export function getAllQuizCountries(): Country[] {
  return countriesCache.filter((c) => c.continent !== 'Antarctica')
}

function normalizeName(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/[.,']/g, '')
    .replace(/\s+/g, ' ')
}

export function resolveCountryName(input: string): Country | null {
  const normalized = normalizeName(input)
  if (!normalized) return null

  const aliasCode = ALIASES[normalized]
  if (aliasCode) {
    return getCountryByCode(aliasCode) ?? null
  }

  const exact = countriesCache.find(
    (c) => normalizeName(c.name) === normalized,
  )
  if (exact) return exact

  const byDisplay = countriesCache.find(
    (c) => normalizeName(getFullCountryName(c.isoCode)) === normalized,
  )
  if (byDisplay) return byDisplay

  const partial = countriesCache.find(
    (c) =>
      normalizeName(c.name).includes(normalized) ||
      normalized.includes(normalizeName(c.name)),
  )
  return partial ?? null
}

export function suggestCountries(input: string, limit = 3): string[] {
  const normalized = normalizeName(input)
  if (!normalized) return []

  return countriesCache
    .map((c) => {
      const name = normalizeName(c.name)
      let score = 0
      if (name.startsWith(normalized)) score = 3
      else if (name.includes(normalized)) score = 2
      else if (normalized.includes(name)) score = 1
      return { name: c.name, score }
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.name)
}

export function parseCountryList(text: string): {
  matched: Country[]
  unmatched: string[]
  suggestions: Record<string, string[]>
} {
  const entries = text
    .split(/[\n,;]+/)
    .map((s) => s.trim())
    .filter(Boolean)

  const matched: Country[] = []
  const unmatched: string[] = []
  const suggestions: Record<string, string[]> = {}
  const seen = new Set<string>()

  for (const entry of entries) {
    const country = resolveCountryName(entry)
    if (country && !seen.has(country.isoCode)) {
      seen.add(country.isoCode)
      matched.push(country)
    } else if (!country) {
      unmatched.push(entry)
      suggestions[entry] = suggestCountries(entry)
    }
  }

  return { matched, unmatched, suggestions }
}

interface TopoCountryProperties {
  name: string
}

export async function loadCountryData(): Promise<{
  countries: Country[]
  features: Feature<Geometry, CountryFeatureProperties>[]
}> {
  if (countriesCache.length > 0) {
    return { countries: countriesCache, features: featuresCache }
  }

  const [{ feature }, topoData] = await Promise.all([
    import('topojson-client'),
    import('world-atlas/countries-110m.json'),
  ])

  const collection = feature(
    topoData.default as Parameters<typeof feature>[0],
    topoData.default.objects.countries,
  ) as FeatureCollection<Geometry, TopoCountryProperties>

  const countries: Country[] = []
  const features: Feature<Geometry, CountryFeatureProperties>[] = []

  for (const f of collection.features) {
    const neId = String(f.id ?? '').padStart(3, '0')
    const isoCode = NE_ID_TO_ISO[neId]
    if (!isoCode || isoCode === 'SOL') continue

    const continent = ISO_TO_CONTINENT[isoCode]
    if (!continent) continue

    const mapName = f.properties?.name ?? isoCode
    const country: Country = {
      isoCode,
      name: getFullCountryName(isoCode),
      continent,
    }
    countries.push(country)

    features.push({
      ...f,
      properties: { isoCode, name: mapName, continent },
    })
  }

  const merged = mergeExtraCountries(countries, features)
  countriesCache = merged.countries
  featuresCache = merged.features
  nameToCodeCache.clear()
  for (const f of featuresCache) {
    nameToCodeCache.set(f.properties.name, f.properties.isoCode)
  }
  for (const [neName, iso] of Object.entries(NE_NAME_TO_ISO)) {
    nameToCodeCache.set(neName, iso)
  }

  return { countries: countriesCache, features: featuresCache }
}

export const CONTINENTS: Continent[] = [
  'Africa',
  'Asia',
  'Europe',
  'North America',
  'South America',
  'Oceania',
]
