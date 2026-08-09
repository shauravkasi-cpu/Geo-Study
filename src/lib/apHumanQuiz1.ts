import { PHYSICAL_FEATURES } from './physicalFeatures'

export const AP_HUMAN_QUIZ_1_NAME = 'AP Human Map Quiz 1'

export const AP_HUMAN_QUIZ_1_COUNTRY_CODES = [
  'USA', 'CAN', 'MEX', 'CUB', 'HTI', 'BRA', 'VEN', 'PAN',
  'GBR', 'BEL', 'DEU', 'ESP', 'ITA', 'FRA', 'GRC', 'NOR',
  'RUS', 'UKR', 'EGY', 'MAR', 'AUS', 'NZL', 'COD', 'CPV',
  'NGA', 'RWA', 'SDN', 'SSD', 'ZAF', 'TUR', 'ISR', 'IRN',
  'IRQ', 'SAU', 'YEM', 'AFG', 'KAZ', 'MNG', 'IND', 'PAK',
  'BGD', 'CHN', 'JPN', 'PRK', 'KOR', 'IDN', 'MMR', 'PHL', 'SGP',
]

export const AP_HUMAN_QUIZ_1_FEATURE_IDS = PHYSICAL_FEATURES.map((f) => f.id)

export const AP_HUMAN_QUIZ_1_STATS = {
  countries: AP_HUMAN_QUIZ_1_COUNTRY_CODES.length,
  features: AP_HUMAN_QUIZ_1_FEATURE_IDS.length,
  total: AP_HUMAN_QUIZ_1_COUNTRY_CODES.length + AP_HUMAN_QUIZ_1_FEATURE_IDS.length,
}
