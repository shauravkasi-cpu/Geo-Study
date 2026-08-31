import type { ReactElement } from 'react'
import type { CircleSpec, GeoMathFigure } from '../lib/geoMathQuiz'

interface GeoMathFigureViewProps {
  figure: GeoMathFigure
}

const SVG = {
  className: 'bio-struct-svg geo-math-svg',
  viewBox: '0 0 360 280',
} as const

const CX = 180
const CY = 148
const R = 96
const INK = '#334155'
const ACCENT = '#2563eb'
const SHADE = 'rgba(59, 130, 246, 0.22)'

function polar(deg: number, dist = 1, r = R) {
  const a = (deg * Math.PI) / 180
  return { x: CX + r * dist * Math.cos(a), y: CY - r * dist * Math.sin(a) }
}

function posMap(spec: CircleSpec) {
  const map = new Map<string, { x: number; y: number }>()
  map.set(spec.centerId ?? 'O', { x: CX, y: CY })
  for (const point of spec.points) {
    map.set(point.id, polar(point.deg, point.dist ?? 1))
  }
  return map
}

function midDeg(from: number, to: number, major = false) {
  let delta = ((to - from) % 360 + 360) % 360
  if (major) {
    if (delta < 180) delta += 360
  } else if (delta > 180) {
    delta -= 360
  }
  return from + delta / 2
}

function pointDeg(spec: CircleSpec, id: string) {
  if (id === (spec.centerId ?? 'O')) return 0
  return spec.points.find((p) => p.id === id)?.deg ?? 0
}

