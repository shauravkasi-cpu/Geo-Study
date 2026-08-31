import { useMemo } from 'react'
import { geoEqualEarth, geoMercator, geoProjection } from 'd3-geo'
import type { GeoProjection } from 'd3-geo'
import {
  ComposableMap,
  Geographies,
  Geography,
  Graticule,
  Marker,
} from 'react-simple-maps'
import topoData from 'world-atlas/countries-110m.json'
import type { ApHumanStimulusId } from '../lib/apHumanStudy'
import { resolveMapGeoIso } from '../lib/mapGeoIndex'
import { getCountryCentroid } from '../lib/hints'

const CAPTIONS: Record<ApHumanStimulusId, string> = {
  'income-choropleth': 'Figure 1. Median household income by U.S. census region',
  'dot-crime': 'Figure 2. Reported thefts in a metropolitan area (1 dot = 10 incidents)',
  'cartogram-pop': 'Figure 3. True land area compared with a population cartogram',
  'isoline-temp': 'Figure 4. Average January temperature (°F)',
  'grad-symbol': 'Figure 5. City population shown by proportional symbols',
  'mercator-compare': 'Figure 6. Greenland and Africa on Mercator and Gall-Peters',
  'settlement-pattern': 'Figure 7. Distribution of elementary schools',
  'gis-layers': 'Figure 8. Selected GIS data layers for a store-location study',
  'forest-change': 'Figure 9. Classified satellite land cover, 1990 and 2020',
  'hdi-table': 'Table 1. Selected development indicators',
  'sector-chart': 'Figure 10. Percent of labor force by economic sector',
  'core-periphery': 'Figure 11. Wallerstein’s world-systems model (simplified)',
  'dependency-flow': 'Figure 12. Flows in dependency theory',
  'brandt-line': 'Figure 13. The Brandt Line (North–South divide)',
  'gii-table': 'Table 2. Gender Inequality Index and related measures',
  'energy-chart': 'Figure 14. Energy use and renewable share',
}

const AFRICA = new Set([
  'DZA', 'AGO', 'BEN', 'BWA', 'BFA', 'BDI', 'CPV', 'CMR', 'CAF', 'TCD', 'COM',
  'COD', 'COG', 'CIV', 'DJI', 'EGY', 'GNQ', 'ERI', 'SWZ', 'ETH', 'GAB', 'GMB',
  'GHA', 'GIN', 'GNB', 'KEN', 'LSO', 'LBR', 'LBY', 'MDG', 'MWI', 'MLI', 'MRT',
  'MUS', 'MAR', 'MOZ', 'NAM', 'NER', 'NGA', 'RWA', 'STP', 'SEN', 'SYC', 'SLE',
  'SOM', 'ZAF', 'SSD', 'SDN', 'TZA', 'TGO', 'TUN', 'UGA', 'ZMB', 'ZWE',
])

const BRANDT_NORTH = new Set([
  'USA', 'CAN', 'GRL', 'GBR', 'IRL', 'FRA', 'ESP', 'PRT', 'DEU', 'ITA', 'NLD',
  'BEL', 'LUX', 'CHE', 'AUT', 'SWE', 'NOR', 'DNK', 'FIN', 'ISL', 'POL', 'CZE',
  'SVK', 'HUN', 'SVN', 'HRV', 'GRC', 'JPN', 'KOR', 'TWN', 'AUS', 'NZL', 'ISR',
  'RUS', 'EST', 'LVA', 'LTU', 'BLR', 'UKR', 'ROU', 'BGR',
])

const BRANDT_COORDS: [number, number][] = [
  [-117, 32], [-97, 26], [-90, 22], [-16, 28], [-9, 36], [12, 37], [35, 31],
  [62, 25], [88, 27], [122, 32], [145, 38],
]

/** Gall-Peters: cylindrical equal-area with standard parallel 45°. */
function gallPetersRaw(lambda: number, phi: number): [number, number] {
  const k = Math.SQRT1_2
  return [lambda * k, Math.sin(phi) / k]
}

export function ApHumanStimulus({ id }: { id: ApHumanStimulusId }) {
  return (
    <figure className="aph-figure">
      <div className="aph-figure-frame">{renderStimulus(id)}</div>
      <figcaption className="aph-figure-caption">{CAPTIONS[id]}</figcaption>
    </figure>
  )
}

