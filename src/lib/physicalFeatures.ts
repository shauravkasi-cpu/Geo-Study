/** Distance (km) from the feature anchor for a click to count as correct */
export const FEATURE_TOLERANCE_KM = 1000
export interface PhysicalFeature {
  id: string
  name: string
  coordinates: [number, number] // [lng, lat]
  radiusKm: number
}

export const PHYSICAL_FEATURES: PhysicalFeature[] = [
  { id: 'himalayas', name: 'Himalayas', coordinates: [84, 28], radiusKm: 450 },
  { id: 'andes', name: 'Andes Mountains', coordinates: [-70, -15], radiusKm: 500 },
  { id: 'alps', name: 'Alps', coordinates: [10, 46], radiusKm: 250 },
  { id: 'rockies', name: 'Rocky Mountains', coordinates: [-110, 45], radiusKm: 400 },
  { id: 'amazon-river', name: 'Amazon River', coordinates: [-60, -3], radiusKm: 400 },
  { id: 'nile-river', name: 'Nile River', coordinates: [31, 26], radiusKm: 300 },
  { id: 'mississippi-river', name: 'Mississippi River', coordinates: [-89, 32], radiusKm: 300 },
  { id: 'yangtze-river', name: 'Yangtze River', coordinates: [112, 30], radiusKm: 250 },
  { id: 'ganges-river', name: 'Ganges River', coordinates: [88, 24], radiusKm: 220 },
  { id: 'danube-river', name: 'Danube River', coordinates: [19, 45], radiusKm: 220 },
  { id: 'sahara', name: 'Sahara Desert', coordinates: [5, 23], radiusKm: 700 },
  { id: 'arabian-desert', name: 'Arabian Desert', coordinates: [45, 23], radiusKm: 450 },
  { id: 'gobi-desert', name: 'Gobi Desert', coordinates: [105, 42], radiusKm: 400 },
  { id: 'south-china-sea', name: 'South China Sea', coordinates: [115, 15], radiusKm: 500 },
  { id: 'arctic-ocean', name: 'Arctic Ocean', coordinates: [0, 83], radiusKm: 1000 },
  { id: 'gulf-of-aden', name: 'Gulf of Aden', coordinates: [47, 12], radiusKm: 220 },
  { id: 'gulf-of-oman', name: 'Gulf of Oman', coordinates: [58, 24], radiusKm: 180 },
  { id: 'panama-canal', name: 'Panama Canal', coordinates: [-79.7, 9.1], radiusKm: 80 },
  { id: 'suez-canal', name: 'Suez Canal', coordinates: [32.3, 30.5], radiusKm: 70 },
  { id: 'strait-of-hormuz', name: 'Strait of Hormuz', coordinates: [56.3, 26.5], radiusKm: 100 },
  { id: 'strait-of-malacca', name: 'Strait of Malacca', coordinates: [100, 3], radiusKm: 120 },
]

const featureMap = new Map(PHYSICAL_FEATURES.map((f) => [f.id, f]))

export function getPhysicalFeature(id: string): PhysicalFeature | undefined {
  return featureMap.get(id)
}

export function haversineDistanceKm(
  a: [number, number],
  b: [number, number],
): number {
  const R = 6371
  const [lon1, lat1] = a
  const [lon2, lat2] = b
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLon = ((lon2 - lon1) * Math.PI) / 180
  const sinLat = Math.sin(dLat / 2)
  const sinLon = Math.sin(dLon / 2)
  const h =
    sinLat * sinLat +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      sinLon *
      sinLon
  return R * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h))
}

export function isFeatureClickCorrect(
  featureId: string,
  clickLngLat: [number, number],
): { correct: boolean; distanceKm: number } {
  const feature = getPhysicalFeature(featureId)
  if (!feature) return { correct: false, distanceKm: Infinity }

  const distanceKm = haversineDistanceKm(clickLngLat, feature.coordinates)
  return { correct: distanceKm <= FEATURE_TOLERANCE_KM, distanceKm }
}
