import { useMemo, useRef } from 'react'
import { geoEqualEarth } from 'd3-geo'
import {
  Annotation,
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from 'react-simple-maps'
import topoData from 'world-atlas/countries-110m.json'
import {
  AP_HUMAN_QUIZ_1_COUNTRY_CODES,
  AP_HUMAN_QUIZ_1_NAME,
  AP_HUMAN_QUIZ_1_FEATURE_IDS,
} from '../lib/apHumanQuiz1'
import { getCountryDisplayName } from '../lib/countries'
import { getCountryCentroid } from '../lib/hints'
import { getLabelAnchor, placeMapLabels } from '../lib/labelPlacement'
import { playHoverSfx } from '../lib/audio'
import { getExtraMapGeographies } from '../lib/extraMapCountries'
import { resolveMapGeoIso } from '../lib/mapGeoIndex'
import { getPhysicalFeature } from '../lib/physicalFeatures'

interface ApHumanReferenceMapProps {
  onBack: () => void
}

interface RawGeoProperties {
  name: string
}

const MAP_WIDTH = 960
const MAP_HEIGHT = 520
const LABEL_FONT_SIZE = 8.5

export function ApHumanReferenceMap({ onBack }: ApHumanReferenceMapProps) {
  const hoveredCountryKeyRef = useRef<string | null>(null)
  const quizCountrySet = useMemo(
    () => new Set(AP_HUMAN_QUIZ_1_COUNTRY_CODES),
    [],
  )

  const projection = useMemo(
    () =>
      geoEqualEarth()
        .scale(160)
        .translate([MAP_WIDTH / 2, MAP_HEIGHT / 2]),
    [],
  )

  const placedLabels = useMemo(() => {
    const countryLabels = AP_HUMAN_QUIZ_1_COUNTRY_CODES.map((code) => {
      const centroid = getCountryCentroid(code)
      if (!centroid) return null
      return {
        id: `country-${code}`,
        lng: centroid[0],
        lat: centroid[1],
        text: getCountryDisplayName(code),
        kind: 'country' as const,
      }
    }).filter((label): label is NonNullable<typeof label> => label !== null)

    // Ensure tiny/extra countries always keep a study-map label.
    for (const geo of getExtraMapGeographies()) {
      if (!quizCountrySet.has(geo.isoCode)) continue
      if (countryLabels.some((label) => label.id === `country-${geo.isoCode}`)) continue
      const centroid = getCountryCentroid(geo.isoCode)
      if (!centroid) continue
      countryLabels.push({
        id: `country-${geo.isoCode}`,
        lng: centroid[0],
        lat: centroid[1],
        text: getCountryDisplayName(geo.isoCode),
        kind: 'country' as const,
      })
    }

    const featureLabels = AP_HUMAN_QUIZ_1_FEATURE_IDS.map((id) => {
      const feature = getPhysicalFeature(id)
      if (!feature) return null
      return {
        id: `feature-${id}`,
        lng: feature.coordinates[0],
        lat: feature.coordinates[1],
        text: feature.name,
        kind: 'feature' as const,
      }
    }).filter((label): label is NonNullable<typeof label> => label !== null)

    return placeMapLabels(
      [...countryLabels, ...featureLabels],
      (coords) => {
        const projected = projection(coords)
        return projected ? [projected[0], projected[1]] : null
      },
      { fontSize: LABEL_FONT_SIZE, padding: 2 },
    )
  }, [projection, quizCountrySet])

  const featurePoints = useMemo(
    () =>
      AP_HUMAN_QUIZ_1_FEATURE_IDS.map((id) => getPhysicalFeature(id)).filter(
        (feature): feature is NonNullable<typeof feature> => !!feature,
      ),
    [],
  )

  const extraGeographies = useMemo(() => getExtraMapGeographies(), [])
  const quizExtraGeographies = useMemo(
    () => extraGeographies.filter((geo) => quizCountrySet.has(geo.isoCode)),
    [extraGeographies, quizCountrySet],
  )

  return (
    <div className="reference-map-page">
      <header className="reference-map-header">
        <button type="button" className="btn-secondary btn-sm" onClick={onBack}>
          ← Back
        </button>
        <div className="reference-map-header-text">
          <h1>{AP_HUMAN_QUIZ_1_NAME} — Study Map</h1>
        </div>
        <div className="reference-map-legend">
          <span className="legend-item">
            <span className="legend-swatch legend-swatch-country" />
            Quiz countries
          </span>
          <span className="legend-item">
            <span className="legend-swatch legend-swatch-feature" />
            Physical features
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
                    const isQuizCountry = iso ? quizCountrySet.has(iso) : false

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
                            fill: isQuizCountry ? 'var(--map-ref-country)' : 'var(--map-fill-dimmed)',
                            stroke: isQuizCountry
                              ? 'var(--map-ref-country-stroke)'
                              : 'var(--map-stroke)',
                            strokeWidth: isQuizCountry ? 0.6 : 0.35,
                            outline: 'none',
                            opacity: isQuizCountry ? 1 : 0.45,
                          },
                          hover: {
                            fill: isQuizCountry ? 'var(--map-ref-country)' : 'var(--map-fill-dimmed)',
                            stroke: isQuizCountry
                              ? 'var(--map-ref-country-stroke)'
                              : 'var(--map-stroke)',
                            strokeWidth: isQuizCountry ? 0.6 : 0.35,
                            outline: 'none',
                            opacity: isQuizCountry ? 1 : 0.45,
                          },
                          pressed: {
                            fill: isQuizCountry ? 'var(--map-ref-country)' : 'var(--map-fill-dimmed)',
                            stroke: isQuizCountry
                              ? 'var(--map-ref-country-stroke)'
                              : 'var(--map-stroke)',
                            strokeWidth: isQuizCountry ? 0.6 : 0.35,
                            outline: 'none',
                            opacity: isQuizCountry ? 1 : 0.45,
                          },
                        }}
                      />
                    )
                  })}

                  {quizExtraGeographies.map((geo) => {
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
                            fill: 'var(--map-ref-country)',
                            stroke: 'var(--map-ref-country-stroke)',
                            strokeWidth: 0.6,
                            outline: 'none',
                            opacity: 1,
                          },
                          hover: {
                            fill: 'var(--map-ref-country)',
                            stroke: 'var(--map-ref-country-stroke)',
                            strokeWidth: 0.6,
                            outline: 'none',
                            opacity: 1,
                          },
                          pressed: {
                            fill: 'var(--map-ref-country)',
                            stroke: 'var(--map-ref-country-stroke)',
                            strokeWidth: 0.6,
                            outline: 'none',
                            opacity: 1,
                          },
                        }}
                      />
                    )
                  })}
                </>
              )}
            </Geographies>

            {quizExtraGeographies.map((geo) => {
              const centroid = getCountryCentroid(geo.isoCode)
              if (!centroid) return null
              return (
                <Marker key={`marker-${geo.isoCode}`} coordinates={centroid}>
                  <circle
                    r={4.5}
                    fill="var(--map-ref-country)"
                    stroke="var(--map-ref-country-stroke)"
                    strokeWidth={1.4}
                    onMouseEnter={() => {
                      if (hoveredCountryKeyRef.current === geo.rsmKey) return
                      hoveredCountryKeyRef.current = geo.rsmKey
                      playHoverSfx()
                    }}
                  />
                </Marker>
              )
            })}

            {featurePoints.map((feature) => (
              <Marker key={feature.id} coordinates={feature.coordinates}>
                <circle
                  r={3.5}
                  fill="var(--map-ref-feature-dot)"
                  stroke="var(--bg-elevated)"
                  strokeWidth={1.2}
                />
              </Marker>
            ))}

            {placedLabels.map((label) => (
              <Annotation
                key={label.id}
                subject={[label.lng, label.lat]}
                dx={label.dx}
                dy={label.dy}
                connectorProps={{
                  stroke: label.kind === 'feature' ? 'var(--map-ref-feature-line)' : 'none',
                  strokeWidth: label.kind === 'feature' ? 0.6 : 0,
                  strokeOpacity: 0.55,
                }}
              >
                <text
                  x={0}
                  y={0}
                  textAnchor={getLabelAnchor(label.kind)}
                  className={
                    label.kind === 'feature'
                      ? 'map-ref-label map-ref-label-feature'
                      : 'map-ref-label map-ref-label-country'
                  }
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