function renderStimulus(id: ApHumanStimulusId) {
  switch (id) {
    case 'income-choropleth':
      return <IncomeChoropleth />
    case 'dot-crime':
      return <DotCrime />
    case 'cartogram-pop':
      return <CartogramPop />
    case 'isoline-temp':
      return <IsolineTemp />
    case 'grad-symbol':
      return <GradSymbol />
    case 'mercator-compare':
      return <MercatorCompare />
    case 'settlement-pattern':
      return <SettlementPattern />
    case 'gis-layers':
      return <GisLayers />
    case 'forest-change':
      return <ForestChange />
    case 'hdi-table':
      return <HdiTable />
    case 'sector-chart':
      return <SectorChart />
    case 'core-periphery':
      return <CorePeriphery />
    case 'dependency-flow':
      return <DependencyFlow />
    case 'brandt-line':
      return <BrandtLine />
    case 'gii-table':
      return <GiiTable />
    case 'energy-chart':
      return <EnergyChart />
  }
}

function isoOf(geo: unknown): string | null {
  const item = geo as { properties?: { name?: string }; id?: string | number }
  return resolveMapGeoIso(item.properties?.name ?? '', item.id)
}

function MiniWorld({
  width,
  height,
  projection,
  fillForIso,
  showGraticule = false,
  markers = [],
  overlayPath,
}: {
  width: number
  height: number
  projection: GeoProjection
  fillForIso: (iso: string | null) => string
  showGraticule?: boolean
  markers?: { coordinates: [number, number]; label: string; dy?: number }[]
  overlayPath?: string
}) {
  return (
    <div className="aph-map-wrap" style={{ aspectRatio: `${width} / ${height}` }}>
      <ComposableMap
        width={width}
        height={height}
        projection={projection as never}
        style={{ width: '100%', height: 'auto', display: 'block' }}
      >
        {showGraticule ? (
          <Graticule stroke="#94a3b8" strokeWidth={0.4} strokeOpacity={0.55} />
        ) : null}
        <Geographies geography={topoData}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const iso = isoOf(geo)
              const item = geo as { rsmKey: string }
              return (
                <Geography
                  key={item.rsmKey}
                  geography={geo}
                  style={{
                    default: {
                      fill: fillForIso(iso),
                      stroke: '#475569',
                      strokeWidth: 0.35,
                      outline: 'none',
                      pointerEvents: 'none',
                    },
                    hover: {
                      fill: fillForIso(iso),
                      stroke: '#475569',
                      strokeWidth: 0.35,
                      outline: 'none',
                      pointerEvents: 'none',
                    },
                    pressed: {
                      fill: fillForIso(iso),
                      outline: 'none',
                      pointerEvents: 'none',
                    },
                  }}
                />
              )
            })
          }
        </Geographies>
        {markers.map((marker) => (
          <Marker key={marker.label} coordinates={marker.coordinates}>
            <text
              textAnchor="middle"
              y={marker.dy ?? 0}
              fontSize={9}
              fontWeight={700}
              fill="#0f172a"
              stroke="#fff"
              strokeWidth={2.4}
              paintOrder="stroke"
              style={{ pointerEvents: 'none' }}
            >
              {marker.label}
            </text>
          </Marker>
        ))}
      </ComposableMap>
      {overlayPath ? (
        <svg className="aph-map-overlay" viewBox={`0 0 ${width} ${height}`} aria-hidden>
          <path
            d={overlayPath}
            fill="none"
            stroke="#0f172a"
            strokeWidth="2.4"
            strokeDasharray="8 5"
            strokeLinecap="round"
          />
        </svg>
      ) : null}
    </div>
  )
}

