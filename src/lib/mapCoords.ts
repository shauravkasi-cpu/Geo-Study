import type { GeoProjection } from 'd3-geo'

/** Convert a screen click to [lng, lat] using the SVG zoom-group transform */
export function getLngLatFromClick(
  event: React.MouseEvent,
  projection: GeoProjection,
): [number, number] | null {
  const svg = (event.currentTarget as Element).closest('svg')
  if (!svg) return null

  const groups = svg.querySelectorAll('g')
  let zoomGroup: SVGGElement | null = null
  for (const g of groups) {
    const transform = g.getAttribute('transform')
    if (transform && transform.includes('scale')) {
      zoomGroup = g as SVGGElement
    }
  }
  if (!zoomGroup) zoomGroup = svg.querySelector('g g') as SVGGElement | null
  if (!zoomGroup) return null

  const pt = svg.createSVGPoint()
  pt.x = event.clientX
  pt.y = event.clientY

  const groupScreenCtm = zoomGroup.getScreenCTM()
  if (!groupScreenCtm) return null

  const localPt = pt.matrixTransform(groupScreenCtm.inverse())
  const coords = projection.invert([localPt.x, localPt.y])
  if (!coords || isNaN(coords[0]) || isNaN(coords[1])) return null

  return [coords[0], coords[1]]
}

export const MAP_WIDTH = 800
export const MAP_HEIGHT = 450

/** Human-readable coordinates, e.g. "28.0°N, 84.0°E" */
export function formatLngLat([lng, lat]: [number, number]): string {
  const latDir = lat >= 0 ? 'N' : 'S'
  const lngDir = lng >= 0 ? 'E' : 'W'
  return `${Math.abs(lat).toFixed(1)}°${latDir}, ${Math.abs(lng).toFixed(1)}°${lngDir}`
}
