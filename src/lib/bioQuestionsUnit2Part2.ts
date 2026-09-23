import { mc, multi, type BioPracticeQuestion } from './bioQuiz'

const H = 'history' as const
const E = 'prok-euk' as const
const P = 'plant-animal' as const
const S = 'surfaces' as const

export const HISTORY_QUESTIONS: BioPracticeQuestion[] = [
  mc('h1', H, 'In 1665, Robert Hooke examined cork under a primitive microscope and named the small box-like compartments he saw', [
    'organelles',
    'cells',
    'nuclei',
    'tissues',
  ], 1, 'Hooke coined "cells," though what he actually saw was dead cork tissue, not living cells, and he did not formulate the rest of cell theory.'),
  mc('h2', H, 'Antonie van Leeuwenhoek is remembered mainly for', [
    'proposing the three parts of cell theory',
    'building improved lenses and observing living microorganisms he called "animalcules"',
    'discovering that cells only arise from other cells',
    'proposing that all animals are made of cells',
  ], 1, 'His refined lenses let him see living, moving microbes for the first time.'),
  mc('h3', H, 'Which scientist proposed that all plants are made of cells?', [
    'Theodor Schwann',
    'Matthias Schleiden',
    'Rudolf Virchow',
    'Robert Hooke',
  ], 1, 'Schleiden studied plant tissue and concluded all plants are made of cells; Schwann reached the parallel conclusion for animals.'),
  mc('h4', H, 'Rudolf Virchow\'s specific contribution was the idea that', [
    'living things can spontaneously generate from non-living matter',
    'all cells arise only from other, pre-existing cells',
    'all plants are made of cells',
    'microorganisms exist and can be seen with lenses',
  ], 1, 'Virchow rejected spontaneous generation at the cellular level: cells only come from cells.'),
  mc('h5', H, 'The three parts of modern cell theory are', [
    'all cells have chloroplasts; all cells have rigid walls; all cells are prokaryotic in structure',
    'all living things are made of cells; the cell is the basic unit of life; cells come from pre-existing cells',
    'only plants and animals are made of cells, which excludes bacteria and archaea entirely',
    'cells simply appear spontaneously out of nowhere and then never divide again',
  ], 1, 'These three statements together define cell theory, and all three must be known precisely.'),
  mc('h6', H, 'A new bacterial cell forms immediately after an existing bacterial cell divides. This best illustrates which tenet of cell theory?', [
    '"All living things are made of cells"',
    '"The cell is the basic unit of life"',
    '"All cells come from pre-existing cells"',
    'None of cell theory applies to bacteria',
  ], 2, 'A new cell arising directly from division of an existing one is exactly Virchow\'s "cells from cells" principle, and it applies to all cells.'),
  mc('h7', H, 'Cell theory does not classify a virus as a living cell mainly because a virus', [
    'has no rules in cell theory at all covering genetic material',
    'lacks the cellular structure, such as cytoplasm and ribosomes, that cell theory requires of a cell',
    'is simply far too large in physical size to be considered a cell',
    'was discovered after cell theory was written and is deliberately excluded by name',
  ], 1, 'Cell theory concerns cells specifically; a virus lacking cytoplasm and ribosomes does not meet that structural bar.'),
  multi('h8', H, 'Select ALL statements that are part of the three tenets of cell theory.', [
    'All living things are made of cells',
    'The cell is the basic unit of life',
    'All cells come from pre-existing cells',
    'All cells must be eukaryotic',
  ], [0, 1, 2], 'Cell theory applies equally to prokaryotic and eukaryotic cells; there is no eukaryote-only requirement.'),
  mc('h9', H, 'Cell theory\'s claim that "all living things are made of cells" applies to', [
    'animals and plants only',
    'animals, plants, fungi, protists, and bacteria/archaea alike',
    'only organisms visible without a microscope',
    'only organisms discovered before 1900',
  ], 1, 'Cell theory is universal across all cellular life, not just the plants and animals Schleiden and Schwann originally studied.'),
  mc('h10', H, 'Modern cell theory was built by combining the separate observations of', [
    'Hooke working entirely alone in his personal laboratory',
    'Hooke, Leeuwenhoek, Schleiden, Schwann, and Virchow, each contributing a different piece over roughly two centuries',
    'a single formal vote taken among scientists in one particular year',
    'no historical scientists at all, since it simply always existed',
  ], 1, 'No single person proved all three tenets; the theory is a synthesis built up gradually.'),
]

