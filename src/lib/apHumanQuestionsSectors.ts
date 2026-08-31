import { mc, type ApHumanPracticeQuestion } from './apHumanStudy'

const S = 'sectors' as const

export const SECTOR_QUESTIONS: ApHumanPracticeQuestion[] = [
  mc('e1', S, 'Jobs that extract raw materials from the Earth — farming, mining, fishing, and forestry — belong to the', [
    'tertiary sector, because they provide a service to consumers',
    'primary sector, because they take resources from land or sea',
    'quaternary sector, because the work is knowledge-based',
    'secondary sector, because they manufacture a finished good',
  ], 1, 'Primary activities extract. Secondary manufactures. Tertiary sells or ships. Quaternary is information and research.'),
  mc('e2', S, 'A factory that turns logs into furniture or diamonds into jewelry is an example of the', [
    'primary sector, because wood and diamonds come from the Earth',
    'secondary sector, because raw materials are processed into goods',
    'tertiary sector, because the products will later be sold in stores',
    'quaternary sector, because design sketches are a form of information',
  ], 1, 'Secondary = manufacturing/processing. The forest or mine is primary; the furniture store is tertiary.'),
  mc('e3', S, 'Retail stores, restaurants, shipping companies, and marketing firms are part of the', [
    'primary sector, because food and goods originate as raw materials',
    'secondary sector, because they handle already manufactured products',
    'tertiary sector, because they provide services linking producers to buyers',
    'quinary sector, because they set national economic policy for trade',
  ], 2, 'Tertiary is the service sector. Quinary is top-level decision-making, not everyday retail and trucking.'),
  mc('e4', S, 'Software developers, college professors, research scientists, and investment analysts are the best examples of the', [
    'tertiary sector only, with no distinction from restaurant or retail work',
    'secondary sector, because software is treated as a manufactured product',
    'quaternary sector, because the work is knowledge- and information-based',
    'quinary sector, because every researcher sets national economic policy',
  ], 2, 'Quaternary is knowledge work. Quinary is reserved for the highest decision-makers.'),
  mc('e5', S, 'A CEO or a member of Congress making decisions that affect millions of people is working in the', [
    'quaternary sector, because all office work is classified as quinary',
    'tertiary sector only, with no further split among service jobs',
    'quinary sector, the highest decision-making in government and firms',
    'secondary sector, because large corporations manufacture goods',
  ], 2, 'Quinary = top decision-makers. A typical professor or analyst is quaternary.'),
  mc('e6', S, 'In a simplified wood-to-store chain, which order of sectors is correct?', [
    'Mill (primary) → forest (secondary) → store (quinary) → CEO (tertiary)',
    'Harvest (primary) → mill (secondary) → store (tertiary) → then research',
    'Store (primary) → mill (tertiary) → forest (quaternary) → CEO (secondary)',
    'CEO (secondary) → harvest (quinary) → store (primary) → mill (tertiary)',
  ], 1, 'Extract, then manufacture, then sell. Knowledge jobs and top leadership sit above that chain.'),
  mc('e7', S, 'As a country develops and industrializes, employment typically', [
    'stays concentrated in primary activities even as incomes rise',
    'shifts from primary into secondary, then into tertiary services',
    'jumps straight to quinary jobs and skips manufacturing entirely',
    'moves back toward farming after takeoff in Rostow’s model',
  ], 1, 'The usual path is fields → factories → offices.'),
  mc('e8', S, 'A country where most workers farm, fish, or mine is most likely', [
    'an MDC, because primary goods earn the highest value added',
    'less developed, because a high primary share is a common LDC pattern',
    'a core country in Wallerstein’s model, specialized in extraction',
    'in Rostow’s high mass consumption stage of development',
  ], 1, 'LDCs usually have more of the labor force in primary activities.'),
  mc('e9', S, 'Which statement about sector share and development is most accurate?', [
    'A high percent of tertiary jobs is generally tied to higher development',
    'A high percent of primary jobs is generally tied to higher development',
    'A high percent of secondary jobs defines an MDC service economy',
    'Quinary jobs are the majority of employment in most LDCs',
  ], 0, 'More developed economies are service-heavy.'),
  mc('e10', S, 'Which job is primary, not secondary?', [
    'An auto-assembly worker putting parts together in a plant',
    'A coal miner extracting a raw material from the ground',
    'A steel mill operator turning ore into finished metal',
    'A baker in a factory turning flour into packaged bread',
  ], 1, 'Mining extracts (primary). The mill, auto plant, and bakery manufacture (secondary).'),
  mc('e11', S, 'A truck driver hauling finished clothes from a factory to a store is best classified as', [
    'primary, because diesel fuel is a product of the Earth',
    'secondary, because the cargo is a manufactured good',
    'tertiary, because shipping is a service that moves products',
    'quaternary, because logistics software is knowledge work',
  ], 2, 'Transportation and retail are tertiary services. The factory that made the clothes is secondary.'),
  mc('e12', S, 'Quaternary and quinary activities are often treated as specialized parts of the', [
    'primary sector, because data is treated as a raw material',
    'secondary sector, because computers are manufactured goods',
    'tertiary sector, because they are specialized service activities',
    'informal economy, because the work is typically untaxed',
  ], 2, 'Knowledge work and top decision-making sit inside the broader service/tertiary economy.'),
  mc('e13', S, 'Industrialization has raised living standards in many places, but it has also', [
    'produced the same HDI in every region of a country',
    'produced geographically uneven patterns of development',
    'eliminated the primary sector in all semi-periphery states',
    'made GDP per capita identical to the HDI score',
  ], 1, 'Industry can improve life, but growth is not evenly spread.'),
]
