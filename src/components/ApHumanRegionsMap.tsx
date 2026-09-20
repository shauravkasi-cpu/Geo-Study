import { useMemo, useRef } from 'react'
import { geoEqualEarth } from 'd3-geo'
import {
  Annotation,
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from 'react-simple-maps'
import topoData from 'world-atlas/countries-110m.json'
import {
  AP_HUMAN_REGIONS_QUIZ_NAME,
  AP_HUMAN_REGIONS_STUDY_IDS,
} from '../lib/apHumanRegionsQuiz'
import { getExtraMapGeographies } from '../lib/extraMapCountries'
import { getCountryCentroid } from '../lib/hints'
import { getLabelAnchor, placeMapLabels } from '../lib/labelPlacement'
import { playHoverSfx } from '../lib/audio'
import { resolveMapGeoIso } from '../lib/mapGeoIndex'
import { getWorldRegion } from '../lib/worldRegions'

interface ApHumanRegionsMapProps {
  onBack: () => void
}

interface RawGeoProperties {
  name: string
}

const MAP_WIDTH = 960
const MAP_HEIGHT = 520
const LABEL_FONT_SIZE = 8.5

export function ApHumanRegionsMap({ onBack }: ApHumanRegionsMapProps) {
  const hoveredCountryKeyRef = useRef<string | null>(null)

  const studyRegions = useMemo(
    () =>
      AP_HUMAN_REGIONS_STUDY_IDS.map((id) => getWorldRegion(id)).filter(
        (region): region is NonNullable<typeof region> => !!region,
      ),
    [],
  )

  const countryToRegion = useMemo(() => {
    const map = new Map<string, (typeof studyRegions)[number]>()
    for (const region of studyRegions) {
      for (const code of region.countryCodes) {
        if (!map.has(code)) map.set(code, region)
      }
    }
    return map
  }, [studyRegions])

  const projection = useMemo(
    () =>
      geoEqualEarth()
        .scale(160)
        .translate([MAP_WIDTH / 2, MAP_HEIGHT / 2]),
    [],
  )

  const placedLabels = useMemo(() => {
    const labels = studyRegions
      .map((region) => {
        const centroids = region.countryCodes
          .map((code) => getCountryCentroid(code))
          .filter((point): point is [number, number] => point !== null)
        const point =
          centroids.length > 0
            ? ([
                centroids.reduce((sum, item) => sum + item[0], 0) / centroids.length,
                centroids.reduce((sum, item) => sum + item[1], 0) / centroids.length,
              ] as [number, number])
            : region.coordinates
        return {
          id: `region-${region.id}`,
          lng: point[0],
          lat: point[1],
          text: region.name,
          kind: 'region' as const,
        }
      })

    return placeMapLabels(labels, (coords) => {
      const projected = projection(coords)
      return projected ? [projected[0], projected[1]] : null
    }, { fontSize: LABEL_FONT_SIZE, padding: 2 })
  }, [projection, studyRegions])

  const extraGeographies = useMemo(() => getExtraMapGeographies(), [])
  const quizExtraGeographies = useMemo(
    () => extraGeographies.filter((geo) => countryToRegion.has(geo.isoCode)),
    [extraGeographies, countryToRegion],
  )

  return (
    <div className="reference-map-page">
      <header className="reference-map-header">
        <button type="button" className="btn-secondary btn-sm" onClick={onBack}>
          ← Back
        </button>
        <div className="reference-map-header-text">
          <h1>{AP_HUMAN_REGIONS_QUIZ_NAME} — Study Map</h1>
        </div>
        <div className="reference-map-legend">
          <span className="legend-item">
            <span className="legend-swatch legend-swatch-region" />
            World regions
          </span>
        </div>
      </header>

      <div className="reference-map-container">
        <ComposableMap
          projection="geoEqualEarth"
          projectionConfig={{ scale: 160 }}
          width={MAP_WIDTH}
          height={MAP_HEIGHT}
          style={{ width: '100%', height: 'auto', maxHeight: 'calc(100vh - 140px)' }}
        >
          <ZoomableGroup center={[20, 10]} zoom={1} minZoom={0.8} maxZoom={6}>
            <Geographies geography={topoData}>
              {({ geographies }) => (
                <>
                  {geographies.map((geo) => {
                    const props = geo.properties as RawGeoProperties
                    const geoId = geo.id as string | number | undefined
                    const iso = resolveMapGeoIso(props.name, geoId)
                    const region = iso ? countryToRegion.get(iso) : undefined
                    const countryKey = (geo.rsmKey as string) || iso || props.name

                    return (
                      <Geography
                        key={geo.rsmKey as string}
                        geography={geo}
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
                        style={{
                          default: {
                            fill: region ? region.color : 'var(--map-fill-dimmed)',
                            stroke: region ? 'var(--map-ref-country-stroke)' : 'var(--map-stroke)',
                            strokeWidth: region ? 0.55 : 0.35,
                            outline: 'none',
                            opacity: region ? 0.92 : 0.45,
                          },
                          hover: {
                            fill: region ? region.color : 'var(--map-fill-dimmed)',
                            stroke: region ? 'var(--map-ref-country-stroke)' : 'var(--map-stroke)',
                            strokeWidth: region ? 0.55 : 0.35,
                            outline: 'none',
                            opacity: region ? 0.92 : 0.45,
                          },
                          pressed: {
                            fill: region ? region.color : 'var(--map-fill-dimmed)',
                            stroke: region ? 'var(--map-ref-country-stroke)' : 'var(--map-stroke)',
                            strokeWidth: region ? 0.55 : 0.35,
                            outline: 'none',
                            opacity: region ? 0.92 : 0.45,
                          },
                        }}
                      />
                    )
                  })}

                  {quizExtraGeographies.map((geo) => {
                    const region = countryToRegion.get(geo.isoCode)
                    const countryKey = geo.rsmKey
                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
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
                        style={{
                          default: {
                            fill: region ? region.color : 'var(--map-ref-country)',
                            stroke: 'var(--map-ref-country-stroke)',
                            strokeWidth: 0.55,
                            outline: 'none',
                            opacity: 0.92,
                          },
                          hover: {
                            fill: region ? region.color : 'var(--map-ref-country)',
                            stroke: 'var(--map-ref-country-stroke)',
                            strokeWidth: 0.55,
                            outline: 'none',
                            opacity: 0.92,
                          },
                          pressed: {
                            fill: region ? region.color : 'var(--map-ref-country)',
                            stroke: 'var(--map-ref-country-stroke)',
                            strokeWidth: 0.55,
                            outline: 'none',
                            opacity: 0.92,
                          },
                        }}
                      />
                    )
                  })}
                </>
              )}
            </Geographies>

            {placedLabels.map((label) => (
              <Annotation
                key={label.id}
                subject={[label.lng, label.lat]}
                dx={label.dx}
                dy={label.dy}
                connectorProps={{
                  stroke: 'none',
                  strokeWidth: 0,
                }}
              >
                <text
                  x={0}
                  y={0}
                  textAnchor={getLabelAnchor(label.kind)}
                  className="map-ref-label map-ref-label-country"
                  style={{ fontSize: LABEL_FONT_SIZE }}
                >
                  {label.text}
                </text>
              </Annotation>
            ))}
          </ZoomableGroup>
        </ComposableMap>
      </div>

      <p className="reference-map-hint">Scroll or pinch to zoom · Drag to pan</p>
    </div>
  )
}