function CircleDiagram({ spec }: { spec: CircleSpec }) {
  const map = posMap(spec)
  const get = (id: string) => map.get(id) ?? { x: CX, y: CY }
  const showCenter = spec.showCenter !== false
  const centerId = spec.centerId ?? 'O'

  const sector =
    spec.shadeSector &&
    (() => {
      const from = pointDeg(spec, spec.shadeSector.from)
      const to = pointDeg(spec, spec.shadeSector.to)
      const start = polar(from)
      const end = polar(to)
      let delta = ((to - from) % 360 + 360) % 360
      const large = delta > 180 ? 1 : 0
      return `M ${CX} ${CY} L ${start.x} ${start.y} A ${R} ${R} 0 ${large} 0 ${end.x} ${end.y} Z`
    })()

  const segment =
    spec.shadeSegment &&
    (() => {
      const from = pointDeg(spec, spec.shadeSegment.from)
      const to = pointDeg(spec, spec.shadeSegment.to)
      const start = polar(from)
      const end = polar(to)
      let delta = ((to - from) % 360 + 360) % 360
      const large = delta > 180 ? 1 : 0
      return `M ${start.x} ${start.y} A ${R} ${R} 0 ${large} 0 ${end.x} ${end.y} L ${start.x} ${start.y} Z`
    })()

  return (
    <svg {...SVG} aria-hidden>
      <rect width="360" height="280" fill="#f8fafc" />
      {sector ? <path d={sector} fill={SHADE} /> : null}
      {segment ? <path d={segment} fill={SHADE} /> : null}
      <circle cx={CX} cy={CY} r={R} fill="none" stroke={INK} strokeWidth="2.2" />
      {showCenter ? (
        <>
          <circle cx={CX} cy={CY} r="3.2" fill={INK} />
          <text x={CX + 10} y={CY - 8} fontSize="13" fontWeight="700" fill={INK}>
            {centerId}
          </text>
        </>
      ) : null}
      {(spec.dashed ?? []).map(([a, b]) => {
        const p = get(a)
        const q = get(b)
        return (
          <line
            key={`d-${a}-${b}`}
            x1={p.x}
            y1={p.y}
            x2={q.x}
            y2={q.y}
            stroke={INK}
            strokeWidth="1.8"
            strokeDasharray="5 4"
          />
        )
      })}
      {spec.lines.map(([a, b]) => {
        const p = get(a)
        const q = get(b)
        return (
          <line key={`${a}-${b}`} x1={p.x} y1={p.y} x2={q.x} y2={q.y} stroke={INK} strokeWidth="2" />
        )
      })}
      {spec.arcLabels?.map((label) => {
        const from = pointDeg(spec, label.from)
        const to = pointDeg(spec, label.to)
        const mid = midDeg(from, to, label.major)
        const p = polar(mid, 1.28)
        return (
          <text
            key={`arc-${label.from}-${label.to}-${label.text}`}
            x={p.x}
            y={p.y}
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill={ACCENT}
          >
            {label.text}
          </text>
        )
      })}
      {spec.angleLabels?.map((label) => {
        const v = get(label.vertex)
        const a = get(label.from)
        const b = get(label.to)
        const a1 = Math.atan2(a.y - v.y, a.x - v.x)
        const a2 = Math.atan2(b.y - v.y, b.x - v.x)
        let delta = a2 - a1
        while (delta <= -Math.PI) delta += 2 * Math.PI
        while (delta > Math.PI) delta -= 2 * Math.PI
        const mid = a1 + delta / 2
        const r = 28
        const tx = v.x + Math.cos(mid) * (r + 14)
        const ty = v.y + Math.sin(mid) * (r + 14)
        const start = { x: v.x + Math.cos(a1) * r, y: v.y + Math.sin(a1) * r }
        const end = { x: v.x + Math.cos(a2) * r, y: v.y + Math.sin(a2) * r }
        const large = Math.abs(delta) > Math.PI ? 1 : 0
        const sweep = delta > 0 ? 1 : 0
        return (
          <g key={`ang-${label.vertex}-${label.text}`}>
            <path
              d={`M ${start.x} ${start.y} A ${r} ${r} 0 ${large} ${sweep} ${end.x} ${end.y}`}
              fill="none"
              stroke={ACCENT}
              strokeWidth="1.6"
            />
            <text x={tx} y={ty + 4} textAnchor="middle" fontSize="13" fontWeight="700" fill={ACCENT}>
              {label.text}
            </text>
          </g>
        )
      })}
      {spec.lengthLabels?.map((label) => {
        const p = get(label.from)
        const q = get(label.to)
        const mx = (p.x + q.x) / 2
        const my = (p.y + q.y) / 2
        const dx = q.x - p.x
        const dy = q.y - p.y
        const len = Math.hypot(dx, dy) || 1
        const ox = (-dy / len) * 12
        const oy = (dx / len) * 12
        return (
          <text
            key={`len-${label.from}-${label.to}`}
            x={mx + ox}
            y={my + oy + 4}
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill={ACCENT}
          >
            {label.text}
          </text>
        )
      })}
      {spec.points.map((point) => {
        const p = get(point.id)
        const outside = polar(point.deg, (point.dist ?? 1) + 0.18)
        const label =
          (point.dist ?? 1) < 0.2
            ? { x: p.x + 10, y: p.y - 8 }
            : { x: outside.x, y: outside.y + 4 }
        return (
          <g key={point.id}>
            <circle cx={p.x} cy={p.y} r="3.4" fill={INK} />
            <text x={label.x} y={label.y} textAnchor="middle" fontSize="13" fontWeight="700" fill={INK}>
              {point.id}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

function SectorFigure({ radiusLabel, angleLabel, degrees }: { radiusLabel: string; angleLabel: string; degrees: number }) {
  const start = polar(0)
  const end = polar(degrees)
  const large = degrees > 180 ? 1 : 0
  const path = `M ${CX} ${CY} L ${start.x} ${start.y} A ${R} ${R} 0 ${large} 0 ${end.x} ${end.y} Z`
  const mid = polar(degrees / 2, 0.55)
  return (
    <svg {...SVG} aria-hidden>
      <rect width="360" height="280" fill="#f8fafc" />
      <circle cx={CX} cy={CY} r={R} fill="none" stroke="#94a3b8" strokeWidth="1.4" />
      <path d={path} fill={SHADE} stroke={INK} strokeWidth="2" />
      <text x={(CX + start.x) / 2} y={CY + 16} fontSize="13" fontWeight="700" fill={ACCENT}>
        {radiusLabel}
      </text>
      <text x={mid.x} y={mid.y} textAnchor="middle" fontSize="13" fontWeight="700" fill={ACCENT}>
        {angleLabel}
      </text>
    </svg>
  )
}

function CoordFigure({
  h,
  k,
  r,
  extra,
}: {
  h: number
  k: number
  r: number
  extra?: { x: number; y: number; label: string }[]
}) {
  const ox = 180
  const oy = 148
  const s = 12
  const toX = (x: number) => ox + x * s
  const toY = (y: number) => oy - y * s
  const ticks = [-10, -8, -6, -4, -2, 2, 4, 6, 8, 10]
  return (
    <svg {...SVG} aria-hidden>
      <rect width="360" height="280" fill="#f8fafc" />
      <line x1="24" y1={oy} x2="336" y2={oy} stroke="#94a3b8" strokeWidth="1.4" />
      <line x1={ox} y1="24" x2={ox} y2="260" stroke="#94a3b8" strokeWidth="1.4" />
      {ticks.map((t) => (
        <g key={t}>
          <line x1={toX(t)} y1={oy - 4} x2={toX(t)} y2={oy + 4} stroke="#64748b" />
          <line x1={ox - 4} y1={toY(t)} x2={ox + 4} y2={toY(t)} stroke="#64748b" />
        </g>
      ))}
      <text x="328" y={oy - 8} fontSize="12" fill={INK}>
        x
      </text>
      <text x={ox + 8} y="32" fontSize="12" fill={INK}>
        y
      </text>
      <circle
        cx={toX(h)}
        cy={toY(k)}
        r={r * s}
        fill="none"
        stroke={ACCENT}
        strokeWidth="2.2"
      />
      <circle cx={toX(h)} cy={toY(k)} r="3.2" fill={ACCENT} />
      <text x={toX(h) + 8} y={toY(k) - 8} fontSize="12" fontWeight="700" fill={ACCENT}>
        ({h},{k})
      </text>
      {extra?.map((p) => (
        <g key={p.label}>
          <circle cx={toX(p.x)} cy={toY(p.y)} r="3.2" fill={INK} />
          <text x={toX(p.x) + 8} y={toY(p.y) - 6} fontSize="12" fontWeight="700" fill={INK}>
            {p.label}
          </text>
        </g>
      ))}
    </svg>
  )
}

function CylinderFigure({ r, h }: { r: string; h: string }) {
  return (
    <svg {...SVG} aria-hidden>
      <rect width="360" height="280" fill="#f8fafc" />
      <ellipse cx="180" cy="78" rx="70" ry="22" fill="#dbeafe" stroke={INK} strokeWidth="2" />
      <path d="M110 78 L110 198" stroke={INK} strokeWidth="2" />
      <path d="M250 78 L250 198" stroke={INK} strokeWidth="2" />
      <ellipse cx="180" cy="198" rx="70" ry="22" fill="#bfdbfe" stroke={INK} strokeWidth="2" />
      <line x1="180" y1="198" x2="250" y2="198" stroke={ACCENT} strokeWidth="1.8" />
      <text x="198" y="190" fontSize="13" fontWeight="700" fill={ACCENT}>
        r = {r}
      </text>
      <line x1="258" y1="78" x2="258" y2="198" stroke={ACCENT} strokeWidth="1.8" />
      <text x="266" y="144" fontSize="13" fontWeight="700" fill={ACCENT}>
        h = {h}
      </text>
    </svg>
  )
}

function ConeFigure({ r, h, slant, angle }: { r: string; h?: string; slant?: string; angle?: string }) {
  return (
    <svg {...SVG} aria-hidden>
      <rect width="360" height="280" fill="#f8fafc" />
      <ellipse cx="180" cy="210" rx="78" ry="22" fill="#dbeafe" stroke={INK} strokeWidth="2" />
      <path d="M102 210 L180 52 L258 210" fill="#eff6ff" stroke={INK} strokeWidth="2" />
      <ellipse cx="180" cy="210" rx="78" ry="22" fill="#bfdbfe" stroke={INK} strokeWidth="2" />
      <line x1="180" y1="52" x2="180" y2="210" stroke={INK} strokeDasharray="5 4" strokeWidth="1.6" />
      <line x1="180" y1="210" x2="258" y2="210" stroke={ACCENT} strokeWidth="1.8" />
      <text x="196" y="202" fontSize="13" fontWeight="700" fill={ACCENT}>
        r = {r}
      </text>
      {h ? (
        <text x="188" y="140" fontSize="13" fontWeight="700" fill={ACCENT}>
          h = {h}
        </text>
      ) : null}
      {slant ? (
        <text x="232" y="120" fontSize="13" fontWeight="700" fill={ACCENT}>
          ℓ = {slant}
        </text>
      ) : null}
      {angle ? (
        <text x="210" y="198" fontSize="13" fontWeight="700" fill={ACCENT}>
          {angle}
        </text>
      ) : null}
    </svg>
  )
}

function PyramidFigure({ base, h }: { base: string; h: string }) {
  return (
    <svg {...SVG} aria-hidden>
      <rect width="360" height="280" fill="#f8fafc" />
      <polygon points="90,210 230,210 270,160 130,160" fill="#dbeafe" stroke={INK} strokeWidth="2" />
      <polygon points="180,48 90,210 230,210" fill="#eff6ff" stroke={INK} strokeWidth="2" />
      <polygon points="180,48 230,210 270,160" fill="#bfdbfe" stroke={INK} strokeWidth="2" />
      <line x1="180" y1="48" x2="180" y2="185" stroke={INK} strokeDasharray="5 4" />
      <text x="188" y="120" fontSize="13" fontWeight="700" fill={ACCENT}>
        h = {h}
      </text>
      <text x="130" y="236" fontSize="13" fontWeight="700" fill={ACCENT}>
        base: {base}
      </text>
    </svg>
  )
}

function SphereFigure({ r, v }: { r?: string; v?: string }) {
  return (
    <svg {...SVG} aria-hidden>
      <rect width="360" height="280" fill="#f8fafc" />
      <circle cx="180" cy="140" r="78" fill="#dbeafe" stroke={INK} strokeWidth="2.2" />
      <ellipse cx="180" cy="140" rx="78" ry="26" fill="none" stroke={INK} strokeWidth="1.6" />
      <line x1="180" y1="140" x2="258" y2="140" stroke={ACCENT} strokeWidth="1.8" />
      <text x="198" y="132" fontSize="13" fontWeight="700" fill={ACCENT}>
        {r ? `r = ${r}` : v ? `V = ${v}` : ''}
      </text>
    </svg>
  )
}

function PrismFigure({ l, w, h }: { l: string; w: string; h: string }) {
  return (
    <svg {...SVG} aria-hidden>
      <rect width="360" height="280" fill="#f8fafc" />
      <polygon points="80,90 220,90 270,50 130,50" fill="#93c5fd" stroke={INK} strokeWidth="2" />
      <polygon points="80,90 220,90 220,210 80,210" fill="#dbeafe" stroke={INK} strokeWidth="2" />
      <polygon points="220,90 270,50 270,170 220,210" fill="#bfdbfe" stroke={INK} strokeWidth="2" />
      <text x="128" y="158" fontSize="13" fontWeight="700" fill={ACCENT}>
        {l}
      </text>
      <text x="236" y="158" fontSize="13" fontWeight="700" fill={ACCENT}>
        {w}
      </text>
      <text x="88" y="80" fontSize="13" fontWeight="700" fill={ACCENT}>
        {h}
      </text>
    </svg>
  )
}

function RectCirclesFigure({ r }: { r: string }) {
  return (
    <svg {...SVG} aria-hidden>
      <rect width="360" height="280" fill="#f8fafc" />
      <rect x="40" y="78" width="280" height="140" fill="#eff6ff" stroke={INK} strokeWidth="2" />
      <circle cx="110" cy="148" r="70" fill="#dbeafe" stroke={INK} strokeWidth="2" />
      <circle cx="250" cy="148" r="70" fill="#dbeafe" stroke={INK} strokeWidth="2" />
      <text x="96" y="152" fontSize="13" fontWeight="700" fill={ACCENT}>
        r={r}
      </text>
      <text x="236" y="152" fontSize="13" fontWeight="700" fill={ACCENT}>
        r={r}
      </text>
    </svg>
  )
}

function AnnulusFigure({ inner, thick }: { inner: string; thick: string }) {
  return (
    <svg {...SVG} aria-hidden>
      <rect width="360" height="280" fill="#f8fafc" />
      <circle cx="180" cy="148" r="88" fill="#93c5fd" stroke={INK} strokeWidth="2" />
      <circle cx="180" cy="148" r="58" fill="#f8fafc" stroke={INK} strokeWidth="2" />
      <line x1="180" y1="148" x2="238" y2="148" stroke={ACCENT} strokeWidth="1.8" />
      <text x="186" y="140" fontSize="12" fontWeight="700" fill={ACCENT}>
        inside {inner}
      </text>
      <text x="232" y="118" fontSize="12" fontWeight="700" fill={ACCENT}>
        thick {thick}
      </text>
    </svg>
  )
}

function TireFigure({ spoke, width, label }: { spoke: string; width: string; label: string }) {
  return (
    <svg {...SVG} aria-hidden>
      <rect width="360" height="280" fill="#f8fafc" />
      <circle cx="180" cy="148" r="92" fill="#1e293b" stroke={INK} strokeWidth="2" />
      <circle cx="180" cy="148" r="68" fill="#94a3b8" stroke={INK} strokeWidth="2" />
      <circle cx="180" cy="148" r="18" fill="#e2e8f0" stroke={INK} strokeWidth="2" />
      <line x1="180" y1="148" x2="248" y2="148" stroke="#f8fafc" strokeWidth="3" />
      <text x="188" y="140" fontSize="12" fontWeight="700" fill="#fff">
        spoke {spoke}
      </text>
      <text x="196" y="78" fontSize="12" fontWeight="700" fill="#fff">
        width {width}
      </text>
      <text x="180" y="268" textAnchor="middle" fontSize="13" fontWeight="700" fill={INK}>
        {label}
      </text>
    </svg>
  )
}

function SemicirclesFigure() {
  return (
    <svg {...SVG} aria-hidden>
      <rect width="360" height="280" fill="#f8fafc" />
      <line x1="40" y1="160" x2="320" y2="160" stroke="#94a3b8" strokeWidth="1.4" />
      <path d="M60 160 A70 70 0 0 1 200 160" fill="#dbeafe" stroke={INK} strokeWidth="2" />
      <path d="M160 160 A50 50 0 0 0 260 160" fill="#bfdbfe" stroke={INK} strokeWidth="2" />
      <path d="M220 160 A40 40 0 0 1 300 160" fill="#93c5fd" stroke={INK} strokeWidth="2" />
      <text x="120" y="110" fontSize="12" fontWeight="700" fill={ACCENT}>
        y = +
      </text>
      <text x="188" y="210" fontSize="12" fontWeight="700" fill={ACCENT}>
        y = −
      </text>
      <text x="248" y="128" fontSize="12" fontWeight="700" fill={ACCENT}>
        y = +
      </text>
    </svg>
  )
}

export function GeoMathFigureView({ figure }: GeoMathFigureViewProps): ReactElement {
  switch (figure.kind) {
    case 'circle':
      return <CircleDiagram spec={figure.spec} />
    case 'sector':
      return <SectorFigure {...figure} />
    case 'coord':
      return <CoordFigure h={figure.h} k={figure.k} r={figure.r} extra={figure.extra} />
    case 'cylinder':
      return <CylinderFigure r={figure.r} h={figure.h} />
    case 'cone':
      return <ConeFigure r={figure.r} h={figure.h} slant={figure.slant} angle={figure.angle} />
    case 'pyramid':
      return <PyramidFigure base={figure.base} h={figure.h} />
    case 'sphere':
      return <SphereFigure r={figure.r} v={figure.v} />
    case 'prism':
      return <PrismFigure l={figure.l} w={figure.w} h={figure.h} />
    case 'rect-circles':
      return <RectCirclesFigure r={figure.r} />
    case 'annulus':
      return <AnnulusFigure inner={figure.inner} thick={figure.thick} />
    case 'tire':
      return <TireFigure spoke={figure.spoke} width={figure.width} label={figure.label} />
    case 'semicircles':
      return <SemicirclesFigure />
  }
}

