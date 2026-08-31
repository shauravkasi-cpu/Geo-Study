import { mc, type ApHumanPracticeQuestion } from './apHumanStudy'

const M = 'maps' as const
const P = 'patterns' as const
const J = 'projections' as const
const D = 'data' as const
const S = 'sectors' as const
const V = 'measures' as const
const T = 'theories' as const

export const STIMULUS_QUESTIONS: ApHumanPracticeQuestion[] = [
  mc('st1', M, 'Based on the figure, which type of map is shown, and what is its primary function?', [
    'Reference map; it locates regional borders and place names, not a mapped variable',
    'Choropleth map; it shades regions to show the spatial pattern of income',
    'Dot-density map; it plots each household as one equal-sized point symbol',
    'Cartogram map; it resizes each region according to its true land area',
  ], 1, 'Shaded regions plus a high–low legend is a choropleth. It is a thematic map of income, not a reference map of borders and not a cartogram (area is not rescaled).', 'income-choropleth', 'income'),
  mc('st2', M, 'A limitation of using the figure to compare wealth is that the map', [
    'cannot display any economic statistic, because choropleths are only physical maps',
    'assigns one shade to a whole region, so inequality inside that region is hidden',
    'preserves compass direction better than a cartogram, so income cannot be read',
    'resizes each region by population, so land area is no longer comparable at all',
  ], 1, 'Choropleths shade a whole unit one color. A poor neighborhood inside a “high income” region disappears. AP questions often ask what a map conceals.', 'income-choropleth', 'income'),
  mc('st3', M, 'Which additional GIS layer would best help explain WHY the Northeast appears darkest on the figure?', [
    'Average January temperature and growing-season length for each region',
    'Educational attainment, occupational mix, and large metropolitan job markets',
    'The locations of major rivers and mean annual precipitation by region',
    'The year each state joined the Union and the names of county seats',
  ], 1, 'Income patterns are usually tied to jobs, education, and cities. Weather or river maps alone do not explain median household income.', 'income-choropleth', 'income'),

  mc('st4', M, 'The spatial pattern of thefts in the figure is best described as', [
    'uniform, because dots are spaced evenly across the entire metro area',
    'clustered downtown, with greater dispersal toward the urban fringe',
    'linear, because incidents follow only one highway across the metro',
    'random, because no neighborhood shows a higher concentration of dots',
  ], 1, 'Dots pile up downtown and are farther apart outside it. That is clustering versus dispersal — a 1.1 spatial-pattern skill.', 'dot-crime', 'dots'),
  mc('st5', M, 'Which conclusion is best supported by the figure?', [
    'Every person who lives downtown must be counted as a crime victim',
    'The mapped incidents are denser where dots overlap than where they sit alone',
    'Crime is uniform, because each neighborhood is shaded as one choropleth unit',
    'Isolines of equal crime rates have been drawn across the whole metro area',
  ], 1, 'Dot-density maps show quantity by the number of dots in an area. Tight groups mean higher density, not that every person is affected.', 'dot-crime', 'dots'),

  mc('st6', M, 'Which statement about the figure is correct?', [
    'Russia looks smaller on the cartogram because it has fewer people than China or India',
    'Cartograms always keep true land area, unlike Mercator, so Russia must stay largest',
    'India looks smaller on the cartogram because it has the smallest population of the three',
    'The cartogram is a choropleth that shades each country by its population density',
  ], 0, 'A population cartogram shrinks empty land and enlarges populous countries. Russia is huge in area but not in people.', 'cartogram-pop', 'carto'),
  mc('st7', M, 'A researcher should choose the cartogram instead of a true-area political map when the goal is to', [
    'plot a rhumb-line course for a ship crossing the Atlantic Ocean',
    'compare how many people live in each country, not how much land it covers',
    'measure the exact length of an international border in kilometers',
    'keep compass direction true at every latitude on a rectangular grid',
  ], 1, 'Use the map that matches the purpose. Population comparison → cartogram. Navigation → Mercator. Distance → a scale-accurate reference map.', 'cartogram-pop', 'carto'),

  mc('st8', M, 'The lines in the figure are an example of', [
    'choropleth shading of whole countries by a single temperature class',
    'isolines connecting locations that share the same mapped value',
    'graduated symbols whose radius changes with city population',
    'a GIS income layer stacked above a political reference map',
  ], 1, 'Closed temperature lines are isolines (also used for elevation on topographic maps).', 'isoline-temp', 'iso'),
  mc('st9', M, 'If the 50° line is much closer to the 40° line on the east side than on the west side, a geographer would infer that', [
    'temperature changes more rapidly over a short distance on the east side',
    'the east side has a gentler temperature gradient than the west side',
    'isolines can show political borders, but they cannot show rate of change',
    'the map has switched from isolines to choropleth shading of counties',
  ], 0, 'On isoline and topographic maps, tightly spaced lines mean a steep gradient. That is the same logic as contour lines for elevation.', 'isoline-temp', 'iso'),

  mc('st10', M, 'The map in the figure is best classified as a', [
    'choropleth map, because each city is filled with one solid color',
    'graduated / proportional symbol map, because symbol size tracks the variable',
    'dot-density map, because each resident is drawn as one equal-sized dot',
    'cartogram, because national borders have been resized by population',
  ], 1, 'Changing circle size with population is the definition of a graduated/proportional symbol map.', 'grad-symbol', 'grad'),

  mc('st11', J, 'Which conclusion is best supported by comparing the two panels?', [
    'Mercator keeps land area accurate, while Gall-Peters inflates high-latitude land',
    'Mercator inflates high-latitude landmasses; Gall-Peters keeps relative area closer',
    'Both projections keep area accurate and differ only in how the graticule is drawn',
    'Gall-Peters preserves compass direction more faithfully than Mercator does',
  ], 1, 'This is the classic AP Mercator critique: Greenland looks as big as Africa on Mercator but is much smaller in reality. Peters is equal-area.', 'mercator-compare', 'merc'),
  mc('st12', J, 'A teacher who wants students to compare the true size of African and European countries should avoid the Mercator panel because it', [
    'distorts area near the poles and makes high-latitude places look larger than they are',
    'shrinks Europe, Canada, and Greenland so students underestimate their land area',
    'is an equal-area projection, so it cannot be printed as a classroom world map',
    'preserves area perfectly at every latitude but cannot display Africa at all',
  ], 0, 'Mercator’s job is navigation (direction and a rectangular grid). Its cost is area distortion at high latitudes.', 'mercator-compare', 'merc'),
  mc('st13', J, 'Which pairing of purpose and projection is most accurate?', [
    'Mercator for comparing country size; Gall-Peters for plotting a sea course',
    'Mercator for navigation; Gall-Peters for equal-area comparison; Robinson as a compromise',
    'Robinson for true compass direction; Mercator as a general textbook world map',
    'Gall-Peters for polar navigation; Mercator for comparing the true size of Africa',
  ], 1, 'SADD: every projection trades something off. Match the tool to the task.', 'mercator-compare', 'merc'),

  mc('st14', P, 'Which pair of terms best describes City A and City B?', [
    'City A is dispersed; City B is clustered tightly together',
    'City A is clustered; City B is dispersed across the frame',
    'City A is uniform; City B is linear along one corridor',
    'Both are random, with no real difference in spacing',
  ], 1, 'A is packed together (clustered). B is spread out (dispersed distribution).', 'settlement-pattern', 'settle'),
  mc('st15', P, 'If each dot is a school, City A most likely has a higher', [
    'absolute location of the metropolitan area as a whole',
    'density of schools inside the mapped frame',
    'dispersal of schools across the mapped frame',
    'relative distance to other cities outside the map',
  ], 1, 'Density is the number of things in a defined area. Clustering often produces high local density.', 'settlement-pattern', 'settle'),

  mc('st16', D, 'A supermarket chain is choosing a site using the layers in the figure. The technology being used is', [
    'GPS, because the figure reports only a single pair of coordinates',
    'GIS, because several spatial data layers are being analyzed together',
    'remote sensing, because the layers are only satellite images of land cover',
    'a census table, because headcounts replace the need to map other variables',
  ], 1, 'Stacking income, traffic, zoning, and competitors is the textbook GIS use. GPS would only drop a pin.', 'gis-layers', 'gis'),
  mc('st17', D, 'Which decision is best supported by combining the layers shown?', [
    'Where a store is likely to find customers, access, roads, and few nearby rivals',
    'The exact elevation of every rooftop taken from a topographic contour sheet',
    'Tomorrow’s rainfall total estimated from a single weather-satellite pass',
    'The live coordinate of a delivery truck taken from GPS with no other layers',
  ], 0, 'Topic 1.3: businesses use geospatial data to decide where to locate. The four layers match that question.', 'gis-layers', 'gis'),
  mc('st18', D, 'GPS would still be useful in this project mainly to', [
    'shade counties by income on a choropleth layer inside the GIS',
    'record the absolute location of candidate parcels and delivery trucks',
    'replace zoning, traffic, and competitor layers with a single coordinate',
    'stack competitors, income, and access without using any coordinates',
  ], 1, 'GPS = absolute location. GIS = analysis of layers. They work together; they are not the same tool.', 'gis-layers', 'gis'),

  mc('st19', D, 'The 1990–2020 change in the figure was most likely measured with', [
    'door-to-door interviews plus a single-year census population count',
    'remote sensing / satellite imagery classifying land cover over time',
    'GPS coordinates collected at only one research station each decade',
    'a political reference map that shows current international borders',
  ], 1, 'Repeat satellite images are the standard way to measure deforestation. That is remote sensing, not GPS or a census.', 'forest-change', 'forest'),
  mc('st20', D, 'Which conclusion is best supported by the figure?', [
    'Forest cover in the mapped area decreased substantially over the 30-year period',
    'Forest cover increased as gray cleared land shrank across both panels',
    'Land cover was stable because political borders did not move in the figure',
    'The images are choropleth maps of income by census tract, not land cover',
  ], 0, 'Read the key: green shrinks, gray (cleared land) expands. AP items reward describing the pattern in the stimulus, not inventing a cause you cannot see.', 'forest-change', 'forest'),
  mc('st21', D, 'A human-rights group that cannot enter a closed country might still document camp expansion by', [
    'conducting fieldwork interviews with residents inside the country',
    'interpreting satellite images, which is a form of remote sensing',
    'using GPS tracks collected on the ground by people living there',
    'relying on a census the government may choose not to publish',
  ], 1, 'The notes use North Korea prison camps as the example: remote sensing when fieldwork is blocked.', 'forest-change', 'forest'),

  mc('st22', V, 'Which country in the table is most clearly an MDC on both economic and social measures?', [
    'Niger',
    'India',
    'China',
    'Norway',
  ], 3, 'Norway has high HDI and GNI, long life, low TFR, and very low IMR — the full MDC package from Topic 7.3.', 'hdi-table', 'hdi'),
  mc('st23', V, 'Which statement is best supported by the table?', [
    'Higher GNI and HDI in the table tend to go with lower TFR and infant mortality',
    'The country with the highest TFR also records the highest HDI score',
    'GNI per capita in the table is unrelated to the infant mortality column',
    'China’s HDI is lower than Niger’s even though China’s GNI per capita is higher',
  ], 0, 'The notes say indicators usually correspond. Norway vs Niger is the clean AP contrast.', 'hdi-table', 'hdi'),
  mc('st24', V, 'China’s HDI is closer to the MDCs than Niger’s even though its GNI is far below Norway’s. That best illustrates that HDI', [
    'uses only total GDP, so a large population automatically produces a high rank',
    'combines income with social measures such as health, so it is not income alone',
    'is identical to the Gini coefficient, which only scores how unequal incomes are',
    'is identical to GII, which also runs from 0 to 1 and uses the same inputs',
  ], 1, 'HDI (0–1) mixes GNI per capita, schooling, and life expectancy. That is why it is treated as more accurate than money alone.', 'hdi-table', 'hdi'),
  mc('st25', V, 'A student writes “Niger is a bad country.” Which response matches the notes’ advice?', [
    'Keep the wording, because HDI is meant as a moral ranking of whole countries',
    'Rewrite with evidence: Niger is less developed, shown by low HDI and high IMR',
    'Drop social measures and use GDP only, because those other indexes are unofficial',
    'Call Niger a core country, because primary exports always create high value added',
  ], 1, 'AP writing: level of development + evidence. No “good/bad country.”', 'hdi-table', 'hdi'),

  mc('st26', S, 'Country X in the figure is most likely', [
    'an MDC whose labor force is already dominated by services',
    'less developed, because most workers remain in primary activities',
    'a core country specialized in high-skill quaternary services',
    'a semi-periphery NIC whose labor force is already mostly quinary',
  ], 1, 'A labor force that is mostly farming/mining/fishing is the LDC sector pattern in 7.2.', 'sector-chart', 'sect'),
  mc('st27', S, 'The United States bar is typical of an MDC because', [
    'primary employment is very low and tertiary-and-above work dominates',
    'most workers remain in primary extraction of food and minerals',
    'secondary jobs are the majority, as in an early industrial takeoff',
    'quinary jobs are the majority of all recorded formal employment',
  ], 0, 'Development path in the notes: fields → factories → offices. MDCs are service-heavy.', 'sector-chart', 'sect'),
  mc('st28', S, 'If Country X industrializes, the figure would most likely change by', [
    'primary rising further while tertiary employment continues to fall',
    'primary falling while secondary, then tertiary, employment rises',
    'quaternary and quinary disappearing as factory employment grows',
    'remaining jobs shifting back into farming as industry expands',
  ], 1, 'Industrialization shifts workers out of extraction and into manufacturing and then services.', 'sector-chart', 'sect'),

  mc('st29', T, 'In the model, a country that hosts corporate headquarters and high-skill, capital-intensive production is located in the', [
    'periphery, which mainly supplies cheap labor and unprocessed resources',
    'core, which hosts headquarters and high-skill, capital-intensive production',
    'semi-periphery only, because the core is assumed to have no factories',
    'Brandt Line South, which the model defines as high-skill service economies',
  ], 1, 'Core = dominant, connected, HQs, former colonial powers. Notes examples: US, UK, Japan, Australia, Germany.', 'core-periphery', 'wst'),
  mc('st30', T, 'China, Brazil, and Mexico fit the middle ring because they', [
    'remain periphery economies that export only unprocessed ore and timber',
    'are middle-income industrializers that manufacture and export, like other NICs',
    'are core countries that already host most global corporate headquarters',
    'lie outside world-systems theory because they participate in world trade',
  ], 1, 'Semi-periphery mixes core and periphery traits. BRICS + Mexico sit there in the notes.', 'core-periphery', 'wst'),
  mc('st31', T, 'Which process best explains how the outer ring stays poor in this model?', [
    'Every country climbs Rostow’s stages at the same speed, independent of trade',
    'Cheap resources and labor flow inward while costly finished goods flow out',
    'Periphery countries have already reached Rostow’s high mass consumption stage',
    'Core countries import only raw materials and never export finished goods',
  ], 1, 'That is Wallerstein + dependency: unequal exchange, not just “they have not modernized yet.”', 'core-periphery', 'wst'),

  mc('st32', T, 'According to the figure, the periphery', [
    'sells high-priced electronics and other finished goods toward the core',
    'sends cheap labor and resources toward the core and pays high prices for goods',
    'sets the terms of trade for finished goods sold throughout the system',
    'has the highest HDI because resource exports always create high value added',
  ], 1, 'Read the arrows. That unequal trade is the dependency-theory claim.', 'dependency-flow', 'dep'),
  mc('st33', T, 'A critic of Rostow would use the figure to argue that', [
    'all countries can copy the United States if they try harder, because stages are automatic',
    'poverty can be produced by world-economy structure, not only by being “behind” on stages',
    'Wallerstein and Rostow are the same five-stage model under two different names',
    'HDI already includes core–periphery position, so trade structure no longer matters',
  ], 1, 'AMSCO 7.5 contrast: Rostow = stages you climb. Wallerstein/dependency = one system that assigns roles.', 'dependency-flow', 'dep'),

  mc('st34', T, 'The Brandt Line in the figure is best described as', [
    'an official political border the UN uses to assign MDC or LDC status',
    'a generalization that MDCs have been concentrated in the North and LDCs in the South',
    'proof that no country in the Southern Hemisphere can industrialize at all',
    'the same line as the equator, which divides core countries from the periphery',
  ], 1, 'It is a teaching generalization. NICs in the South are the main exception the notes mention.', 'brandt-line', 'brandt'),
  mc('st35', T, 'Which change since the line was drawn most weakens a strict North = rich / South = poor reading?', [
    'The spread of choropleth mapping in school atlases and AP textbooks',
    'The rise of NICs and BRICS in the Southern Hemisphere and in Asia',
    'The disappearance of all primary-sector employment in every country',
    'A shift from GIS analysis back to paper atlases in most core countries',
  ], 1, 'Brazil, India, China, South Africa, etc. complicate the original divide.', 'brandt-line', 'brandt'),

  mc('st36', V, 'Which country shows the highest gender inequality, and how do you know?', [
    'Germany, because its GII is the lowest of the three countries listed',
    'Yemen, because GII is highest, and a high GII means more inequality',
    'Mexico, because its HDI is the highest of the three countries listed',
    'Germany, because maternal deaths in the table are listed as high',
  ], 1, 'GII is scored opposite of HDI: high GII is bad (more inequality). Yemen 0.77 vs Germany 0.07 matches the notes.', 'gii-table', 'gii'),
  mc('st37', V, 'The table supports the claim that GII is a composite because it', [
    'uses only GDP per capita, the same way a simple income ranking would',
    'combines reproductive health, empowerment, and labor-market measures',
    'matches HDI exactly, using life expectancy, schooling, and GNI per capita',
    'matches Gini exactly, measuring only how uneven household incomes are',
  ], 1, 'GII: maternal mortality / adolescent fertility, education, parliament, labor-force participation.', 'gii-table', 'gii'),

  mc('st38', V, 'Which statement is best supported by the energy table?', [
    'LDCs use the most energy per person because they are industrializing the fastest',
    'The United States is high but fairly stable per person, while China’s use has risen',
    'Iceland has a low renewable share because the country lacks any fossil-fuel reserves',
    'MDCs generate almost no electricity from nuclear power, hydro, wind, or solar',
  ], 1, 'That is the 7.3/7.5 energy story: US + China as top users; US stable-high; China rising; MDCs more renewables; Iceland’s geothermal geology.', 'energy-chart', 'energy'),
  mc('st39', V, 'Iceland’s very high renewable share is best explained by', [
    'its location north of the Brandt Line, which is assumed to guarantee renewables',
    'unusual geology that provides abundant geothermal energy for the grid',
    'having one of the world’s lowest HDI scores and a mostly informal economy',
    'relying mainly on informal charcoal rather than a taxed, formal power grid',
  ], 1, 'The notes use Iceland as the availability-of-renewables example.', 'energy-chart', 'energy'),
]