export const PROK_EUK_QUESTIONS: BioPracticeQuestion[] = [
  mc('e1', E, 'Eukaryotic organisms include', [
    'bacteria and archaea only',
    'plants, animals, fungi, and protists',
    'only multicellular organisms',
    'viruses and bacteria',
  ], 1, 'Any organism whose cells have a true, membrane-bound nucleus is eukaryotic — spanning these four groups.'),
  mc('e2', E, 'Prokaryotic organisms, as covered in this unit, include', [
    'plants and fungi',
    'bacteria and archaea',
    'protists only',
    'every single-celled eukaryote',
  ], 1, 'Bacteria and archaea both lack a true nucleus and are classified as prokaryotes.'),
  multi('e3', E, 'Select ALL features found in every cell, prokaryotic or eukaryotic.', [
    'Cytoplasm',
    'Ribosomes',
    'A plasma membrane',
    'A membrane-bound nucleus',
  ], [0, 1, 2], 'A membrane-bound nucleus is exclusive to eukaryotic cells; all cells share cytoplasm, ribosomes, a membrane, and genetic material.'),
  mc('e4', E, 'Ribosomes are correctly described as', [
    'membrane-bound organelles found only in eukaryotes',
    'protein-making structures in every cell, not classified as membrane-bound organelles',
    'structures found only in prokaryotic cells',
    'the site of photosynthesis in a plant cell',
  ], 1, 'Ribosomes build proteins in every cell type, and this unit specifically distinguishes them from membrane-bound organelles.'),
  mc('e5', E, 'The main reason prokaryotes are structurally simpler than eukaryotes is that prokaryotes lack', [
    'a plasma membrane',
    'a nucleus and membrane-bound organelles',
    'ribosomes',
    'any genetic material at all',
  ], 1, 'Prokaryotes have all four universal cell components but lack internal compartmentalization.'),
  mc('e6', E, 'The region of a bacterial cell holding a single circular DNA strand, not enclosed by a membrane, is the', [
    'nucleus',
    'nucleoid',
    'nucleolus',
    'capsid',
  ], 1, 'The nucleoid is a defined region, not a membrane-bound compartment — why prokaryotes lack a "true" nucleus.', 'prok-cell'),
  mc('e7', E, 'Bacterial cell walls, outside the plasma membrane, are made primarily of', [
    'cellulose',
    'chitin',
    'peptidoglycan',
    'cholesterol',
  ], 2, 'Peptidoglycan is specific to bacteria, distinct from the cellulose of plants and chitin of fungi.'),
  mc('e8', E, 'Comparing ribosome size across domains,', [
    'prokaryotes have larger 80S ribosomes; eukaryotes have smaller 70S ribosomes',
    'prokaryotes have smaller 70S ribosomes; eukaryotes have larger 80S ribosomes',
    'both domains have identical ribosome sizes',
    'only eukaryotes actually have ribosomes',
  ], 1, 'This size difference is a classic honors/AP distinction and is even exploited by antibiotics that target only 70S ribosomes.'),
  mc('e9', E, 'Prokaryotic cells reproduce by', [
    'mitosis, using a full mitotic spindle apparatus',
    'binary fission, a simpler division with no spindle',
    'meiosis exclusively, producing four daughter cells',
    'exocytosis of fully formed daughter cells',
  ], 1, 'Without a nucleus or mitotic machinery, prokaryotes divide by the simpler process of binary fission.'),
  mc('e10', E, 'Some prokaryotic cells move through their environment using a', [
    'flagellum',
    'centriole',
    'chloroplast',
    'nucleolus',
  ], 0, 'Many motile bacteria use a whip-like flagellum to propel themselves.'),
  mc('e11', E, 'A eukaryotic cell has all of the following EXCEPT', [
    'a membrane-bound nucleus with linear DNA',
    'membrane-bound organelles',
    'the possibility of being unicellular or multicellular',
    'reproduction exclusively by binary fission',
  ], 3, 'Eukaryotes reproduce via mitosis (and meiosis in sex cells), not binary fission, which belongs to prokaryotes.'),
  mc('e12', E, 'Which comparison of typical sizes is correct?', [
    'Most bacteria: 1–10 µm; most eukaryotic cells: 10–100 µm',
    'Most bacteria: 100–1000 µm; most eukaryotic cells: 1–10 µm',
    'Bacteria and eukaryotic cells are typically the same size',
    'Eukaryotic cells are always smaller than bacteria',
  ], 0, 'Eukaryotic cells are roughly one order of magnitude larger than typical bacterial cells.'),
  mc('e13', E, 'A human hair is roughly 0.016 to 0.05 mm thick, and most eukaryotic cells span 10–100 µm (0.01–0.1 mm). What follows?', [
    'A single eukaryotic cell is far too small to ever see without an electron microscope',
    'A eukaryotic cell is on a similar scale to hair width, though several could still fit across it',
    'A human hair is actually far smaller in width than a single bacterial cell',
    'A single eukaryotic cell dwarfs the width of a human hair by thousands of times',
  ], 1, 'Since both values fall in a similar range, a eukaryotic cell is on the same general scale as hair width.'),
  mc('e14', E, 'A cell has circular DNA in a nucleoid region, no membrane-bound organelles, and a peptidoglycan wall. This cell is most likely', [
    'a plant cell',
    'a prokaryote (bacterium)',
    'a fungal cell',
    'an animal cell',
  ], 1, 'Circular DNA, a nucleoid rather than a true nucleus, no membrane-bound organelles, and peptidoglycan are all defining prokaryotic traits.', 'prok-cell'),
  mc('e15', E, 'A cell measures 60 micrometers across and contains a nucleolus inside a membrane-bound nucleus. This cell is most likely', [
    'a typical bacterium',
    'eukaryotic',
    'a virus particle',
    'too small to classify without a wall present',
  ], 1, 'Size within the 10–100 µm eukaryotic range plus a true nucleus with a nucleolus both point to a eukaryotic cell.'),
  mc('e16', E, 'The three main jobs shared by nearly all cells are to', [
    'make energy, make proteins, and make more cells',
    'make cellulose, make chitin, and make peptidoglycan',
    'perform photosynthesis, digestion, and excretion only',
    'perform mitosis, meiosis, and binary fission all at once',
  ], 0, 'Every cell must generate usable energy, build the proteins that do its work, and be able to produce new cells for growth or repair.'),
  mc('e17', E, 'Which structure carries out the "make proteins" job shared by all cells?', [
    'The cell wall',
    'Ribosomes',
    'The nucleoid, and nothing else',
    'The contractile vacuole',
  ], 1, 'Ribosomes translate genetic information into functional proteins in every cell type.'),
  multi('e18', E, 'Select ALL traits characteristic of prokaryotic cells.', [
    'No membrane-bound nucleus',
    'Circular DNA, sometimes including plasmids',
    '70S ribosomes',
    'Reproduction by mitosis',
  ], [0, 1, 2], 'Mitosis is eukaryotic; prokaryotes reproduce by binary fission instead.'),
  multi('e19', E, 'Select ALL traits characteristic of eukaryotic cells.', [
    'A membrane-bound nucleus with a nucleolus',
    'Membrane-bound organelles',
    '80S ribosomes',
    'A peptidoglycan wall in every cell type',
  ], [0, 1, 2], 'Peptidoglycan is specific to bacteria; eukaryotic walls, when present, are cellulose or chitin instead.'),
  mc('e20', E, 'A structure found in BOTH a typical bacterial cell and a typical animal cell is the', [
    'nucleus',
    'mitochondrion',
    'plasma membrane',
    'chloroplast',
  ], 2, 'Every cell, regardless of complexity, is bounded by a plasma membrane, unlike nuclei, mitochondria, or chloroplasts.'),
  mc('e21', E, 'Which of the following is NOT one of the features shared by all cells?', [
    'Cytoplasm',
    'Ribosomes',
    'A nucleus',
    'Genetic material (DNA or RNA)',
  ], 2, 'A true nucleus is eukaryotic only; prokaryotes store DNA in an unbound nucleoid region instead.'),
  mc('e22', E, 'Extra small circular DNA molecules found inside a bacterial cell, separate from its main chromosome, are called', [
    'nucleoli',
    'plasmids',
    'centrioles',
    'capsids',
  ], 1, 'Plasmids are small, separate circular DNA molecules common in prokaryotic cells.'),
  mc('e23', E, 'A student claims "all eukaryotic organisms are multicellular." What is the flaw?', [
    'There is no real flaw here at all; the original claim is entirely correct',
    'Many protists and some fungi, like yeast, are unicellular eukaryotes, so eukaryotic does not imply multicellular',
    'All eukaryotes are actually prokaryotic organisms in disguise',
    'Multicellularity only ever occurs among prokaryotic organisms',
  ], 1, 'Eukaryotic cells can be organized as unicellular organisms (protists, yeast) or multicellular organisms (plants, animals), independently of the nucleus criterion.'),
  mc('e24', E, 'Archaea are grouped structurally with', [
    'eukaryotes, alongside protists',
    'prokaryotes, alongside bacteria',
    'a separate, non-cellular category like viruses',
    'eukaryotes, alongside fungi',
  ], 1, 'Archaea, like bacteria, lack a membrane-bound nucleus, even though they are genetically distinct from bacteria.'),
  mc('e25', E, 'An antibiotic binds specifically to 70S ribosomes and blocks protein synthesis there. Why might this be relatively safe for a human patient?', [
    'Human cells only ever have 70S ribosomes, so the drug would affect them equally',
    'Human cells have the structurally different 80S ribosomes, so the drug can target bacterial 70S ribosomes selectively',
    'Ribosome size never actually differs between any of the domains of life',
    'Antibiotics are simply unable to target ribosomes of any kind at all',
  ], 1, 'This reflects real antibiotic design: exploiting the 70S vs. 80S structural difference to selectively harm bacteria.'),
  mc('e26', E, 'Which pairing of a feature with its correct domain is INCORRECT?', [
    'Prokaryote — circular DNA in a nucleoid',
    'Eukaryote — linear DNA in a membrane-bound nucleus',
    'Prokaryote — reproduces via mitosis',
    'Eukaryote — may have membrane-bound organelles',
  ], 2, 'Prokaryotes reproduce by binary fission, not mitosis, since they lack the nuclear membrane and spindle apparatus mitosis depends on.'),
  mc('e27', E, 'A cell is unicellular, about 3 micrometers long, has no nucleus, and divides by binary fission. What additional feature would you expect?', [
    'A membrane-bound nucleolus inside a true nucleus',
    'A nucleoid region with a single circular chromosome',
    'Mitochondria alongside a fully formed Golgi apparatus',
    '80S ribosomes throughout its entire cytoplasm',
  ], 1, 'These clues together describe a prokaryote, which stores DNA in a nucleoid and lacks membrane-bound organelles.', 'prok-cell'),
  mc('e28', E, 'Eukaryotic cells generally support more complex, specialized functions than prokaryotic cells mainly because', [
    'eukaryotic cells are generally smaller and therefore simpler overall',
    'membrane-bound organelles let eukaryotic cells separate different functions into their own specialized spaces',
    'prokaryotic cells actually contain far more organelle types than eukaryotic cells do',
    'eukaryotic cells completely lack ribosomes of any kind',
  ], 1, 'Compartmentalization via membrane-bound organelles lets different biochemical processes happen simultaneously in optimized, separate spaces.'),
  mc('e29', E, 'A prokaryotic cell\'s small size, compared to a typical eukaryotic cell, mainly benefits it by', [
    'giving it a proportionally larger surface area relative to its volume, which speeds up the exchange of nutrients and waste across the membrane',
    'giving it noticeably fewer ribosomes that it has to build and maintain',
    'letting the cell avoid ever needing a plasma membrane at all',
    'making any form of cell division completely impossible for that cell',
  ], 0, 'Smaller cells have a higher surface-area-to-volume ratio, letting materials diffuse in and out relatively quickly compared to a much larger cell.'),
  mc('e30', E, 'If a eukaryotic cell grew extremely large without gaining any new organelles or infoldings, its surface-area-to-volume ratio would', [
    'increase steadily, making exchange of materials with the environment progressively easier',
    'decrease, since volume grows faster than surface area as size increases, making exchange less efficient',
    'stay exactly and permanently the same no matter how large the cell grows',
    'become completely irrelevant to how the cell actually functions day to day',
  ], 1, 'Volume scales with the cube of size while surface area scales with the square, so larger cells have proportionally less membrane per unit of interior to support exchange.'),
]

