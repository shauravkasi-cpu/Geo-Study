import { getRegionsByScale, WORLD_REGIONS } from './worldRegions'

export const AP_HUMAN_REGIONS_QUIZ_NAME = 'AP Human Regions Quiz'

export const AP_HUMAN_REGIONS_QUIZ_IDS = WORLD_REGIONS.map((region) => region.id)

export const AP_HUMAN_REGIONS_STUDY_IDS = [
  ...getRegionsByScale('closer-look').map((region) => region.id),
  'antarctica',
]

export const AP_HUMAN_REGIONS_STATS = {
  bigPicture: getRegionsByScale('big-picture').length,
  closerLook: getRegionsByScale('closer-look').length,
  total: WORLD_REGIONS.length,
}
