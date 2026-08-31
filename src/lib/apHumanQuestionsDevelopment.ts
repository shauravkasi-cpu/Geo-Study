import { mc, type ApHumanPracticeQuestion } from './apHumanStudy'

const V = 'measures' as const
const T = 'theories' as const

export const DEVELOPMENT_QUESTIONS: ApHumanPracticeQuestion[] = [
  mc('v1', V, 'In AP Human Geography, development means', [
    'that one country is morally better than another',
    'a level of economic and social growth or advancement that can be compared with indicators',
    'only the number of factories a country owns',
    'whether a country uses maps',
  ], 1, 'Development is a measured state of growth. Write about indicators and sectors — not “good countries” and “bad countries.”'),
  mc('v2', V, '“Per capita” on a development statistic means the total was', [
    'left as a national total',
    'divided by population so the number is per person',
    'multiplied by exports',
    'converted into a map projection',
  ], 1, 'Per capita lets you compare large and small countries more fairly. GDP per capita is not the same as total GDP.'),
  mc('v3', V, 'Gross Domestic Product (GDP) measures the', [
    'number of infants who die per 1,000 births',
    'total value of goods and services produced within a country’s borders in a year',
    'share of parliamentary seats held by women',
    'amount of map distortion',
  ], 1, 'GDP is “domestic”: production inside the country, regardless of who owns the company.'),
  mc('v4', V, 'Gross National Product (GNP) differs from GDP because GNP', [
    'counts only informal garage sales',
    'includes the value of goods and services produced by a country’s citizens and firms, including activity tied to them abroad',
    'is only a social indicator',
    'cannot be compared per capita',
  ], 1, 'Think “national” as in the country’s people and companies. An American firm’s overseas activity can count toward U.S. GNP, while production inside Japan counts toward Japan’s GDP.'),
  mc('v5', V, 'Gross National Income (GNI) is often treated as a strong wealth measure because it', [
    'ignores all money that crosses borders',
    'accounts for income that enters and leaves the country, not just production inside the borders',
    'counts only primary-sector wages',
    'is the same as infant mortality',
  ], 1, 'GNI includes money that flows in and out (investment income, remittances). HDI uses GNI per capita as its income piece. GDP misses those cross-border income flows.'),
  mc('v6', V, 'A Japanese auto plant operating inside the United States counts toward', [
    'only Japan’s GDP',
    'U.S. GDP, because the production happens inside U.S. borders',
    'neither country’s accounts',
    'only the Gini coefficient',
  ], 1, 'Location of production → GDP. Ownership/citizenship of the firm is more of a GNP/GNI question.'),
  mc('v7', V, 'Which transactions are generally left out of GDP, GNP, and GNI?', [
    'New cars sold by a dealership',
    'Used-goods resales, illegal goods, and intermediate inputs already counted in a finished product',
    'A factory’s official output',
    'A hospital’s billed services',
  ], 1, 'Second-hand sales, illegal products, and intermediate goods (tires already in a new car) are not added again. Official new output is what the accounts try to capture.'),
  mc('v8', V, 'The formal economy is', [
    'work that is illegal and untaxed',
    'legal, government-regulated, and taxed activity',
    'only farming',
    'only unpaid housework',
  ], 1, 'Formal = on the books. Informal = unmonitored or untaxed (and in the notes, often described as the illegal/unregulated economy). A larger formal share usually signals higher development.'),
  mc('v9', V, 'Street vendors who are not licensed or taxed, and other unrecorded work, are part of the', [
    'formal economy',
    'informal economy',
    'quinary sector only',
    'census projection',
  ], 1, 'Informal work is common in many LDCs and is hard to capture in GDP. That is one reason income statistics can understate real activity.'),
  mc('v10', V, 'The Gini coefficient measures', [
    'average years of schooling',
    'how evenly or unevenly income is distributed in a population',
    'absolute location',
    'map area distortion',
  ], 1, 'Gini runs from 0 to 1. Higher Gini = more income inequality. MDCs often have lower Ginis than many LDCs, but not always.'),
  mc('v11', V, 'A country with a Gini closer to 1 than to 0 has', [
    'almost perfectly equal incomes',
    'greater income inequality',
    'a higher literacy rate by definition',
    'no primary-sector jobs',
  ], 1, '0 would be perfectly equal. 1 would be one person holding all the income. Development is about more than the average; distribution matters too.'),
  mc('v12', V, 'MDCs generally have the highest per capita use of energy. Compared with many LDCs, they also tend to', [
    'use no electricity',
    'generate a larger share of electricity from sources such as nuclear, hydro, wind, or solar',
    'have no demand for fossil fuels',
    'avoid all industry',
  ], 1, 'Rich countries consume the most energy per person. They also tend to use more nuclear and renewables, while many developing economies are rapidly raising fossil-fuel use as they industrialize.'),
  mc('v13', V, 'Total fertility rate (TFR) is', [
    'deaths of infants under age 1 per 1,000 live births',
    'the average number of children a woman is expected to have',
    'years of expected life at birth',
    'percent of adults who can read',
  ], 1, 'TFR is usually high in LDCs and low in MDCs. It is a social indicator of development, not an economic total.'),
  mc('v14', V, 'Infant mortality rate is most useful as a development indicator because it reflects', [
    'map scale',
    'health care, nutrition, and living conditions for the most vulnerable',
    'only the size of the army',
    'whether a country uses GIS',
  ], 1, 'IMR is deaths of infants under one per 1,000 live births. High IMR is typical of less developed places; very low IMR is typical of MDCs.'),
  mc('v15', V, 'Life expectancy, literacy, access to health care, and fertility are grouped as', [
    'map projections',
    'social indicators of development',
    'only Gini measures',
    'primary-sector jobs',
  ], 1, 'Money measures (GDP/GNI) are economic. Health, education, and gender measures are social. Good analysis uses both.'),
  mc('v16', V, 'The Human Development Index (HDI) is a composite score (0 to 1) that combines', [
    'only total GDP',
    'social and economic indicators — typically health (life expectancy), education, and income (GNI per capita)',
    'only military spending',
    'only the percent of land that is farmland',
  ], 1, 'HDI is more accurate than income alone because it mixes social and economic data. High HDI = higher development.'),
  mc('v17', V, 'Country A has high GNI per capita but low school enrollment and shorter lives. Country B has slightly lower income but much better education and health. HDI would likely', [
    'rank A far ahead, because only money counts',
    'give B a stronger score than income alone would suggest, because HDI includes social measures',
    'ignore both countries',
    'be identical to Gini',
  ], 1, 'That is why the UN uses a composite. A rich oil state can look weaker on HDI if schooling and health lag.'),
  mc('v18', V, 'The Gender Inequality Index (GII) combines', [
    'shape, area, and direction',
    'reproductive health, empowerment (education and political representation), and labor-market participation',
    'only GDP and GNI',
    'only primary-sector employment',
  ], 1, 'GII is social + economic + political. High GII = more inequality; low GII = more equality. It is the opposite direction of HDI.'),
  mc('v19', V, 'A low GII and a high HDI together most likely describe', [
    'a country with high gender inequality and low development',
    'a more developed country with relatively greater gender equality',
    'only a periphery, primary-sector economy',
    'a place with no census',
  ], 1, 'Watch the scales: HDI high = more developed. GII high = more unequal. MDCs such as Germany have low GII; many LDCs have higher GII.'),
  mc('v20', V, 'Microloans are often discussed with gender and development because they', [
    'replace HDI',
    'can help women start small local businesses and raise household living standards',
    'are the same as GNI',
    'measure infant mortality',
  ], 1, 'More women may be working, but wages and opportunities are still unequal. Small loans are one way some places try to close that gap.'),
  mc('v21', V, 'Why do geographers use several indicators instead of GDP alone?', [
    'GDP already includes literacy and infant survival',
    'Income, health, education, energy, gender, and inequality can tell different stories about the same country',
    'Social indicators are unofficial and never used on the exam',
    'Only one number is allowed per country',
  ], 1, 'The notes and AMSCO treat development as multidimensional. If one indicator is high or low, others in that country often move with it — but not always, which is why you compare them.'),

  mc('t1', T, 'Wallerstein’s world-systems theory (the core-periphery model) argues that', [
    'every country develops in isolation',
    'there is one interconnected world economy with unequal roles',
    'map projections cause poverty',
    'only climate determines wealth',
  ], 1, 'It is a theory of interdependence and uneven development, not a set of separate national ladders.'),
  mc('t2', T, 'In world-systems theory, core countries are most likely to', [
    'export only raw materials and have weak infrastructure',
    'be economically and politically dominant, host corporate headquarters, and specialize in high-skill, capital-intensive production',
    'have no military or trade connections',
    'be former colonies with mainly low-wage resource jobs',
  ], 1, 'Core traits: power, connected infrastructure, control of markets, former colonial powers, higher-skill production. Examples in the notes include the U.S., UK, Japan, Australia, and Germany.'),
  mc('t3', T, 'Semi-periphery countries are best described as', [
    'the poorest places with no industry',
    'middle-income places that mix core and periphery traits and are industrializing, manufacturing, and exporting',
    'only the original colonial powers of Europe',
    'countries outside the world economy',
  ], 1, 'They have better transport and communication than the periphery and are the NICs/BRICS layer — Brazil, Russia, India, China, South Africa, Mexico in the notes.'),
  mc('t4', T, 'Periphery countries in the model typically', [
    'set global prices for finished electronics',
    'export natural resources, have more low-skill labor and weaker infrastructure, and often have a colonial past',
    'host most Fortune 500 headquarters',
    'have the highest HDI scores',
  ], 1, 'Periphery: less wealth and education, unstable governments more often, weak worker protections, cheap labor. Notes examples: Afghanistan, Peru, Kenya.'),
  mc('t5', T, 'A question Wallerstein’s model is designed to answer is', [
    'Which map projection is best for ships?',
    'How can a country develop if a few industrialized countries control its resources and the terms of trade?',
    'What is a choropleth map?',
    'How is latitude measured?',
  ], 1, 'The theory stresses the legacy of colonialism, competition among cores, and military/economic power — not just “they have not modernized yet.”'),
  mc('t6', T, 'Dependency theory claims that periphery countries stay poor in part because they', [
    'refuse to grow any crops',
    'send cheap labor and raw materials to the core and then pay high prices for finished goods, leaving little money to invest',
    'have no contact with core countries',
    'always have higher HDI than the core',
  ], 1, 'Value is extracted: cheap inputs flow out, expensive consumer goods flow in, and the periphery’s chance to invest in its own industry is reduced.'),
  mc('t7', T, 'In the dependency diagram, the core', [
    'only farms for the periphery',
    'buys cheap raw materials and labor and sells high-priced manufactured/consumer goods',
    'has no money flows',
    'is identical to the informal economy',
  ], 1, 'That unequal exchange is why dependency theorists say poverty is produced by the system, not just by being “behind.”'),
  mc('t8', T, 'The Brandt Line (North–South divide) is a generalization that', [
    'all wealthy countries are in the Southern Hemisphere',
    'more developed countries have been concentrated in the North and less developed countries in the South',
    'development has no spatial pattern',
    'Africa is the only core region',
  ], 1, 'It is a simple global pattern, not a perfect law. Many newly industrialized countries have since grown in the South.'),
  mc('t9', T, 'BRICS refers originally to', [
    'Belgium, Romania, Italy, Canada, Spain',
    'Brazil, Russia, India, China, and South Africa',
    'only the United States and Japan',
    'the five map projections in Topic 1.1',
  ], 1, 'These large, industrializing economies are treated as semi-periphery and as the group most likely to challenge western-dominated trade and move toward the core.'),
  mc('t10', T, 'Newly industrialized countries (NICs) are important to the models because they', [
    'prove that no country can ever leave the periphery',
    'show that some places in the “South” are industrializing and may move toward core or semi-periphery roles',
    'are the same as primary-sector only economies',
    'do not appear in world-systems thinking',
  ], 1, 'NICs complicate a simple rich-North / poor-South story. They manufacture and export and sit in the middle of the system.'),
  mc('t11', T, 'A country has raised literacy and factory output but still mainly exports copper and imports expensive electronics. Which interpretation is most AP-appropriate?', [
    'Rostow would say it is moving up a stage ladder; Wallerstein/dependency would emphasize its still-unequal role in one world economy',
    'Both models say colonialism is irrelevant',
    'Wallerstein says every country automatically reaches high mass consumption',
    'The pattern can only be explained by map projections',
  ], 0, 'Rostow = national stages. Wallerstein/dependency = structure and unequal exchange. AP often wants you to apply both, not just name them.'),
  mc('t12', T, 'Rostow’s stages of economic growth model is best summarized as', [
    'a three-tier map of core, semi-periphery, and periphery',
    'a five-stage path from a traditional society toward high mass consumption',
    'a way to classify choropleth colors',
    'a census method',
  ], 1, 'AMSCO/CED 7.5: traditional society → preconditions for takeoff → takeoff → drive to maturity → high mass consumption. Critics say it ignores colonialism and treats all countries as if they can copy the West.'),
  mc('t13', T, 'A country that mainly exports one raw material and imports expensive finished goods is illustrating', [
    'life in the core',
    'a periphery/dependency pattern, sometimes called commodity dependence',
    'the final stage of Rostow only',
    'equal-area map design',
  ], 1, 'Commodity dependence is the 7.5 idea that relying on a few raw exports keeps a place vulnerable and tied to core markets.'),
  mc('t14', T, 'Which real-world pattern best fits the core–semi-periphery–periphery model?', [
    'Headquarters and high-tech design in the U.S. or Germany, factories and exports in China or Mexico, and mineral or farm exports from a poorer country',
    'Every country has the same job mix',
    'Only Africa has factories',
    'Core countries export only unprocessed ore',
  ], 0, 'That is the spatial division of labor the model is built to explain: high-skill/capital in the core, manufacturing in the middle, cheap resources and labor on the edge.'),
]
