import { mc, multi, type BioPracticeQuestion } from './bioQuiz'

const T = 'active' as const

export const ACTIVE_QUESTIONS: BioPracticeQuestion[] = [
  mc('a1', T, 'Active transport is defined by which two features?', [
    'Movement down the gradient, no ATP required',
    'Movement against the gradient, powered by ATP',
    'Movement of water only, powered by ATP',
    'Movement of gases only, needing no energy',
  ], 1, 'Active transport moves solutes from low to high concentration, which requires ATP since it is energetically unfavorable.'),
  mc('a2', T, 'A solute is observed moving from low concentration to high concentration across a membrane. This alone tells you that', [
    'the process must simply be a form of ordinary simple diffusion',
    'energy input must be involved, since movement against a gradient cannot happen spontaneously',
    'the process must instead be a straightforward case of plain osmosis',
    'no membrane protein could possibly be involved in this particular case',
  ], 1, 'Moving "uphill" against a gradient always requires an energy source — a thermodynamic requirement, not just a rule to memorize.'),
  mc('a3', T, 'A drug blocks ATP synthase, and a transport process moving glucose against its gradient halts immediately. This best supports the conclusion that the transport was', [
    'passive, since it happened to stop right when a chemical was added',
    'active, since it moved material uphill and stopped once ATP production was blocked',
    'simple diffusion, which should be completely unaffected by ATP levels',
    'osmosis, which never depends on ATP under any circumstances',
  ], 1, 'Passive transport never depends on cellular ATP levels. A process that halts without ATP, especially one moving material uphill, is active transport.'),
  mc('a4', T, 'Exocytosis moves material out of a cell by', [
    'small ions leaking passively across the membrane',
    'vesicles fusing with the plasma membrane, which requires ATP',
    'gases diffusing directly through the bilayer',
    'a passive process limited to prokaryotes',
  ], 1, 'Forming, moving, and fusing a vesicle all cost energy, making bulk export via exocytosis an active process.'),
  mc('a5', T, 'A pancreatic cell releasing insulin into the bloodstream via secretory vesicles is a clear example of', [
    'osmosis',
    'exocytosis',
    'simple diffusion',
    'phagocytosis',
  ], 1, 'Hormone secretion through vesicles fusing with the membrane is a textbook example of exocytosis.'),
  mc('a6', T, 'Endocytosis differs from exocytosis mainly in that endocytosis moves material', [
    'into the cell, while exocytosis moves material out',
    'without ever needing ATP, unlike exocytosis',
    'only in plant cells',
    'by simple diffusion rather than by vesicle',
  ], 0, '"Endo-" (into) and "exo-" (out of) describe opposite directions of vesicle transport; both require ATP.'),
  mc('a7', T, 'A macrophage engulfing an entire bacterium in a large vesicle is called', [
    'pinocytosis',
    'phagocytosis',
    'facilitated diffusion',
    'receptor-mediated exocytosis',
  ], 1, '"Phago-" means eating; engulfing large particles like bacteria is phagocytosis.'),
  mc('a8', T, 'A capillary cell taking in a small droplet of surrounding fluid with dissolved nutrients is an example of', [
    'phagocytosis',
    'pinocytosis',
    'simple diffusion',
    'the sodium-potassium pump',
  ], 1, '"Pino-" means drinking; taking in small amounts of fluid, rather than large particles, is pinocytosis.'),
  mc('a9', T, 'A cell takes up cholesterol-carrying particles from the blood only after a specific membrane protein binds them, and the particles are then engulfed. This is', [
    'phagocytosis',
    'receptor-mediated endocytosis',
    'simple diffusion',
    'osmosis',
  ], 1, 'Binding a specific receptor before engulfment, as with LDL cholesterol uptake, is the defining feature of receptor-mediated endocytosis.'),
  mc('a10', T, 'The shape of a receptor protein is essential to receptor-mediated endocytosis because', [
    'shape is irrelevant here, since any protein can bind any signal at all',
    'the receptor must match the shape of its target molecule for binding and uptake to occur',
    'receptor shape actually only matters for enzymes, not for transport proteins',
    'this particular process does not actually involve any receptors whatsoever',
  ], 1, 'Molecular recognition, like an enzyme and its substrate, depends on a shape that fits the specific target.'),
  mc('a11', T, 'Which best distinguishes the three types of endocytosis?', [
    'Pinocytosis takes in large particles; phagocytosis takes in a small amount of fluid; receptor-mediated needs no binding step at all',
    'Pinocytosis takes in a small amount of fluid; phagocytosis takes in large particles; receptor-mediated binds a specific target first',
    'All three of these are really just the same single process under three different names',
    'Only phagocytosis actually needs ATP energy; the other two are entirely passive processes',
  ], 1, 'Each is defined by what is taken in and how: fluid, large particles, or a receptor-bound target — and all three cost ATP.'),
  mc('a12', T, 'The sodium-potassium pump moves ions in which pattern per cycle?', [
    '2 Na⁺ out, 3 K⁺ in',
    '3 Na⁺ out, 2 K⁺ in',
    '3 Na⁺ in, 2 K⁺ out',
    '2 Na⁺ in, 2 K⁺ out',
  ], 1, 'Each cycle pumps 3 sodium ions out and 2 potassium ions in, an unequal exchange powered by ATP.', 'nak-pump'),
  mc('a13', T, 'Because 3 positive charges leave for every 2 that enter each pump cycle, the direct result is that', [
    'the cell interior becomes slightly positive relative to the outside',
    'the cell interior becomes slightly negative relative to the outside',
    'there is no net effect on membrane charge',
    'the membrane loses its charge entirely',
  ], 1, 'More positive charge exits than enters each cycle, leaving the cytoplasm slightly negative relative to the outside.', 'nak-pump'),
  mc('a14', T, 'After extensive pumping, sometimes remembered with the "salty banana" analogy, ions settle into which pattern?', [
    'High Na⁺ inside, high K⁺ outside',
    'High Na⁺ outside, high K⁺ inside',
    'Equal Na⁺ and K⁺ on both sides',
    'Neither ion present on either side',
  ], 1, 'The pump maintains steep gradients: Na⁺ concentrated outside, K⁺ concentrated inside, at the cost of ATP.'),
  mc('a15', T, 'Ouabain, a drug that specifically blocks the sodium-potassium pump, would most likely cause', [
    'the Na⁺ and K⁺ gradients to strengthen even further than before',
    'Na⁺ and K⁺ to slowly diffuse down their gradients until the imbalance collapses',
    'the cell to suddenly begin performing photosynthesis on its own',
    'water molecules to stop crossing the membrane entirely and completely',
  ], 1, 'Without active pumping to counter passive leak, ions equilibrate toward their diffusion gradients, erasing the carefully maintained imbalance.'),
  mc('a16', T, 'The sodium-potassium pump supports homeostasis mainly by', [
    'converting light energy into chemical energy inside the cell',
    'maintaining the internal Na⁺ and K⁺ levels and charge that cells depend on, such as for nerve signaling',
    'breaking complex starch molecules down into simple glucose',
    'building an entire peptidoglycan wall around the outside of the cell',
  ], 1, 'Correct ion balance underlies functions like nerve impulses and cell-volume regulation, both dependent on this pump.'),
  mc('a17', T, 'Which of the following is the strongest evidence that a transport process is active rather than passive?', [
    'The solute simply moves down its own concentration gradient',
    'The process runs at the same rate whether or not ATP is present',
    'The process halts once ATP is depleted, and the solute is moving against its own gradient',
    'The solute happens to be a small, uncharged gas molecule',
  ], 2, 'Active transport uniquely depends on ATP and uniquely moves solutes uphill — both together are strong, direct evidence.'),
  mc('a18', T, 'Which of the following does NOT require ATP?', [
    'The sodium-potassium pump moving ions uphill',
    'Phagocytosis of a large food particle',
    'Facilitated diffusion of glucose down its gradient',
    'Exocytosis of a freshly made hormone',
  ], 2, 'Facilitated diffusion uses a protein but stays passive as long as the solute moves downhill; the other three all cost cellular energy.'),
  mc('a19', T, 'Endocytosis and exocytosis are grouped together as "bulk transport" because both', [
    'move only single dissolved ions one at a time',
    'move many molecules or large particles at once using vesicles',
    'occur without spending any ATP',
    'are limited to simple diffusion of gases',
  ], 1, 'Vesicle formation and fusion let a cell move large quantities of material across the membrane in a single event.', 'endo-exo'),
  mc('a20', T, 'A nerve cell releasing neurotransmitter from vesicles at the synaptic gap is best classified as', [
    'osmosis',
    'exocytosis',
    'phagocytosis',
    'simple diffusion',
  ], 1, 'Releasing vesicle contents via membrane fusion, using ATP, is a textbook example of exocytosis.'),
  mc('a21', T, 'Which statement about active transport is FALSE?', [
    'It can move dissolved solutes against their own gradient',
    'It always requires an input of cellular ATP energy',
    'It includes endocytosis, exocytosis, and dedicated pump proteins',
    'It always moves solutes down their gradient, just like passive transport',
  ], 3, 'This directly contradicts the definition of active transport and is therefore the false statement.'),
  mc('a22', T, 'A student argues that since both facilitated diffusion and the sodium-potassium pump use a transport protein, both must require ATP. What is wrong with this?', [
    'Nothing at all is wrong; the argument given is entirely correct',
    'Protein involvement does not decide ATP use; direction relative to the gradient does, and only the pump moves uphill',
    'Facilitated diffusion never actually uses any protein whatsoever',
    'The sodium-potassium pump never actually uses a protein either',
  ], 1, 'Both are protein-mediated, but only the pump moves solutes uphill, which is why only it requires ATP.'),
  mc('a23', T, 'If a cell\'s ATP production were shut down completely, which listed process would be directly disabled first?', [
    'Simple diffusion of oxygen',
    'Osmosis of water',
    'The sodium-potassium pump',
    'Facilitated diffusion of glucose down its gradient',
  ], 2, 'Only the ATP-dependent pump would be directly disabled; the other three are passive and independent of the cell\'s ATP supply.'),
  multi('a24', T, 'Select ALL processes classified as active transport.', [
    'Exocytosis of a hormone',
    'Phagocytosis of a bacterium',
    'The sodium-potassium pump',
    'Facilitated diffusion of amino acids down their gradient',
  ], [0, 1, 2], 'Facilitated diffusion is passive, since it moves solutes downhill with no ATP, despite using a protein.'),
  mc('a25', T, 'Insulin binding a receptor protein, followed by the insulin-receptor complex being engulfed, illustrates', [
    'phagocytosis',
    'receptor-mediated endocytosis',
    'simple diffusion',
    'exocytosis',
  ], 1, 'A hormone binding a specific receptor before being taken in is the defining sequence of receptor-mediated endocytosis.'),
]
