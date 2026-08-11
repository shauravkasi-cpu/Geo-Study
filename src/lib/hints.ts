import type { Feature, Geometry, Position } from 'geojson'
import { getCountries, getCountryByCode, getCountryFeatures } from './countries'
import { getExtraCountryCentroid } from './extraMapCountries'
import { getPhysicalFeature, haversineDistanceKm } from './physicalFeatures'
import type { HintView } from '../types'
import { parseItemId } from '../types'

const HINT_COUNTRY_MIN = 7
const HINT_COUNTRY_MAX = 10

function ringCentroid(ring: Position[]): [number, number] {
  let sumLng = 0
  let sumLat = 0
  const count = ring.length - 1
  for (let i = 0; i < count; i++) {
    sumLng += ring[i][0]
    sumLat += ring[i][1]
  }
  return [sumLng / count, sumLat / count]
}

function geometryCentroid(geometry: Geometry): [number, number] | null {
  if (geometry.type === 'Polygon') {
    return ringCentroid(geometry.coordinates[0])
  }
  if (geometry.type === 'MultiPolygon') {
    let largest: Position[] | null = null
    for (const polygon of geometry.coordinates) {
      const ring = polygon[0]
      if (!largest || ring.length > largest.length) {
        largest = ring
      }
    }
    return largest ? ringCentroid(largest) : null
  }
  return null
}

export function getCountryCentroid(isoCode: string): [number, number] | null {
  const features = getCountryFeatures()
  const feature = features.find((f) => f.properties.isoCode === isoCode)
  if (feature) {
    const centroid = geometryCentroid(feature.geometry)
    if (centroid) return centroid
  }
  return getExtraCountryCentroid(isoCode)
}

function pickHintCountryCount(): number {
  return HINT_COUNTRY_MIN + Math.floor(Math.random() * (HINT_COUNTRY_MAX - HINT_COUNTRY_MIN + 1))
}

function getNearestCountryCodes(
  origin: [number, number],
  count: number,
  mustInclude?: string,
): string[] {
  const selected = new Set<string>()
  if (mustInclude) selected.add(mustInclude)

  const ranked = getCountries()
    .map((country) => {
      const centroid = getCountryCentroid(country.isoCode)
      return {
        code: country.isoCode,
        distance: centroid ? haversineDistanceKm(origin, centroid) : Infinity,
      }
    })
    .filter((entry) => entry.distance < Infinity)
    .sort((a, b) => a.distance - b.distance)

  for (const entry of ranked) {
    if (selected.size >= count) break
    selected.add(entry.code)
  }

  return Array.from(selected)
}

function computeHintViewport(codes: string[]): { center: [number, number]; zoom: number } {
  const centroids = codes
    .map((code) => getCountryCentroid(code))
    .filter((c): c is [number, number] => c !== null)

  if (centroids.length === 0) {
    return { center: [20, 20], zoom: 1 }
  }

  const center: [number, number] = [
    centroids.reduce((sum, c) => sum + c[0], 0) / centroids.length,
    centroids.reduce((sum, c) => sum + c[1], 0) / centroids.length,
  ]

  const maxDistKm = Math.max(...centroids.map((c) => haversineDistanceKm(center, c)))

  let zoom = 1.1
  if (maxDistKm < 400) zoom = 2.6
  else if (maxDistKm < 800) zoom = 2.1
  else if (maxDistKm < 1500) zoom = 1.6
  else if (maxDistKm < 3000) zoom = 1.2

  return { center, zoom }
}

function buildHintView(origin: [number, number], mustInclude?: string): HintView {
  const count = pickHintCountryCount()
  const highlightCountryCodes = getNearestCountryCodes(origin, count, mustInclude)
  const { center, zoom } = computeHintViewport(highlightCountryCodes)

  return { center, zoom, highlightCountryCodes }
}

export function getHintView(itemId: string): HintView | null {
  const { type, key } = parseItemId(itemId)

  if (type === 'country') {
    const country = getCountryByCode(key)
    const countryCenter = getCountryCentroid(key)
    if (!country || !countryCenter) return null

    return buildHintView(countryCenter, key)
  }

  const feature = getPhysicalFeature(key)
  if (!feature) return null

  return buildHintView(feature.coordinates)
}