function IncomeChoropleth() {
  return (
    <svg viewBox="0 0 460 250" className="aph-svg" aria-hidden>
      <defs>
        <linearGradient id="aphIncomeBar" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#dbeafe" />
          <stop offset="50%" stopColor="#60a5fa" />
          <stop offset="100%" stopColor="#1e3a8a" />
        </linearGradient>
        <filter id="aphSoft" x="-8%" y="-8%" width="116%" height="116%">
          <feDropShadow dx="0" dy="1.5" stdDeviation="1.6" floodOpacity="0.18" />
        </filter>
      </defs>
      <rect x="8" y="8" width="444" height="234" rx="10" fill="#f8fafc" />
      <g filter="url(#aphSoft)">
        <path d="M48 86 C 62 54, 118 48, 168 52 C 188 78, 198 92, 208 118 L 168 168 C 128 176, 86 164, 62 138 Z" fill="#93c5fd" stroke="#1e3a8a" strokeWidth="1.2" />
        <path d="M168 52 C 214 46, 268 50, 298 62 C 304 92, 300 128, 286 148 L 208 118 C 198 92, 188 78, 168 52 Z" fill="#60a5fa" stroke="#1e3a8a" strokeWidth="1.2" />
        <path d="M298 62 C 338 50, 378 54, 402 78 L 406 118 C 378 128, 348 122, 328 108 L 286 148 C 300 128, 304 92, 298 62 Z" fill="#1d4ed8" stroke="#1e3a8a" strokeWidth="1.2" />
        <path d="M62 138 C 86 164, 128 176, 168 168 L 208 118 L 286 148 C 300 168, 318 186, 338 198 L 322 226 C 270 232, 210 224, 168 210 C 120 214, 78 198, 58 172 Z" fill="#3b82f6" stroke="#1e3a8a" strokeWidth="1.2" />
        <path d="M338 198 C 352 208, 362 222, 358 236 L 338 238 C 328 226, 322 214, 322 226 Z" fill="#3b82f6" stroke="#1e3a8a" strokeWidth="1.2" />
      </g>
      <text x="118" y="118" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0f172a">West</text>
      <text x="236" y="98" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0f172a">Midwest</text>
      <text x="348" y="96" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">Northeast</text>
      <text x="196" y="188" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0f172a">South</text>
      <rect x="412" y="28" width="14" height="96" rx="2" fill="url(#aphIncomeBar)" stroke="#1e3a8a" />
      <text x="428" y="24" fontSize="9" fill="#334155">High</text>
      <text x="428" y="136" fontSize="9" fill="#334155">Low</text>
      <text x="20" y="244" fontSize="10" fill="#475569">Darker blue = higher median household income</text>
    </svg>
  )
}

function DotCrime() {
  const downtown = [
    [168, 98], [176, 104], [184, 96], [192, 108], [172, 114], [198, 100],
    [180, 120], [188, 90], [164, 108], [200, 116], [174, 92], [190, 124],
    [182, 104], [170, 122], [196, 88], [160, 96], [206, 104], [178, 86],
  ]
  const fringe = [
    [86, 64], [72, 148], [54, 108], [118, 52], [248, 56], [292, 70],
    [310, 132], [286, 168], [240, 176], [96, 176], [130, 160], [258, 118],
  ]
  return (
    <svg viewBox="0 0 400 230" className="aph-svg" aria-hidden>
      <rect x="10" y="10" width="380" height="196" rx="8" fill="#f1f5f9" stroke="#94a3b8" />
      {Array.from({ length: 9 }, (_, i) => (
        <line key={`v${i}`} x1={40 + i * 38} y1="18" x2={40 + i * 38} y2="196" stroke="#cbd5e1" strokeWidth="0.7" />
      ))}
      {Array.from({ length: 6 }, (_, i) => (
        <line key={`h${i}`} x1="18" y1={36 + i * 28} x2="382" y2={36 + i * 28} stroke="#cbd5e1" strokeWidth="0.7" />
      ))}
      <path d="M18 128 C 90 118, 150 142, 220 134 S 330 118, 382 128" fill="none" stroke="#38bdf8" strokeWidth="10" opacity="0.35" />
      <rect x="148" y="78" width="64" height="52" fill="#e2e8f0" stroke="#64748b" strokeDasharray="3 2" />
      <text x="180" y="108" textAnchor="middle" fontSize="9" fill="#475569">Downtown</text>
      {[...downtown, ...fringe].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="3.4" fill="#0f172a" />
      ))}
      <text x="18" y="222" fontSize="10" fill="#475569">Each dot = 10 reported thefts</text>
    </svg>
  )
}

