import { useMemo, useRef } from 'react'
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps'
import topoData from 'world-atlas/countries-110m.json'
import { playHoverSfx } from '../lib/audio'
import { resolveMapGeoIso } from '../lib/mapGeoIndex'
import {
  getBubblesForMap,
  REGION_MAP_TITLES,
  type RegionBubble,
  type RegionMapId,
} from '../lib/regionBubbles'

interface RegionBubbleMapProps {
  mapId: RegionMapId
  labeled?: boolean
  interactive?: boolean
  highlightAnswerId?: string | null
  wrongBubbleId?: string | null
  revealAnswerId?: string | null
  hintAnswerIds?: string[] | null
  onBubbleClick?: (bubbleId: string) => void
}

interface RawGeoProperties {
  name: string
}

const MAP_WIDTH = 960
const MAP_HEIGHT = 500

const DARKER_COUNTRIES = new Set([
  'BRA', 'AUS', 'MEX', 'COD', 'AGO', 'TZA', 'ETH', 'DZA', 'LBY', 'SDN',
])

function bubbleClass(
  bubble: RegionBubble,
  highlightAnswerId?: string | null,
  wrongBubbleId?: string | null,
  revealAnswerId?: string | null,
  hintAnswerIds?: string[] | null,
) {
  const classes = ['region-bubble']
  if (bubble.wide) classes.push('region-bubble-wide')
  if (wrongBubbleId === bubble.id) classes.push('region-bubble-wrong')
  else if (highlightAnswerId === bubble.answerId) classes.push('region-bubble-correct')
  else if (revealAnswerId === bubble.answerId) classes.push('region-bubble-reveal')
  else if (hintAnswerIds && hintAnswerIds.length > 0) {
    classes.push(hintAnswerIds.includes(bubble.answerId) ? 'region-bubble-hint' : 'region-bubble-dim')
  }
  return classes.join(' ')
}

export function RegionBubbleMap({
  mapId,
  labeled = false,
  interactive = false,
  highlightAnswerId = null,
  wrongBubbleId = null,
  revealAnswerId = null,
  hintAnswerIds = null,
  onBubbleClick,
}: RegionBubbleMapProps) {
  const hoveredKeyRef = useRef<string | null>(null)
  const bubbles = useMemo(() => getBubblesForMap(mapId), [mapId])

  return (
    <div className="region-bubble-map">
      <p className="region-bubble-map-title">{REGION_MAP_TITLES[mapId]}</p>
      <ComposableMap
        projection="geoEqualEarth"
        projectionConfig={{ scale: 168 }}
        width={MAP_WIDTH}
        height={MAP_HEIGHT}
        style={{ width: '100%', height: 'auto' }}
      >
        <Geographies geography={topoData}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const props = geo.properties as RawGeoProperties
              const iso = resolveMapGeoIso(props.name, geo.id as string | number | undefined)
              const darker = iso ? DARKER_COUNTRIES.has(iso) : false
              return (
                <Geography
                  key={geo.rsmKey as string}
                  geography={geo}
                  style={{
                    default: {
                      fill: darker ? '#9aa3ad' : '#c5ccd4',
                      stroke: '#f8fafc',
                      strokeWidth: 0.4,
                      outline: 'none',
                    },
                    hover: {
                      fill: darker ? '#9aa3ad' : '#c5ccd4',
                      stroke: '#f8fafc',
                      strokeWidth: 0.4,
                      outline: 'none',
                    },
                    pressed: {
                      fill: darker ? '#9aa3ad' : '#c5ccd4',
                      stroke: '#f8fafc',
                      strokeWidth: 0.4,
                      outline: 'none',
                    },
                  }}
                />
              )
            })
          }
        </Geographies>

        {mapId === 'closer-look' && (
          <Marker coordinates={[-68, 18]}>
            <rect
              className="region-caribbean-box"
              x={-62}
              y={-38}
              width={124}
              height={68}
              rx={3}
              fill="none"
            />
          </Marker>
        )}

        {bubbles.map((bubble) => {
          const width = labeled ? (bubble.wide ? 132 : 102) : bubble.wide ? 108 : 78
          const height = labeled ? 24 : 20
          return (
            <Marker key={bubble.id} coordinates={bubble.coordinates}>
              <g
                className={bubbleClass(
                  bubble,
                  highlightAnswerId,
                  wrongBubbleId,
                  revealAnswerId,
                  hintAnswerIds,
                )}
                onClick={(event) => {
                  event.stopPropagation()
                  if (!interactive || !onBubbleClick) return
                  onBubbleClick(bubble.id)
                }}
                onMouseEnter={() => {
                  if (!interactive) return
                  if (hoveredKeyRef.current === bubble.id) return
                  hoveredKeyRef.current = bubble.id
                  playHoverSfx()
                }}
                onMouseLeave={() => {
                  if (hoveredKeyRef.current === bubble.id) {
                    hoveredKeyRef.current = null
                  }
                }}
                style={{ cursor: interactive ? 'pointer' : 'default' }}
              >
                <rect
                  x={-width / 2}
                  y={-height / 2}
                  width={width}
                  height={height}
                  rx={2.5}
                />
                {labeled && (
                  <text
                    textAnchor="middle"
                    dominantBaseline="central"
                    className="region-bubble-label"
                  >
                    {bubble.name}
                  </text>
                )}
              </g>
            </Marker>
          )
        })}
      </ComposableMap>
      {interactive && (
        <p className="map-hint">Click the matching blank on the map</p>
      )}
    </div>
  )
}
