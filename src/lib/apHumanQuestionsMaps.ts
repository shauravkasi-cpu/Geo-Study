import { mc, type ApHumanPracticeQuestion } from './apHumanStudy'

const M = 'maps' as const
const P = 'patterns' as const
const J = 'projections' as const

export const MAP_QUESTIONS: ApHumanPracticeQuestion[] = [
  mc('m1', M, 'A geographer wants a map that shows country borders, capitals, and major cities so students can find places. Which type of map is most appropriate?', [
    'A political reference map of borders and place names',
    'A choropleth map of median household income',
    'A topographic map of elevation and slope',
    'A cartogram with area scaled to population',
  ], 0, 'Reference maps show location: borders, cities, and physical features. The others display a data pattern or the land surface, not just “where is it?”'),
  mc('m2', M, 'Which of the following best describes the purpose of a thematic map?', [
    'To help users navigate using place names, roads, and boundaries',
    'To show how a variable is distributed across geographic space',
    'To keep compass bearings true for plotting maritime courses',
    'To display identical detail at both local and global scales',
  ], 1, 'Thematic maps answer “what is it like there?” Navigation is a reference-map job. True direction is a Mercator property. Scale always changes detail.'),
  mc('m3', M, 'A map of the United States uses darker shades of blue for states with higher median income and lighter shades for lower income. Which of the following best identifies the map type and a limitation of that choice?', [
    'Isoline; gradual change is shown, but political units cannot be used',
    'Choropleth; each state is one value, so internal variation is hidden',
    'Graduated symbol; point symbols show totals rather than area shading',
    'Cartogram; states are resized by income, so land area is no longer true',
  ], 1, 'Shaded enumeration units = choropleth. The AP limitation is aggregation: the whole state gets one color.'),
  mc('m4', M, 'A city map places one dot for every reported burglary. Neighborhoods with more crime appear as clusters of dots. This map is best classified as a', [
    'choropleth map, because whole neighborhoods are shaded one color',
    'graduated symbol map, because circle size changes with crime totals',
    'dot-density map, because each equal-sized dot represents a count',
    'isoline map, because lines connect places with equal crime rates',
  ], 2, 'Dot-density uses many equal dots. Graduated symbols change size. Choropleth shades areas. Isolines connect equal values.'),
  mc('m5', M, 'Which map type uses symbols that get larger as the value of a variable increases, such as circles sized by a city’s population?', [
    'Isoline map, which connects points that share an equal value',
    'Choropleth map, which shades whole enumeration units one color',
    'Graduated symbol map, which sizes point symbols by the amount',
    'Dot-density map, which repeats equal-sized dots for each count',
  ], 2, 'Graduated/proportional symbols change size to show quantity. The others use equal symbols, area shading, or connecting lines.'),
  mc('m6', M, 'On a world population cartogram, some countries look much larger than they are in real land area. Why?', [
    'Mercator stretch near the equator makes those countries look huge',
    'Each country’s area is scaled to a statistic such as population',
    'Isolines of elevation have been drawn over a political base map',
    'Equal-area rules force empty land to appear larger than cities',
  ], 1, 'A cartogram resizes places according to a statistic. Mercator distorts area by latitude, not by population.'),
  mc('m7', M, 'Weather maps often show lines connecting points that have the same temperature. Those lines are an example of', [
    'choropleth boundaries drawn between neighboring states',
    'graduated symbols whose size changes with temperature',
    'isolines connecting locations that share an equal value',
    'a cartogram that resizes countries according to climate',
  ], 2, 'Isolines connect equal values. Choropleth shades units; graduated symbols change size; cartograms change area.'),
  mc('m8', M, 'A topographic map is most useful for showing which spatial pattern?', [
    'The official language spoken across each country',
    'Elevation and the shape of the land surface',
    'Median household income by county or tract',
    'The relative size of national populations',
  ], 1, 'Topographic maps show elevation with contour lines. Language and income are thematic social data; population size is often a cartogram or graduated symbols.'),
  mc('m9', M, 'A highway atlas, a physical map of mountain ranges, and a political map of states are all examples of', [
    'thematic maps that display one statistical variable',
    'reference maps used for location and navigation',
    'equal-area projections used to compare country size',
    'cartograms that resize places according to a dataset',
  ], 1, 'Political, physical, and road maps are reference maps. Thematic maps, projections, and cartograms are different tools.'),
  mc('m10', M, 'Which task is better suited to a thematic map than to a reference map?', [
    'Finding the shortest driving route between two cities',
    'Comparing counties by percent of people without insurance',
    'Locating a national capital on a political base map',
    'Reading the names of major rivers on a physical map',
  ], 1, 'Comparing a social or economic variable across space is a thematic-map job. Routes, capitals, and river names are reference-map jobs.'),
  mc('m11', M, 'Choropleth, dot-density, graduated symbol, isoline, and cartogram maps are all types of', [
    'reference maps that emphasize place names and boundaries',
    'thematic maps that show a spatial data pattern',
    'map projections that flatten the globe onto paper',
    'census methods used to count population by tract',
  ], 1, 'Those are thematic map types. Projections flatten Earth; the census is a data source, not a map type.'),

  mc('p1', P, 'Which of the following is the best example of absolute location?', [
    'The café sits across from the library, two blocks south of City Hall',
    'The warehouse is about a two-day shipment from the nearest port',
    'The site is given as 41.88°N, 87.63°W or as a street address',
    'The stadium is a short subway ride from the downtown station',
  ], 2, 'Absolute location is exact: coordinates or an address. The others are relative location or relative distance.'),
  mc('p2', P, 'A student describes Chicago as “on Lake Michigan, about 90 miles north of Gary, and a major hub between the East Coast and the Midwest.” This description emphasizes', [
    'absolute location using a precise coordinate grid',
    'relative location using ties to other places',
    'absolute distance measured only in kilometers',
    'a clustered distribution of a single variable',
  ], 1, 'Relative location explains a place by its relationship to other places and routes.'),
  mc('p3', P, '“The school is 3.2 kilometers from the stadium” is an example of', [
    'relative distance, because it describes travel time',
    'absolute distance, because it is a measured length',
    'relative direction, because it uses a local landmark',
    'absolute location, because it gives a coordinate pair',
  ], 1, 'Absolute distance is a measured length. Relative distance is time, cost, or how connected two places feel.'),
  mc('p4', P, 'Online shopping that delivers a product in two days, even if the warehouse is far away, is the best illustration of a decrease in', [
    'absolute distance, because the mileage to the warehouse changed',
    'relative distance, because faster flows make far places feel closer',
    'absolute location, because the warehouse’s coordinates moved',
    'clustering, because stores must now concentrate downtown',
  ], 1, 'Relative distance shrinks with time-space compression. Physical mileage may stay the same.'),
  mc('p5', P, 'Cardinal directions such as north, south, east, and west are an example of', [
    'relative direction based on nearby landmarks',
    'absolute direction based on the compass rose',
    'relative location based on neighboring places',
    'absolute distance measured in kilometers',
  ], 1, 'Absolute direction uses the compass. Relative direction uses landmarks.'),
  mc('p6', P, 'On a map of coffee shops, most shops sit next to one another in the downtown core and almost none appear in the suburbs. The downtown pattern is best described as', [
    'dispersed, because shops spread across the whole metro area',
    'clustered, because features are concentrated close together',
    'uniform, because every neighborhood has the same density',
    'linear, because shops follow only a single highway',
  ], 1, 'Clustering means features are bunched. Dispersal is spread apart; uniform is even; linear follows a line.'),
  mc('p7', P, 'Density measures', [
    'whether two phenomena sit next to each other in space',
    'how many of something occur inside a defined area',
    'the compass direction from one point to another',
    'how spread out features are, ignoring how many there are',
  ], 1, 'Density is a count per unit of area. Arrangement is distribution; two patterns together is spatial association.'),
  mc('p8', P, 'Farms that are spaced evenly across a rural county, with large gaps between them, show a pattern of', [
    'clustering, because each farm is a nucleated settlement',
    'dispersal, because the features are spread far apart',
    'high density, because many farms occupy a small area',
    'absolute location, because each farm has an address',
  ], 1, 'Dispersal describes features that are far apart. High density would mean many farms in a small area.'),
  mc('p9', P, 'A map shows high asthma rates in the same neighborhoods that have many highways and factories. A geographer might say this is evidence of', [
    'time-space compression, because travel times have fallen',
    'spatial association, because the two patterns occur together',
    'a dispersed distribution, because factories are evenly spaced',
    'absolute direction, because the highways run north–south',
  ], 1, 'Spatial association means two phenomena appear together in space and may be related.'),
  mc('p10', P, 'Which pair correctly matches the concept with an example?', [
    'Absolute location: “next to the park”; relative: 40°N, 74°W',
    'Absolute distance: 12 miles; relative: “a short subway ride”',
    'Absolute direction: “left at the light”; relative: due north',
    'Clustering: farms far apart; dispersal: shops packed downtown',
  ], 1, 'Absolute = exact measurement. Relative = relationship, time, or connection. The other pairs reverse the definitions.'),

  mc('j1', J, 'Why do all flat world maps distort the Earth?', [
    'Thematic maps cannot show borders, so land must be stretched',
    'A globe cannot be flattened without changing SADD properties',
    'Equal-area projections keep shape, area, distance, and direction',
    'Only large-scale city maps distort; world maps stay accurate',
  ], 1, 'Every projection flattens the globe and distorts at least one of shape, area, distance, or direction.'),
  mc('j2', J, 'The letters S.A.D.D. remind geographers that map projections distort', [
    'scale, altitude, density, and data',
    'shape, area, distance, and direction',
    'site, area, density, and distribution',
    'situation, access, distance, and direction',
  ], 1, 'SADD is shape, area, distance, and direction. The other lists mix real terms but are not the mnemonic.'),
  mc('j3', J, 'A ship captain needs a map on which compass direction is true and latitude/longitude lines meet at right angles. Which projection is designed for that purpose?', [
    'Robinson, a compromise with little extreme distortion of any property',
    'Gall-Peters, which keeps the relative size of landmasses accurate',
    'Mercator, which preserves direction and a rectangular coordinate grid',
    'Sinusoidal equal-area, which is designed to reduce polar stretch',
  ], 2, 'Mercator was made for navigation. Peters keeps area; Robinson is a compromise.'),
  mc('j4', J, 'The strongest criticism of the Mercator projection is that it', [
    'cannot show compass direction, so it is useless at sea',
    'makes high-latitude landmasses look far larger than they are',
    'stretches equatorial countries more than polar landmasses',
    'keeps area accurate but destroys all sense of direction',
  ], 1, 'On Mercator, Greenland looks huge. Direction is its strength; high-latitude area is its weakness.'),
  mc('j5', J, 'A teacher wants a world map that shows Africa and Europe at a more accurate relative size so students do not think Europe is larger than it is. Which projection is the better choice?', [
    'Mercator, still used as a standard classroom world map',
    'Gall-Peters or another equal-area world projection',
    'Robinson, because it keeps compass direction perfectly',
    'A large-scale topographic sheet of one mountain range',
  ], 1, 'Equal-area projections keep landmass size comparable. Mercator inflates Europe/Greenland. Robinson still distorts area. Topographic maps are local.'),
  mc('j6', J, 'Which of the following is a disadvantage of the Gall-Peters projection?', [
    'Landmass areas are far less accurate than on Mercator',
    'Shapes are stretched, especially near the poles and equator',
    'It cannot be used to compare the relative size of countries',
    'It preserves direction better than Mercator, so area is lost',
  ], 1, 'Peters is equal-area, so size is its strength. Shape is its weakness.'),
  mc('j7', J, 'The Robinson projection is best described as a', [
    'navigation chart that keeps direction perfect at all latitudes',
    'compromise projection with mild distortion of every property',
    'equal-area projection that keeps Africa and Greenland in proportion',
    'conformal projection that keeps local shapes accurate like Mercator',
  ], 1, 'Robinson is a general-purpose compromise. Mercator is conformal/navigation; Peters is equal-area.'),
  mc('j8', J, 'A cartographer chooses a projection based on the map’s purpose. Which pairing is most accurate?', [
    'Mercator for true land area; Peters for sea navigation; Robinson for poles',
    'Mercator for navigation; Peters for area comparison; Robinson for general use',
    'Robinson for right-angle lat/long at every latitude; Peters for sailing',
    'Any projection keeps shape, area, distance, and direction if scale is large',
  ], 1, 'Match the tool to the task. Scale does not erase SADD trade-offs.'),
  mc('j9', J, 'Which statement about maps is most accurate?', [
    'A careful equal-area map can show Earth with no shape or distance error',
    'All maps are selective and distort some spatial relationships',
    'Digital GIS layers remove the projection distortion paper maps have',
    'Thematic maps skip projections because they display data, not space',
  ], 1, 'Every map leaves things out, and every projection distorts. GIS still uses a projection.'),
]
