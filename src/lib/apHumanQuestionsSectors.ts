import { mc, type ApHumanPracticeQuestion } from './apHumanStudy'

const S = 'sectors' as const

export const SECTOR_QUESTIONS: ApHumanPracticeQuestion[] = [
  mc('e1', S, 'Jobs that extract raw materials from the Earth — farming, mining, fishing, and forestry — belong to the', [
    'tertiary sector',
    'primary sector',
    'quaternary sector',
    'quinary sector',
  ], 1, 'Primary activities take resources from the land or sea. They are “closest to the ground.”'),
  mc('e2', S, 'A factory that turns logs into furniture or diamonds into jewelry is an example of the', [
    'primary sector',
    'secondary sector',
    'quinary sector',
    'informal economy only',
  ], 1, 'Secondary activities process and manufacture raw materials into finished goods.'),
  mc('e3', S, 'Retail stores, restaurants, shipping companies, and marketing firms are part of the', [
    'primary sector',
    'secondary sector',
    'tertiary sector',
    'only the informal economy',
  ], 2, 'Tertiary is the service sector: moving, selling, and trading goods and providing services that connect producers to consumers.'),
  mc('e4', S, 'Software developers, college professors, research scientists, and investment analysts are the best examples of the', [
    'primary sector',
    'secondary sector',
    'quaternary sector',
    'primary extractive economy',
  ], 2, 'Quaternary work is knowledge-based: research, information, education, and data. It sits inside the broader service economy.'),
  mc('e5', S, 'A CEO or a member of Congress making decisions that affect millions of people is working in the', [
    'primary sector',
    'secondary sector',
    'quinary sector',
    'only the informal economy',
  ], 2, 'Quinary jobs are the highest level of decision-making in government and business.'),
  mc('e6', S, 'In a simplified wood-to-store chain, which order of sectors is correct?', [
    'Factory (primary) → forest (secondary) → CEO (tertiary)',
    'Timber harvest (primary) → mill (secondary) → furniture store (tertiary) → research/logistics (quaternary) → company leadership (quinary)',
    'Store (primary) → mine (quinary) → farm (secondary)',
    'CEO (primary) → farm (quinary)',
  ], 1, 'Resources are extracted, then manufactured, then sold as a service. Knowledge jobs and top decision-makers sit above that chain.'),
  mc('e7', S, 'As a country develops and industrializes, employment typically', [
    'stays almost entirely in farming and mining',
    'shifts out of the primary sector and into secondary, then tertiary and higher services',
    'eliminates all secondary jobs first',
    'moves only into informal street vending',
  ], 1, 'Development is the move from fields, to factories, to offices and digital work. Primary share falls; services rise.'),
  mc('e8', S, 'A country where most workers farm, fish, or mine is most likely', [
    'a more developed country (MDC) with a huge tertiary sector',
    'less developed, because a high share of primary jobs is a common LDC pattern',
    'always a core country in Wallerstein’s model',
    'unable to have any cities',
  ], 1, 'LDCs usually have more of the labor force in primary activities. MDCs have a much higher percent in services.'),
  mc('e9', S, 'Which statement about sector share and development is most accurate?', [
    'A high percent of tertiary jobs is generally associated with higher development',
    'A high percent of primary jobs is generally associated with higher development',
    'Sector structure tells geographers nothing about development',
    'Only quinary jobs exist in LDCs',
  ], 0, 'More developed economies are service-heavy. Less developed economies are still resource-extraction heavy.'),
  mc('e10', S, 'Which job is primary, not secondary?', [
    'An auto-assembly worker',
    'A coal miner',
    'A steel mill operator',
    'A baker in a bread factory',
  ], 1, 'Mining extracts a raw material (primary). The mill, factory, and bakery manufacture it (secondary).'),
  mc('e11', S, 'A truck driver hauling finished clothes from a factory to a store is best classified as', [
    'primary, because the truck uses fuel from the Earth',
    'secondary, because clothes are a manufactured good',
    'tertiary, because shipping is a service that moves products',
    'quinary, because the driver sets national policy',
  ], 2, 'Transportation and retail are tertiary services. The factory that made the clothes is secondary.'),
  mc('e12', S, 'Quaternary and quinary activities are often treated as specialized parts of the', [
    'primary sector',
    'secondary sector',
    'tertiary (service) sector',
    'informal economy only',
  ], 2, 'The notes nest knowledge work and top decision-making under the broader service/tertiary economy.'),
  mc('e13', S, 'Industrialization has raised living standards in many places, but it has also', [
    'made development perfectly even in every region',
    'produced geographically uneven development',
    'removed the need to measure HDI',
    'ended all primary-sector work worldwide',
  ], 1, 'The unit’s enduring idea: industry can improve life, but growth is not evenly spread across space.'),
]
