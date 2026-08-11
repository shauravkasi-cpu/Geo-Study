import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { GeoProjection } from 'd3-geo'
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from 'react-simple-maps'
import topoData from 'world-atlas/countries-110m.json'
import {
  getCountryDisplayName,
  getCountryFeatures,
} from '../lib/countries'
import { resolveMapGeoIso } from '../lib/mapGeoIndex'
import { countryAtPoint } from '../lib/geoUtils'
import { playHoverSfx } from '../lib/audio'
import { getExtraMapGeographies } from '../lib/extraMapCountries'
import { getLngLatFromClick } from '../lib/mapCoords'
import type { HintView, MapClickResult, QuizItemType } from '../types'

interface WorldMapProps {
  onMapClick?: (result: MapClickResult) => void
  highlightCode?: string | null
  wrongHighlightCode?: string | null
  mcHighlightCode?: string | null
  mcFeaturePoint?: [number, number] | null
  highlightPoint?: [number, number] | null
  clickPoint?: [number, number] | null
  hintView?: HintView | null
  clickMode?: QuizItemType
  disabled?: boolean
}

interface RawGeoProperties {
  name: string
}

/** Pin-sized dot; radius is divided by zoom so it stays tiny on screen. */
function FeatureLocationDot({
  fill,
  stroke = '#fff',
  mapZoom,
  screenRadius = 2.5,
}: {
  fill: string
  stroke?: string
  mapZoom: number
  screenRadius?: number
}) {
  const r = screenRadius / mapZoom
  const strokeWidth = 0.55 / mapZoom
  return <circle r={r} fill={fill} stroke={stroke} strokeWidth={strokeWidth} />
}

function resolveGeoIso(
  geoName: string,
  geoId: string | number | undefined,
): string | null {
  return resolveMapGeoIso(geoName, geoId)
}

function geoStyle(
  role: 'default' | 'correct' | 'wrong' | 'mc' | 'hint' | 'dimmed',
  interactive: boolean,
) {
  const fills: Record<string, string> = {
    default: 'var(--map-fill)',
    correct: 'var(--map-highlight)',
    wrong: 'var(--map-wrong)',
    mc: 'var(--map-mc-highlight)',
    hint: 'var(--map-hint)',
    dimmed: 'var(--map-fill-dimmed)',
  }
  const strokes: Record<string, string> = {
    default: 'var(--map-stroke)',
    correct: 'var(--map-highlight-stroke)',
    wrong: 'var(--map-wrong-stroke)',
    mc: 'var(--map-mc-stroke)',
    hint: 'var(--map-hint-stroke)',
    dimmed: 'var(--map-stroke)',
  }

  return {
    default: {
      fill: fills[role],
      stroke: strokes[role],
      strokeWidth: role === 'default' || role === 'dimmed' ? 0.4 : 0.8,
      outline: 'none',
      pointerEvents: interactive ? 'all' : 'none',
      opacity: role === 'dimmed' ? 0.35 : 1,
    },
    hover: {
      fill: role === 'default' ? 'var(--map-fill-hover)' : fills[role],
      stroke: role === 'default' ? 'var(--map-stroke-hover)' : strokes[role],
      strokeWidth: 0.5,
      outline: 'none',
      cursor: interactive ? 'crosshair' : 'default',
      opacity: role === 'dimmed' ? 0.45 : 1,
    },
    pressed: {
      fill: role === 'default' ? 'var(--map-fill-pressed)' : fills[role],
      stroke: strokes[role],
      strokeWidth: 0.6,
      outline: 'none',
      opacity: role === 'dimmed' ? 0.45 : 1,
    },
  }
}