function CartogramPop() {
  const trueArea = useMemo(
    () => geoEqualEarth().scale(72).translate([108, 92]),
    [],
  )
  return (
    <div className="aph-figure-pair">
      <div>
        <p className="aph-figure-panel-label">True land area</p>
        <MiniWorld
          width={216}
          height={168}
          projection={trueArea}
          fillForIso={(iso) =>
            iso === 'RUS' ? '#fb923c' : iso === 'CHN' ? '#fdba74' : iso === 'IND' ? '#fed7aa' : '#e2e8f0'
          }
          markers={[
            { coordinates: getCountryCentroid('RUS') ?? [90, 60], label: 'Russia' },
            { coordinates: getCountryCentroid('CHN') ?? [104, 35], label: 'China' },
            { coordinates: getCountryCentroid('IND') ?? [78, 22], label: 'India', dy: 10 },
          ]}
        />
      </div>
      <div>
        <p className="aph-figure-panel-label">Population cartogram</p>
        <svg viewBox="0 0 216 168" className="aph-svg" aria-hidden>
          <rect x="0" y="0" width="216" height="168" rx="8" fill="#fff7ed" />
          <rect x="18" y="78" width="36" height="42" rx="6" fill="#fb923c" stroke="#9a3412" />
          <text x="36" y="103" textAnchor="middle" fontSize="9" fontWeight="700">Rus.</text>
          <rect x="62" y="36" width="72" height="84" rx="8" fill="#f59e0b" stroke="#9a3412" />
          <text x="98" y="82" textAnchor="middle" fontSize="11" fontWeight="700">China</text>
          <rect x="140" y="44" width="62" height="76" rx="8" fill="#f59e0b" stroke="#9a3412" />
          <text x="171" y="86" textAnchor="middle" fontSize="11" fontWeight="700">India</text>
          <text x="108" y="156" textAnchor="middle" fontSize="9" fill="#7c2d12">Area scaled to population</text>
        </svg>
      </div>
    </div>
  )
}

function IsolineTemp() {
  return (
    <svg viewBox="0 0 420 230" className="aph-svg" aria-hidden>
      <defs>
        <linearGradient id="aphTempFill" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#dbeafe" />
          <stop offset="55%" stopColor="#93c5fd" />
          <stop offset="100%" stopColor="#fecaca" />
        </linearGradient>
      </defs>
      <rect x="10" y="10" width="400" height="188" rx="8" fill="url(#aphTempFill)" stroke="#94a3b8" />
      <path d="M24 176 C 90 168, 160 162, 240 140 S 340 92, 400 70" fill="none" stroke="#1d4ed8" strokeWidth="2" />
      <path d="M24 138 C 100 132, 180 124, 250 108 S 340 78, 400 62" fill="none" stroke="#2563eb" strokeWidth="2" />
      <path d="M24 96 C 110 94, 200 92, 268 82 S 350 66, 400 58" fill="none" stroke="#dc2626" strokeWidth="2.2" />
      <text x="48" y="172" fontSize="10" fontWeight="700" fill="#1e3a8a">30°</text>
      <text x="48" y="134" fontSize="10" fontWeight="700" fill="#1e3a8a">40°</text>
      <text x="48" y="92" fontSize="10" fontWeight="700" fill="#991b1b">50°</text>
      <text x="372" y="54" fontSize="9" fill="#7f1d1d">tight</text>
      <text x="28" y="218" fontSize="10" fill="#475569">West: lines far apart (gentle change). East: lines close together (steep gradient).</text>
    </svg>
  )
}

function GradSymbol() {
  const cities = [
    { name: 'New York', pop: '8.3M', x: 348, y: 86, r: 34 },
    { name: 'Los Angeles', pop: '3.9M', x: 62, y: 128, r: 22 },
    { name: 'Chicago', pop: '2.7M', x: 268, y: 92, r: 18 },
    { name: 'Houston', pop: '2.3M', x: 210, y: 168, r: 16 },
  ]
  return (
    <svg viewBox="0 0 420 230" className="aph-svg" aria-hidden>
      <rect x="8" y="8" width="404" height="196" rx="10" fill="#f8fafc" />
      <path
        d="M48 86 C 62 54, 118 48, 168 52 C 214 46, 268 50, 298 62 C 338 50, 378 54, 402 78 L 406 118 C 378 128, 348 122, 338 198 C 352 208, 362 222, 358 200 L 322 210 C 270 216, 210 208, 168 194 C 120 198, 78 182, 58 156 C 42 130, 58 100, 48 86 Z"
        fill="#e2e8f0"
        stroke="#64748b"
      />
      {cities.map((city) => (
        <g key={city.name}>
          <circle cx={city.x} cy={city.y} r={city.r} fill="#93c5fd" fillOpacity="0.85" stroke="#1e3a8a" strokeWidth="1.4" />
          <text x={city.x} y={city.y - 2} textAnchor="middle" fontSize="9" fontWeight="700" fill="#0f172a">{city.pop}</text>
          <text x={city.x} y={city.y + city.r + 12} textAnchor="middle" fontSize="9" fill="#334155">{city.name}</text>
        </g>
      ))}
      <text x="16" y="220" fontSize="10" fill="#475569">Larger circle = larger city population</text>
    </svg>
  )
}

