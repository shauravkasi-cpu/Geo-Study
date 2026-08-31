import { mc, type ApHumanPracticeQuestion } from './apHumanStudy'

const D = 'data' as const

export const DATA_QUESTIONS: ApHumanPracticeQuestion[] = [
  mc('d1', D, 'Geographic data gathered by a person visiting a place and recording what they see, hear, or measure is called', [
    'a map projection',
    'fieldwork or field observation',
    'a cartogram',
    'absolute direction',
  ], 1, 'Fieldwork means going to the location. Organizations (a census bureau) and individuals (a researcher with a notebook) both do it.'),
  mc('d2', D, 'Which of the following is the best example of qualitative geographic data?', [
    'The exact latitude of a bus stop',
    'A travel narrative, interview, or landscape description written after visiting a place',
    'The number of people counted in a census tract',
    'Average household income by county',
  ], 1, 'Written accounts — field notes, media reports, travel narratives, interviews, policy documents, and photo interpretation — give spatial information that numbers alone may miss.'),
  mc('d3', D, 'GIS is best defined as', [
    'a network of satellites that tell a phone its exact coordinates',
    'computer software that stores, analyzes, and displays several layers of spatial data at once',
    'a paper atlas of political boundaries',
    'a camera on a drone',
  ], 1, 'GIS stacks thematic and physical layers (roads, income, zoning, floodplains) so users can analyze patterns and make decisions.'),
  mc('d4', D, 'A city planner wants to compare flood zones, bus routes, income, and vacant lots on one screen before choosing a site for a new clinic. Which tool is most appropriate, and why?', [
    'GPS, because it reports a single coordinate without other data',
    'GIS, because it can stack and analyze multiple spatial layers at once',
    'A Mercator chart, because it preserves area at the poles',
    'Remote sensing only, because interviews are never used in cities',
  ], 1, 'The AP distinction: GPS locates a point; remote sensing images the surface; GIS analyzes stacked layers for a decision.'),
  mc('d5', D, 'GPS is used mainly to', [
    'shade counties by unemployment rate',
    'determine absolute location by communicating with satellites',
    'interview residents about sense of place',
    'draw equal-area world maps',
  ], 1, 'Satellite navigation systems (GPS) give precise coordinates. That is why cars, ships, and aircraft use them for navigation.'),
  mc('d6', D, 'Which task is a better fit for GPS than for GIS?', [
    'Analyzing which neighborhoods lack grocery stores',
    'Finding the exact coordinates of a hiking trail or a delivery truck',
    'Comparing pollution and asthma data by census tract',
    'Planning a new subway line using many data layers',
  ], 1, 'GPS answers “where am I / where is this point?” GIS answers “what patterns appear when I stack data?”'),
  mc('d7', D, 'Remote sensing is the collection of information about Earth’s surface', [
    'only by knocking on doors',
    'using cameras or sensors on aircraft or satellites above the ground',
    'only through personal interviews',
    'by drawing a sketch map from memory',
  ], 1, 'Remote sensing gathers digital images without standing on the site. It is used for weather, environmental change, and places that are hard to visit.'),
  mc('d8', D, 'A researcher wants to measure how much rainforest was lost over 20 years. Which method is most effective?', [
    'Asking one tourist for directions',
    'Comparing satellite images of the same area from different years',
    'Using only a political reference map',
    'Recording GPS coordinates of one tree',
  ], 1, 'Repeat remote-sensing images show land-cover change over time. One GPS point or a reference map cannot measure that change.'),
  mc('d9', D, 'Aerial photographs taken from planes or drones are most like', [
    'GNI per capita',
    'a type of remotely collected image of the landscape',
    'a census questionnaire',
    'a Mercator projection',
  ], 1, 'Aerial photography is a close-range form of gathering images of Earth’s surface. Satellites do a similar job from higher up.'),
  mc('d10', D, 'The U.S. census is required every ten years. Geographers and governments use it most directly to', [
    'choose a map projection',
    'count population so seats, districts, and public funding can be allocated',
    'measure elevation',
    'replace GIS',
  ], 1, 'Census data supports representative districts and funding for schools, roads, emergency services, and infrastructure. Businesses and individuals use it too.'),
  mc('d11', D, 'Which decision is most likely to use census data?', [
    'Picking a favorite map color',
    'A company choosing where to open stores based on age and income in each neighborhood',
    'Measuring the temperature at the equator',
    'Drawing latitude lines on a globe',
  ], 1, 'Topic 1.3: census and other geospatial data are used at all scales for personal, business, and government decisions.'),
  mc('d12', D, 'After a hurricane, emergency managers compare satellite images from before and after the storm to see which neighborhoods lost roofs and roads. They are using', [
    'only interviews',
    'remote sensing to guide a government decision',
    'a cartogram of world population',
    'absolute direction',
  ], 1, 'Satellite imagery is geospatial data used for government decision making — here, where to send rescue and rebuilding help.'),
  mc('d13', D, 'Which source is an example of spatial information from a written account rather than from a sensor or satellite?', [
    'A weather satellite image',
    'A policy document or newspaper report describing conditions in a city',
    'A GPS coordinate',
    'A digital elevation model',
  ], 1, 'Field observations, media reports, travel narratives, policy documents, interviews, landscape analysis, and photographic interpretation are the written/qualitative sources in 1.2.'),
  mc('d14', D, 'Landscape analysis and photographic interpretation help geographers', [
    'keep map direction perfect',
    'read the human and physical features of a place from what the land looks like',
    'calculate GNI',
    'define the informal economy',
  ], 1, 'Looking at a landscape or a photo — housing, fields, factories, damage — is a way to collect spatial information when you cannot run a full census.'),
  mc('d15', D, 'Which pairing is correct?', [
    'GIS: satellite coordinates only; GPS: layered crime and zoning maps',
    'GIS: layered spatial analysis; GPS: absolute location; remote sensing: images from aircraft or satellites',
    'Remote sensing: door-to-door interviews; GIS: compass direction',
    'Census: a type of map projection; GPS: a choropleth map',
  ], 1, 'Keep the tools straight: GPS locates a point, remote sensing images the surface, GIS analyzes stacked layers, and the census counts people.'),
]