export function WorldMap({
  onMapClick,
  highlightCode,
  wrongHighlightCode,
  mcHighlightCode,
  mcFeaturePoint,
  highlightPoint,
  clickPoint,
  hintView,
  clickMode = 'country',
  disabled = false,
}: WorldMapProps) {
  const [mapCenter, setMapCenter] = useState<[number, number]>([20, 20])
  const [mapZoom, setMapZoom] = useState(1)
  const hoveredCountryKeyRef = useRef<string | null>(null)
  const features = useMemo(() => getCountryFeatures(), [])
  const extraGeographies = useMemo(() => getExtraMapGeographies(), [])

  const hintCountrySet = useMemo(
    () => new Set(hintView?.highlightCountryCodes ?? []),
    [hintView],
  )

  useEffect(() => {
    if (hintView) {
      setMapCenter(hintView.center)
      setMapZoom(hintView.zoom)
    } else if (mcFeaturePoint) {
      setMapCenter(mcFeaturePoint)
      setMapZoom(2.5)
    } else if (mcHighlightCode) {
      setMapCenter([20, 20])
      setMapZoom(1)
    }
  }, [hintView, mcFeaturePoint, mcHighlightCode])

  const getRole = (geoName: string, geoId: string | number | undefined): 'default' | 'correct' | 'wrong' | 'mc' | 'hint' | 'dimmed' => {
    const iso = resolveGeoIso(geoName, geoId)

    if (iso && mcHighlightCode && iso === mcHighlightCode) return 'mc'
    if (iso && highlightCode && iso === highlightCode) return 'correct'
    if (iso && wrongHighlightCode && iso === wrongHighlightCode) return 'wrong'

    if (hintCountrySet.size > 0 && iso) {
      return hintCountrySet.has(iso) ? 'hint' : 'dimmed'
    }
    return 'default'
  }

  const isInteractive = !disabled && !mcHighlightCode

  const handleCountryClick = useCallback(
    (geoName: string, geoId: string | number | undefined, event: React.MouseEvent) => {
      event.stopPropagation()
      event.preventDefault()
      if (!isInteractive || !onMapClick || clickMode !== 'country') return

      const isoCode = resolveGeoIso(geoName, geoId)
      if (!isoCode) return

      onMapClick({
        lngLat: [0, 0],
        countryCode: isoCode,
        countryName: getCountryDisplayName(isoCode),
      })
    },
    [isInteractive, onMapClick, clickMode],
  )

  const handleFeatureClick = useCallback(
    (event: React.MouseEvent, projection: GeoProjection) => {
      event.stopPropagation()
      event.preventDefault()
      if (!isInteractive || !onMapClick || clickMode !== 'feature') return

      const lngLat = getLngLatFromClick(event, projection)
      if (!lngLat) return

      const hit = countryAtPoint(lngLat, features)
      onMapClick({
        lngLat,
        countryCode: hit?.properties.isoCode ?? null,
        countryName: hit?.properties.isoCode
          ? getCountryDisplayName(hit.properties.isoCode)
          : null,
      })
    },
    [isInteractive, onMapClick, clickMode, features],
  )

  return (
    <div className="world-map-container">
      <ComposableMap
        projection="geoEqualEarth"
        projectionConfig={{ scale: 160 }}
        width={800}
        height={450}
        style={{ width: '100%', height: 'auto' }}
      >
        <ZoomableGroup
          center={mapCenter}
          zoom={mapZoom}
          minZoom={0.8}
          maxZoom={8}
          onMoveEnd={({ coordinates, zoom }) => {
            setMapCenter(coordinates)
            setMapZoom(zoom)
          }}
        >
          <Geographies geography={topoData}>
            {({ geographies, projection }) => (
              <>
                {geographies.map((geo) => {
                  const props = geo.properties as RawGeoProperties
                  const geoId = geo.id as string | number | undefined
                  const role = getRole(props.name, geoId)
                  const iso = resolveGeoIso(props.name, geoId)
                  const isCountryInteractive =
                    isInteractive && clickMode === 'country' && !!iso

                  const countryKey = (geo.rsmKey as string) || iso || props.name

                  return (
                    <Geography
                      key={geo.rsmKey as string}
                      geography={geo}
                      onClick={(e) => {
                        if (clickMode === 'country' && iso) {
                          handleCountryClick(props.name, geoId, e)
                        }
                      }}
                      onMouseEnter={() => {
                        if (hoveredCountryKeyRef.current === countryKey) return
                        hoveredCountryKeyRef.current = countryKey
                        playHoverSfx()
                      }}
                      onMouseLeave={() => {
                        if (hoveredCountryKeyRef.current === countryKey) {
                          hoveredCountryKeyRef.current = null
                        }
                      }}
                      style={geoStyle(role, isCountryInteractive)}
                    />
                  )
                })}

                {extraGeographies.map((geo) => {
                  const role = getRole(geo.properties.name, geo.id)
                  const isCountryInteractive =
                    isInteractive && clickMode === 'country'
                  const countryKey = geo.rsmKey

                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onClick={(e) => {
                        if (clickMode === 'country') {
                          handleCountryClick(geo.properties.name, geo.id, e)
                        }
                      }}
                      onMouseEnter={() => {
                        if (hoveredCountryKeyRef.current === countryKey) return
                        hoveredCountryKeyRef.current = countryKey
                        playHoverSfx()
                      }}
                      onMouseLeave={() => {
                        if (hoveredCountryKeyRef.current === countryKey) {
                          hoveredCountryKeyRef.current = null
                        }
                      }}
                      style={geoStyle(role, isCountryInteractive)}
                    />
                  )
                })}

                {clickMode === 'feature' && isInteractive && (
                  <rect
                    x={-800}
                    y={-450}
                    width={2400}
                    height={1350}
                    fill="transparent"
                    style={{ cursor: 'crosshair', pointerEvents: 'all' }}
                    onClick={(e) => handleFeatureClick(e, projection as GeoProjection)}
                  />
                )}
              </>
            )}
          </Geographies>

          {mcFeaturePoint && (
            <Marker coordinates={mcFeaturePoint}>
              <FeatureLocationDot fill="#3b82f6" mapZoom={mapZoom} />
            </Marker>
          )}

          {highlightPoint && (
            <Marker coordinates={highlightPoint}>
              <FeatureLocationDot fill="#22c55e" mapZoom={mapZoom} />
            </Marker>
          )}

          {clickPoint && (
            <Marker coordinates={clickPoint}>
              <FeatureLocationDot fill="#ef4444" mapZoom={mapZoom} />
            </Marker>
          )}
        </ZoomableGroup>
      </ComposableMap>
      {clickMode === 'feature' && isInteractive && (
        <p className="map-hint">Click the location on the map — no labels shown</p>
      )}
      {clickMode === 'country' && isInteractive && (
        <p className="map-hint">Click a country (ocean clicks are ignored)</p>
      )}
    </div>
  )
}
