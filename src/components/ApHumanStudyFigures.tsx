import type { ReactElement } from 'react'
import type { ApHumanFigureId } from '../lib/apHumanGuide'

interface ApHumanStudyFigureProps {
  id: ApHumanFigureId
}

const SVG = {
  className: 'bio-struct-svg',
  viewBox: '0 0 360 210',
} as const

function Legend({
  items,
}: {
  items: { fill: string; label: string }[]
}) {
  return (
    <g>
      {items.map((item, index) => (
        <g key={item.label}>
          <rect x={268} y={18 + index * 22} width="16" height="16" rx="3" fill={item.fill} stroke="#334155" />
          <text x={290} y={31 + index * 22} fontSize="11" fill="#1e293b">
            {item.label}
          </text>
        </g>
      ))}
    </g>
  )
}

function LandOutline() {
  return (
    <path
      d="M28 48 C58 28 92 36 118 52 C142 40 168 34 198 48 C228 38 252 52 268 78 C248 92 236 118 248 148 C220 162 178 170 138 164 C98 172 62 158 42 132 C24 108 18 78 28 48 Z"
      fill="#e2e8f0"
      stroke="#334155"
      strokeWidth="2"
    />
  )
}

function Choropleth() {
  return (
    <svg {...SVG} aria-hidden>
      <rect width="360" height="210" fill="#f8fafc" />
      <text x="18" y="22" fontSize="12" fontWeight="700" fill="#1e293b">
        Percent of households with broadband
      </text>
      <path d="M28 50 L118 42 L118 118 L28 126 Z" fill="#fef3c7" stroke="#334155" />
      <path d="M118 42 L198 48 L206 120 L118 118 Z" fill="#fde68a" stroke="#334155" />
      <path d="M198 48 L268 70 L252 148 L206 120 Z" fill="#f59e0b" stroke="#334155" />
      <path d="M28 126 L118 118 L128 168 L42 158 Z" fill="#fbbf24" stroke="#334155" />
      <path d="M118 118 L206 120 L178 172 L128 168 Z" fill="#d97706" stroke="#334155" />
      <Legend
        items={[
          { fill: '#fef3c7', label: 'Low' },
          { fill: '#fde68a', label: '' },
          { fill: '#fbbf24', label: '' },
          { fill: '#f59e0b', label: '' },
          { fill: '#d97706', label: 'High' },
        ]}
      />
    </svg>
  )
}

function DotDensity() {
  const dots: [number, number][] = [
    [52, 72], [64, 88], [78, 70], [90, 96], [48, 108],
    [132, 64], [148, 78], [160, 92], [142, 108], [170, 70], [126, 98],
    [210, 86], [224, 102], [238, 90], [218, 118], [246, 128], [200, 130],
    [80, 140], [96, 152], [70, 158], [186, 150], [154, 146],
  ]
  return (
    <svg {...SVG} aria-hidden>
      <rect width="360" height="210" fill="#f8fafc" />
      <text x="18" y="22" fontSize="12" fontWeight="700" fill="#1e293b">
        Coffee shops
      </text>
      <LandOutline />
      {dots.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="4" fill="#b45309" />
      ))}
      <circle cx="276" cy="26" r="4" fill="#b45309" />
      <text x="286" y="30" fontSize="11" fill="#1e293b">
        1 shop
      </text>
    </svg>
  )
}

function GraduatedSymbol() {
  const cities: { x: number; y: number; r: number; label: string }[] = [
    { x: 86, y: 92, r: 10, label: 'A' },
    { x: 150, y: 78, r: 22, label: 'B' },
    { x: 214, y: 118, r: 16, label: 'C' },
    { x: 118, y: 142, r: 8, label: 'D' },
  ]
  return (
    <svg {...SVG} aria-hidden>
      <rect width="360" height="210" fill="#f8fafc" />
      <text x="18" y="22" fontSize="12" fontWeight="700" fill="#1e293b">
        City population
      </text>
      <LandOutline />
      {cities.map((city) => (
        <g key={city.label}>
          <circle cx={city.x} cy={city.y} r={city.r} fill="#f59e0b" fillOpacity="0.75" stroke="#92400e" />
          <text x={city.x} y={city.y + 4} textAnchor="middle" fontSize="11" fontWeight="700" fill="#1e293b">
            {city.label}
          </text>
        </g>
      ))}
      <circle cx="284" cy="28" r="6" fill="#f59e0b" stroke="#92400e" />
      <text x="296" y="32" fontSize="11" fill="#1e293b">
        smaller
      </text>
      <circle cx="284" cy="54" r="12" fill="#f59e0b" stroke="#92400e" />
      <text x="300" y="58" fontSize="11" fill="#1e293b">
        larger
      </text>
    </svg>
  )
}

