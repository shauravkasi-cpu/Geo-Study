import topoData from 'world-atlas/countries-110m.json'
import { feature } from 'topojson-client'
import type { FeatureCollection, Geometry } from 'geojson'
import { getIsoCodeForNeId } from './countries'
import { NE_NAME_TO_ISO } from './countryNames'

interface TopoCountryProperties {
  name: string
}

let geoNameToIso: Map<string, string> | null = null
let geoIdToIso: Map<string, string> | null = null

function buildMapGeoIndex(): {
  geoNameToIso: Map<string, string>
  geoIdToIso: Map<string, string>
} {
  if (geoNameToIso && geoIdToIso) {
    return { geoNameToIso, geoIdToIso }
  }

  const names = new Map<string, string>()
  const ids = new Map<string, string>()

  const collection = feature(
    topoData as Parameters<typeof feature>[0],
    topoData.objects.countries,
  ) as FeatureCollection<Geometry, TopoCountryProperties>

  for (const geoFeature of collection.features) {
    const iso = getIsoCodeForNeId(geoFeature.id)
    if (!iso) continue

    ids.set(String(geoFeature.id), iso)

    const geoName = geoFeature.properties?.name
    if (geoName) {
      names.set(geoName, iso)
    }
  }

  for (const [geoName, iso] of Object.entries(NE_NAME_TO_ISO)) {
    names.set(geoName, iso)
  }

  geoNameToIso = names
  geoIdToIso = ids
  return { geoNameToIso: names, geoIdToIso: ids }
}

/** Resolve ISO code for a map geography using the same topojson source as WorldMap */
export function resolveMapGeoIso(
  geoName: string,
  geoId: string | number | undefined,
): string | null {
  const { geoNameToIso: names, geoIdToIso: ids } = buildMapGeoIndex()

  if (geoId != null && geoId !== '') {
    const fromId = ids.get(String(geoId)) ?? getIsoCodeForNeId(geoId)
    if (fromId) return fromId
  }

  return names.get(geoName) ?? null
}
