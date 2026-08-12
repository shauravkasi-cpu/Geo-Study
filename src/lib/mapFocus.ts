import type { Geometry, Position } from 'geojson'
import { getCountryFeatures } from './countries'
import { getExtraCountryCentroid, getExtraMapCountry } from './extraMapCountries'
import { getPhysicalFeature } from './physicalFeatures'
import { parseItemId } from '../types'

export interface MapFocusView {
  center: [number, number]
  zoom: number
}

function expandBounds(
  bounds: [number, number, number, number],
  lng: number,
  lat: number,
): [number, number, number, number] {
  return [
    Math.min(bounds[0], lng),
    Math.min(bounds[1], lat),
    Math.max(bounds[2], lng),
    Math.max(bounds[3], lat),
  ]
}

function accumulateCoords(
  coords: Position[] | Position[][] | Position[][][],
  bounds: [number, number, number, number],
): [number, number, number, number] {
  if (typeof coords[0] === 'number') {
    const [lng, lat] = coords as Position
    return expandBounds(bounds, lng, lat)
  }

  let next = bounds
  for (const entry of coords as Array<Position[] | Position[][] | Position>) {
    next = accumulateCoords(entry as Position[] | Position[][] | Position[][][], next)
  }
  return next
}

function geometryBounds(geometry: Geometry): [number, number, number, number] | null {
  if (geometry.type === 'Point') {
    const [lng, lat] = geometry.coordinates
    return [lng, lat, lng, lat]
  }
  if (geometry.type === 'Polygon' || geometry.type === 'MultiPolygon') {
    return accumulateCoords(geometry.coordinates, [Infinity, Infinity, -Infinity, -Infinity])
  }
  return null
}

function viewportFromBounds(
  minLng: number,
  minLat: number,
  maxLng: number,
  maxLat: number,
): MapFocusView {
  const padLng = Math.max((maxLng - minLng) * 0.35, 1.2)
  const padLat = Math.max((maxLat - minLat) * 0.35, 1.0)

  const west = minLng - padLng
  const east = maxLng + padLng
  const south = minLat - padLat
  const north = maxLat + padLat

  const center: [number, number] = [(west + east) / 2, (south + north) / 2]
  const lngSpan = Math.max(east - west, 0.01)
  const latSpan = Math.max(north - south, 0.01)
  const span = Math.max(lngSpan, latSpan * 1.7)

  // ZoomableGroup: zoom 1 ≈ full world. Fit the padded span with a little room around it.
  let zoom = 300 / span
  zoom = Math.min(7.5, Math.max(1.35, zoom))

  return { center, zoom }
}

function focusForCountry(isoCode: string): MapFocusView | null {
  // Prefer enlarged display shape for tiny overlay countries so Name It zooms sensibly.
  const extra = getExtraMapCountry(isoCode)
  if (extra) {
    const bounds = geometryBounds(extra.displayGeometry)
    if (bounds) return viewportFromBounds(...bounds)
  }

  const feature = getCountryFeatures().find((entry) => entry.properties.isoCode === isoCode)
  if (feature) {
    const bounds = geometryBounds(feature.geometry)
    if (bounds) {
      return viewportFromBounds(...bounds)
    }
  }

  const centroid = getExtraCountryCentroid(isoCode)
  if (!centroid) return null
  return viewportFromBounds(
    centroid[0] - 1.5,
    centroid[1] - 1.2,
    centroid[0] + 1.5,
    centroid[1] + 1.2,
  )
}

function focusForFeature(featureId: string): MapFocusView | null {
  const feature = getPhysicalFeature(featureId)
  if (!feature) return null

  // Convert radius to approximate degrees so large features get a wider view.
  const deg = Math.max(feature.radiusKm / 110, 2.5)
  return viewportFromBounds(
    feature.coordinates[0] - deg,
    feature.coordinates[1] - deg * 0.75,
    feature.coordinates[0] + deg,
    feature.coordinates[1] + deg * 0.75,
  )
}

export function getItemFocusView(itemId: string | null): MapFocusView | null {
  if (!itemId) return null
  const { type, key } = parseItemId(itemId)
  if (type === 'country') return focusForCountry(key)
  return focusForFeature(key)
}