export const PLANT_ANIMAL_QUESTIONS: BioPracticeQuestion[] = [
  mc('pa1', P, 'Which set of structures is unique to plant cells and not typically found in animal cells?', [
    'Lysosomes, centrioles, and several small vacuoles together',
    'A cellulose cell wall, one large central vacuole, and chloroplasts',
    'A nucleus, ribosomes, and a plasma membrane together',
    'Mitochondria alongside a fully developed Golgi apparatus',
  ], 1, 'Both cell types share general eukaryotic organelles, but the wall, giant central vacuole, and chloroplasts are the plant-specific structures in this unit.', 'plant-animal-cells'),
  mc('pa2', P, 'Which set of structures is characteristic of animal cells but absent in plant cells?', [
    'Chloroplasts and a cellulose wall',
    'Lysosomes and centrioles',
    'A large central vacuole and cell wall',
    'A nucleus and cytoplasm',
  ], 1, 'Lysosomes (digestion) and centrioles (cell-division organization) are the specialized animal-cell structures in this comparison.', 'plant-animal-cells'),
  mc('pa3', P, 'Lysosomes function primarily to', [
    'convert sunlight into chemical energy',
    'digest waste, damaged organelles, and engulfed material',
    'provide rigid structural support',
    'store large volumes of water',
  ], 1, 'Lysosomes hold digestive enzymes used to break down and recycle cellular material.'),
  mc('pa4', P, 'Centrioles are structures involved in', [
    'photosynthesis',
    'organizing cell division',
    'storing water and maintaining turgor',
    'forming a rigid outer wall',
  ], 1, 'Centrioles help organize the spindle apparatus during cell division, a role specific to animal cells here.'),
  mc('pa5', P, 'Chloroplasts are responsible for', [
    'breaking down cellular waste products and debris',
    'converting light energy into chemical energy, which also gives plants their green color',
    'organizing and directing the process of cell division',
    'providing rigid structural support to the whole cell',
  ], 1, 'Chloroplasts carry out photosynthesis and contain the pigment that gives plant tissue its green color.'),
  mc('pa6', P, 'The plant cell wall is best described as', [
    'located inside the plasma membrane and made mostly of protein',
    'outside the plasma membrane, made of cellulose, providing support and a fixed shape',
    'chemically identical in every way to a bacterial cell wall',
    'a feature shared equally between plant cells and animal cells',
  ], 1, 'Its position (outside the membrane), material (cellulose), and function (support/shape) define the plant wall.'),
  mc('pa7', P, 'A fungal cell wall differs from a plant cell wall mainly in that the fungal wall is made of', [
    'cellulose, just like a plant wall',
    'chitin instead of cellulose',
    'peptidoglycan, like a bacterial wall',
    'cholesterol embedded in a lipid layer',
  ], 1, 'Both plants and fungi have eukaryotic cell walls, but the carbohydrate differs: cellulose in plants, chitin in fungi.'),
  mc('pa8', P, 'A plant\'s single large central vacuole serves which combination of roles?', [
    'Photosynthesis and cell division only, and nothing else',
    'Storing water, food, and waste while helping generate turgor pressure that resists bursting',
    'Digesting bacteria that were taken in by phagocytosis',
    'Producing all of the cell\'s own genetic material',
  ], 1, 'The central vacuole is both a storage reservoir and a key part of the structural turgor pressure that keeps the plant rigid.'),
  mc('pa9', P, 'Which best contrasts vacuoles in plant versus animal cells?', [
    'Plant cells typically have several small vacuoles; animal cells typically have one large central vacuole',
    'Plant cells typically have one large central vacuole; animal cells typically have several smaller vacuoles',
    'Neither cell type has vacuoles',
    'Both cell types have an identical number and size of vacuoles',
  ], 1, 'Size and number differ by cell type: one dominant central vacuole in plants versus multiple smaller ones in animals.'),
  mc('pa10', P, 'A contractile vacuole, found in freshwater protists rather than typical plant or animal cells, functions to', [
    'store extra starch reserves for later energy use',
    'actively expel the excess water entering by osmosis, preventing cytolysis',
    'carry out photosynthesis using its own chlorophyll',
    'anchor the entire cell firmly to a substrate',
  ], 1, 'This organelle connects back to osmotic principles: a hypotonic freshwater environment forces the protist to actively remove incoming water.'),
  mc('pa11', P, 'Plant cells keep a fixed, regular shape while animal cells tend to be irregular mainly because', [
    'plant cells simply lack a plasma membrane entirely',
    'the rigid cellulose wall constrains the plant cell\'s shape, an external constraint animal cells lack',
    'animal cells contain chloroplasts that force them into a round shape',
    'plant cells are always noticeably smaller than animal cells',
  ], 1, 'Wall rigidity is the direct structural cause of the plant cell\'s fixed shape.'),
  mc('pa12', P, 'A microscope image shows a rigid rectangular cell, one enormous central compartment, and small green ovals near the edges. This cell is most likely', [
    'an animal cell',
    'a plant cell',
    'a prokaryote',
    'a virus',
  ], 1, 'The rigid boxy shape, dominant vacuole, and green chloroplasts together are diagnostic of a plant cell.', 'plant-animal-cells'),
  mc('pa13', P, 'A microscope image shows an irregular, rounded cell with several small vesicle-like structures and no green organelles. This cell is most likely', [
    'a plant cell',
    'an animal cell',
    'a bacterium',
    'a fungal cell',
  ], 1, 'No wall, no chloroplasts, and multiple small vacuole-like structures point to an animal cell.', 'plant-animal-cells'),
  multi('pa14', P, 'Select ALL structures that distinguish a typical plant cell in this unit.', [
    'Cellulose cell wall',
    'One large central vacuole',
    'Chloroplasts',
    'Centrioles',
  ], [0, 1, 2], 'Centrioles are the animal-specific structure in this comparison, not a plant feature.'),
  multi('pa15', P, 'Select ALL structures that distinguish a typical animal cell in this unit.', [
    'No cell wall (irregular, flexible shape)',
    'Multiple small vacuoles',
    'Lysosomes and centrioles',
    'Chloroplasts',
  ], [0, 1, 2], 'Chloroplasts are exclusive to photosynthetic organisms, not typical animal cells.'),
  mc('pa16', P, 'A plant wilting after days without water traces directly back to which structural/osmotic connection?', [
    'The central vacuole loses water and shrinks, dropping the turgor pressure that normally presses the membrane against the wall',
    'The cellulose wall dissolves away completely over those few days',
    'Chloroplasts inside the cell stop functioning entirely and permanently',
    'Lysosomes actively digest the water molecules that are missing',
  ], 0, 'Without enough water, the vacuole shrinks and turgor pressure drops, so the membrane no longer presses firmly against the rigid wall — this is what makes the plant visibly wilt.'),
  mc('pa17', P, 'A typical animal cell in a strongly hypotonic solution risks bursting more than a plant cell in the same solution mainly because', [
    'animal cells have no wall to physically resist the swelling that a plant cell\'s wall constrains',
    'animal cells actively pump water inward while plant cells pump it back out',
    'plant cells simply have no plasma membrane surrounding them at all',
    'animal cells always contain much more dissolved solute than plant cells',
  ], 0, 'The rigid wall gives a plant cell a hard physical limit on expansion, a safeguard an animal cell simply does not have.'),
]