function MercatorCompare() {
  const mercator = useMemo(
    () => geoMercator().scale(46).translate([108, 108]).center([10, 18]),
    [],
  )
  const peters = useMemo(
    () => geoProjection(gallPetersRaw).scale(58).translate([108, 92]),
    [],
  )
  const fill = (iso: string | null) => {
    if (iso === 'GRL') return '#fb7185'
    if (iso && AFRICA.has(iso)) return '#4ade80'
    return '#e2e8f0'
  }
  return (
    <div>
      <div className="aph-figure-pair">
        <div>
          <p className="aph-figure-panel-label">Mercator</p>
          <MiniWorld width={216} height={176} projection={mercator} fillForIso={fill} showGraticule />
        </div>
        <div>
          <p className="aph-figure-panel-label">Gall-Peters (equal-area)</p>
          <MiniWorld width={216} height={176} projection={peters} fillForIso={fill} showGraticule />
        </div>
      </div>
      <p className="aph-bar-legend">Green = Africa. Pink = Greenland. True area: Africa is about 14× larger.</p>
    </div>
  )
}

function SettlementPattern() {
  const cityA = [
    [86, 78], [96, 84], [104, 74], [90, 94], [110, 90], [100, 70], [92, 82], [108, 78],
  ]
  const cityB = [
    [248, 58], [348, 52], [278, 128], [362, 138], [304, 86], [236, 148],
  ]
  return (
    <svg viewBox="0 0 420 200" className="aph-svg" aria-hidden>
      <text x="96" y="20" textAnchor="middle" fontSize="12" fontWeight="700">City A</text>
      <rect x="18" y="28" width="156" height="150" rx="8" fill="#f8fafc" stroke="#94a3b8" />
      {Array.from({ length: 5 }, (_, i) => (
        <line key={`a${i}`} x1={40 + i * 24} y1="36" x2={40 + i * 24} y2="168" stroke="#e2e8f0" />
      ))}
      {cityA.map(([x, y], i) => (
        <circle key={`ad${i}`} cx={x} cy={y} r="5" fill="#0f172a" />
      ))}
      <text x="314" y="20" textAnchor="middle" fontSize="12" fontWeight="700">City B</text>
      <rect x="214" y="28" width="186" height="150" rx="8" fill="#f8fafc" stroke="#94a3b8" />
      {cityB.map(([x, y], i) => (
        <circle key={`bd${i}`} cx={x} cy={y} r="5" fill="#0f172a" />
      ))}
    </svg>
  )
}

