import { haversineDistanceKm } from './physicalFeatures'

export type RegionScale = 'big-picture' | 'closer-look'

export interface WorldRegion {
  id: string
  name: string
  aliases: string[]
  scale: RegionScale
  countryCodes: string[]
  coordinates: [number, number]
  radiusKm: number
  color: string
}

export const WORLD_REGIONS: WorldRegion[] = [
  // Big picture — WORLD REGIONS: A BIG PICTURE VIEW
  {
    id: 'north-america',
    name: 'North America',
    aliases: ['north america', 'north american'],
    scale: 'big-picture',
    countryCodes: [
      'CAN', 'USA', 'MEX', 'GRL',
      'BLZ', 'GTM', 'HND', 'SLV', 'NIC', 'CRI', 'PAN',
      'CUB', 'HTI', 'DOM', 'JAM', 'PRI', 'BHS', 'TTO', 'BRB',
      'GRD', 'LCA', 'VCT', 'KNA', 'ATG', 'DMA',
    ],
    coordinates: [-100, 45],
    radiusKm: 2800,
    color: '#60a5fa',
  },
  {
    id: 'south-america',
    name: 'South America',
    aliases: ['south america', 'south american'],
    scale: 'big-picture',
    countryCodes: [
      'BRA', 'ARG', 'CHL', 'PER', 'BOL', 'PRY', 'URY', 'ECU',
      'COL', 'VEN', 'GUY', 'SUR', 'FLK',
    ],
    coordinates: [-60, -15],
    radiusKm: 2800,
    color: '#34d399',
  },
  {
    id: 'europe',
    name: 'Europe',
    aliases: ['europe', 'european'],
    scale: 'big-picture',
    countryCodes: [
      'ISL', 'NOR', 'SWE', 'FIN', 'DNK', 'GBR', 'IRL', 'FRA', 'BEL', 'NLD',
      'LUX', 'DEU', 'AUT', 'CHE', 'LIE', 'MCO', 'AND', 'ESP', 'PRT', 'ITA',
      'VAT', 'SMR', 'MLT', 'GRC', 'EST', 'LVA', 'LTU', 'POL', 'CZE', 'SVK',
      'HUN', 'ROU', 'BGR', 'BLR', 'UKR', 'MDA', 'SVN', 'HRV', 'BIH', 'SRB',
      'MNE', 'MKD', 'ALB', 'XKX', 'RUS',
    ],
    coordinates: [15, 50],
    radiusKm: 2200,
    color: '#818cf8',
  },
  {
    id: 'africa',
    name: 'Africa',
    aliases: ['africa', 'african'],
    scale: 'big-picture',
    countryCodes: [
      'MAR', 'DZA', 'TUN', 'LBY', 'EGY', 'SDN',
      'MRT', 'SEN', 'GMB', 'GNB', 'GIN', 'SLE', 'LBR', 'CIV', 'GHA', 'TGO',
      'BEN', 'NGA', 'NER', 'MLI', 'BFA', 'CPV',
      'TCD', 'CMR', 'CAF', 'GNQ', 'GAB', 'COG', 'COD', 'AGO', 'STP',
      'SSD', 'ETH', 'ERI', 'DJI', 'SOM', 'KEN', 'UGA', 'RWA', 'BDI', 'TZA',
      'SYC', 'COM',
      'NAM', 'BWA', 'ZAF', 'LSO', 'SWZ', 'ZWE', 'ZMB', 'MWI', 'MOZ', 'MDG', 'MUS',
    ],
    coordinates: [20, 5],
    radiusKm: 3200,
    color: '#fbbf24',
  },
  {
    id: 'asia',
    name: 'Asia',
    aliases: ['asia', 'asian'],
    scale: 'big-picture',
    countryCodes: [
      'TUR', 'CYP', 'SYR', 'LBN', 'ISR', 'PSE', 'JOR', 'IRQ', 'IRN', 'KWT',
      'BHR', 'QAT', 'ARE', 'OMN', 'YEM', 'SAU',
      'KAZ', 'KGZ', 'TJK', 'TKM', 'UZB', 'AFG',
      'IND', 'PAK', 'BGD', 'NPL', 'BTN', 'LKA', 'MDV',
      'CHN', 'MNG', 'PRK', 'KOR', 'JPN', 'TWN', 'HKG', 'MAC',
      'MMR', 'THA', 'LAO', 'KHM', 'VNM', 'MYS', 'SGP', 'IDN', 'PHL', 'BRN', 'TLS',
      'RUS', 'GEO', 'ARM', 'AZE',
    ],
    coordinates: [90, 35],
    radiusKm: 3500,
    color: '#f472b6',
  },
  {
    id: 'oceania',
    name: 'Oceania',
    aliases: ['oceania', 'australia and oceania', 'pacific', 'pacific islands'],
    scale: 'big-picture',
    countryCodes: [
      'AUS', 'NZL', 'PNG', 'SLB', 'VUT', 'FJI',
      'FSM', 'MHL', 'PLW', 'KIR', 'NRU',
      'WSM', 'TON', 'TUV',
    ],
    coordinates: [150, -20],
    radiusKm: 3500,
    color: '#22d3ee',
  },
  {
    id: 'antarctica',
    name: 'Antarctica',
    aliases: ['antarctica', 'antarctic'],
    scale: 'big-picture',
    countryCodes: ['ATA'],
    coordinates: [0, -80],
    radiusKm: 2800,
    color: '#e2e8f0',
  },
  {
    id: 'sub-saharan-africa',
    name: 'Sub-Saharan Africa',
    aliases: ['sub saharan africa', 'subsaharan africa', 'sub-saharan africa'],
    scale: 'big-picture',
    countryCodes: [
      'MRT', 'SEN', 'GMB', 'GNB', 'GIN', 'SLE', 'LBR', 'CIV', 'GHA', 'TGO',
      'BEN', 'NGA', 'NER', 'MLI', 'BFA', 'CPV',
      'TCD', 'CMR', 'CAF', 'GNQ', 'GAB', 'COG', 'COD', 'AGO', 'STP',
      'SSD', 'ETH', 'ERI', 'DJI', 'SOM', 'KEN', 'UGA', 'RWA', 'BDI', 'TZA',
      'SYC', 'COM',
      'NAM', 'BWA', 'ZAF', 'LSO', 'SWZ', 'ZWE', 'ZMB', 'MWI', 'MOZ', 'MDG', 'MUS',
    ],
    coordinates: [22, -2],
    radiusKm: 2800,
    color: '#d97706',
  },
  {
    id: 'central-america',
    name: 'Central America',
    aliases: ['central america', 'centroamerica', 'mesoamerica'],
    scale: 'big-picture',
    countryCodes: ['BLZ', 'GTM', 'HND', 'SLV', 'NIC', 'CRI', 'PAN'],
    coordinates: [-85, 13],
    radiusKm: 900,
    color: '#4ade80',
  },

  // Closer look — WORLD REGIONS: A CLOSER LOOK
  {
    id: 'canada',
    name: 'Canada',
    aliases: ['canada', 'canadian'],
    scale: 'closer-look',
    countryCodes: ['CAN'],
    coordinates: [-96, 60],
    radiusKm: 1800,
    color: '#ef4444',
  },
  {
    id: 'united-states',
    name: 'United States',
    aliases: ['united states', 'usa', 'us', 'united states of america', 'america'],
    scale: 'closer-look',
    countryCodes: ['USA'],
    coordinates: [-98, 39],
    radiusKm: 1800,
    color: '#3b82f6',
  },
  {
    id: 'latin-america',
    name: 'Latin America',
    aliases: ['latin america', 'latinoamerica', 'spanish america'],
    scale: 'closer-look',
    countryCodes: [
      'MEX', 'GTM', 'BLZ', 'HND', 'SLV', 'NIC', 'CRI', 'PAN',
      'COL', 'VEN', 'GUY', 'SUR', 'ECU', 'PER', 'BOL', 'CHL', 'ARG', 'PRY', 'URY',
    ],
    coordinates: [-70, -10],
    radiusKm: 2600,
    color: '#22c55e',
  },
  {
    id: 'brazil',
    name: 'Brazil',
    aliases: ['brazil', 'brasil'],
    scale: 'closer-look',
    countryCodes: ['BRA'],
    coordinates: [-52, -10],
    radiusKm: 1600,
    color: '#16a34a',
  },
  {
    id: 'caribbean',
    name: 'Caribbean',
    aliases: ['caribbean', 'the caribbean', 'west indies', 'caribbean sea'],
    scale: 'closer-look',
    countryCodes: [
      'CUB', 'HTI', 'DOM', 'JAM', 'PRI', 'BHS', 'TTO', 'BRB',
      'GRD', 'LCA', 'VCT', 'KNA', 'ATG', 'DMA',
    ],
    coordinates: [-72, 18],
    radiusKm: 900,
    color: '#06b6d4',
  },
  {
    id: 'western-europe',
    name: 'Western Europe',
    aliases: ['western europe', 'west europe'],
    scale: 'closer-look',
    countryCodes: [
      'ISL', 'NOR', 'SWE', 'FIN', 'DNK', 'GBR', 'IRL', 'FRA', 'BEL', 'NLD',
      'LUX', 'DEU', 'AUT', 'CHE', 'LIE', 'MCO', 'AND', 'ESP', 'PRT', 'ITA',
      'VAT', 'SMR', 'MLT', 'GRC',
    ],
    coordinates: [5, 48],
    radiusKm: 1600,
    color: '#6366f1',
  },
  {
    id: 'eastern-europe',
    name: 'Eastern Europe',
    aliases: ['eastern europe', 'east europe'],
    scale: 'closer-look',
    countryCodes: [
      'EST', 'LVA', 'LTU', 'POL', 'CZE', 'SVK', 'HUN', 'ROU', 'BGR', 'BLR',
      'UKR', 'MDA', 'SVN', 'HRV', 'BIH', 'SRB', 'MNE', 'MKD', 'ALB', 'XKX',
    ],
    coordinates: [25, 50],
    radiusKm: 1400,
    color: '#8b5cf6',
  },
  {
    id: 'north-africa',
    name: 'North Africa',
    aliases: ['north africa', 'northern africa', 'maghreb'],
    scale: 'closer-look',
    countryCodes: ['MAR', 'DZA', 'TUN', 'LBY', 'EGY', 'SDN'],
    coordinates: [15, 28],
    radiusKm: 1600,
    color: '#f59e0b',
  },
  {
    id: 'west-africa',
    name: 'West Africa',
    aliases: ['west africa', 'western africa'],
    scale: 'closer-look',
    countryCodes: [
      'MRT', 'SEN', 'GMB', 'GNB', 'GIN', 'SLE', 'LBR', 'CIV', 'GHA', 'TGO',
      'BEN', 'NGA', 'NER', 'MLI', 'BFA', 'CPV',
    ],
    coordinates: [-5, 10],
    radiusKm: 1400,
    color: '#eab308',
  },
  {
    id: 'central-africa',
    name: 'Central Africa',
    aliases: ['central africa', 'middle africa', 'equatorial africa'],
    scale: 'closer-look',
    countryCodes: ['TCD', 'CMR', 'CAF', 'GNQ', 'GAB', 'COG', 'COD', 'AGO', 'STP'],
    coordinates: [18, 2],
    radiusKm: 1400,
    color: '#ca8a04',
  },
  {
    id: 'east-africa',
    name: 'East Africa',
    aliases: ['east africa', 'eastern africa', 'horn of africa'],
    scale: 'closer-look',
    countryCodes: [
      'SSD', 'ETH', 'ERI', 'DJI', 'SOM', 'KEN', 'UGA', 'RWA', 'BDI', 'TZA',
      'SYC', 'COM',
    ],
    coordinates: [38, 2],
    radiusKm: 1400,
    color: '#a16207',
  },
  {
    id: 'southern-africa',
    name: 'Southern Africa',
    aliases: ['southern africa', 'south africa region'],
    scale: 'closer-look',
    countryCodes: [
      'NAM', 'BWA', 'ZAF', 'LSO', 'SWZ', 'ZWE', 'ZMB', 'MWI', 'MOZ', 'MDG', 'MUS',
    ],
    coordinates: [26, -22],
    radiusKm: 1400,
    color: '#92400e',
  },
  {
    id: 'middle-east',
    name: 'Middle East',
    aliases: [
      'middle east',
      'southwest asia',
      'south west asia',
      'southwestern asia',
      'sw asia',
      'near east',
    ],
    scale: 'closer-look',
    countryCodes: [
      'TUR', 'CYP', 'SYR', 'LBN', 'ISR', 'PSE', 'JOR', 'IRQ', 'IRN', 'KWT',
      'BHR', 'QAT', 'ARE', 'OMN', 'YEM', 'SAU',
    ],
    coordinates: [45, 28],
    radiusKm: 1600,
    color: '#f97316',
  },
  {
    id: 'siberia',
    name: 'Siberia',
    aliases: ['siberia', 'siberian', 'russia', 'russian federation', 'russian'],
    scale: 'closer-look',
    countryCodes: ['RUS'],
    coordinates: [100, 62],
    radiusKm: 2200,
    color: '#64748b',
  },
  {
    id: 'central-asia',
    name: 'Central Asia',
    aliases: ['central asia', 'the stans', 'inner asia'],
    scale: 'closer-look',
    countryCodes: ['KAZ', 'KGZ', 'TJK', 'TKM', 'UZB', 'AFG'],
    coordinates: [66, 42],
    radiusKm: 1400,
    color: '#c084fc',
  },
  {
    id: 'south-asia',
    name: 'South Asia',
    aliases: ['south asia', 'southern asia', 'indian subcontinent'],
    scale: 'closer-look',
    countryCodes: ['IND', 'PAK', 'BGD', 'NPL', 'BTN', 'LKA', 'MDV'],
    coordinates: [78, 22],
    radiusKm: 1400,
    color: '#fb7185',
  },
  {
    id: 'east-asia',
    name: 'East Asia',
    aliases: ['east asia', 'eastern asia'],
    scale: 'closer-look',
    countryCodes: ['CHN', 'MNG', 'PRK', 'KOR', 'JPN', 'TWN', 'HKG', 'MAC'],
    coordinates: [115, 35],
    radiusKm: 1800,
    color: '#e11d48',
  },
  {
    id: 'southeast-asia',
    name: 'Southeast Asia',
    aliases: ['southeast asia', 'south east asia', 'se asia', 'southeastern asia'],
    scale: 'closer-look',
    countryCodes: [
      'MMR', 'THA', 'LAO', 'KHM', 'VNM', 'MYS', 'SGP', 'IDN', 'PHL', 'BRN', 'TLS',
    ],
    coordinates: [110, 8],
    radiusKm: 1600,
    color: '#be123c',
  },
  {
    id: 'australia',
    name: 'Australia',
    aliases: ['australia', 'australia and new zealand', 'australasia'],
    scale: 'closer-look',
    countryCodes: ['AUS', 'NZL'],
    coordinates: [134, -25],
    radiusKm: 2000,
    color: '#0d9488',
  },
  {
    id: 'melanesia',
    name: 'Melanesia',
    aliases: ['melanesia', 'melanesian'],
    scale: 'closer-look',
    countryCodes: ['PNG', 'SLB', 'VUT', 'FJI'],
    coordinates: [160, -10],
    radiusKm: 1400,
    color: '#14b8a6',
  },
  {
    id: 'micronesia',
    name: 'Micronesia',
    aliases: ['micronesia', 'micronesian'],
    scale: 'closer-look',
    countryCodes: ['FSM', 'MHL', 'PLW', 'KIR', 'NRU'],
    coordinates: [158, 8],
    radiusKm: 1800,
    color: '#2dd4bf',
  },
  {
    id: 'polynesia',
    name: 'Polynesia',
    aliases: ['polynesia', 'polynesian'],
    scale: 'closer-look',
    countryCodes: ['WSM', 'TON', 'TUV'],
    coordinates: [-160, -16],
    radiusKm: 2800,
    color: '#5eead4',
  },
]

