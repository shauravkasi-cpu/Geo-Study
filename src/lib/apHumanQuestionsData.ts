import { mc, type ApHumanPracticeQuestion } from './apHumanStudy'

const D = 'data' as const

export const DATA_QUESTIONS: ApHumanPracticeQuestion[] = [
  mc('d1', D, 'Geographic data gathered by a person visiting a place and recording what they see, hear, or measure is called', [
    'remote sensing, because images of the surface are collected from above',
    'fieldwork or field observation, because the data are collected on site',
    'GIS analysis, because several layers are stacked on a computer',
    'census enumeration, because it is always a national government count',
  ], 1, 'Fieldwork means going to the location. Remote sensing gathers images from above. GIS analyzes stacked layers. A census is one organized count.'),
  mc('d2', D, 'Which of the following is the best example of qualitative geographic data?', [
    'A GPS latitude for a bus stop recorded to four decimal places',
    'A travel narrative or interview describing conditions in a place',
    'A census-tract population count from the last enumeration',
    'Average household income by county from the ACS tables',
  ], 1, 'Qualitative sources are words and interpretation. Coordinates, counts, and income are quantitative.'),
  mc('d3', D, 'GIS is best defined as', [
    'a satellite network that reports a receiver’s exact coordinates',
    'software that stores, analyzes, and displays stacked spatial layers',
    'cameras on aircraft or satellites that image Earth’s surface',
    'a national questionnaire that counts population every ten years',
  ], 1, 'GIS stacks and analyzes layers. GPS locates a point. Remote sensing images the surface. The census is a data source.'),
  mc('d4', D, 'A city planner wants to compare flood zones, bus routes, income, and vacant lots on one screen before choosing a site for a new clinic. Which tool is most appropriate, and why?', [
    'GPS, because it reports one parcel’s coordinates without other layers',
    'GIS, because it can stack and analyze those spatial layers together',
    'Remote sensing, because images alone show bus routes and income',
    'A census table, because headcounts replace the need to map the rest',
  ], 1, 'GPS locates a point. Remote sensing images land cover. Census tables are not maps of flood zones and routes. GIS combines the layers.'),
  mc('d5', D, 'GPS is used mainly to', [
    'shade counties by unemployment on a choropleth layer',
    'find absolute location by communicating with satellites',
    'compare several data layers such as zoning and traffic',
    'collect repeat images of land cover from aircraft or satellites',
  ], 1, 'GPS gives precise coordinates. Layer comparison is GIS. Repeat images are remote sensing.'),
  mc('d6', D, 'Which task is a better fit for GPS than for GIS?', [
    'Finding which neighborhoods lack grocery stores using income layers',
    'Finding the exact coordinates of a hiking trail or delivery truck',
    'Comparing pollution and asthma rates by census tract',
    'Planning a subway line with ridership, zoning, and geology layers',
  ], 1, 'GPS answers “where is this point?” GIS answers “what patterns appear when I stack data?”'),
  mc('d7', D, 'Remote sensing is the collection of information about Earth’s surface', [
    'by a researcher walking a neighborhood and taking field notes',
    'using cameras or sensors on aircraft or satellites above the ground',
    'by stacking income, roads, and zoning layers in GIS software',
    'by a GPS receiver calculating a coordinate from satellite signals',
  ], 1, 'Remote sensing = images from above. Field notes are fieldwork. Layer stacking is GIS. A GPS fix is a coordinate.'),
  mc('d8', D, 'A researcher wants to measure how much rainforest was lost over 20 years. Which method is most effective?', [
    'Recording GPS coordinates of the research station each year',
    'Comparing satellite images of the same area from different years',
    'Interviewing one resident about how the forest used to look',
    'Using a political reference map of current country borders',
  ], 1, 'Repeat remote-sensing images show land-cover change over time.'),
  mc('d9', D, 'Aerial photographs taken from planes or drones are most like', [
    'GIS, because they automatically stack census income layers',
    'remote sensing, because they image the landscape from above',
    'GPS, because they report a single pair of coordinates',
    'a census, because they count every person in a tract',
  ], 1, 'Aerial photography is close-range remote sensing.'),
  mc('d10', D, 'The U.S. census is required every ten years. Geographers and governments use it most directly to', [
    'choose which map projection to print in school atlases',
    'count people so seats, districts, and funding can be allocated',
    'measure elevation and slope for topographic contour maps',
    'replace the need for GIS, GPS, or remote sensing tools',
  ], 1, 'Census data supports representation and funding. It does not replace other geospatial tools.'),
  mc('d11', D, 'Which decision is most likely to use census data?', [
    'A captain plotting a rhumb-line course on a Mercator chart',
    'A firm picking store sites from age and income by neighborhood',
    'A meteorologist drawing isolines of temperature from stations',
    'A hiker marking a trailhead coordinate with a GPS receiver',
  ], 1, 'Census and ACS data are demographic. The others are navigation, weather, or a GPS pin.'),
  mc('d12', D, 'After a hurricane, emergency managers compare satellite images from before and after the storm to see which neighborhoods lost roofs and roads. They are using', [
    'GIS only, because no image of the ground is involved here',
    'remote sensing to guide where government help should go',
    'GPS only, because they need one coordinate for the storm’s eye',
    'census reapportionment, because counts changed overnight',
  ], 1, 'Before-and-after satellite imagery is remote sensing used for a government decision.'),
  mc('d13', D, 'Which source is an example of spatial information from a written account rather than from a sensor or satellite?', [
    'A weather satellite image showing regional cloud cover',
    'A newspaper report describing flood damage in a city',
    'A GPS track recorded by a delivery van over a day',
    'A digital elevation model produced from radar returns',
  ], 1, 'Written/qualitative sources include media, policy documents, and interviews.'),
  mc('d14', D, 'Landscape analysis and photographic interpretation help geographers', [
    'preserve compass direction on a Mercator navigation chart',
    'read human and physical features from how the land looks',
    'calculate GNI per capita from corporate tax records',
    'assign core, semi-periphery, or periphery status to a state',
  ], 1, 'Looking at a landscape or photo is a way to collect spatial information.'),
  mc('d15', D, 'Which pairing is correct?', [
    'GIS: coordinates only; GPS: stacked crime layers; remote sensing: the census',
    'GIS: layered analysis; GPS: absolute location; remote sensing: images from above',
    'Remote sensing: interviews; GIS: compass direction; GPS: choropleth shading',
    'Census: a projection type; GPS: a cartogram; GIS: isolines of temperature',
  ], 1, 'GPS locates a point, remote sensing images the surface, GIS analyzes stacked layers.'),
]
