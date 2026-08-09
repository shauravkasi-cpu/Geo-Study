export interface MapLabel {
  id: string
  lng: number
  lat: number
  text: string
  kind: 'country' | 'feature'
}

export interface PlacedLabel extends MapLabel {
  dx: number
  dy: number
}

interface InternalLabel extends MapLabel {
  screenX: number
  screenY: number
  dx: number
  dy: number
  width: number
  height: number
  anchor: 'middle' | 'start'
}

function estimateTextWidth(text: string, fontSize: number): number {
  return Math.max(text.length * fontSize * 0.52, fontSize * 2)
}

function getBounds(label: InternalLabel, padding: number) {
  const x = label.screenX + label.dx
  const y = label.screenY + label.dy
  const halfW = label.anchor === 'middle' ? label.width / 2 : 0
  return {
    left: x - halfW - padding,
    right: x - halfW + label.width + padding,
    top: y - label.height - padding,
    bottom: y + padding,
  }
}

function overlaps(a: InternalLabel, b: InternalLabel, padding: number): boolean {
  const boxA = getBounds(a, padding)
  const boxB = getBounds(b, padding)
  return !(
    boxA.right < boxB.left ||
    boxA.left > boxB.right ||
    boxA.bottom < boxB.top ||
    boxA.top > boxB.bottom
  )
}

/**
 * Resolve label overlaps in screen space by nudging labels apart.
 * Features keep their dot anchor; country labels stay near centroids.
 */
export function placeMapLabels(
  labels: MapLabel[],
  project: (coords: [number, number]) => [number, number] | null,
  options?: { fontSize?: number; padding?: number; maxIterations?: number },
): PlacedLabel[] {
  const fontSize = options?.fontSize ?? 9
  const padding = options?.padding ?? 2
  const maxIterations = options?.maxIterations ?? 80
  const labelHeight = fontSize + 3

  const placed: InternalLabel[] = labels
    .map((label) => {
      const projected = project([label.lng, label.lat])
      if (!projected) return null

      const isFeature = label.kind === 'feature'
      return {
        ...label,
        screenX: projected[0],
        screenY: projected[1],
        dx: isFeature ? 8 : 0,
        dy: isFeature ? 2 : -labelHeight * 0.4,
        width: estimateTextWidth(label.text, fontSize),
        height: labelHeight,
        anchor: isFeature ? 'start' : 'middle',
      } satisfies InternalLabel
    })
    .filter((label): label is InternalLabel => label !== null)

  // Features first (fixed dots), then countries — countries yield more easily.
  placed.sort((a, b) => {
    if (a.kind === b.kind) return 0
    return a.kind === 'feature' ? -1 : 1
  })

  for (let iteration = 0; iteration < maxIterations; iteration += 1) {
    let moved = false

    for (let i = 0; i < placed.length; i += 1) {
      for (let j = i + 1; j < placed.length; j += 1) {
        const a = placed[i]
        const b = placed[j]
        if (!overlaps(a, b, padding)) continue

        const ax = a.screenX + a.dx
        const ay = a.screenY + a.dy
        const bx = b.screenX + b.dx
        const by = b.screenY + b.dy

        let dx = bx - ax
        let dy = by - ay
        const dist = Math.hypot(dx, dy) || 1
        dx /= dist
        dy /= dist

        const push = 2.5
        const aMovable = a.kind === 'country'
        const bMovable = b.kind === 'country'

        if (aMovable) {
          a.dx -= dx * push * (bMovable ? 0.5 : 1)
          a.dy -= dy * push * (bMovable ? 0.5 : 1)
          moved = true
        }
        if (bMovable) {
          b.dx += dx * push * (aMovable ? 0.5 : 1)
          b.dy += dy * push * (aMovable ? 0.5 : 1)
          moved = true
        }
      }
    }

    if (!moved) break
  }

  return placed.map(({ id, lng, lat, text, kind, dx, dy }) => ({
    id,
    lng,
    lat,
    text,
    kind,
    dx,
    dy,
  }))
}

export function getLabelAnchor(kind: MapLabel['kind']): 'middle' | 'start' {
  return kind === 'feature' ? 'start' : 'middle'
}
