import { mc, type ApHumanPracticeQuestion } from './apHumanStudy'

const D = 'data' as const

export const DATA_QUESTIONS: ApHumanPracticeQuestion[] = [
  mc('d1', D, 'Geographic data gathered by a person visiting a place and recording what they see, hear, or measure is called', [
    'remote sensing, because the observer is collecting images of the surface',
    'fieldwork or field observation, because the data are collected on site',
    'GIS analysis, because several layers are stacked on a computer',
    'census enumeration, because it is always a national government count',
  ], 1, 'Fieldwork means going to the location. Remote sensing gathers images from above. GIS analyzes stacked layers. A census is one organized count, not the name for all on-site observation.'),
  mc('d2', D, 'Which of the following is the best example of qualitative geographic data?', [
    'The exact latitude of a bus stop recorded by GPS',
    'A travel narrative, interview, or landscape description written after visiting a place',
    'The number of people counted in a census tract',
    'Average household income by county from the ACS',
  ], 1, 'Qualitative sources are words and interpretation: field notes, interviews, media, policy documents, photo interpretation. Coordinates, counts, and income are quantitative.'),
  mc('d3', D, 'GIS is best defined as', [
    'a network of satellites that report a receiver’s coordinates',
    'computer software that stores, analyzes, and displays several layers of spatial data at once',
    'cameras or sensors on aircraft and satellites that image Earth’s surface',
    'a national questionnaire that counts population every ten years',
  ], 1, 'GIS stacks and analyzes layers. GPS locates a point. Remote sensing images the surface. The census is a data source GIS might use, not GIS itself.'),
  mc('d4', D, 'A city planner wants to compare flood zones, bus routes, income, and vacant lots on one screen before choosing a site for a new clinic. Which tool is most appropriate, and why?', [
    'GPS, because it reports the absolute location of one parcel without other layers',
    'GIS, because it can stack and analyze multiple spatial layers at once',
    'Remote sensing, because satellite images alone identify every bus route and income level',
    'A census table, because counts of people replace the need to map other variables',
  ], 1, 'GPS locates a point. Remote sensing images land cover. Census tables are not maps of flood zones and routes. GIS is the tool that combines those layers for a siting decision.'),
  mc('d5', D, 'GPS is used mainly to', [
    'shade counties by unemployment rate on a choropleth map',
    'determine absolute location by communicating with satellites',
    'compare several data layers such as zoning and traffic',
    'collect repeat images of land cover from aircraft or satellites',
  ], 1, 'GPS gives precise coordinates. Choropleth mapping and layer comparison are GIS. Repeat images are remote sensing.'),
  mc('d6', D, 'Which task is a better fit for GPS than for GIS?', [
    'Analyzing which neighborhoods lack grocery stores by stacking income and store layers',
    'Finding the exact coordinates of a hiking trail or a delivery truck',
    'Comparing pollution and asthma data by census tract',
    'Planning a new subway line using ridership, zoning, and geology layers',
  ], 1, 'GPS answers “where is this point?” GIS answers “what patterns appear when I stack data?” The other three tasks need layered analysis.'),
  mc('d7', D, 'Remote sensing is the collection of information about Earth’s surface', [
    'by a researcher walking a neighborhood and taking field notes',
    'using cameras or sensors on aircraft or satellites above the ground',
    'by stacking income, roads, and zoning layers in GIS',
    'by a GPS receiver calculating a coordinate from satellite signals',
  ], 1, 'Remote sensing = images from above. Field notes are fieldwork. Layer stacking is GIS. A GPS fix is a coordinate, not an image of the surface.'),
  mc('d8', D, 'A researcher wants to measure how much rainforest was lost over 20 years. Which method is most effective?', [
    'Recording GPS coordinates of the research station each year',
    'Comparing satellite images of the same area from different years',
    'Interviewing one resident about how the forest used to look',
    'Using a political reference map of country borders',
  ], 1, 'Repeat remote-sensing images show land-cover change. One GPS point, one interview, or a reference map cannot measure area lost over two decades as well.'),
  mc('d9', D, 'Aerial photographs taken from planes or drones are most like', [
    'GIS, because they automatically stack census layers',
    'remote sensing, because they are images of the landscape collected from above',
    'GPS, because they report a single pair of coordinates',
    'a census, because they count every person in a tract',
  ], 1, 'Aerial photography is close-range remote sensing. Satellites do a similar job from higher up. GIS, GPS, and the census are different tools.'),
  mc('d10', D, 'The U.S. census is required every ten years. Geographers and governments use it most directly to', [
    'choose which map projection to print in textbooks',
    'count population so seats, districts, and public funding can be allocated',
    'measure elevation and slope for topographic maps',
    'replace the need for GIS, GPS, or remote sensing',
  ], 1, 'Census data supports representation and funding. It is a data source, not a projection, an elevation survey, or a replacement for other geospatial tools.'),
  mc('d11', D, 'Which decision is most likely to use census data?', [
    'A ship captain plotting a compass course on a Mercator chart',
    'A company choosing store sites based on age and income in each neighborhood',
    'A meteorologist drawing isolines of temperature from weather stations',
    'A hiker using GPS to mark a trailhead coordinate',
  ], 1, 'Census and ACS data are demographic. Navigation, weather isolines, and a GPS pin use other tools even though they are also spatial.'),
  mc('d12', D, 'After a hurricane, emergency managers compare satellite images from before and after the storm to see which neighborhoods lost roofs and roads. They are using', [
    'GIS only, because no image of the ground is involved',
    'remote sensing to guide a government decision',
    'GPS only, because they need one coordinate for the storm’s eye',
    'census reapportionment, because population counts changed overnight',
  ], 1, 'Before-and-after satellite imagery is remote sensing used for a government decision. GIS might display the images, but the collection method is remote sensing. GPS and the census are not what measured the damage.'),
  mc('d13', D, 'Which source is an example of spatial information from a written account rather than from a sensor or satellite?', [
    'A weather satellite image of cloud cover',
    'A policy document or newspaper report describing conditions in a city',
    'A GPS track of a delivery van',
    'A digital elevation model from radar',
  ], 1, 'Field observations, media reports, travel narratives, policy documents, and interviews are the written/qualitative sources in Topic 1.2. The others are remotely sensed or GPS-derived.'),
  mc('d14', D, 'Landscape analysis and photographic interpretation help geographers', [
    'preserve compass direction on a Mercator chart',
    'read human and physical features of a place from what the land looks like',
    'calculate GNI per capita from tax records',
    'assign core, semi-periphery, or periphery status',
  ], 1, 'Looking at a landscape or photo — housing, fields, factories, damage — is a way to collect spatial information. Direction, GNI, and world-systems labels are different skills.'),
  mc('d15', D, 'Which pairing is correct?', [
    'GIS: satellite coordinates only; GPS: layered crime and zoning maps; remote sensing: the census',
    'GIS: layered spatial analysis; GPS: absolute location; remote sensing: images from aircraft or satellites',
    'Remote sensing: door-to-door interviews; GIS: compass direction; GPS: choropleth shading',
    'Census: a type of map projection; GPS: a cartogram; GIS: isolines of temperature',
  ], 1, 'GPS locates a point, remote sensing images the surface, GIS analyzes stacked layers, and the census counts people. The other pairings swap those jobs.'),
]
