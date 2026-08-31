import { mc, type ApHumanPracticeQuestion } from './apHumanStudy'

const V = 'measures' as const
const T = 'theories' as const

export const DEVELOPMENT_QUESTIONS: ApHumanPracticeQuestion[] = [
  mc('v1', V, 'In AP Human Geography, development means', [
    'a country’s rank on a single cultural or political scale',
    'a level of economic and social growth that can be compared with indicators',
    'the number of factories a country owns, regardless of health or education',
    'whether a country is in the core of Wallerstein’s model only',
  ], 1, 'Development is measured with economic and social indicators. It is not a moral ranking, not factories alone, and not identical to world-systems position (though they often overlap).'),
  mc('v2', V, '“Per capita” on a development statistic means the total was', [
    'left as a national total so large countries always rank higher',
    'divided by population so the number is per person',
    'divided by land area so density is the measure',
    'converted into purchasing-power parity automatically',
  ], 1, 'Per capita = per person. Total GDP favors large countries. Density is per area. PPP is a separate adjustment for cost of living.'),
  mc('v3', V, 'Gross Domestic Product (GDP) measures the', [
    'total income of a country’s citizens, including money earned abroad',
    'total value of goods and services produced within a country’s borders in a year',
    'evenness of income distribution from 0 to 1',
    'composite of life expectancy, schooling, and GNI per capita',
  ], 1, 'GDP is production inside the borders. Citizen income including abroad is closer to GNP/GNI. Gini is inequality. HDI is the composite social+economic index.'),
  mc('v4', V, 'Gross National Product (GNP) differs from GDP because GNP', [
    'counts only production inside the country’s borders, regardless of ownership',
    'includes production by a country’s citizens and firms, including activity tied to them abroad',
    'is a social indicator of schooling and health rather than output',
    'measures inequality rather than the size of the economy',
  ], 1, '“Domestic” = location of production (GDP). “National” = the country’s people and companies (GNP). HDI and Gini are different indicators.'),
  mc('v5', V, 'Gross National Income (GNI) is often treated as a strong wealth measure because it', [
    'counts only goods produced inside the borders, like GDP',
    'accounts for income that enters and leaves the country, not just production inside the borders',
    'is identical to the Gini coefficient of inequality',
    'replaces life expectancy and schooling in the HDI formula',
  ], 1, 'GNI includes cross-border income (investment, remittances). HDI uses GNI per capita as its income piece alongside health and education. Gini is distribution, not income level.'),
  mc('v6', V, 'A Japanese auto plant operating inside the United States counts toward', [
    'only Japan’s GDP, because the firm is Japanese-owned',
    'U.S. GDP, because the production happens inside U.S. borders',
    'only Japan’s GNI, and never toward U.S. accounts',
    'U.S. HDI, because factories automatically raise life expectancy',
  ], 1, 'Location of production → GDP. Ownership is more of a GNP/GNI question. HDI is a composite of health, education, and income, not a factory count.'),
  mc('v7', V, 'Which transactions are generally left out of GDP, GNP, and GNI?', [
    'New cars sold by a dealership as final goods',
    'Used-goods resales, illegal goods, and intermediate inputs already counted in a finished product',
    'A factory’s official new output of finished goods',
    'A hospital’s billed services in the formal economy',
  ], 1, 'Second-hand sales, illegal products, and intermediate goods (tires already in a new car) are not added again. Official new final output is what the accounts try to capture.'),
  mc('v8', V, 'The formal economy is', [
    'unlicensed street vending and other untaxed work',
    'legal, government-regulated, and taxed activity',
    'only primary-sector farming in LDCs',
    'only quaternary knowledge work in MDCs',
  ], 1, 'Formal = on the books. Informal = unmonitored or untaxed. Formal work exists in every sector and in both MDCs and LDCs.'),
  mc('v9', V, 'Street vendors who are not licensed or taxed, and other unrecorded work, are part of the', [
    'formal economy, because they produce goods and services',
    'informal economy, which GDP often undercounts',
    'quinary sector, because vendors set prices',
    'core of the world-system, because they trade internationally',
  ], 1, 'Informal work is common in many LDCs and is hard to capture in GDP. It is not quinary decision-making or a core-country trait.'),
  mc('v10', V, 'The Gini coefficient measures', [
    'average years of schooling in the HDI education dimension',
    'how evenly or unevenly income is distributed in a population',
    'the total size of the economy, like GDP',
    'gender gaps in parliament and the labor force',
  ], 1, 'Gini = inequality (0–1). Schooling is HDI. Economy size is GDP/GNI. Gender gaps in politics and work are GII.'),
  mc('v11', V, 'A country with a Gini closer to 1 than to 0 has', [
    'almost perfectly equal incomes',
    'greater income inequality',
    'a higher HDI by definition',
    'a lower GII by definition',
  ], 1, '0 = perfectly equal. 1 = one person holding all the income. HDI and GII are separate indexes; a high Gini does not automatically set them.'),
  mc('v12', V, 'MDCs generally have the highest per capita use of energy. Compared with many LDCs, they also tend to', [
    'use far less electricity per person',
    'generate a larger share of electricity from nuclear, hydro, wind, or solar',
    'have no remaining demand for fossil fuels',
    'industrialize mainly by increasing charcoal and fuelwood use',
  ], 1, 'Rich countries consume the most energy per person and tend to use more nuclear and renewables. They still use fossil fuels. Many industrializing LDCs raise coal/oil use rapidly.'),
  mc('v13', V, 'Total fertility rate (TFR) is', [
    'deaths of infants under age 1 per 1,000 live births',
    'the average number of children a woman is expected to have',
    'years of expected life at birth',
    'the percent of seats in parliament held by women',
  ], 1, 'TFR = expected children per woman. IMR = infant deaths. Life expectancy is years lived. Parliamentary share is a GII empowerment piece.'),
  mc('v14', V, 'Infant mortality rate is most useful as a development indicator because it reflects', [
    'the average number of children per woman',
    'health care, nutrition, and living conditions for the most vulnerable',
    'the evenness of income (Gini) rather than health',
    'years of schooling in the HDI formula',
  ], 1, 'IMR is deaths under age one per 1,000 births. It tracks health systems and living conditions. TFR, Gini, and schooling are related but different indicators.'),
  mc('v15', V, 'Life expectancy, literacy, access to health care, and fertility are grouped as', [
    'economic indicators such as GDP and GNI',
    'social indicators of development',
    'measures of income inequality such as Gini',
    'world-systems roles such as core and periphery',
  ], 1, 'Money measures are economic. Health, education, and fertility are social. Gini is distribution. Core/periphery is a theory of the world economy.'),
  mc('v16', V, 'The Human Development Index (HDI) is a composite score (0 to 1) that combines', [
    'only total GDP, so large countries always score highest',
    'health (life expectancy), education, and income (GNI per capita)',
    'only the Gini coefficient of inequality',
    'reproductive health, parliamentary seats, and labor-force gaps (GII)',
  ], 1, 'HDI mixes social and economic data. GII is the gender composite. Gini is inequality. Total GDP is not what HDI uses — it uses GNI per capita.'),
  mc('v17', V, 'Country A has high GNI per capita but low school enrollment and shorter lives. Country B has slightly lower income but much better education and health. HDI would likely', [
    'rank A far ahead, because HDI is identical to GNI per capita',
    'give B a stronger score than income alone would suggest, because HDI includes social measures',
    'match the Gini ranking exactly, because inequality is the only input',
    'match the GII ranking exactly, because gender is the only input',
  ], 1, 'HDI is a composite. A rich oil state can look weaker on HDI if schooling and health lag. Gini and GII are other indexes.'),
  mc('v18', V, 'The Gender Inequality Index (GII) combines', [
    'life expectancy, mean years of schooling, and GNI per capita',
    'reproductive health, empowerment (education and political representation), and labor-market participation',
    'GDP, GNP, and GNI as three income measures',
    'core, semi-periphery, and periphery status',
  ], 1, 'Those three GII dimensions are social, political, and economic. The first option is HDI. Income accounts and world-systems tiers are not GII.'),
  mc('v19', V, 'A low GII and a high HDI together most likely describe', [
    'a country with high gender inequality and low human development',
    'a more developed country with relatively greater gender equality',
    'a periphery country with high primary-sector employment',
    'a country that scores high on Gini, so incomes are very unequal',
  ], 1, 'HDI high = more developed. GII high = more gender inequality, so low GII is more equal. Periphery and high Gini are different claims.'),
  mc('v20', V, 'Microloans are often discussed with gender and development because they', [
    'replace HDI as the UN’s official development score',
    'can help women start small local businesses and raise household living standards',
    'are the same statistic as GNI per capita',
    'measure infant mortality in the GII reproductive-health dimension',
  ], 1, 'Small loans are a development strategy, especially for women, not an index. HDI, GNI, and IMR remain separate measures.'),
  mc('v21', V, 'Why do geographers use several indicators instead of GDP alone?', [
    'GDP already includes literacy, infant survival, and gender equality',
    'Income, health, education, energy, gender, and inequality can tell different stories about the same country',
    'HDI and GII are unofficial and not used to compare countries',
    'Only one number per country is allowed on the AP exam',
  ], 1, 'Development is multidimensional. GDP misses health, schooling, gender, and distribution — which is why HDI, GII, IMR, and Gini exist.'),

  mc('t1', T, 'Wallerstein’s world-systems theory (the core-periphery model) argues that', [
    'each country develops independently through five domestic stages',
    'there is one interconnected world economy with unequal roles',
    'poverty is caused mainly by a country’s failure to follow Rostow’s takeoff',
    'the Brandt Line is an official UN political boundary',
  ], 1, 'Wallerstein = one system, unequal roles. Rostow = national stage ladder. The Brandt Line is a generalization, not a legal border.'),
  mc('t2', T, 'In world-systems theory, core countries are most likely to', [
    'export mainly raw materials and host few corporate headquarters',
    'be economically and politically dominant, host corporate headquarters, and specialize in high-skill, capital-intensive production',
    'be middle-income industrializers that manufacture for export, like many NICs',
    'have a colonial past, weak infrastructure, and mostly low-wage resource jobs',
  ], 1, 'Those three wrong options are semi-periphery, periphery, and a mixed periphery description. Core = power, HQs, high-skill production.'),
  mc('t3', T, 'Semi-periphery countries are best described as', [
    'the poorest places with almost no industry or ports',
    'middle-income places that mix core and periphery traits and are industrializing, manufacturing, and exporting',
    'the original colonial powers that still set all global prices',
    'places outside the world economy that do not trade',
  ], 1, 'Semi-periphery = NICs/BRICS layer. The poorest/no industry is periphery. Colonial powers that dominate are core. Nobody is outside the world-system in this model.'),
  mc('t4', T, 'Periphery countries in the model typically', [
    'set global prices for finished electronics and host most Fortune 500 headquarters',
    'export natural resources, have more low-skill labor and weaker infrastructure, and often have a colonial past',
    'mix advanced services with heavy manufacturing, like South Korea or Germany',
    'have the highest HDI and GNI per capita scores',
  ], 1, 'Periphery = cheap resources and labor, weaker infrastructure. HQs and high HDI are core. Advanced industry mixed with services is core or upper semi-periphery.'),
  mc('t5', T, 'A question Wallerstein’s model is designed to answer is', [
    'Which map projection best preserves area for comparing country size?',
    'How can a country develop if a few industrialized countries control its resources and the terms of trade?',
    'Which HDI component should be weighted most heavily?',
    'At which Rostow stage does high mass consumption begin?',
  ], 1, 'The theory stresses colonialism, unequal exchange, and power — not projections, HDI formulas, or Rostow’s ladder (though AP may ask you to contrast those).'),
  mc('t6', T, 'Dependency theory claims that periphery countries stay poor in part because they', [
    'refuse to enter international trade at all',
    'send cheap labor and raw materials to the core and then pay high prices for finished goods, leaving little money to invest',
    'have already reached Rostow’s drive to maturity',
    'host most corporate headquarters and high-skill services',
  ], 1, 'Unequal exchange: cheap outputs flow out, expensive goods flow in. Isolation, Rostow maturity, and HQ location describe other situations.'),
  mc('t7', T, 'In the dependency diagram, the core', [
    'exports unprocessed ore and imports expensive electronics',
    'buys cheap raw materials and labor and sells high-priced manufactured/consumer goods',
    'has no trade with the periphery',
    'is identical to the informal economy in LDCs',
  ], 1, 'Core = high-value goods out, cheap inputs in. Exporting ore and importing electronics is the periphery pattern.'),
  mc('t8', T, 'The Brandt Line (North–South divide) is a generalization that', [
    'all wealthy countries are in the Southern Hemisphere',
    'more developed countries have been concentrated in the North and less developed countries in the South',
    'core and periphery are randomly mixed with no spatial pattern',
    'the equator is the legal boundary between MDCs and LDCs',
  ], 1, 'It is a simple global pattern, not a perfect law. Many NICs have since grown in the South. It is not a legal border.'),
  mc('t9', T, 'BRICS refers originally to', [
    'the five stages of Rostow’s growth model',
    'Brazil, Russia, India, China, and South Africa',
    'the five original core countries in Wallerstein’s 1500s Europe',
    'Belgium, Romania, Italy, Canada, and Spain',
  ], 1, 'BRICS are large industrializing economies, treated as semi-periphery. They are not Rostow’s stages or the historic European core.'),
  mc('t10', T, 'Newly industrialized countries (NICs) are important to the models because they', [
    'prove that no country can ever leave the periphery',
    'show that some places in the “South” are industrializing and may move toward core or semi-periphery roles',
    'are primary-sector only economies with no factories',
    'follow Rostow but cannot be placed in world-systems theory',
  ], 1, 'NICs complicate a simple rich-North / poor-South story. They manufacture and export and sit in the middle of the system. They can be discussed in both Rostow and Wallerstein.'),
  mc('t11', T, 'A country has raised literacy and factory output but still mainly exports copper and imports expensive electronics. Which interpretation is most AP-appropriate?', [
    'Rostow would say it is moving up a stage ladder; Wallerstein/dependency would emphasize its still-unequal role in one world economy',
    'Both models say colonialism and trade structure are irrelevant',
    'Wallerstein says every country automatically reaches high mass consumption',
    'Rostow says commodity exporters are already in the core',
  ], 0, 'Rostow = national stages. Wallerstein/dependency = structure and unequal exchange. AP often wants you to apply both, not just name them.'),
  mc('t12', T, 'Rostow’s stages of economic growth model is best summarized as', [
    'a three-tier map of core, semi-periphery, and periphery',
    'a five-stage path from a traditional society toward high mass consumption',
    'a theory that poor countries stay poor because of unequal exchange',
    'a composite index of health, education, and income',
  ], 1, 'Rostow = 5 stages. Three-tier is Wallerstein. Unequal exchange is dependency. The composite index is HDI.'),
  mc('t13', T, 'A country that mainly exports one raw material and imports expensive finished goods is illustrating', [
    'life in the core, where high-value manufacturing dominates',
    'a periphery/dependency pattern, sometimes called commodity dependence',
    'Rostow’s high mass consumption stage',
    'an equal-area map’s distortion of the tropics',
  ], 1, 'Commodity dependence keeps a place vulnerable and tied to core markets. Core and high mass consumption are high-value, diversified economies.'),
  mc('t14', T, 'Which real-world pattern best fits the core–semi-periphery–periphery model?', [
    'Headquarters and high-tech design in the U.S. or Germany, factories and exports in China or Mexico, and mineral or farm exports from a poorer country',
    'Every country specializing in the same mix of HQs, factories, and mines',
    'Core countries exporting only unprocessed ore while the periphery designs consumer electronics',
    'Semi-periphery countries having no manufacturing and no ports',
  ], 0, 'That is the spatial division of labor: high-skill/capital in the core, manufacturing in the middle, cheap resources and labor on the edge.'),
]