export const SURFACES_VIRUS_QUESTIONS: BioPracticeQuestion[] = [
  mc('v1', S, 'Tight junctions between animal cells work by', [
    'forming pores that connect the cytoplasm of two adjacent cells',
    'using interlocking membrane proteins to bind neighboring cells firmly together',
    'allowing exchange through gaps in a cellulose wall',
    'engulfing a neighboring cell by phagocytosis',
  ], 1, 'Tight junctions are interlocking proteins that seal cells together, useful for barriers like the digestive-tract lining.'),
  mc('v2', S, 'Gap junctions differ from tight junctions in that gap junctions', [
    'only hold neighboring cells together mechanically, without exchanging any material',
    'create direct channels connecting the cytoplasm of two cells, letting ions and electrical impulses pass through',
    'are found only inside rigid plant cell walls, never in animals',
    'require plain osmosis to work, instead of an actual protein channel',
  ], 1, 'Gap junctions form an actual channel between cells, unlike tight junctions, which mainly provide a mechanical seal.'),
  mc('v3', S, 'Plasmodesmata in plant cells are functionally most similar to which animal-cell structure?', [
    'Tight junctions, since both structures only bind neighboring cells mechanically',
    'Gap junctions, since both allow direct exchange of cytoplasm and signals between neighboring cells',
    'Lysosomes, since both structures digest cellular waste material',
    'Centrioles, since both structures help organize cell division',
  ], 1, 'Despite very different structures — a wall pore versus a protein channel — both serve an analogous communication role.'),
  mc('v4', S, 'Plant cells specifically need plasmodesmata for communication because', [
    'plants have no plasma membrane at all, so cells must communicate only through the rigid wall itself',
    'being immobile and boxed in by a rigid wall, plant cells need channels through that wall to exchange cytoplasm and signals directly',
    'plant cells simply cannot produce any of their own proteins without outside help',
    'plasmodesmata are strictly required for photosynthesis to occur in the chloroplast',
  ], 1, 'Being both stationary and wall-enclosed creates a specific communication problem that pores through the wall solve.'),
  mc('v5', S, 'A drug that disables gap junctions between adjacent heart muscle cells would most directly disrupt', [
    'the purely mechanical adhesion holding those muscle cells together',
    'the passage of electrical impulses between neighboring cells needed for coordinated contraction',
    'the cellulose wall structure surrounding those particular heart cells',
    'the cell\'s general ability to import cholesterol from the blood',
  ], 1, 'Gap junctions allow the direct electrical/ionic communication that coordinated contraction depends on.'),
  mc('v6', S, 'Which correctly matches a surface structure to the cell type it is found in?', [
    'Tight and gap junctions — animal cells; plasmodesmata — plant cells',
    'Plasmodesmata — animal cells; tight and gap junctions — plant cells',
    'All three occur only in prokaryotic cell walls',
    'All three are unique to viruses',
  ], 0, 'Animal cell surfaces use tight and gap junctions; plant cells, bounded by a wall, use plasmodesmata instead.'),
  mc('v7', S, 'Viruses are best described in this unit as', [
    'fully living cells that reproduce independently by binary fission',
    'infectious particles that show some, but not all, characteristics of life',
    'a subtype of prokaryotic cell',
    'the basic unit of eukaryotic life',
  ], 1, 'Viruses show some life-like traits, such as genetic material and evolution, but lack independent metabolism and cellular structure.', 'virus-struct'),
  mc('v8', S, 'Viruses are generally not considered fully alive mainly because they', [
    'require a host cell to reproduce, have no cells of their own, and carry out no independent metabolism',
    'are simply far too large in size to ever be considered true organisms',
    'contain absolutely no genetic material of any kind at all',
    'can easily be seen with the naked eye, without any microscope',
  ], 0, 'This trio — host dependence, lack of cells, no independent metabolism — is exactly why viruses fall outside standard definitions of life.'),
  mc('v9', S, 'Viruses evolve rapidly and produce many distinct strains mainly because of', [
    'their unusually large physical size, which leaves room for many mutations',
    'high replication rates combined with a genome that accumulates mutations quickly',
    'their strange ability to photosynthesize entirely new genetic material',
    'their formal classification as fully eukaryotic cells',
  ], 1, 'Fast, high-volume replication paired with error-prone copying accelerates genetic variation, producing new strains.'),
  mc('v10', S, 'Ranking typical size from LARGEST to SMALLEST:', [
    'Virus, then prokaryotic cell, then eukaryotic cell',
    'Eukaryotic cell, then prokaryotic cell, then virus',
    'Prokaryotic cell, then virus, then eukaryotic cell',
    'All three are roughly the same size',
  ], 1, 'Eukaryotic cells are generally largest, prokaryotic cells smaller, and viruses smaller still than either.'),
  mc('v11', S, 'Every virus possesses all of the following EXCEPT', [
    'a capsid (protective protein shell)',
    'a nucleic acid genome made of DNA or RNA',
    'ribosomes for its own protein synthesis',
    'in many cases, an outer envelope from host membrane',
  ], 2, 'Viruses lack their own ribosomes and rely on a host cell\'s machinery to make new viral proteins.', 'virus-struct'),
  mc('v12', S, 'The protein shell encasing and protecting a virus\'s genetic material is the', [
    'nucleoid',
    'capsid',
    'cell wall',
    'plasma membrane',
  ], 1, 'The capsid is a defining structural feature of a virus, unlike any structure found in a true cell.', 'virus-struct'),
  mc('v13', S, 'A virus\'s genome may be made of', [
    'DNA only, never RNA',
    'either DNA or RNA, depending on the virus',
    'protein only, with no nucleic acid',
    'peptidoglycan',
  ], 1, 'Unlike cellular life, which always uses DNA as its primary genetic material, a virus\'s genome can be DNA or RNA.'),
  mc('v14', S, 'Lacking ribosomes and their own metabolic machinery, viruses reproduce by', [
    'mitosis, in a way that is just like eukaryotic cells',
    'hijacking a host cell\'s machinery to build new viral particles',
    'binary fission, carried out completely independently',
    'performing photosynthesis to generate the energy needed to divide',
  ], 1, 'Because viruses cannot replicate alone, they redirect a host cell\'s ribosomes and enzymes to make copies of themselves.'),
  mc('v15', S, 'A newly found infectious particle has a protein capsid and an RNA genome, but no ribosomes, no cytoplasm, and cannot reproduce outside a host. This particle should be classified as', [
    'a typical prokaryotic cell like an ordinary bacterium',
    'a typical eukaryotic cell like an ordinary protist',
    'a virus, not a cell, and not fully alive under cell theory',
    'an ordinary plant cell with a rigid cellulose wall',
  ], 2, 'Lacking cytoplasm, ribosomes, and independent reproduction disqualifies it from being a cell, placing it in the virus category instead.', 'virus-struct'),
  multi('v16', S, 'Select ALL structures found on animal cell surfaces (not plant cell surfaces).', [
    'Tight junctions',
    'Gap junctions',
    'Plasmodesmata',
    'A nucleoid region',
  ], [0, 1], 'Plasmodesmata are specific to plant cell walls; a nucleoid is a prokaryotic structure unrelated to animal cell surfaces.'),
]