function Cartogram() {
  return (
    <svg {...SVG} aria-hidden>
      <rect width="360" height="210" fill="#f8fafc" />
      <text x="18" y="22" fontSize="12" fontWeight="700" fill="#1e293b">
        Sized by total votes (not land area)
      </text>
      <rect x="30" y="48" width="70" height="52" fill="#fde68a" stroke="#334155" />
      <text x="65" y="78" textAnchor="middle" fontSize="12" fontWeight="700">
        A
      </text>
      <rect x="108" y="40" width="118" height="96" fill="#f59e0b" stroke="#334155" />
      <text x="167" y="92" textAnchor="middle" fontSize="14" fontWeight="700">
        B
      </text>
      <rect x="234" y="56" width="46" height="40" fill="#fef3c7" stroke="#334155" />
      <text x="257" y="80" textAnchor="middle" fontSize="12" fontWeight="700">
        C
      </text>
      <rect x="30" y="108" width="70" height="70" fill="#fbbf24" stroke="#334155" />
      <text x="65" y="148" textAnchor="middle" fontSize="12" fontWeight="700">
        D
      </text>
      <rect x="108" y="144" width="54" height="36" fill="#fef3c7" stroke="#334155" />
      <text x="135" y="166" textAnchor="middle" fontSize="12" fontWeight="700">
        E
      </text>
      <rect x="170" y="144" width="110" height="36" fill="#d97706" stroke="#334155" />
      <text x="225" y="166" textAnchor="middle" fontSize="12" fontWeight="700">
        F
      </text>
    </svg>
  )
}

function Isoline() {
  return (
    <svg {...SVG} aria-hidden>
      <rect width="360" height="210" fill="#f8fafc" />
      <text x="18" y="22" fontSize="12" fontWeight="700" fill="#1e293b">
        Elevation (meters)
      </text>
      <ellipse cx="170" cy="118" rx="118" ry="72" fill="none" stroke="#64748b" strokeWidth="2" />
      <ellipse cx="170" cy="118" rx="86" ry="50" fill="none" stroke="#475569" strokeWidth="2" />
      <ellipse cx="170" cy="118" rx="52" ry="28" fill="none" stroke="#1e293b" strokeWidth="2" />
      <ellipse cx="170" cy="118" rx="22" ry="12" fill="#fde68a" stroke="#92400e" strokeWidth="2" />
      <text x="292" y="70" fontSize="11" fill="#334155">
        100
      </text>
      <text x="262" y="92" fontSize="11" fill="#334155">
        200
      </text>
      <text x="228" y="112" fontSize="11" fill="#334155">
        300
      </text>
      <text x="164" y="122" textAnchor="middle" fontSize="11" fontWeight="700" fill="#92400e">
        400
      </text>
    </svg>
  )
}

function MercatorArea() {
  return (
    <svg {...SVG} aria-hidden>
      <rect width="360" height="210" fill="#eff6ff" />
      <text x="18" y="22" fontSize="12" fontWeight="700" fill="#1e293b">
        Mercator world map (not equal-area)
      </text>
      <ellipse cx="250" cy="58" rx="58" ry="36" fill="#86efac" stroke="#166534" strokeWidth="2" />
      <text x="250" y="54" textAnchor="middle" fontSize="12" fontWeight="700" fill="#14532d">
        Greenland
      </text>
      <text x="250" y="70" textAnchor="middle" fontSize="10" fill="#166534">
        looks huge
      </text>
      <path
        d="M70 78 C96 70 118 86 128 110 C142 128 136 158 108 168 C78 176 48 160 42 136 C36 108 50 86 70 78 Z"
        fill="#fbbf24"
        stroke="#92400e"
        strokeWidth="2"
      />
      <text x="88" y="124" textAnchor="middle" fontSize="12" fontWeight="700" fill="#78350f">
        Africa
      </text>
      <text x="88" y="140" textAnchor="middle" fontSize="10" fill="#92400e">
        true area much larger
      </text>
      <text x="18" y="198" fontSize="11" fill="#475569">
        High-latitude land is stretched. Direction is preserved.
      </text>
    </svg>
  )
}