const regionMap = new Map(WORLD_REGIONS.map((region) => [region.id, region]))

const countryToRegions = new Map<string, WorldRegion[]>()
for (const region of WORLD_REGIONS) {
  for (const code of region.countryCodes) {
    const list = countryToRegions.get(code) ?? []
    list.push(region)
    countryToRegions.set(code, list)
  }
}

export function getWorldRegion(id: string): WorldRegion | undefined {
  return regionMap.get(id)
}

export function getRegionsByScale(scale: RegionScale): WorldRegion[] {
  return WORLD_REGIONS.filter((region) => region.scale === scale)
}

export function getRegionCountryCodes(id: string): string[] {
  return getWorldRegion(id)?.countryCodes ?? []
}

export function getRegionsForCountry(isoCode: string): WorldRegion[] {
  return countryToRegions.get(isoCode) ?? []
}

export function normalizeRegionAnswer(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[-_]/g, ' ')
    .replace(/[.,'/]/g, '')
    .replace(/\s+/g, ' ')
}

export function isRegionNameCorrect(regionId: string, typedValue: string): boolean {
  const region = getWorldRegion(regionId)
  if (!region) return false
  const typed = normalizeRegionAnswer(typedValue)
  if (!typed) return false
  if (normalizeRegionAnswer(region.name) === typed) return true
  return region.aliases.some((alias) => normalizeRegionAnswer(alias) === typed)
}

export function isRegionClickCorrect(
  regionId: string,
  countryCode: string | null,
  clickLngLat: [number, number],
): { correct: boolean; distanceKm: number } {
  const region = getWorldRegion(regionId)
  if (!region) return { correct: false, distanceKm: Infinity }

  const distanceKm = haversineDistanceKm(clickLngLat, region.coordinates)
  if (countryCode && region.countryCodes.includes(countryCode)) {
    return { correct: true, distanceKm }
  }
  return { correct: distanceKm <= region.radiusKm, distanceKm }
}

export function getRegionCentroid(regionId: string): [number, number] | null {
  return getWorldRegion(regionId)?.coordinates ?? null
}
