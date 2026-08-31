import { mc, type ApHumanPracticeQuestion } from './apHumanStudy'

const M = 'maps' as const
const P = 'patterns' as const
const J = 'projections' as const

export const MAP_QUESTIONS: ApHumanPracticeQuestion[] = [
  mc('m1', M, 'A geographer wants a map that shows country borders, capitals, and major cities so students can find places. Which type of map is most appropriate?', [
    'A reference map',
    'A choropleth map',
    'A cartogram',
    'A graduated symbol map',
  ], 0, 'Reference maps show location and navigation information such as borders, cities, and physical features. Thematic maps show a data pattern, not just “where things are.”'),
  mc('m2', M, 'Which of the following best describes the purpose of a thematic map?', [
    'To show the location of roads, rivers, and political boundaries',
    'To communicate a spatial pattern or characteristic of a place, such as income or language',
    'To keep compass direction perfectly accurate for ships',
    'To remove all distortion from a world map',
  ], 1, 'Thematic maps answer “what is it like there?” by showing data across space. Reference maps answer “where is it?”'),
  mc('m3', M, 'A map of the United States uses darker shades of blue for states with higher median income and lighter shades for lower income. Which of the following best identifies the map type and a limitation of that choice?', [
    'Dot-density; it cannot show quantity',
    'Choropleth; values are averaged across each state, so variation inside a state is hidden',
    'Cartogram; it preserves true land area',
    'Isoline; it can only show city locations',
  ], 1, 'Shaded political units = choropleth. AP-level answers also know the limitation: the whole state gets one color.'),
  mc('m4', M, 'A city map places one dot for every reported burglary. Neighborhoods with more crime appear as clusters of dots. This map is best classified as a', [
    'reference map',
    'cartogram',
    'dot-density map',
    'topographic map',
  ], 2, 'On a dot-density map, each dot represents a set quantity of a phenomenon, so clustering of dots shows concentration.'),
  mc('m5', M, 'Which map type uses symbols that get larger as the value of a variable increases, such as circles sized by a city’s population?', [
    'Isoline map',
    'Political reference map',
    'Graduated or proportional symbol map',
    'Mercator projection',
  ], 2, 'Graduated/proportional symbol maps change symbol size to show amount. Isolines connect equal values; choropleth maps shade areas.'),
  mc('m6', M, 'On a world population cartogram, some countries look much larger than they are in real land area. Why?', [
    'Cartograms always preserve true land area',
    'The size of each country is scaled to a variable, such as population, so area is distorted on purpose',
    'Cartograms can only show elevation',
    'The map is a reference map of physical features',
  ], 1, 'A cartogram resizes places according to a statistic. That makes the pattern easy to see, but it is not a true-area map.'),
  mc('m7', M, 'Weather maps often show lines connecting points that have the same temperature. Those lines are an example of', [
    'choropleth shading',
    'dot density',
    'isolines',
    'a cartogram',
  ], 2, 'Isolines connect locations of equal value. They are common for weather, pressure, and elevation.'),
  mc('m8', M, 'A topographic map is most useful for showing which spatial pattern?', [
    'The official language of each country',
    'Elevation and the shape of the land surface',
    'The location of every capital city only',
    'Income inequality between neighborhoods',
  ], 1, 'Topographic maps show elevation with contour lines or textured relief. Closer lines mean steeper slopes.'),
  mc('m9', M, 'A highway atlas, a physical map of mountain ranges, and a political map of states are all examples of', [
    'thematic maps',
    'reference maps',
    'cartograms',
    'equal-area projections',
  ], 1, 'Political, physical, and road maps are classic reference maps used for location and navigation.'),
  mc('m10', M, 'Which task is better suited to a thematic map than to a reference map?', [
    'Finding the shortest driving route between two cities',
    'Identifying which counties have the highest percent of people without health insurance',
    'Locating the capital of a country',
    'Reading the names of major rivers',
  ], 1, 'Comparing a social or economic variable across space is a thematic-map job. Finding routes and place names is a reference-map job.'),
  mc('m11', M, 'Choropleth, dot-density, graduated symbol, isoline, and cartogram maps are all types of', [
    'reference maps',
    'thematic maps',
    'map projections',
    'census forms',
  ], 1, 'Those are the main thematic map types in Topic 1.1. They show a data pattern, not just location.'),

  mc('p1', P, 'Which of the following is the best example of absolute location?', [
    '“The café is across from the library.”',
    '“Turn left after the gas station.”',
    'A place described by latitude and longitude or a street address',
    '“About a two-day trip by train.”',
  ], 2, 'Absolute location is exact and precise: coordinates or an address. Relative location describes a place in relation to other places.'),
  mc('p2', P, 'A student describes Chicago as “on Lake Michigan, about 90 miles north of Gary, and a major hub between the East Coast and the Midwest.” This description emphasizes', [
    'absolute location',
    'relative location',
    'map projection',
    'remote sensing',
  ], 1, 'Relative location explains a place by its relationship to other places, features, or routes.'),
  mc('p3', P, '“The school is 3.2 kilometers from the stadium” is an example of', [
    'relative direction',
    'absolute distance',
    'clustering',
    'a cartogram',
  ], 1, 'Absolute distance is a measured length (miles, kilometers, feet). Relative distance is about time, cost, or how connected two places feel.'),
  mc('p4', P, 'Online shopping that delivers a product in two days, even if the warehouse is far away, is the best illustration of a decrease in', [
    'absolute location',
    'relative distance',
    'elevation',
    'map scale',
  ], 1, 'Relative distance shrinks when connections, movement, and flow get faster or cheaper. The physical mileage may stay the same.'),
  mc('p5', P, 'Cardinal directions such as north, south, east, and west are an example of', [
    'relative direction',
    'absolute direction',
    'dot density',
    'dispersal',
  ], 1, 'Absolute direction uses the compass. Relative direction uses landmarks (“left at the store, then right”).'),
  mc('p6', P, 'On a map of coffee shops, most shops sit next to one another in the downtown core and almost none appear in the suburbs. The downtown pattern is best described as', [
    'dispersed',
    'clustered',
    'uniform worldwide',
    'a map projection',
  ], 1, 'Clustering means features are close together. Dispersal means they are spread far apart.'),
  mc('p7', P, 'Density measures', [
    'whether two places have the same relative location',
    'how many of something are found in a defined area',
    'only the direction between two points',
    'the type of map projection being used',
  ], 1, 'Density is a count per unit of area (people per square mile, stores per neighborhood). Distribution is the way those things are spread out.'),
  mc('p8', P, 'Farms that are spaced evenly across a rural county, with large gaps between them, show a pattern of', [
    'clustering',
    'dispersal or a dispersed distribution',
    'absolute direction',
    'elevation',
  ], 1, 'Dispersal/distribution describes features that are far apart or spread over an area rather than bunched together.'),
  mc('p9', P, 'A map shows high asthma rates in the same neighborhoods that have many highways and factories. A geographer might say this is evidence of', [
    'a map projection error',
    'spatial association, because the two patterns may be related',
    'absolute direction',
    'a reference map',
  ], 1, 'Spatial association means two or more phenomena appear together in space and may be related or correlated.'),
  mc('p10', P, 'Which pair correctly matches the concept with an example?', [
    'Absolute location: “next to the park”; relative location: 40°N, 74°W',
    'Absolute distance: 12 miles; relative distance: “a short subway ride”',
    'Absolute direction: “left at the light”; relative direction: north',
    'Clustering: features far apart; dispersal: features packed together',
  ], 1, 'Absolute = exact measurement. Relative = relationship, time, or connection. Clustering is close together; dispersal is spread out.'),

  mc('j1', J, 'Why do all flat world maps distort the Earth?', [
    'Cartographers refuse to use computers',
    'A curved surface cannot be transferred to a flat surface without changing shape, area, distance, or direction',
    'Satellites cannot measure location',
    'Only thematic maps have distortion',
  ], 1, 'A map projection flattens the globe. Every projection is selective and distorts at least one of SADD: shape, area, distance, direction.'),
  mc('j2', J, 'The letters S.A.D.D. remind geographers that map projections distort', [
    'scale, altitude, density, and data',
    'shape, area, distance, and direction',
    'states, oceans, deserts, and deltas',
    'satellites, aircraft, drones, and data',
  ], 1, 'Every projection trades off shape, area, distance, and/or direction. No flat map keeps all four perfectly.'),
  mc('j3', J, 'A ship captain needs a map on which compass direction is true and latitude/longitude lines meet at right angles. Which projection is designed for that purpose?', [
    'Robinson',
    'Gall-Peters equal-area',
    'Mercator',
    'A population cartogram',
  ], 2, 'Mercator was made for navigation. It preserves direction and the right angles of the grid, but it stretches area near the poles.'),
  mc('j4', J, 'The strongest criticism of the Mercator projection is that it', [
    'cannot show compass direction',
    'makes high-latitude landmasses look much larger than they really are',
    'is only useful for showing elevation',
    'hides the location of the equator',
  ], 1, 'On Mercator, Greenland and other polar areas look huge compared with places near the equator. Area is badly distorted at high latitudes.'),
  mc('j5', J, 'A teacher wants a world map that shows Africa and Europe at a more accurate relative size so students do not think Europe is larger than it is. Which projection is the better choice?', [
    'Mercator',
    'Gall-Peters equal-area',
    'A road reference map of one city',
    'A topographic map',
  ], 1, 'Gall-Peters (and other equal-area projections) keep landmass area more accurate. The trade-off is warped shapes, especially near the poles and equator.'),
  mc('j6', J, 'Which of the following is a disadvantage of the Gall-Peters projection?', [
    'Landmass areas are wildly inaccurate',
    'Shapes are stretched or distorted, especially near the poles and equator',
    'It cannot be used to compare country size',
    'It preserves direction better than Mercator',
  ], 1, 'Peters is equal-area, so size is its strength. Shape is its weakness: land looks vertically stretched near the equator and warped near the poles.'),
  mc('j7', J, 'The Robinson projection is best described as a', [
    'navigation chart that keeps direction perfect',
    'compromise projection with no major distortion, but slight distortion of all properties',
    'map that shows only elevation',
    'projection with zero distortion of area',
  ], 1, 'Robinson is a general-purpose compromise. Nothing is perfectly preserved, but nothing is extremely wrong either. It is common in textbooks.'),
  mc('j8', J, 'A cartographer chooses a projection based on the map’s purpose. Which pairing is most accurate?', [
    'Mercator for comparing true land area; Peters for sea navigation',
    'Mercator for navigation; equal-area (Peters) for comparing country size; Robinson for a general world map',
    'Robinson for keeping lat/long as perfect right angles at all latitudes',
    'Any projection can keep shape, area, distance, and direction all accurate',
  ], 1, 'The “best” projection depends on the job. Navigation, equal area, and general reference need different trade-offs.'),
  mc('j9', J, 'Which statement about maps is most accurate?', [
    'A well-made map can show the Earth with no distortion',
    'All maps are selective; they emphasize some information and distort spatial relationships',
    'Only old maps are distorted; modern maps are perfect',
    'Thematic maps never use projections',
  ], 1, 'Topic 1.1: maps leave things out, and projections always distort. Readers have to know what a map is trying to show and what it hides.'),
]
