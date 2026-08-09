import booleanPointInPolygon from '@turf/boolean-point-in-polygon'
import { point } from '@turf/helpers'
import type { Feature, Geometry } from 'geojson'
import type { CountryFeatureProperties } from '../types'

export function countryAtPoint(
  lngLat: [number, number],
  features: Feature<Geometry, CountryFeatureProperties>[],
): Feature<Geometry, CountryFeatureProperties> | null {
  const pt = point(lngLat)

  for (const feature of features) {
    if (booleanPointInPolygon(pt, feature)) {
      return feature
    }
  }

  return null
}

export function formatCoords(lngLat: [number, number]): string {
  const [lng, lat] = lngLat
  const latDir = lat >= 0 ? 'N' : 'S'
  const lngDir = lng >= 0 ? 'E' : 'W'
  return `${Math.abs(lat).toFixed(1)}°${latDir}, ${Math.abs(lng).toFixed(1)}°${lngDir}`
}