function GisLayers() {
  const layers = [
    { label: 'Household income', fill: '#fde68a', stroke: '#b45309' },
    { label: 'Traffic / road network', fill: '#bfdbfe', stroke: '#1d4ed8' },
    { label: 'Zoning / land use', fill: '#bbf7d0', stroke: '#15803d' },
    { label: 'Competing stores', fill: '#fecaca', stroke: '#b91c1c' },
  ]
  return (
    <svg viewBox="0 0 420 220" className="aph-svg" aria-hidden>
      <defs>
        <filter id="aphGisShadow" x="-8%" y="-8%" width="116%" height="116%">
          <feDropShadow dx="0" dy="1.5" stdDeviation="1.6" floodOpacity="0.18" />
        </filter>
      </defs>
      {layers.map((layer, i) => {
        const y = 22 + i * 42
        const s = 14 * i
        return (
          <g key={layer.label} filter="url(#aphGisShadow)">
            <polygon
              points={`${70 + s},${y} ${300 + s},${y} ${338 + s},${y + 34} ${108 + s},${y + 34}`}
              fill={layer.fill}
              stroke={layer.stroke}
              strokeWidth="1.3"
            />
            <text x={204 + s} y={y + 22} textAnchor="middle" fontSize="12" fontWeight="700" fill="#0f172a">
              {layer.label}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

function ForestChange() {
  const older = [
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 0, 0],
    [1, 1, 1, 1, 1, 0, 0, 0],
    [1, 1, 1, 1, 0, 0, 0, 0],
    [1, 1, 1, 0, 0, 0, 0, 0],
  ]
  const newer = [
    [1, 1, 1, 0, 0, 0, 0, 0],
    [1, 1, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ]
  const cell = 16
  const draw = (grid: number[][], ox: number) =>
    grid.flatMap((row, r) =>
      row.map((value, c) => (
        <rect
          key={`${ox}-${r}-${c}`}
          x={ox + c * cell}
          y={36 + r * cell}
          width={cell - 1}
          height={cell - 1}
          fill={value ? '#166534' : '#d6d3d1'}
        />
      )),
    )
  return (
    <svg viewBox="0 0 420 190" className="aph-svg" aria-hidden>
      <text x="84" y="22" textAnchor="middle" fontSize="12" fontWeight="700">1990</text>
      <text x="300" y="22" textAnchor="middle" fontSize="12" fontWeight="700">2020</text>
      {draw(older, 20)}
      {draw(newer, 236)}
      <rect x="20" y="142" width="12" height="12" fill="#166534" />
      <text x="36" y="152" fontSize="10" fill="#334155">Forest</text>
      <rect x="92" y="142" width="12" height="12" fill="#d6d3d1" />
      <text x="108" y="152" fontSize="10" fill="#334155">Cleared land</text>
      <text x="20" y="176" fontSize="10" fill="#475569">Classified satellite pixels (remote sensing)</text>
    </svg>
  )
}

function HdiTable() {
  return (
    <table className="aph-table">
      <thead>
        <tr>
          <th>Country</th>
          <th>HDI</th>
          <th>GNI per capita</th>
          <th>Life exp.</th>
          <th>TFR</th>
          <th>IMR</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Norway</td>
          <td>0.96</td>
          <td>$80,000</td>
          <td>83</td>
          <td>1.5</td>
          <td>2</td>
        </tr>
        <tr>
          <td>China</td>
          <td>0.79</td>
          <td>$20,000</td>
          <td>78</td>
          <td>1.2</td>
          <td>6</td>
        </tr>
        <tr>
          <td>India</td>
          <td>0.64</td>
          <td>$7,000</td>
          <td>70</td>
          <td>2.0</td>
          <td>26</td>
        </tr>
        <tr>
          <td>Niger</td>
          <td>0.40</td>
          <td>$1,300</td>
          <td>62</td>
          <td>6.7</td>
          <td>60</td>
        </tr>
      </tbody>
    </table>
  )
}

function SectorChart() {
  const rows = [
    { name: 'United States', p: 2, s: 18, t: 80 },
    { name: 'Country X', p: 58, s: 16, t: 26 },
  ]
  return (
    <div className="aph-bars">
      {rows.map((row) => (
        <div key={row.name} className="aph-bar-row">
          <p className="aph-bar-label">{row.name}</p>
          <div className="aph-bar-track">
            <span className="aph-bar-p" style={{ width: `${row.p}%` }} />
            <span className="aph-bar-s" style={{ width: `${row.s}%` }} />
            <span className="aph-bar-t" style={{ width: `${row.t}%` }} />
          </div>
          <p className="aph-bar-nums">
            P {row.p}% · S {row.s}% · T+ {row.t}%
          </p>
        </div>
      ))}
      <p className="aph-bar-legend">P = primary · S = secondary · T+ = tertiary and above</p>
    </div>
  )
}

function CorePeriphery() {
  return (
    <svg viewBox="0 0 420 230" className="aph-svg" aria-hidden>
      <defs>
        <radialGradient id="aphCoreG" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#86efac" />
          <stop offset="100%" stopColor="#22c55e" />
        </radialGradient>
      </defs>
      <circle cx="210" cy="108" r="96" fill="#fecaca" stroke="#991b1b" strokeWidth="1.6" />
      <circle cx="210" cy="108" r="62" fill="#fde68a" stroke="#92400e" strokeWidth="1.6" />
      <circle cx="210" cy="108" r="30" fill="url(#aphCoreG)" stroke="#166534" strokeWidth="1.6" />
      <text x="210" y="112" textAnchor="middle" fontSize="12" fontWeight="700">Core</text>
      <text x="210" y="62" textAnchor="middle" fontSize="11" fontWeight="700">Semi-periphery</text>
      <text x="210" y="28" textAnchor="middle" fontSize="11" fontWeight="700">Periphery</text>
      <text x="16" y="214" fontSize="10" fill="#475569">Core: US, Germany · Semi: China, Brazil, Mexico · Periphery: Kenya, Peru</text>
    </svg>
  )
}

function DependencyFlow() {
  return (
    <svg viewBox="0 0 440 200" className="aph-svg" aria-hidden>
      <defs>
        <marker id="aphArr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#0f172a" />
        </marker>
        <filter id="aphCard" x="-6%" y="-10%" width="112%" height="130%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.16" />
        </filter>
      </defs>
      <rect x="16" y="72" width="118" height="54" rx="10" fill="#fecaca" stroke="#991b1b" filter="url(#aphCard)" />
      <text x="75" y="104" textAnchor="middle" fontSize="13" fontWeight="700">Periphery</text>
      <rect x="161" y="72" width="118" height="54" rx="10" fill="#fde68a" stroke="#92400e" filter="url(#aphCard)" />
      <text x="220" y="104" textAnchor="middle" fontSize="12" fontWeight="700">Semi-periphery</text>
      <rect x="306" y="72" width="118" height="54" rx="10" fill="#86efac" stroke="#166534" filter="url(#aphCard)" />
      <text x="365" y="104" textAnchor="middle" fontSize="13" fontWeight="700">Core</text>
      <path d="M134 86 H306" stroke="#0f172a" strokeWidth="1.8" markerEnd="url(#aphArr)" />
      <text x="220" y="74" textAnchor="middle" fontSize="10">cheap labor &amp; raw materials</text>
      <path d="M306 112 H134" stroke="#0f172a" strokeWidth="1.8" markerEnd="url(#aphArr)" />
      <text x="220" y="148" textAnchor="middle" fontSize="10">expensive consumer goods</text>
    </svg>
  )
}

function BrandtLine() {
  const projection = useMemo(
    () => geoEqualEarth().scale(78).translate([210, 108]),
    [],
  )
  const overlayPath = useMemo(() => {
    const points = BRANDT_COORDS.map((pair) => projection(pair)).filter(Boolean) as [number, number][]
    return points.map((point, i) => `${i === 0 ? 'M' : 'L'} ${point[0].toFixed(1)} ${point[1].toFixed(1)}`).join(' ')
  }, [projection])

  return (
    <div>
      <MiniWorld
        width={420}
        height={210}
        projection={projection}
        fillForIso={(iso) => (iso && BRANDT_NORTH.has(iso) ? '#93c5fd' : '#fde68a')}
        overlayPath={overlayPath}
      />
      <p className="aph-bar-legend">Blue ≈ MDCs (“North”) · Gold ≈ LDCs (“South”) · Dashed line = Brandt Line</p>
    </div>
  )
}

function GiiTable() {
  return (
    <table className="aph-table">
      <thead>
        <tr>
          <th>Country</th>
          <th>GII</th>
          <th>HDI</th>
          <th>Women in parliament</th>
          <th>Maternal deaths</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Germany</td>
          <td>0.07</td>
          <td>0.95</td>
          <td>High</td>
          <td>Very low</td>
        </tr>
        <tr>
          <td>Mexico</td>
          <td>0.30</td>
          <td>0.78</td>
          <td>Medium</td>
          <td>Medium</td>
        </tr>
        <tr>
          <td>Yemen</td>
          <td>0.77</td>
          <td>0.46</td>
          <td>Very low</td>
          <td>High</td>
        </tr>
      </tbody>
    </table>
  )
}

function EnergyChart() {
  return (
    <table className="aph-table">
      <thead>
        <tr>
          <th>Country</th>
          <th>Energy use per person</th>
          <th>Trend, last 30 years</th>
          <th>Share from renewables</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>United States</td>
          <td>Very high</td>
          <td>High but relatively stable</td>
          <td>Moderate and rising</td>
        </tr>
        <tr>
          <td>China</td>
          <td>High and rising</td>
          <td>Rapid increase</td>
          <td>Rising from a lower base</td>
        </tr>
        <tr>
          <td>Country Y (LDC)</td>
          <td>Low</td>
          <td>Slow increase</td>
          <td>Low (except hydro where available)</td>
        </tr>
        <tr>
          <td>Iceland</td>
          <td>High</td>
          <td>Stable</td>
          <td>Very high (geothermal)</td>
        </tr>
      </tbody>
    </table>
  )
}
