import { mc, type ApHumanPracticeQuestion } from './apHumanStudy'

const M = 'maps' as const
const P = 'patterns' as const
const J = 'projections' as const

export const MAP_QUESTIONS: ApHumanPracticeQuestion[] = [
  mc('m1', M, 'A geographer wants a map that shows country borders, capitals, and major cities so students can find places. Which type of map is most appropriate?', [
    'A political reference map',
    'A choropleth map of median income',
    'A topographic map of elevation',
    'A cartogram scaled to population',
  ], 0, 'Reference maps show location: borders, cities, and physical features. Choropleth, topographic, and cartogram maps are built to show a data pattern or the land surface, not just “where is it?”'),
  mc('m2', M, 'Which of the following best describes the purpose of a thematic map?', [
    'To help users navigate and identify place names and boundaries',
    'To communicate the spatial distribution of a variable or characteristic',
    'To preserve compass direction for maritime navigation',
    'To display identical information at every map scale',
  ], 1, 'Thematic maps answer “what is it like there?” Reference maps answer “where is it?” Preserving direction is a projection choice (Mercator), not a map type.'),
  mc('m3', M, 'A map of the United States uses darker shades of blue for states with higher median income and lighter shades for lower income. Which of the following best identifies the map type and a limitation of that choice?', [
    'Isoline; it shows gradual change but cannot use political units',
    'Choropleth; values are averaged across each state, so variation inside a state is hidden',
    'Graduated symbol; it shows point data rather than area shading',
    'Cartogram; it resizes states by income so land area is no longer true',
  ], 1, 'Shaded enumeration units = choropleth. The AP limitation is ecological fallacy / aggregation: the whole state gets one color, so urban–rural differences disappear.'),
  mc('m4', M, 'A city map places one dot for every reported burglary. Neighborhoods with more crime appear as clusters of dots. This map is best classified as a', [
    'choropleth map, because entire neighborhoods are shaded one color',
    'graduated symbol map, because symbol size changes with crime totals',
    'dot-density map, because each equal-sized dot represents a count',
    'isoline map, because lines connect places with equal crime rates',
  ], 2, 'Dot-density uses many equal dots; clustering of dots shows concentration. Graduated symbols change size. Choropleth shades areas. Isolines connect equal values.'),
  mc('m5', M, 'Which map type uses symbols that get larger as the value of a variable increases, such as circles sized by a city’s population?', [
    'Isoline map, which connects points of equal value',
    'Choropleth map, which shades enumeration units',
    'Graduated or proportional symbol map, which sizes symbols by amount',
    'Dot-density map, which uses equal-sized dots for counts',
  ], 2, 'Graduated/proportional symbols change size to show quantity. Isolines connect equals; choropleth shades areas; dot-density repeats the same small symbol.'),
  mc('m6', M, 'On a world population cartogram, some countries look much larger than they are in real land area. Why?', [
    'The Mercator projection always enlarges countries near the equator',
    'The size of each country is scaled to a variable such as population, so area is distorted on purpose',
    'Isolines of elevation have been drawn on a political base map',
    'The cartogram preserves true land area better than an equal-area projection',
  ], 1, 'A cartogram resizes places according to a statistic. Mercator also distorts area, but for a different reason (latitude), and it does not scale countries to population.'),
  mc('m7', M, 'Weather maps often show lines connecting points that have the same temperature. Those lines are an example of', [
    'choropleth boundaries between states',
    'graduated symbols sized by temperature',
    'isolines connecting locations of equal value',
    'a cartogram that resizes countries by climate',
  ], 2, 'Isolines connect equal values (temperature, pressure, elevation). Choropleth shades whole units; graduated symbols change size; cartograms change area.'),
  mc('m8', M, 'A topographic map is most useful for showing which spatial pattern?', [
    'The official language spoken in each country',
    'Elevation and the shape of the land surface',
    'Median household income by county',
    'The relative size of national populations',
  ], 1, 'Topographic maps show elevation with contour lines. Language and income are thematic social data; population size is often shown with a cartogram or graduated symbols.'),
  mc('m9', M, 'A highway atlas, a physical map of mountain ranges, and a political map of states are all examples of', [
    'thematic maps that display one statistical variable',
    'reference maps used for location and navigation',
    'equal-area projections designed to compare country size',
    'cartograms that resize places by a dataset',
  ], 1, 'Political, physical, and road maps are classic reference maps. Thematic maps show a variable; projections and cartograms are different tools.'),
  mc('m10', M, 'Which task is better suited to a thematic map than to a reference map?', [
    'Finding the shortest driving route between two cities',
    'Identifying which counties have the highest percent of people without health insurance',
    'Locating the capital of a country on a political map',
    'Reading the names of major rivers on a physical map',
  ], 1, 'Comparing a social or economic variable across space is a thematic-map job. Routes, capitals, and river names are reference-map jobs.'),
  mc('m11', M, 'Choropleth, dot-density, graduated symbol, isoline, and cartogram maps are all types of', [
    'reference maps that emphasize place names and boundaries',
    'thematic maps that show a spatial data pattern',
    'map projections that flatten the globe',
    'census methods for counting population',
  ], 1, 'Those are the main thematic map types in Topic 1.1. Projections are how the Earth is flattened; the census is a data source, not a map type.'),

  mc('p1', P, 'Which of the following is the best example of absolute location?', [
    'The café is across from the library and two blocks south of City Hall',
    'The warehouse is a two-day shipment from the port',
    'A place described by latitude and longitude or a street address',
    'The stadium is a short subway ride from downtown',
  ], 2, 'Absolute location is exact: coordinates or an address. The other choices are relative location or relative distance (time/connection).'),
  mc('p2', P, 'A student describes Chicago as “on Lake Michigan, about 90 miles north of Gary, and a major hub between the East Coast and the Midwest.” This description emphasizes', [
    'absolute location using a coordinate grid',
    'relative location using relationships to other places',
    'absolute distance measured only in kilometers',
    'a clustered distribution of a single variable',
  ], 1, 'Relative location explains a place by its relationship to other places and routes. Absolute location would be lat/long or an address.'),
  mc('p3', P, '“The school is 3.2 kilometers from the stadium” is an example of', [
    'relative distance, because it describes travel time',
    'absolute distance, because it is a measured length',
    'relative direction, because it uses a landmark',
    'absolute location, because it gives a coordinate',
  ], 1, 'Absolute distance is a measured length. Relative distance is time, cost, or how connected two places feel. The sentence is not a coordinate or a compass bearing.'),
  mc('p4', P, 'Online shopping that delivers a product in two days, even if the warehouse is far away, is the best illustration of a decrease in', [
    'absolute distance, because the mileage between warehouse and home has changed',
    'relative distance, because time-space compression makes far places feel closer',
    'absolute location, because the warehouse’s coordinates moved',
    'clustering, because all stores must now locate downtown',
  ], 1, 'Relative distance shrinks when connections get faster or cheaper (time-space compression). The physical mileage (absolute distance) may stay the same.'),
  mc('p5', P, 'Cardinal directions such as north, south, east, and west are an example of', [
    'relative direction based on landmarks',
    'absolute direction based on the compass',
    'relative location based on nearby places',
    'absolute distance measured in kilometers',
  ], 1, 'Absolute direction uses the compass. Relative direction uses landmarks (“left at the store”). Location and distance are different concepts.'),
  mc('p6', P, 'On a map of coffee shops, most shops sit next to one another in the downtown core and almost none appear in the suburbs. The downtown pattern is best described as', [
    'dispersed, because shops are spread across the whole metro area',
    'clustered, because features are concentrated close together',
    'uniform, because every neighborhood has the same density',
    'linear, because shops follow a single highway only',
  ], 1, 'Clustering means features are bunched. Dispersal means spread apart. Uniform would be even spacing; linear would follow a line.'),
  mc('p7', P, 'Density measures', [
    'whether two phenomena are located next to each other',
    'how many of something are found in a defined area',
    'the direction from one point to another',
    'how spread out features are, regardless of how many there are',
  ], 1, 'Density is a count per unit of area. Distribution/dispersal is the arrangement. Spatial association is two patterns appearing together. Direction is a compass relationship.'),
  mc('p8', P, 'Farms that are spaced evenly across a rural county, with large gaps between them, show a pattern of', [
    'clustering, because each farm is a nucleated settlement',
    'dispersal, because features are spread far apart',
    'high density, because many farms occupy a small area',
    'absolute location, because each farm has an address',
  ], 1, 'Dispersal describes features that are far apart. Clustering is bunched. High density would mean many farms in a small area. Address is absolute location, not a pattern.'),
  mc('p9', P, 'A map shows high asthma rates in the same neighborhoods that have many highways and factories. A geographer might say this is evidence of', [
    'time-space compression, because travel times have fallen',
    'spatial association, because the two patterns occur together in space',
    'a dispersed distribution, because factories are evenly spaced',
    'absolute direction, because the highways run north–south',
  ], 1, 'Spatial association means two phenomena appear together and may be related. Compression, dispersal, and direction describe other spatial ideas.'),
  mc('p10', P, 'Which pair correctly matches the concept with an example?', [
    'Absolute location: “next to the park”; relative location: 40°N, 74°W',
    'Absolute distance: 12 miles; relative distance: “a short subway ride”',
    'Absolute direction: “left at the light”; relative direction: due north',
    'Clustering: farms far apart; dispersal: shops packed downtown',
  ], 1, 'Absolute = exact measurement. Relative = relationship, time, or connection. The other pairs reverse the definitions.'),

  mc('j1', J, 'Why do all flat world maps distort the Earth?', [
    'Thematic maps cannot show borders, so cartographers stretch the land',
    'A curved surface cannot be transferred to a flat surface without changing shape, area, distance, or direction',
    'Equal-area projections keep all four properties accurate, but reference maps do not',
    'Only large-scale city maps distort; small-scale world maps do not',
  ], 1, 'Every map projection flattens the globe and distorts at least one of SADD. Equal-area maps still warp shape. Scale does not remove that geometry problem.'),
  mc('j2', J, 'The letters S.A.D.D. remind geographers that map projections distort', [
    'scale, altitude, density, and data',
    'shape, area, distance, and direction',
    'site, area, density, and distribution',
    'situation, accessibility, distance, and direction',
  ], 1, 'The CED mnemonic is shape, area, distance, and direction. Scale and density are real geography terms, but they are not what SADD stands for.'),
  mc('j3', J, 'A ship captain needs a map on which compass direction is true and latitude/longitude lines meet at right angles. Which projection is designed for that purpose?', [
    'Robinson, because it is a compromise with little distortion of any property',
    'Gall-Peters, because it keeps the relative size of landmasses accurate',
    'Mercator, because it preserves direction and a rectangular coordinate grid',
    'An equal-area sinusoidal projection, because it minimizes polar stretch',
  ], 2, 'Mercator was made for navigation: true direction and a rectangular grid. Its cost is area distortion near the poles. Peters keeps area; Robinson is a compromise.'),
  mc('j4', J, 'The strongest criticism of the Mercator projection is that it', [
    'cannot show compass direction, so it is useless at sea',
    'makes high-latitude landmasses look much larger than they really are',
    'stretches equatorial countries more than polar ones',
    'keeps area accurate but destroys all sense of direction',
  ], 1, 'On Mercator, Greenland and Antarctica look huge compared with equatorial places. Direction is Mercator’s strength; area at high latitudes is its weakness. Peters is the reverse.'),
  mc('j5', J, 'A teacher wants a world map that shows Africa and Europe at a more accurate relative size so students do not think Europe is larger than it is. Which projection is the better choice?', [
    'Mercator, because it is the standard classroom world map',
    'Gall-Peters or another equal-area projection',
    'Robinson, because it keeps direction perfectly accurate',
    'A large-scale topographic map of one mountain range',
  ], 1, 'Equal-area projections (Gall-Peters) keep landmass size comparable. Mercator inflates Europe/Greenland. Robinson still distorts area somewhat. Topographic maps are local elevation, not world size.'),
  mc('j6', J, 'Which of the following is a disadvantage of the Gall-Peters projection?', [
    'Landmass areas are wildly inaccurate compared with Mercator',
    'Shapes are stretched or distorted, especially near the poles and equator',
    'It cannot be used to compare the relative size of countries',
    'It preserves direction better than Mercator, so area must be sacrificed',
  ], 1, 'Peters is equal-area, so size is its strength. Shape is its weakness. Mercator, not Peters, is the direction-preserving chart.'),
  mc('j7', J, 'The Robinson projection is best described as a', [
    'navigation chart that keeps direction perfect at all latitudes',
    'compromise projection with slight distortion of all properties and no extreme error',
    'equal-area projection that keeps Africa and Greenland in true proportion',
    'conformal projection that keeps local shapes accurate like Mercator',
  ], 1, 'Robinson is a general-purpose compromise: nothing is perfectly preserved, but nothing is extremely wrong. Mercator is conformal/navigation; Peters is equal-area.'),
  mc('j8', J, 'A cartographer chooses a projection based on the map’s purpose. Which pairing is most accurate?', [
    'Mercator for comparing true land area; Peters for sea navigation; Robinson for polar research',
    'Mercator for navigation; equal-area (Peters) for comparing country size; Robinson for a general world map',
    'Robinson for keeping lat/long as perfect right angles at all latitudes',
    'Any projection can keep shape, area, distance, and direction all accurate if the scale is large enough',
  ], 1, 'Match the tool to the task. Scale does not erase SADD trade-offs. Robinson does not keep a perfect rectangular grid the way Mercator does.'),
  mc('j9', J, 'Which statement about maps is most accurate?', [
    'A well-made equal-area map can show the Earth with no distortion of shape or distance',
    'All maps are selective; they emphasize some information and distort spatial relationships',
    'Digital GIS maps remove projection distortion that paper maps cannot',
    'Thematic maps do not use projections because they show data rather than space',
  ], 1, 'Every map leaves things out, and every projection distorts. GIS still uses a projection. Thematic maps are still maps of Earth, so they still project.'),
]
