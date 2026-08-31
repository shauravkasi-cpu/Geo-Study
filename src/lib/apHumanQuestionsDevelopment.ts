import { mc, type ApHumanPracticeQuestion } from './apHumanStudy'

const V = 'measures' as const
const T = 'theories' as const

export const DEVELOPMENT_QUESTIONS: ApHumanPracticeQuestion[] = [
  mc('v1', V, 'In AP Human Geography, development means', [
    'a country’s rank on a single cultural or political scale',
    'a level of economic and social growth compared with indicators',
    'the number of factories a country owns, ignoring health data',
    'whether a country sits in the core of Wallerstein’s model',
  ], 1, 'Development is measured with economic and social indicators, not a moral rank or factories alone.'),
  mc('v2', V, '“Per capita” on a development statistic means the total was', [
    'left as a national total so large countries always rank higher',
    'divided by population so the number is stated per person',
    'divided by land area so density becomes the measure used',
    'converted into purchasing-power parity automatically',
  ], 1, 'Per capita = per person. Total GDP favors large countries. Density is per area. PPP is a separate adjustment.'),
  mc('v3', V, 'Gross Domestic Product (GDP) measures the', [
    'total income of citizens, including money they earn abroad',
    'value of goods and services produced inside the country’s borders',
    'evenness of income distribution, scored from 0 to 1',
    'composite of life expectancy, schooling, and GNI per capita',
  ], 1, 'GDP is production inside the borders. Citizen income abroad is closer to GNP/GNI. Gini is inequality. HDI is the composite.'),
  mc('v4', V, 'Gross National Product (GNP) differs from GDP because GNP', [
    'counts only production inside the borders, regardless of ownership',
    'includes output by a country’s citizens and firms, even abroad',
    'is a social indicator of schooling and health rather than output',
    'measures inequality rather than the overall size of the economy',
  ], 1, '“Domestic” = location of production (GDP). “National” = the country’s people and companies (GNP).'),
  mc('v5', V, 'Gross National Income (GNI) is often treated as a strong wealth measure because it', [
    'counts only goods produced inside the borders, like GDP',
    'includes income that crosses borders, not just domestic output',
    'is identical to the Gini coefficient of income inequality',
    'replaces life expectancy and schooling in the HDI formula',
  ], 1, 'GNI includes cross-border income. HDI uses GNI per capita plus health and education. Gini is distribution.'),
  mc('v6', V, 'A Japanese auto plant operating inside the United States counts toward', [
    'only Japan’s GDP, because the firm is Japanese-owned',
    'U.S. GDP, because the production happens inside U.S. borders',
    'only Japan’s GNI, and never toward any U.S. accounts',
    'U.S. HDI, because factories automatically raise life expectancy',
  ], 1, 'Location of production → GDP. Ownership is more of a GNP/GNI question.'),
  mc('v7', V, 'Which transactions are generally left out of GDP, GNP, and GNI?', [
    'New cars sold by a dealership as finished final goods',
    'Used resales, illegal goods, and inputs already in a final product',
    'A factory’s official new output of finished manufactured goods',
    'A hospital’s billed services inside the formal economy',
  ], 1, 'Second-hand sales, illegal products, and intermediate goods are not added again.'),
  mc('v8', V, 'The formal economy is', [
    'unlicensed street vending and other untaxed work',
    'legal, government-regulated, and taxed economic activity',
    'only primary-sector farming found in most LDCs',
    'only quaternary knowledge work found in most MDCs',
  ], 1, 'Formal = on the books. Informal = unmonitored or untaxed.'),
  mc('v9', V, 'Street vendors who are not licensed or taxed, and other unrecorded work, are part of the', [
    'formal economy, because they still produce goods and services',
    'informal economy, which official GDP often undercounts',
    'quinary sector, because street vendors set market prices',
    'core of the world-system, because they trade internationally',
  ], 1, 'Informal work is hard to capture in GDP. It is not quinary decision-making or a core-country trait.'),
  mc('v10', V, 'The Gini coefficient measures', [
    'average years of schooling in the HDI education dimension',
    'how evenly or unevenly income is spread in a population',
    'the total size of the economy, similar to GDP totals',
    'gender gaps in parliament and in the paid labor force',
  ], 1, 'Gini = inequality (0–1). Schooling is HDI. Economy size is GDP/GNI. Gender gaps are GII.'),
  mc('v11', V, 'A country with a Gini closer to 1 than to 0 has', [
    'almost perfectly equal household incomes',
    'greater inequality in the distribution of income',
    'a higher HDI score by definition of the index',
    'a lower GII score by definition of the index',
  ], 1, '0 = perfectly equal. 1 = one person holding all the income. HDI and GII are separate indexes.'),
  mc('v12', V, 'MDCs generally have the highest per capita use of energy. Compared with many LDCs, they also tend to', [
    'use far less electricity per person than poorer states',
    'generate more power from nuclear, hydro, wind, or solar',
    'have no remaining demand for coal, oil, or natural gas',
    'industrialize mainly by increasing charcoal and fuelwood use',
  ], 1, 'Rich countries consume the most energy per person and tend to use more nuclear and renewables. They still use fossil fuels.'),
  mc('v13', V, 'Total fertility rate (TFR) is', [
    'deaths of infants under age 1 per 1,000 live births',
    'the average number of children a woman is expected to have',
    'years of expected life at birth for a newborn',
    'the percent of seats in parliament held by women',
  ], 1, 'TFR = expected children per woman. IMR = infant deaths. Life expectancy is years lived.'),
  mc('v14', V, 'Infant mortality rate is most useful as a development indicator because it reflects', [
    'the average number of children born per woman',
    'health care, nutrition, and conditions for the most vulnerable',
    'the evenness of income (Gini) rather than health outcomes',
    'years of schooling used in the HDI education dimension',
  ], 1, 'IMR tracks health systems and living conditions. TFR, Gini, and schooling are different indicators.'),
  mc('v15', V, 'Life expectancy, literacy, access to health care, and fertility are grouped as', [
    'economic indicators such as GDP and GNI per capita',
    'social indicators used to compare levels of development',
    'measures of income inequality such as the Gini index',
    'world-systems roles such as core and periphery status',
  ], 1, 'Money measures are economic. Health, education, and fertility are social.'),
  mc('v16', V, 'The Human Development Index (HDI) is a composite score (0 to 1) that combines', [
    'only total GDP, so large countries always score the highest',
    'health (life expectancy), education, and GNI per capita',
    'only the Gini coefficient of how unequal incomes are',
    'reproductive health, parliamentary seats, and labor-force gaps',
  ], 1, 'HDI mixes social and economic data. GII is the gender composite. Gini is inequality.'),
  mc('v17', V, 'Country A has high GNI per capita but low school enrollment and shorter lives. Country B has slightly lower income but much better education and health. HDI would likely', [
    'rank A far ahead, because HDI is identical to GNI per capita',
    'rank B higher than income alone predicts, since HDI includes social data',
    'match the Gini ranking exactly, because inequality is the only input',
    'match the GII ranking exactly, because gender is the only input',
  ], 1, 'HDI is a composite. A rich oil state can look weaker on HDI if schooling and health lag.'),
  mc('v18', V, 'The Gender Inequality Index (GII) combines', [
    'life expectancy, mean years of schooling, and GNI per capita',
    'reproductive health, empowerment, and labor-market participation',
    'GDP, GNP, and GNI treated as three separate income measures',
    'core, semi-periphery, and periphery status in world-systems theory',
  ], 1, 'Those three GII dimensions are social, political, and economic. The first option is HDI.'),
  mc('v19', V, 'A low GII and a high HDI together most likely describe', [
    'a country with high gender inequality and low human development',
    'a more developed country with relatively greater gender equality',
    'a periphery country with high primary-sector employment',
    'a country that scores high on Gini, so incomes are very unequal',
  ], 1, 'HDI high = more developed. GII high = more gender inequality, so low GII is more equal.'),
  mc('v20', V, 'Microloans are often discussed with gender and development because they', [
    'replace HDI as the UN’s official development score',
    'can help women start small businesses and raise living standards',
    'are the same statistic as GNI per capita in the HDI formula',
    'measure infant mortality in the GII reproductive-health dimension',
  ], 1, 'Small loans are a development strategy, especially for women, not an index.'),
  mc('v21', V, 'Why do geographers use several indicators instead of GDP alone?', [
    'GDP already includes literacy, infant survival, and gender equality',
    'Income, health, education, gender, and inequality can tell different stories',
    'HDI and GII are unofficial and not used to compare countries',
    'Only one number per country is allowed on the AP Human exam',
  ], 1, 'Development is multidimensional. GDP misses health, schooling, gender, and distribution.'),

  mc('t1', T, 'Wallerstein’s world-systems theory (the core-periphery model) argues that', [
    'each country develops independently through five domestic stages',
    'there is one interconnected world economy with unequal roles',
    'poverty is caused mainly by failing to follow Rostow’s takeoff',
    'the Brandt Line is an official UN political boundary',
  ], 1, 'Wallerstein = one system, unequal roles. Rostow = national stage ladder.'),
  mc('t2', T, 'In world-systems theory, core countries are most likely to', [
    'export mainly raw materials and host few corporate headquarters',
    'host HQs, dominate trade rules, and specialize in high-skill production',
    'be middle-income industrializers that manufacture for export',
    'have weak infrastructure and mostly low-wage resource jobs',
  ], 1, 'Core = power, HQs, high-skill production. The others describe semi-periphery or periphery.'),
  mc('t3', T, 'Semi-periphery countries are best described as', [
    'the poorest places with almost no industry or working ports',
    'middle-income industrializers that mix core and periphery traits',
    'the original colonial powers that still set all global prices',
    'places outside the world economy that do not trade at all',
  ], 1, 'Semi-periphery = NICs/BRICS layer. Poorest is periphery. Colonial powers that dominate are core.'),
  mc('t4', T, 'Periphery countries in the model typically', [
    'set global prices for electronics and host most Fortune 500 HQs',
    'export resources, supply low-skill labor, and have weaker infrastructure',
    'mix advanced services with heavy manufacturing, like Germany',
    'have the highest HDI and GNI per capita scores in the system',
  ], 1, 'Periphery = cheap resources and labor, weaker infrastructure. HQs and high HDI are core.'),
  mc('t5', T, 'A question Wallerstein’s model is designed to answer is', [
    'Which map projection best preserves area for comparing country size?',
    'How can a country develop if a few cores control resources and trade terms?',
    'Which HDI component should be weighted most heavily in the index?',
    'At which Rostow stage does high mass consumption officially begin?',
  ], 1, 'The theory stresses colonialism, unequal exchange, and power.'),
  mc('t6', T, 'Dependency theory claims that periphery countries stay poor in part because they', [
    'refuse to enter international trade with core economies at all',
    'export cheap inputs and import costly finished goods, limiting capital',
    'have already reached Rostow’s drive to maturity stage of growth',
    'host most corporate headquarters and high-skill service jobs there',
  ], 1, 'Unequal exchange: cheap outputs flow out, expensive goods flow in.'),
  mc('t7', T, 'In the dependency diagram, the core', [
    'exports unprocessed ore and imports expensive electronics',
    'buys cheap raw materials and labor and sells high-priced goods',
    'has no recorded trade with the periphery at all',
    'is identical to the informal economy found in many LDCs',
  ], 1, 'Core = high-value goods out, cheap inputs in.'),
  mc('t8', T, 'The Brandt Line (North–South divide) is a generalization that', [
    'all wealthy countries are located in the Southern Hemisphere',
    'MDCs have been concentrated in the North and LDCs in the South',
    'core and periphery are randomly mixed with no spatial pattern',
    'the equator is the legal boundary between MDCs and LDCs',
  ], 1, 'It is a teaching generalization, not a legal border. NICs in the South are the main exception.'),
  mc('t9', T, 'BRICS refers originally to', [
    'the five stages of Rostow’s economic growth model',
    'Brazil, Russia, India, China, and South Africa',
    'the five original core countries in 1500s Western Europe',
    'Belgium, Romania, Italy, Canada, and Spain as a trade bloc',
  ], 1, 'BRICS are large industrializing economies, treated as semi-periphery.'),
  mc('t10', T, 'Newly industrialized countries (NICs) are important to the models because they', [
    'prove that no country can ever leave the periphery role',
    'show some Southern places industrializing toward semi-periphery roles',
    'are primary-sector only economies with no factory employment',
    'follow Rostow but cannot be placed in world-systems theory',
  ], 1, 'NICs complicate a simple rich-North / poor-South story.'),
  mc('t11', T, 'A country has raised literacy and factory output but still mainly exports copper and imports expensive electronics. Which interpretation is most AP-appropriate?', [
    'Rostow: moving up stages. Wallerstein: still unequal in one world economy',
    'Both models say colonialism and trade structure no longer matter',
    'Wallerstein: every country automatically reaches high mass consumption',
    'Rostow: commodity exporters have already arrived in the core',
  ], 0, 'Rostow = national stages. Wallerstein/dependency = structure and unequal exchange.'),
  mc('t12', T, 'Rostow’s stages of economic growth model is best summarized as', [
    'a three-tier map of core, semi-periphery, and periphery',
    'a five-stage path from a traditional society to mass consumption',
    'a theory that poor countries stay poor because of unequal exchange',
    'a composite index of health, education, and income per person',
  ], 1, 'Rostow = 5 stages. Three-tier is Wallerstein. Unequal exchange is dependency. The composite is HDI.'),
  mc('t13', T, 'A country that mainly exports one raw material and imports expensive finished goods is illustrating', [
    'life in the core, where high-value manufacturing dominates',
    'a periphery/dependency pattern, often called commodity dependence',
    'Rostow’s high mass consumption stage of national growth',
    'an equal-area map’s distortion of land in the tropics',
  ], 1, 'Commodity dependence keeps a place vulnerable and tied to core markets.'),
  mc('t14', T, 'Which real-world pattern best fits the core–semi-periphery–periphery model?', [
    'HQs and design in the U.S. or Germany, factories in China or Mexico, ores from a poorer state',
    'Every country specializing in the same mix of HQs, factories, and mines',
    'Core countries exporting only unprocessed ore while the periphery designs electronics',
    'Semi-periphery countries having no manufacturing plants and no ports',
  ], 0, 'High-skill/capital in the core, manufacturing in the middle, cheap resources and labor on the edge.'),
]
