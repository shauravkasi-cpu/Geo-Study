import { mc, type ApHumanPracticeQuestion } from './apHumanStudy'

const S = 'sectors' as const

export const SECTOR_QUESTIONS: ApHumanPracticeQuestion[] = [
  mc('e1', S, 'Jobs that extract raw materials from the Earth — farming, mining, fishing, and forestry — belong to the', [
    'tertiary sector, because they provide a service to consumers',
    'primary sector, because they take resources from the land or sea',
    'quaternary sector, because they are knowledge-based',
    'secondary sector, because they manufacture a finished good',
  ], 1, 'Primary activities extract. Secondary manufactures. Tertiary sells or ships. Quaternary is information and research.'),
  mc('e2', S, 'A factory that turns logs into furniture or diamonds into jewelry is an example of the', [
    'primary sector, because wood and diamonds come from the Earth',
    'secondary sector, because raw materials are processed into finished goods',
    'tertiary sector, because the products will later be sold in stores',
    'quaternary sector, because design sketches are a form of information',
  ], 1, 'Secondary = manufacturing/processing. The forest or mine is primary; the furniture store is tertiary; R&D is quaternary.'),
  mc('e3', S, 'Retail stores, restaurants, shipping companies, and marketing firms are part of the', [
    'primary sector, because food and goods originate as raw materials',
    'secondary sector, because they handle manufactured products',
    'tertiary sector, because they provide services that connect producers and consumers',
    'quinary sector, because they set national economic policy',
  ], 2, 'Tertiary is the service sector: selling, moving, and serving. Quinary is top-level decision-making, not everyday retail and trucking.'),
  mc('e4', S, 'Software developers, college professors, research scientists, and investment analysts are the best examples of the', [
    'tertiary sector only, with no distinction from restaurant or retail work',
    'secondary sector, because software is a manufactured product',
    'quaternary sector, because the work is knowledge- and information-based',
    'quinary sector, because every researcher sets national policy',
  ], 2, 'Quaternary is knowledge work inside the broader service economy. Quinary is reserved for the highest decision-makers. Writing code is not the same as running a factory or a country.'),
  mc('e5', S, 'A CEO or a member of Congress making decisions that affect millions of people is working in the', [
    'quaternary sector, because all office work is treated as quinary',
    'tertiary sector only, with no further split of services',
    'quinary sector, the highest level of decision-making in government and business',
    'secondary sector, because corporations manufacture goods',
  ], 2, 'Quinary = top decision-makers. A typical professor or analyst is quaternary. A salesperson is tertiary. A factory worker is secondary.'),
  mc('e6', S, 'In a simplified wood-to-store chain, which order of sectors is correct?', [
    'Mill (primary) → forest (secondary) → store (quinary) → CEO (tertiary)',
    'Timber harvest (primary) → mill (secondary) → furniture store (tertiary) → research/logistics (quaternary) → company leadership (quinary)',
    'Store (primary) → mill (tertiary) → forest (quaternary)',
    'CEO (secondary) → harvest (quinary) → store (primary)',
  ], 1, 'Extract, then manufacture, then sell. Knowledge jobs and top leadership sit above that chain.'),
  mc('e7', S, 'As a country develops and industrializes, employment typically', [
    'stays concentrated in primary activities as incomes rise',
    'shifts out of the primary sector and into secondary, then tertiary and higher services',
    'jumps straight to quinary jobs and skips manufacturing',
    'moves back toward farming after takeoff in Rostow’s model',
  ], 1, 'The usual path is fields → factories → offices. Primary share falls; services rise. Countries rarely skip industry entirely, and development does not return the labor force to farming.'),
  mc('e8', S, 'A country where most workers farm, fish, or mine is most likely', [
    'an MDC, because primary goods earn the highest value added',
    'less developed, because a high share of primary jobs is a common LDC pattern',
    'a core country in Wallerstein’s model, specialized in extraction',
    'in Rostow’s high mass consumption stage',
  ], 1, 'LDCs usually have more of the labor force in primary activities. MDCs/core/high mass consumption economies are service-heavy, not farm-heavy.'),
  mc('e9', S, 'Which statement about sector share and development is most accurate?', [
    'A high percent of tertiary jobs is generally associated with higher development',
    'A high percent of primary jobs is generally associated with higher development',
    'A high percent of secondary jobs is the definition of an MDC service economy',
    'Quinary jobs are the majority of employment in most LDCs',
  ], 0, 'More developed economies are service-heavy. A large manufacturing share can mean industrializing (semi-periphery), not necessarily the highest development. LDCs are not quinary-majority.'),
  mc('e10', S, 'Which job is primary, not secondary?', [
    'An auto-assembly worker putting parts together in a plant',
    'A coal miner extracting a raw material from the ground',
    'A steel mill operator turning ore into metal',
    'A baker in a factory turning flour into bread',
  ], 1, 'Mining extracts (primary). The mill, auto plant, and bakery manufacture (secondary). All four involve “industry,” which is why this is an AP trap.'),
  mc('e11', S, 'A truck driver hauling finished clothes from a factory to a store is best classified as', [
    'primary, because diesel fuel is a product of the Earth',
    'secondary, because the cargo is a manufactured good',
    'tertiary, because shipping is a service that moves products',
    'quaternary, because logistics software is knowledge work',
  ], 2, 'Transportation and retail are tertiary services. The factory that made the clothes is secondary. Using fuel or software does not reclassify the driver’s job.'),
  mc('e12', S, 'Quaternary and quinary activities are often treated as specialized parts of the', [
    'primary sector, because data is a raw material',
    'secondary sector, because computers are manufactured',
    'tertiary (service) sector',
    'informal economy, because they are not taxed',
  ], 2, 'Knowledge work and top decision-making sit inside the broader service/tertiary economy. They are formal, high-skill jobs, not extraction or factory work.'),
  mc('e13', S, 'Industrialization has raised living standards in many places, but it has also', [
    'produced the same HDI in every region of a country',
    'produced geographically uneven development',
    'eliminated the primary sector in all semi-periphery states',
    'made GDP per capita identical to HDI',
  ], 1, 'Industry can improve life, but growth is not evenly spread. Regions, cities, and countries still differ — that is a core CED idea.'),
]
