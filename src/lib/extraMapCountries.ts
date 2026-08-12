import type { Feature, Geometry, Polygon } from 'geojson'
import type { Continent, Country, CountryFeatureProperties } from '../types'

export interface ExtraMapCountry {
  isoCode: string
  name: string
  neId: string
  continent: Continent
  /** Accurate geometry for centroids / hit-testing */
  geometry: Polygon
  /** Enlarged island-shaped geometry so it reads as a normal country on the world map */
  displayGeometry: Polygon
}

/**
 * Tiny countries omitted from world-atlas countries-110m.
 * Accurate geometry sourced from countries-50m; display geometry is enlarged
 * so the country fill looks like other small states (not a pinpoint).
 */
export const EXTRA_MAP_COUNTRIES: ExtraMapCountry[] = [
  {
    isoCode: 'SGP',
    name: 'Singapore',
    neId: '702',
    continent: 'Asia',
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [103.97083970839708, 1.3321417036045489],
          [103.81963819638196, 1.2661735723607421],
          [103.65043650436508, 1.3251976897894053],
          [103.70443704437048, 1.4241498866551296],
          [103.81963819638196, 1.446717931554332],
          [103.90963909639095, 1.4154698693862002],
          [103.96003960039599, 1.3929018244870122],
          [103.99603996039963, 1.3651257692264522],
          [103.97083970839708, 1.3321417036045489],
        ],
      ],
    },
    // East-west island silhouette near the Malay Peninsula tip, sized like a small country.
    displayGeometry: {
      type: 'Polygon',
      coordinates: [
        [
          [103.35, 1.55],
          [103.55, 1.78],
          [103.85, 1.92],
          [104.15, 1.88],
          [104.45, 1.68],
          [104.62, 1.42],
          [104.55, 1.15],
          [104.3, 0.92],
          [103.95, 0.82],
          [103.6, 0.88],
          [103.35, 1.1],
          [103.25, 1.32],
          [103.35, 1.55],
        ],
      ],
    },
  },
]

export function toCountryRecord(extra: ExtraMapCountry): Country {
  return {
    isoCode: extra.isoCode,
    name: extra.name,
    continent: extra.continent,
  }
}

export function toFeatureRecord(
  extra: ExtraMapCountry,
): Feature<Geometry, CountryFeatureProperties> {
  return {
    type: 'Feature',
    id: Number(extra.neId),
    properties: {
      isoCode: extra.isoCode,
      name: extra.name,
      continent: extra.continent,
    },
    geometry: extra.geometry,
  }
}

/** GeoJSON features shaped for react-simple-maps Geography overlays */
export function getExtraMapGeographies() {
  return EXTRA_MAP_COUNTRIES.map((extra) => ({
    type: 'Feature' as const,
    rsmKey: `extra-${extra.isoCode}`,
    id: extra.neId,
    properties: { name: extra.name },
    geometry: extra.displayGeometry,
    isoCode: extra.isoCode,
  }))
}

export function getExtraCountryCentroid(isoCode: string): [number, number] | null {
  const extra = EXTRA_MAP_COUNTRIES.find((entry) => entry.isoCode === isoCode)
  if (!extra) return null

  const ring = extra.geometry.coordinates[0]
  if (!ring.length) return null

  let sumLng = 0
  let sumLat = 0
  const count = Math.max(1, ring.length - 1)
  for (let i = 0; i < count; i++) {
    sumLng += ring[i][0]
    sumLat += ring[i][1]
  }
  return [sumLng / count, sumLat / count]
}

export function getExtraMapCountry(isoCode: string): ExtraMapCountry | undefined {
  return EXTRA_MAP_COUNTRIES.find((entry) => entry.isoCode === isoCode)
}

export function mergeExtraCountries(
  countries: Country[],
  features: Feature<Geometry, CountryFeatureProperties>[],
): {
  countries: Country[]
  features: Feature<Geometry, CountryFeatureProperties>[]
} {
  const countryCodes = new Set(countries.map((c) => c.isoCode))
  const featureCodes = new Set(features.map((f) => f.properties.isoCode))

  const nextCountries = [...countries]
  const nextFeatures = [...features]

  for (const extra of EXTRA_MAP_COUNTRIES) {
    if (!countryCodes.has(extra.isoCode)) {
      nextCountries.push(toCountryRecord(extra))
    }
    if (!featureCodes.has(extra.isoCode)) {
      nextFeatures.push(toFeatureRecord(extra))
    }
  }

  nextCountries.sort((a, b) => a.name.localeCompare(b.name))
  return { countries: nextCountries, features: nextFeatures }
}
