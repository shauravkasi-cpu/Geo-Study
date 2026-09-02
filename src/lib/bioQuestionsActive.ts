import { mc, multi, type BioPracticeQuestion } from './bioQuiz'

const T = 'active' as const

export const ACTIVE_QUESTIONS: BioPracticeQuestion[] = [
  mc('a1', T, 'Active transport requires', [
    'no ATP; cargo still moves high → low',
    'ATP; cargo moves low → high, against the gradient',
    'only osmosis of water through lipid tails',
    'a cellulose wall surrounding every cell',
  ], 1, 'If it goes low to high, it costs ATP.')
  mc('a2', T, 'Passive vs active — direction', [
    'passive low → high; active high → low',
    'passive high → low; active low → high',
    'both only high → low, never the reverse',
    'both only low → high, never the reverse',
  ], 1, 'Gradient direction is the first compare/contrast point.'),
  mc('a3', T, 'Passive vs active — energy', [
    'both require ATP for every crossing',
    'passive needs none; active needs ATP',
    'active needs none; passive needs ATP',
    'neither process ever uses a protein',
  ], 1, 'Energy is the second compare point. Proteins can appear in BOTH (facilitated vs pumps).'),
  mc('a4', T, 'Bulk active transport typically uses', [
    'only cellulose fibers in a plant wall',
    'vesicles that fuse with or pinch from the membrane',
    'only circular plasmids in a nucleoid',
    'only protein capsids around a virus',
  ], 1, 'Endocytosis and exocytosis use vesicles. Pumps use transport proteins, not bulk vesicles.'),
  mc('a5', T, 'Exocytosis is', [
    'passive osmosis of folded proteins through tails',
    'active bulk export by vesicles fusing with the membrane',
    'cell-drinking of extracellular fluid',
    '3 Na⁺ in and 2 K⁺ out per ATP spent',
  ], 1, 'Exo = exiting. ATP required. Examples: hormone secretion, protein secretion, nerve communication.', 'endo-exo')
  mc('a6', T, '“Exo” in exocytosis means cargo is', [
    'entering the cell in a vesicle',
    'exiting the cell after vesicle fusion',
    'at equilibrium on both sides',
    'moving only in eukaryotic nuclei',
  ], 1, 'Vesicle fuses with the plasma membrane and dumps contents outside.'),
  mc('a7', T, 'An exocytosis example from the notes is', [
    'O₂ simple-diffusing through the bilayer',
    'hormone or protein secretion, or nerve signals',
    'osmosis into a hypotonic plant cell',
    'a bacterium splitting by binary fission',
  ], 1, 'Bulk export of large materials the cell made.'),
  mc('a8', T, 'Right after an exocytic vesicle fuses, its membrane', [
    'vanishes into the nucleus',
    'becomes part of the plasma membrane',
    'turns into peptidoglycan wall',
    'folds into a virus capsid',
  ], 1, 'Fusion adds membrane to the cell surface.', 'endo-exo'),
  mc('a9', T, 'Endocytosis is', [
    'simple diffusion of O₂ and CO₂ gases',
    'active bulk intake of large cargo using vesicles',
    'water leaving only a hypertonic animal cell',
    'facilitated diffusion of glucose downhill',
  ], 1, 'Endo = into the cell. Three types: pinocytosis, phagocytosis, receptor-mediated.', 'endo-exo')
  mc('a10', T, 'The three types of endocytosis are', [
    'simple diffusion, osmosis, facilitated diffusion',
    'pinocytosis, phagocytosis, receptor-mediated',
    'Hooke, Schwann, and Virchow’s ideas',
    'tight junctions, gap junctions, plasmodesmata',
  ], 1, 'All three are active and INTO the cell.'),
  mc('a11', T, 'Pinocytosis means', [
    'cell-eating of bacteria or large food',
    'cell-drinking of a little extracellular fluid',
    'pumping two K⁺ ions into the cell',
    'building a cellulose or chitin wall',
  ], 1, 'Usually fats, vitamins, or waste molecules.'),
  mc('a12', T, 'Phagocytosis means', [
    'cell-drinking of vitamins dissolved in fluid',
    'cell-eating: engulfing food or bacteria into vesicles',
    'osmosis of water through aquaporin channels',
    'cholesterol buffering how fluid the bilayer is',
  ], 1, 'Macrophages engulfing bacteria; immune cells engulfing yeast.')
  mc('a13', T, 'A macrophage engulfing bacteria is', [
    'osmosis of water into the cell',
    'phagocytosis, a type of active endocytosis',
    'simple diffusion of the bacteria',
    'facilitated diffusion of oxygen',
  ], 1, 'Classic immune-system phagocytosis.'),
  mc('a14', T, 'Receptor-mediated endocytosis', [
    'uses receptors to bind hormones or cholesterol, then engulf them',
    'is passive and does not need the receptor to match cargo',
    'is only used for oxygen gas crossing the lipid tails',
    'is the same process as bacterial binary fission',
  ], 0, 'Receptor shape is essential — lock and key for the signal.')
  mc('a15', T, 'Receptor shape matters in receptor-mediated endocytosis because', [
    'shape is irrelevant to whether cargo is taken in',
    'the receptor must fit the hormone or cholesterol to bind it',
    'shape only matters for cellulose in plant walls',
    'shape only matters for peptidoglycan in viruses',
  ], 1, 'Wrong shape = no binding = that molecule is not engulfed.'),
  mc('a16', T, 'Exocytosis vs endocytosis', [
    'both are passive and need no ATP at all',
    'both are active vesicle traffic; exo = out, endo = in',
    'exo is osmosis; endo is simple diffusion of gases',
    'both move only O₂ through the lipid tails',
  ], 1, 'Direction of the vesicle cargo is the difference.')
  mc('a17', T, 'The sodium-potassium pump uses ATP to', [
    'simple-diffuse glucose through the tails',
    'keep Na⁺ and K⁺ at the right inside/outside levels',
    'build cellulose for a plant cell wall',
    'assemble a protein capsid around DNA',
  ], 1, 'A transport protein changes shape to move the ions. That is ion homeostasis.', 'nak-pump'),
  mc('a18', T, 'For every 2 K⁺ pumped IN, the pump moves', [
    '2 Na⁺ in with those potassium ions',
    '3 Na⁺ OUT of the cell',
    '3 Na⁺ IN to the cytoplasm',
    '2 glucose molecules out of the cell',
  ], 1, '3 Na⁺ out, 2 K⁺ in. Remember 3 out / 2 in.', 'nak-pump'),
  mc('a19', T, 'The Na+/K+ pump makes the inside of the cell', [
    'slightly positive compared with the outside',
    'slightly negative compared with the outside',
    'completely empty of sodium and potassium',
    'hypertonic to every plant cell nearby',
  ], 1, 'More + charges leave (3 Na⁺) than enter (2 K⁺).', 'nak-pump'),
  mc('a20', T, '“Salty banana” means the cell has', [
    'high Na⁺ inside and high K⁺ outside',
    'high Na⁺ outside and high K⁺ inside',
    'equal Na⁺ and K⁺ on both sides',
    'potassium only, with no sodium anywhere',
  ], 1, 'Banana = potassium inside; salty = sodium outside.', 'nak-pump'),
  mc('a21', T, 'The Na+/K+ pump is', [
    'simple diffusion of ions through tails',
    'active transport by a shape-changing protein',
    'osmosis of water toward high solute',
    'phagocytosis of sodium metal bits',
  ], 1, 'Ions cannot simple-diffuse. Going against their gradients costs ATP.'),
  mc('a22', T, 'The Na+/K+ pump helps homeostasis by', [
    'holding the correct Na⁺/K⁺ amounts and charge difference',
    'making glucose from carbon dioxide and light',
    'acting as a contractile vacuole in animal cells',
    'building cellulose or chitin cell walls',
  ], 0, 'Nerve signals, cell volume, and ion balance depend on this pump.'),
  mc('a23', T, 'If the pump is blocked (no ATP), Na⁺ would', [
    'still be pumped out against its concentration gradient',
    'leak toward equilibrium; the salty-banana gradient collapses',
    'turn into oxygen gas inside the membrane',
    'assemble peptidoglycan outside the plasma membrane',
  ], 1, 'Active transport maintains gradients that diffusion would wipe out.')
  mc('a24', T, 'Pinocytosis vs phagocytosis', [
    'pino = drink small fluid; phago = eat large particles',
    'pino needs ATP; phago does not use energy',
    'both are just another name for osmosis',
    'pino occurs only at plant plasmodesmata',
  ], 0, 'Both are endocytosis, both active.'),
  mc('a25', T, 'Exporting a protein the cell just made requires', [
    'phagocytosis of that protein back in',
    'exocytosis in a vesicle that fuses',
    'osmosis of the protein through tails',
    'facilitated diffusion of the whole protein',
  ], 1, 'Proteins are too big to simple-diffuse. Vesicle fusion dumps them out.'),
  mc('a26', T, 'Cholesterol entering after it binds a membrane receptor is', [
    'simple diffusion of a fully charged ion',
    'receptor-mediated endocytosis',
    'turgor pressure in a plant wall',
    'binary fission of a bacterium',
  ], 1, 'Notes list hormones and cholesterol for this pathway.'),
  mc('a27', T, 'A white blood cell eating a pathogen is closest to', [
    'pinocytosis of a sip of fluid',
    'phagocytosis of a large particle',
    'osmosis of water into the cell',
    'the fluid mosaic freezing solid',
  ], 1, 'Cell-eating large particles.'),
  mc('a28', T, 'A capillary cell taking in a sip of extracellular fluid is closest to', [
    'phagocytosis of an entire yeast cell',
    'pinocytosis of fluid and small cargo',
    'only the sodium-potassium pump',
    'plasmolysis of a plant cell',
  ], 1, 'Notes show pinocytosis across a capillary cell.'),
  mc('a29', T, 'Which statement is FALSE?', [
    'Endocytosis and exocytosis both need ATP for vesicle traffic',
    'The sodium-potassium pump needs ATP to move Na⁺ and K⁺',
    'Facilitated diffusion of glucose down its gradient needs ATP',
    'Phagocytosis uses vesicles to take in large particles',
  ], 2, 'Facilitated diffusion is still passive. Protein help ≠ energy.')
  mc('a30', T, 'Bulk transport means', [
    'O₂ sneaking between phospholipid tails',
    'moving large/many materials with vesicles',
    'only aquaporins speeding water',
    'only peripheral proteins on the edge',
  ], 1, 'Pumps move ions. Vesicles move bulk cargo (endo/exocytosis).'),
  multi('a31', T, 'Choose ALL that are active transport.', [
    'exocytosis',
    'endocytosis (all 3 types)',
    'sodium-potassium pump',
    'osmosis of water down its gradient',
  ], [0, 1, 2], 'Osmosis is passive.'),
  multi('a32', T, 'Choose ALL true comparisons of passive vs active.', [
    'Passive: high → low, no ATP',
    'Active: low → high, ATP',
    'Active may use pumps or vesicles',
    'Passive includes phagocytosis',
  ], [0, 1, 2], 'Phagocytosis is active bulk intake.'),
  multi('a33', T, 'Choose ALL types of endocytosis.', [
    'pinocytosis',
    'phagocytosis',
    'receptor-mediated',
    'exocytosis',
  ], [0, 1, 2], 'Exocytosis is the opposite direction.'),
  mc('a34', T, 'Insulin recognized, then engulfed, would use', [
    'simple diffusion through the lipid tails',
    'receptor-mediated endocytosis',
    'plasmolysis as water leaves the cell',
    'binary fission of the whole cell',
  ], 1, 'Receptors bind hormones (TRACIE) and can trigger endocytosis. Insulin is the notes’ example.'),
  mc('a35', T, '3 Na⁺ out / 2 K⁺ in requires the protein to', [
    'stay a rigid open pore like an always-open aquaporin',
    'change shape, using ATP, against both ion gradients',
    'dissolve the phospholipid bilayer into free lipids',
    'turn into a chloroplast and start making sugar',
  ], 1, 'Notes: a transport protein changes shape to move the ions — and this pump is active.', 'nak-pump')
  mc('a36', T, 'After many pump cycles, outside the cell you should find relatively', [
    'high K⁺ and low Na⁺',
    'high Na⁺ and low K⁺',
    'no sodium and no potassium',
    'only glucose, with no ions',
  ], 1, 'Salty outside, potassium banana inside.'),
  mc('a37', T, 'Nerve-cell communication listed with exocytosis is', [
    'osmosis of Na⁺ with no vesicles involved at all',
    'releasing signal chemicals from vesicles at the membrane',
    'building peptidoglycan around the neuron cell',
    'Hooke naming empty chambers he saw in cork',
  ], 1, 'Secretion = exocytosis.')
  mc('a38', T, 'Which needs a vesicle, not just a pump protein?', [
    'moving 3 Na⁺ ions across the membrane',
    'exporting a large protein hormone',
    'O₂ leaving a lung cell by diffusion',
    'water leaving through aquaporins',
  ], 1, 'Huge cargo → vesicle. Ions → pump. Gases/water → diffusion/osmosis.'),
  mc('a39', T, 'Endocytosis vs exocytosis — membrane area', [
    'endocytosis takes membrane in; exocytosis adds membrane',
    'neither process ever touches the plasma membrane',
    'both are simple diffusion of O₂ and CO₂',
    'both occur only inside intact virus particles',
  ], 0, 'Vesicle traffic remodels the plasma membrane.', 'endo-exo')
  mc('a40', T, 'A molecule going low → high through a protein is', [
    'osmosis of water toward low solute',
    'active transport that requires ATP',
    'simple diffusion through the tails',
    'proof the cell is already at equilibrium',
  ], 1, 'Against the gradient = pay ATP.'),
  mc('a41', T, 'Pinocytosis cargo is usually', [
    'whole bacteria or large food clumps',
    'a small sip of fluid with fats, vitamins, or waste',
    'entire organelles dumped out of the cell',
    'cellulose fibers from a plant wall',
  ], 1, 'Drinking, not eating.'),
  mc('a42', T, 'Phagocytosis cargo is usually', [
    'individual O₂ molecules through the tails',
    'large particles such as food or bacteria',
    'only H₂O through aquaporin channels',
    'only Na⁺ through the ion pump',
  ], 1, 'Eating.')
  mc('a43', T, 'Which protein type starts receptor-mediated endocytosis?', [
    'an integral receptor that binds the target',
    'cellulose synthase in a plant wall',
    'a capsid protein around a virus',
    'peptidoglycan in a bacterial wall',
  ], 0, 'Integral receptor binds, then membrane engulfs.'),
  mc('a44', T, 'Vesicles approaching from inside and fusing is', [
    'endocytosis bringing cargo in',
    'exocytosis sending cargo out',
    'osmosis of water through tails',
    'binary fission of a bacterium',
  ], 1, 'Inside → out = exo.', 'endo-exo'),
  mc('a45', T, 'Membrane dimpling inward around cargo is', [
    'exocytosis sending cargo out',
    'endocytosis bringing cargo in',
    'simple diffusion of carbon dioxide',
    'turgor pressure in a plant cell',
  ], 1, 'Outside → in = endo.', 'endo-exo'),
  multi('a46', T, 'Choose ALL that correctly describe the Na+/K+ pump.', [
    '3 Na⁺ out, 2 K⁺ in',
    'uses ATP',
    'inside becomes slightly negative',
    'moves ions high → low with no energy',
  ], [0, 1, 2], 'It moves ions against their gradients.'),
  mc('a47', T, 'Facilitated diffusion and the Na+/K+ pump both can use proteins, but', [
    'only the pump uses ATP and goes against the ion gradients',
    'only facilitated diffusion spends ATP on glucose',
    'neither process uses a membrane protein helper',
    'both move cargo from low concentration up to high',
  ], 0, 'Protein is not the same as energy.')
  mc('a48', T, 'To take in one hormone and ignore a similar-sized random molecule, use', [
    'simple diffusion through the tails',
    'receptor-mediated endocytosis',
    'cytolysis of the whole cell',
    'plasmolysis of a plant cell',
  ], 1, 'Specificity comes from receptor shape.'),
  mc('a49', T, 'Active transport builds/keeps a gradient. Passive transport', [
    'also builds a brand-new gradient from nothing',
    'lets substances run down gradients the cell already has',
    'is just another name for the Na+/K+ pump',
    'always uses vesicles and never uses proteins',
  ], 1, 'Pumps create order; diffusion spends it.')
  mc('a50', T, 'Which list is only bulk active transport?', [
    'osmosis and simple diffusion',
    'endocytosis and exocytosis',
    'facilitated diffusion and aquaporins',
    'Hooke’s cork and Leeuwenhoek’s animalcules',
  ], 1, 'Bulk = vesicles. The pump is active but is not bulk cargo.'),
]