function GisLayers() {
  const layers = [
    { y: 42, label: 'Roads', fill: '#fecaca' },
    { y: 86, label: 'Land use', fill: '#bbf7d0' },
    { y: 130, label: 'Elevation', fill: '#fde68a' },
  ]
  return (
    <svg {...SVG} aria-hidden>
      <rect width="360" height="210" fill="#f8fafc" />
      <text x="18" y="24" fontSize="12" fontWeight="700" fill="#1e293b">
        GIS data layers
      </text>
      {layers.map((layer, index) => (
        <g key={layer.label}>
          <rect
            x={40 + index * 18}
            y={layer.y}
            width="210"
            height="44"
            rx="8"
            fill={layer.fill}
            fillOpacity="0.92"
            stroke="#334155"
          />
          <text x={150 + index * 18} y={layer.y + 28} textAnchor="middle" fontSize="13" fontWeight="700">
            {layer.label}
          </text>
        </g>
      ))}
    </svg>
  )
}

function DistanceDecay() {
  return (
    <svg {...SVG} aria-hidden>
      <rect width="360" height="210" fill="#f8fafc" />
      <text x="18" y="22" fontSize="12" fontWeight="700" fill="#1e293b">
        Interaction vs. distance
      </text>
      <line x1="48" y1="170" x2="320" y2="170" stroke="#334155" strokeWidth="2" />
      <line x1="48" y1="170" x2="48" y2="36" stroke="#334155" strokeWidth="2" />
      <text x="168" y="196" fontSize="12" fill="#334155">
        Distance
      </text>
      <text x="12" y="110" fontSize="12" fill="#334155" transform="rotate(-90 12 110)">
        Interaction
      </text>
      <path d="M52 48 C90 52 130 70 170 100 C210 132 250 150 312 162" fill="none" stroke="#d97706" strokeWidth="3" />
      <circle cx="58" cy="50" r="4" fill="#b45309" />
      <circle cx="300" cy="160" r="4" fill="#b45309" />
    </svg>
  )
}

function ScaleNested() {
  return (
    <svg {...SVG} aria-hidden>
      <rect width="360" height="210" fill="#f8fafc" />
      <text x="18" y="22" fontSize="12" fontWeight="700" fill="#1e293b">
        Nested scales of analysis
      </text>
      <rect x="28" y="40" width="304" height="150" fill="#dbeafe" stroke="#1d4ed8" />
      <text x="40" y="58" fontSize="12" fontWeight="700" fill="#1e3a8a">
        Global
      </text>
      <rect x="52" y="68" width="256" height="110" fill="#fde68a" stroke="#b45309" />
      <text x="64" y="86" fontSize="12" fontWeight="700" fill="#78350f">
        National
      </text>
      <rect x="78" y="96" width="204" height="70" fill="#bbf7d0" stroke="#15803d" />
      <text x="90" y="114" fontSize="12" fontWeight="700" fill="#14532d">
        Regional
      </text>
      <rect x="108" y="122" width="144" height="34" fill="#fecaca" stroke="#b91c1c" />
      <text x="180" y="144" textAnchor="middle" fontSize="12" fontWeight="700" fill="#7f1d1d">
        Local
      </text>
    </svg>
  )
}

function ThreeRegions() {
  return (
    <svg {...SVG} aria-hidden>
      <rect width="360" height="210" fill="#f8fafc" />
      <text x="18" y="20" fontSize="12" fontWeight="700" fill="#1e293b">
        Three ways to define a region
      </text>
      <rect x="16" y="36" width="104" height="150" rx="10" fill="#fff" stroke="#cbd5e1" />
      <text x="68" y="56" textAnchor="middle" fontSize="11" fontWeight="700">
        Map 1
      </text>
      <rect x="30" y="68" width="76" height="90" fill="#fde68a" stroke="#b45309" />
      <text x="68" y="116" textAnchor="middle" fontSize="10">
        same
      </text>
      <text x="68" y="130" textAnchor="middle" fontSize="10">
        trait
      </text>
      <rect x="128" y="36" width="104" height="150" rx="10" fill="#fff" stroke="#cbd5e1" />
      <text x="180" y="56" textAnchor="middle" fontSize="11" fontWeight="700">
        Map 2
      </text>
      <circle cx="180" cy="108" r="10" fill="#f59e0b" stroke="#92400e" />
      <line x1="180" y1="108" x2="152" y2="86" stroke="#92400e" />
      <line x1="180" y1="108" x2="208" y2="84" stroke="#92400e" />
      <line x1="180" y1="108" x2="150" y2="132" stroke="#92400e" />
      <line x1="180" y1="108" x2="210" y2="136" stroke="#92400e" />
      <line x1="180" y1="108" x2="180" y2="72" stroke="#92400e" />
      <text x="180" y="168" textAnchor="middle" fontSize="10">
        node + links
      </text>
      <rect x="240" y="36" width="104" height="150" rx="10" fill="#fff" stroke="#cbd5e1" />
      <text x="292" y="56" textAnchor="middle" fontSize="11" fontWeight="700">
        Map 3
      </text>
      <ellipse cx="292" cy="112" rx="38" ry="28" fill="#fef3c7" stroke="#b45309" strokeDasharray="4 3" />
      <text x="292" y="116" textAnchor="middle" fontSize="10">
        fuzzy
      </text>
      <text x="292" y="168" textAnchor="middle" fontSize="10">
        mental map
      </text>
    </svg>
  )
}

