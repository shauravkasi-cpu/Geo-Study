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
    'Reference map; to show absolute location of regional borders only',
    'Choropleth map; to depict the spatial pattern of an economic variable',
    'Dot-density map; to show each household as a separate point',
    'Cartogram; to resize each region by its land area',
  ], 1, 'Shaded regions plus a high–low legend is a choropleth. It is a thematic map of income, not a reference map of borders and not a cartogram (area is not rescaled).', 'income-choropleth', 'income'),
  mc('st2', M, 'A limitation of using the figure to compare wealth is that the map', [
    'cannot show any economic data',
    'aggregates income to large regions, so inequality inside a region is hidden',
    'preserves compass direction better than Mercator',
    'is useful only for navigation at sea',
  ], 1, 'Choropleths shade a whole unit one color. A poor neighborhood inside a “high income” region disappears. AP questions often ask what a map conceals.', 'income-choropleth', 'income'),
  mc('st3', M, 'Which additional GIS layer would best help explain WHY the Northeast appears darkest on the figure?', [
    'Average January temperature only',
    'Educational attainment, occupational structure, and major metropolitan job markets',
    'The locations of all rivers',
    'A list of state nicknames',
  ], 1, 'Income patterns are usually tied to jobs, education, and cities. Weather or river maps alone do not explain median household income.', 'income-choropleth', 'income'),

  mc('st4', M, 'The spatial pattern of thefts in the figure is best described as', [
    'uniform across the entire metro area',
    'clustered in the downtown core, with dispersal toward the fringe',
    'linear along one highway only',
    'random with no visible concentration',
  ], 1, 'Dots pile up downtown and are farther apart outside it. That is clustering versus dispersal — a 1.1 spatial-pattern skill.', 'dot-crime', 'dots'),
  mc('st5', M, 'Which conclusion is best supported by the figure?', [
    'Every resident downtown is a crime victim',
    'The phenomenon mapped is more concentrated where dots overlap than where single dots sit alone',
    'The map is a political reference map of state capitals',
    'Isolines are being used to show elevation',
  ], 1, 'Dot-density maps show quantity by the number of dots in an area. Tight groups mean higher density, not that every person is affected.', 'dot-crime', 'dots'),

  mc('st6', M, 'Which statement about the figure is correct?', [
    'Russia looks smaller on the cartogram because it has fewer people than China or India, even though it has more land',
    'Cartograms always keep true land area',
    'India is smaller on the cartogram because it has the least population',
    'The cartogram is a reference road map',
  ], 0, 'A population cartogram shrinks empty land and enlarges populous countries. Russia is huge in area but not in people.', 'cartogram-pop', 'carto'),
  mc('st7', M, 'A researcher should choose the cartogram instead of a true-area political map when the goal is to', [
    'navigate a ship across the Atlantic',
    'compare the number of people living in each country',
    'measure the exact length of a border in kilometers',
    'preserve compass direction at all latitudes',
  ], 1, 'Use the map that matches the purpose. Population comparison → cartogram. Navigation → Mercator. Distance → a scale-accurate reference map.', 'cartogram-pop', 'carto'),

  mc('st8', M, 'The lines in the figure are an example of', [
    'choropleth shading of whole countries',
    'isolines connecting points of equal value',
    'graduated symbols sized by city population',
    'a GIS income layer',
  ], 1, 'Closed temperature lines are isolines (also used for elevation on topographic maps).', 'isoline-temp', 'iso'),
  mc('st9', M, 'If the 50° line is much closer to the 40° line on the east side than on the west side, a geographer would infer that', [
    'temperature changes more rapidly over a short distance on the east side',
    'the map is no longer thematic',
    'absolute location cannot be shown on isoline maps',
    'the projection must be Gall-Peters',
  ], 0, 'On isoline and topographic maps, tightly spaced lines mean a steep gradient. That is the same logic as contour lines for elevation.', 'isoline-temp', 'iso'),

  mc('st10', M, 'The map in the figure is best classified as a', [
    'choropleth map, because each city is one solid color',
    'graduated / proportional symbol map, because symbol size changes with the variable',
    'dot-density map, because each person is one dot',
    'cartogram, because country borders are resized',
  ], 1, 'Changing circle size with population is the definition of a graduated/proportional symbol map.', 'grad-symbol', 'grad'),

  mc('st11', J, 'Which conclusion is best supported by comparing the two panels?', [
    'Mercator is the only projection that keeps land area accurate',
    'Mercator inflates high-latitude landmasses, while Gall-Peters keeps relative area more accurate',
    'Greenland is actually larger than Africa',
    'Robinson is shown in both panels',
  ], 1, 'This is the classic AP Mercator critique: Greenland looks as big as Africa on Mercator but is much smaller in reality. Peters is equal-area.', 'mercator-compare', 'merc'),
  mc('st12', J, 'A teacher who wants students to compare the true size of African and European countries should avoid the Mercator panel because it', [
    'distorts area near the poles and makes high-latitude places look larger than they are',
    'cannot show any country names',
    'is an isoline weather map',
    'preserves area but destroys all direction',
  ], 0, 'Mercator’s job is navigation (direction and a rectangular grid). Its cost is area distortion at high latitudes.', 'mercator-compare', 'merc'),
  mc('st13', J, 'Which pairing of purpose and projection is most accurate?', [
    'Mercator for comparing country size; Gall-Peters for sea navigation',
    'Mercator for navigation; Gall-Peters for equal-area comparison; Robinson as a general compromise',
    'Any flat map can keep shape, area, distance, and direction all perfect',
    'Gall-Peters is used only for road atlases of one city',
  ], 1, 'SADD: every projection trades something off. Match the tool to the task.', 'mercator-compare', 'merc'),

  mc('st14', P, 'Which pair of terms best describes City A and City B?', [
    'City A dispersed; City B clustered',
    'City A clustered; City B dispersed',
    'Both show only absolute direction',
    'Both are cartograms',
  ], 1, 'A is packed together (clustered). B is spread out (dispersed distribution).', 'settlement-pattern', 'settle'),
  mc('st15', P, 'If each dot is a school, City A most likely has a higher', [
    'absolute location',
    'density of schools in the mapped area',
    'map projection accuracy',
    'GNI per capita',
  ], 1, 'Density is the number of things in a defined area. Clustering often produces high local density.', 'settlement-pattern', 'settle'),

  mc('st16', D, 'A supermarket chain is choosing a site using the layers in the figure. The technology being used is', [
    'GPS, because it only reports a single coordinate',
    'GIS, because several spatial data layers are analyzed together',
    'a Mercator projection, because direction is preserved',
    'the U.S. census questionnaire itself, with no mapping',
  ], 1, 'Stacking income, traffic, zoning, and competitors is the textbook GIS use. GPS would only drop a pin.', 'gis-layers', 'gis'),
  mc('st17', D, 'Which decision is best supported by combining the layers shown?', [
    'Where a luxury store is likely to have customers, legal permission, access, and little nearby competition',
    'The exact elevation of every rooftop',
    'Tomorrow’s rainfall total',
    'The absolute location of a ship at sea',
  ], 0, 'Topic 1.3: businesses use geospatial data to decide where to locate. The four layers match that question.', 'gis-layers', 'gis'),
  mc('st18', D, 'GPS would still be useful in this project mainly to', [
    'shade counties by income',
    'record the absolute location of candidate parcels and delivery trucks',
    'replace the need for zoning data',
    'draw isolines of temperature',
  ], 1, 'GPS = absolute location. GIS = analysis of layers. They work together; they are not the same tool.', 'gis-layers', 'gis'),

  mc('st19', D, 'The 1990–2020 change in the figure was most likely measured with', [
    'door-to-door interviews only',
    'remote sensing / satellite imagery of land cover',
    'a political reference map from 1569',
    'GNI per capita',
  ], 1, 'Repeat satellite images are the standard way to measure deforestation. That is remote sensing, not GPS or a census.', 'forest-change', 'forest'),
  mc('st20', D, 'Which conclusion is best supported by the figure?', [
    'Forest cover in the mapped area decreased substantially over the 30-year period',
    'The area gained forest',
    'No land-cover change occurred',
    'The images are choropleth maps of income',
  ], 0, 'Read the key: green shrinks, gray (cleared land) expands. AP items reward describing the pattern in the stimulus, not inventing a cause you cannot see.', 'forest-change', 'forest'),
  mc('st21', D, 'A human-rights group that cannot enter a closed country might still document camp expansion by', [
    'using only mental maps',
    'interpreting satellite images, a form of remote sensing',
    'asking the country to redraw a cartogram',
    'measuring Gini in another state',
  ], 1, 'The notes use North Korea prison camps as the example: remote sensing when fieldwork is blocked.', 'forest-change', 'forest'),

  mc('st22', V, 'Which country in the table is most clearly an MDC on both economic and social measures?', [
    'Niger',
    'India',
    'China',
    'Norway',
  ], 3, 'Norway has high HDI and GNI, long life, low TFR, and very low IMR — the full MDC package from Topic 7.3.', 'hdi-table', 'hdi'),
  mc('st23', V, 'Which statement is best supported by the table?', [
    'Income, health, and fertility tend to move together: higher GNI and HDI go with lower TFR and IMR',
    'Niger has the highest HDI',
    'TFR is highest in Norway',
    'HDI is unrelated to life expectancy',
  ], 0, 'The notes say indicators usually correspond. Norway vs Niger is the clean AP contrast.', 'hdi-table', 'hdi'),
  mc('st24', V, 'China’s HDI is closer to the MDCs than Niger’s even though its GNI is far below Norway’s. That best illustrates that HDI', [
    'uses only total GDP',
    'is a composite of income plus social measures such as health and education, so it is not income alone',
    'is the same as the Gini coefficient',
    'can only be 0 or 1',
  ], 1, 'HDI (0–1) mixes GNI per capita, schooling, and life expectancy. That is why it is treated as more accurate than money alone.', 'hdi-table', 'hdi'),
  mc('st25', V, 'A student writes “Niger is a bad country.” Which response matches the notes’ advice?', [
    'Agree, because low HDI means a country is morally worse',
    'Rewrite using indicators: Niger is less developed, shown by low HDI, high TFR, and high IMR',
    'Ignore all data',
    'Use only a Mercator map',
  ], 1, 'AP writing: level of development + evidence. No “good/bad country.”', 'hdi-table', 'hdi'),

  mc('st26', S, 'Country X in the figure is most likely', [
    'an MDC with a dominant service economy',
    'less developed, because most workers are still in primary activities',
    'a core country specialized in high-skill services',
    'unable to have any secondary jobs',
  ], 1, 'A labor force that is mostly farming/mining/fishing is the LDC sector pattern in 7.2.', 'sector-chart', 'sect'),
  mc('st27', S, 'The United States bar is typical of an MDC because', [
    'primary employment is very low and tertiary/quaternary/quinary work dominates',
    'most workers farm',
    'there is no secondary sector',
    'quinary jobs are the only jobs',
  ], 0, 'Development path in the notes: fields → factories → offices. MDCs are service-heavy.', 'sector-chart', 'sect'),
  mc('st28', S, 'If Country X industrializes, the figure would most likely change by', [
    'primary rising and tertiary falling',
    'primary falling and secondary, then tertiary, rising',
    'all sectors disappearing',
    'only quinary jobs remaining in farming',
  ], 1, 'Industrialization shifts workers out of extraction and into manufacturing and then services.', 'sector-chart', 'sect'),

  mc('st29', T, 'In the model, a country that hosts corporate headquarters and high-skill, capital-intensive production is located in the', [
    'periphery',
    'core',
    'only the informal economy',
    'Brandt Line itself',
  ], 1, 'Core = dominant, connected, HQs, former colonial powers. Notes examples: US, UK, Japan, Australia, Germany.', 'core-periphery', 'wst'),
  mc('st30', T, 'China, Brazil, and Mexico fit the middle ring because they', [
    'have no factories',
    'are middle-income industrializers that manufacture and export — semi-periphery / NIC traits',
    'set all global prices from London',
    'are only primary exporters with no industry',
  ], 1, 'Semi-periphery mixes core and periphery traits. BRICS + Mexico sit there in the notes.', 'core-periphery', 'wst'),
  mc('st31', T, 'Which process best explains how the outer ring stays poor in this model?', [
    'Every country climbs Rostow’s stages at the same speed',
    'Cheap resources and labor flow inward while expensive finished goods flow out, limiting local investment',
    'Map projections distort GNI',
    'MDCs have no energy use',
  ], 1, 'That is Wallerstein + dependency: unequal exchange, not just “they have not modernized yet.”', 'core-periphery', 'wst'),

  mc('st32', T, 'According to the figure, the periphery', [
    'sells high-priced electronics to the core',
    'sends cheap labor and natural resources toward the core and pays high prices for consumer goods',
    'controls the global market',
    'has the highest HDI by definition',
  ], 1, 'Read the arrows. That unequal trade is the dependency-theory claim.', 'dependency-flow', 'dep'),
  mc('st33', T, 'A critic of Rostow would use the figure to argue that', [
    'all countries can copy the United States if they try harder',
    'poverty can be produced by the structure of the world economy, not only by a country being “behind” on a stage ladder',
    'projections do not distort maps',
    'HDI is only GDP',
  ], 1, 'AMSCO 7.5 contrast: Rostow = stages you climb. Wallerstein/dependency = one system that assigns roles.', 'dependency-flow', 'dep'),

  mc('st34', T, 'The Brandt Line in the figure is best described as', [
    'an official political border used by the UN',
    'a generalization that MDCs have been concentrated in the North and LDCs in the South',
    'proof that no southern country can industrialize',
    'the equator',
  ], 1, 'It is a teaching generalization. NICs in the South are the main exception the notes mention.', 'brandt-line', 'brandt'),
  mc('st35', T, 'Which change since the line was drawn most weakens a strict North = rich / South = poor reading?', [
    'The invention of choropleth maps',
    'The rise of NICs and BRICS in the Southern Hemisphere and Asia',
    'The end of all primary-sector work',
    'The replacement of GIS by paper maps',
  ], 1, 'Brazil, India, China, South Africa, etc. complicate the original divide.', 'brandt-line', 'brandt'),

  mc('st36', V, 'Which country shows the highest gender inequality, and how do you know?', [
    'Germany, because its GII is lowest',
    'Yemen, because GII is highest (high GII = high inequality)',
    'Mexico, because its HDI is highest',
    'Germany, because maternal deaths are high',
  ], 1, 'GII is scored opposite of HDI: high GII is bad (more inequality). Yemen 0.77 vs Germany 0.07 matches the notes.', 'gii-table', 'gii'),
  mc('st37', V, 'The table supports the claim that GII is a composite because it', [
    'uses only GDP',
    'combines social, economic, and political pieces such as reproductive health, empowerment, and representation',
    'is a map projection',
    'counts only primary jobs',
  ], 1, 'GII: maternal mortality / adolescent fertility, education, parliament, labor-force participation.', 'gii-table', 'gii'),

  mc('st38', V, 'Which statement is best supported by the energy table?', [
    'LDCs use the most energy per person',
    'The United States has high but relatively stable per-person use, while China is a major user whose consumption has risen quickly',
    'Iceland has no renewable energy',
    'Renewables are unused in MDCs',
  ], 1, 'That is the 7.3/7.5 energy story: US + China as top users; US stable-high; China rising; MDCs more renewables; Iceland’s geothermal geology.', 'energy-chart', 'energy'),
  mc('st39', V, 'Iceland’s very high renewable share is best explained by', [
    'its Brandt Line position alone',
    'unusual geology that provides abundant geothermal energy',
    'having the world’s lowest HDI',
    'using only informal charcoal',
  ], 1, 'The notes use Iceland as the availability-of-renewables example.', 'energy-chart', 'energy'),
]