function ClusterDisperse() {
  const cluster = [
    [58, 90], [70, 98], [64, 110], [80, 88], [86, 104], [74, 118], [52, 104],
  ]
  const disperse = [
    [200, 70], [248, 86], [300, 78], [214, 128], [268, 140], [318, 120], [236, 108],
  ]
  return (
    <svg {...SVG} aria-hidden>
      <rect width="360" height="210" fill="#f8fafc" />
      <text x="48" y="28" fontSize="12" fontWeight="700" fill="#1e293b">
        Pattern A
      </text>
      <text x="230" y="28" fontSize="12" fontWeight="700" fill="#1e293b">
        Pattern B
      </text>
      <rect x="18" y="40" width="150" height="148" rx="10" fill="#fff" stroke="#cbd5e1" />
      <rect x="192" y="40" width="150" height="148" rx="10" fill="#fff" stroke="#cbd5e1" />
      {cluster.map(([x, y], i) => (
        <circle key={`c${i}`} cx={x} cy={y} r="6" fill="#d97706" />
      ))}
      {disperse.map(([x, y], i) => (
        <circle key={`d${i}`} cx={x} cy={y} r="6" fill="#2563eb" />
      ))}
    </svg>
  )
}

function SiteSituation() {
  return (
    <svg {...SVG} aria-hidden>
      <rect width="360" height="210" fill="#eff6ff" />
      <text x="18" y="22" fontSize="12" fontWeight="700" fill="#1e293b">
        Port city on a river confluence
      </text>
      <path d="M40 40 C70 80 80 110 70 200" fill="none" stroke="#60a5fa" strokeWidth="10" />
      <path d="M200 30 C160 90 140 120 130 200" fill="none" stroke="#60a5fa" strokeWidth="10" />
      <circle cx="118" cy="132" r="16" fill="#f59e0b" stroke="#92400e" strokeWidth="2" />
      <text x="118" y="136" textAnchor="middle" fontSize="11" fontWeight="700">
        City
      </text>
      <text x="118" y="168" textAnchor="middle" fontSize="11" fill="#1e293b">
        Site: wet point, flat land
      </text>
      <path d="M134 124 L210 88" stroke="#b45309" strokeWidth="2" markerEnd="url(#arrow)" />
      <text x="216" y="84" fontSize="11" fill="#78350f">
        Markets inland
      </text>
      <path d="M130 140 L230 160" stroke="#b45309" strokeWidth="2" />
      <text x="236" y="166" fontSize="11" fill="#78350f">
        Ocean trade
      </text>
      <text x="210" y="198" fontSize="11" fill="#475569">
        Situation: links to other places
      </text>
    </svg>
  )
}

const FIGURES: Record<ApHumanFigureId, () => ReactElement> = {
  choropleth: Choropleth,
  'dot-density': DotDensity,
  'graduated-symbol': GraduatedSymbol,
  cartogram: Cartogram,
  isoline: Isoline,
  'mercator-area': MercatorArea,
  'gis-layers': GisLayers,
  'distance-decay': DistanceDecay,
  'scale-nested': ScaleNested,
  'three-regions': ThreeRegions,
  'cluster-disperse': ClusterDisperse,
  'site-situation': SiteSituation,
}

export function ApHumanStudyFigure({ id }: ApHumanStudyFigureProps) {
  const Figure = FIGURES[id]
  return (
    <div className="bio-struct">
      <Figure />
    </div>
  )
}
