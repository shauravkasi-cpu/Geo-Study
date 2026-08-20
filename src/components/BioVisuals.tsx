import type { ReactNode } from 'react'
import type { BioVisualId } from '../lib/bioUnit1Lesson'

interface BioVisualProps {
  id: BioVisualId
}

export function BioVisual({ id }: BioVisualProps) {
  switch (id) {
    case 'life-list':
      return <LifeListVisual />
    case 'cells':
      return <CellsVisual />
    case 'energy':
      return <EnergyVisual />
    case 'growth':
      return <GrowthVisual />
    case 'homeostasis':
      return <HomeostasisVisual />
    case 'stimulus':
      return <StimulusVisual />
    case 'evolution':
      return <EvolutionVisual />
    case 'virus':
      return <VirusVisual />
    case 'graph':
      return <GraphVisual />
    case 'graph-types':
      return <GraphTypesVisual />
    case 'data-types':
      return <DataTypesVisual />
    case 'observe':
      return <ObserveVisual />
    case 'variables':
      return <VariablesVisual />
    case 'experiment':
      return <ExperimentVisual />
    case 'water':
      return <WaterVisual />
    case 'polar':
      return <PolarVisual />
    case 'hydro':
      return <HydroVisual />
    case 'capillary':
      return <CapillaryVisual />
    case 'surface':
      return <SurfaceVisual />
    case 'specific-heat':
      return <SpecificHeatVisual />
    case 'ice':
      return <IceVisual />
    case 'solvent':
      return <SolventVisual />
    case 'sweat':
      return <SweatVisual />
    case 'ph':
      return <PhVisual />
    case 'organic':
      return <OrganicVisual />
    case 'carbon':
      return <CarbonVisual />
    case 'mono-poly':
      return <MonoPolyVisual />
    case 'anabolic':
    case 'dehydration':
      return <DehydrationVisual />
    case 'catabolic':
    case 'hydrolysis':
      return <HydrolysisVisual />
    case 'carbs':
      return <CarbsVisual />
    case 'poly-carbs':
      return <PolyCarbsVisual />
    case 'lipids':
      return <LipidsVisual />
    case 'fatty-acids':
      return <FattyAcidsVisual />
    case 'phospholipid':
      return <PhospholipidVisual />
    case 'protein':
      return <ProteinVisual />
    case 'protein-levels':
      return <ProteinLevelsVisual />
    case 'nucleic':
      return <NucleicVisual />
    default:
      return null
  }
}

function Scene({ children, caption }: { children: ReactNode; caption: string }) {
  return (
    <div className="bio-visual">
      <div className="bio-visual-stage">{children}</div>
      <p className="bio-visual-caption">{caption}</p>
    </div>
  )
}

function LifeListVisual() {
  const traits = ['Cells', 'Energy', 'Grow', 'Reproduce', 'Homeostasis', 'Respond', 'Evolve']
  return (
    <Scene caption="All 7 must be checked. Missing one = not living.">
      <div className="bio-chip-row">
        {traits.map((trait, i) => (
          <span key={trait} className="bio-chip" style={{ animationDelay: `${i * 0.08}s` }}>
            {trait}
          </span>
        ))}
      </div>
    </Scene>
  )
}

function CellsVisual() {
  return (
    <Scene caption="One cell can be a whole organism. Many cells can team up.">
      <div className="bio-split">
        <div className="bio-split-col">
          <div className="bio-cell bio-cell-solo bio-pop" />
          <span>Unicellular</span>
        </div>
        <div className="bio-split-col">
          <div className="bio-cell-cluster">
            <div className="bio-cell bio-pop" style={{ animationDelay: '0.05s' }} />
            <div className="bio-cell bio-pop" style={{ animationDelay: '0.12s' }} />
            <div className="bio-cell bio-pop" style={{ animationDelay: '0.18s' }} />
            <div className="bio-cell bio-pop" style={{ animationDelay: '0.24s' }} />
          </div>
          <span>Multicellular</span>
        </div>
      </div>
    </Scene>
  )
}

function EnergyVisual() {
  return (
    <Scene caption="Auto = make food. Hetero = eat food.">
      <div className="bio-split">
        <div className="bio-split-col bio-pop">
          <div className="bio-emoji-lg">☀️ → 🌱</div>
          <strong>Autotroph</strong>
        </div>
        <div className="bio-split-col bio-pop" style={{ animationDelay: '0.15s' }}>
          <div className="bio-emoji-lg">🍔 → 🐻</div>
          <strong>Heterotroph</strong>
        </div>
      </div>
    </Scene>
  )
}

function GrowthVisual() {
  return (
    <Scene caption="Growth = bigger. Development = a new life stage.">
      <div className="bio-split">
        <div className="bio-split-col">
          <div className="bio-bar-grow" />
          <span>Growth</span>
        </div>
        <div className="bio-split-col">
          <div className="bio-emoji-lg bio-pop">🐛 → 🦋</div>
          <span>Development</span>
        </div>
      </div>
    </Scene>
  )
}

function HomeostasisVisual() {
  return (
    <Scene caption="Too hot or too cold? The body pulls back to the middle.">
      <div className="bio-thermo">
        <div className="bio-thermo-track">
          <div className="bio-thermo-needle" />
        </div>
        <div className="bio-thermo-labels">
          <span>Cold</span>
          <strong>Stable</strong>
          <span>Hot</span>
        </div>
      </div>
    </Scene>
  )
}

function StimulusVisual() {
  return (
    <Scene caption="Stimulus happens first. Response is what the organism does.">
      <div className="bio-flow">
        <div className="bio-flow-box bio-pop">🔥 Hot stove</div>
        <span className="bio-flow-arrow">→</span>
        <div className="bio-flow-box bio-pop" style={{ animationDelay: '0.2s' }}>
          ✋ Pull away
        </div>
      </div>
    </Scene>
  )
}

function EvolutionVisual() {
  return (
    <Scene caption="Populations change over many generations — not one lifetime.">
      <div className="bio-gen-row">
        {['gen 1', 'gen 2', 'gen 3', 'gen 4'].map((label, i) => (
          <div key={label} className="bio-gen bio-pop" style={{ animationDelay: `${i * 0.12}s` }}>
            <div className="bio-cell" style={{ transform: `scale(${0.75 + i * 0.12})` }} />
            <span>{label}</span>
          </div>
        ))}
      </div>
    </Scene>
  )
}

function VirusVisual() {
  return (
    <Scene caption="A virus is a genetic hitchhiker. No cell. Cannot copy itself alone.">
      <div className="bio-virus-wrap">
        <div className="bio-virus bio-spin-slow">
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className="bio-cell bio-cell-host">host cell</div>
      </div>
    </Scene>
  )
}

function GraphVisual() {
  return (
    <Scene caption="X = what you changed. Y = what you measured.">
      <svg viewBox="0 0 220 140" className="bio-svg" aria-hidden>
        <line x1="30" y1="120" x2="200" y2="120" stroke="currentColor" strokeWidth="2" />
        <line x1="30" y1="120" x2="30" y2="16" stroke="currentColor" strokeWidth="2" />
        <text x="96" y="136" fontSize="11">time (X / IV)</text>
        <text x="4" y="70" fontSize="11" transform="rotate(-90 8 70)">
          height (Y / DV)
        </text>
        <polyline
          className="bio-draw-line"
          fill="none"
          stroke="#16a34a"
          strokeWidth="3"
          points="30,110 70,90 110,70 150,48 190,30"
        />
      </svg>
    </Scene>
  )
}

function GraphTypesVisual() {
  return (
    <Scene caption="Line = over time. Bar = groups. Pie = parts of 100%.">
      <div className="bio-mini-graphs">
        <div className="bio-mini bio-pop">📈 Line</div>
        <div className="bio-mini bio-pop" style={{ animationDelay: '0.1s' }}>
          📊 Bar
        </div>
        <div className="bio-mini bio-pop" style={{ animationDelay: '0.2s' }}>
          🥧 Pie
        </div>
      </div>
    </Scene>
  )
}

function DataTypesVisual() {
  return (
    <Scene caption="Quality words vs number measurements.">
      <div className="bio-split">
        <div className="bio-split-col bio-pop">
          <strong>Qualitative</strong>
          <span>green · sour · large</span>
        </div>
        <div className="bio-split-col bio-pop" style={{ animationDelay: '0.12s' }}>
          <strong>Quantitative</strong>
          <span>7.2 g · 4 ft · 100 mL</span>
        </div>
      </div>
    </Scene>
  )
}

function ObserveVisual() {
  return (
    <Scene caption="Observation = senses. Inference = a guess about why.">
      <div className="bio-flow">
        <div className="bio-flow-box bio-pop">👀 Ground is wet</div>
        <span className="bio-flow-arrow">→</span>
        <div className="bio-flow-box bio-pop" style={{ animationDelay: '0.18s' }}>
          💭 Maybe it rained
        </div>
      </div>
    </Scene>
  )
}

function VariablesVisual() {
  return (
    <Scene caption="If IV changes, then DV changes.">
      <div className="bio-flow">
        <div className="bio-flow-box bio-iv bio-pop">IV · drink</div>
        <span className="bio-flow-arrow">causes</span>
        <div className="bio-flow-box bio-dv bio-pop" style={{ animationDelay: '0.16s' }}>
          DV · race time
        </div>
      </div>
    </Scene>
  )
}

function ExperimentVisual() {
  return (
    <Scene caption="Control gets 0. Everyone else gets the treatment.">
      <div className="bio-bear-row">
        {['0 mg', '100', '200', '400'].map((label, i) => (
          <div key={label} className={`bio-bear ${i === 0 ? 'bio-bear-control' : ''} bio-pop`} style={{ animationDelay: `${i * 0.08}s` }}>
            <span>🐻</span>
            <small>{i === 0 ? 'control' : 'exp.'}</small>
            <strong>{label}</strong>
          </div>
        ))}
      </div>
    </Scene>
  )
}

function WaterVisual() {
  return (
    <Scene caption="Covalent bonds inside one H₂O. Hydrogen bonds between H₂Os.">
      <div className="bio-water-pair">
        <WaterMolecule className="bio-float" />
        <div className="bio-hbond" />
        <WaterMolecule className="bio-float" delay />
      </div>
    </Scene>
  )
}

function WaterMolecule({ className, delay }: { className?: string; delay?: boolean }) {
  return (
    <svg viewBox="0 0 90 70" className={`bio-h2o ${className ?? ''}`} style={delay ? { animationDelay: '0.4s' } : undefined} aria-hidden>
      <circle cx="48" cy="36" r="16" fill="#ef4444" />
      <text x="42" y="41" fontSize="12" fill="#fff">O</text>
      <circle cx="22" cy="18" r="10" fill="#e2e8f0" stroke="#64748b" />
      <text x="17" y="22" fontSize="11">H</text>
      <circle cx="22" cy="54" r="10" fill="#e2e8f0" stroke="#64748b" />
      <text x="17" y="58" fontSize="11">H</text>
    </svg>
  )
}

function PolarVisual() {
  return (
    <Scene caption="Oxygen hogs electrons: O is δ−, hydrogens are δ+.">
      <div className="bio-polar">
        <WaterMolecule />
        <div className="bio-charges">
          <span className="bio-neg">δ−</span>
          <span className="bio-pos">δ+</span>
        </div>
      </div>
    </Scene>
  )
}

function HydroVisual() {
  return (
    <Scene caption="Salt mixes. Oil refuses.">
      <div className="bio-split">
        <div className="bio-split-col bio-pop">
          <strong>Hydrophilic</strong>
          <span>salt · sugar</span>
        </div>
        <div className="bio-split-col bio-pop" style={{ animationDelay: '0.12s' }}>
          <strong>Hydrophobic</strong>
          <span>oil</span>
        </div>
      </div>
    </Scene>
  )
}

function CapillaryVisual() {
  return (
    <Scene caption="Water climbs because it sticks to the tube and to itself.">
      <div className="bio-straw">
        <div className="bio-straw-water" />
      </div>
    </Scene>
  )
}

function SurfaceVisual() {
  return (
    <Scene caption="Cohesion makes a tight “skin” on top of the water.">
      <div className="bio-pond">
        <div className="bio-bug">bug</div>
        <div className="bio-pond-surface" />
      </div>
    </Scene>
  )
}

function SpecificHeatVisual() {
  return (
    <Scene caption="Land heats fast. Water stays calmer.">
      <div className="bio-split">
        <div className="bio-split-col">
          <div className="bio-temp bio-temp-land">hot</div>
          <span>Land</span>
        </div>
        <div className="bio-split-col">
          <div className="bio-temp bio-temp-water">steady</div>
          <span>Pond</span>
        </div>
      </div>
    </Scene>
  )
}

function IceVisual() {
  return (
    <Scene caption="Ice is a lid. Life keeps going underneath.">
      <div className="bio-lake">
        <div className="bio-ice-layer">ice</div>
        <div className="bio-lake-water">🐟</div>
      </div>
    </Scene>
  )
}

function SolventVisual() {
  return (
    <Scene caption="Solvent = water. Solute = the stuff that disappears into it.">
      <div className="bio-beaker">
        <span className="bio-solute bio-solute-a">Na⁺</span>
        <span className="bio-solute bio-solute-b">Cl⁻</span>
        <span className="bio-solute bio-solute-c">sugar</span>
      </div>
    </Scene>
  )
}

function SweatVisual() {
  return (
    <Scene caption="The fastest (hottest) water leaves as gas. Skin cools.">
      <div className="bio-sweat">
        <div className="bio-drop" />
        <div className="bio-drop" />
        <div className="bio-drop" />
        <span>💨 heat leaves</span>
      </div>
    </Scene>
  )
}

function PhVisual() {
  return (
    <Scene caption="Below 7 = acid (H⁺). 7 = neutral. Above 7 = base (OH⁻).">
      <div className="bio-ph">
        <span>0 acid</span>
        <div className="bio-ph-bar">
          <i className="bio-ph-marker" />
        </div>
        <span>14 base</span>
      </div>
    </Scene>
  )
}

function OrganicVisual() {
  return (
    <Scene caption="The four macromolecules of life.">
      <div className="bio-chip-row">
        {['Carbs', 'Lipids', 'Proteins', 'Nucleic acids'].map((item, i) => (
          <span key={item} className="bio-chip bio-chip-green" style={{ animationDelay: `${i * 0.08}s` }}>
            {item}
          </span>
        ))}
      </div>
    </Scene>
  )
}

function CarbonVisual() {
  return (
    <Scene caption="Carbon can grab 4 partners, so it builds wild shapes.">
      <div className="bio-carbon">
        <span>C</span>
        <i />
        <i />
        <i />
        <i />
      </div>
    </Scene>
  )
}

function MonoPolyVisual() {
  return (
    <Scene caption="Bricks become a wall.">
      <div className="bio-flow">
        <div className="bio-mono-row">
          <i />
          <i />
          <i />
        </div>
        <span className="bio-flow-arrow">→</span>
        <div className="bio-polymer" />
      </div>
    </Scene>
  )
}

function DehydrationVisual() {
  return (
    <Scene caption="Join two pieces. Water gets kicked out.">
      <div className="bio-rxn">
        <div className="bio-mono">A–OH</div>
        <div className="bio-mono">H–B</div>
        <span className="bio-flow-arrow">→</span>
        <div className="bio-mono bio-mono-join">A–B</div>
        <div className="bio-water-out">+ H₂O</div>
      </div>
    </Scene>
  )
}

function HydrolysisVisual() {
  return (
    <Scene caption="Add water. The chain splits.">
      <div className="bio-rxn">
        <div className="bio-mono bio-mono-join">A–B</div>
        <div className="bio-water-out">+ H₂O</div>
        <span className="bio-flow-arrow">→</span>
        <div className="bio-mono">A–OH</div>
        <div className="bio-mono">H–B</div>
      </div>
    </Scene>
  )
}

function CarbsVisual() {
  return (
    <Scene caption="One ring = mono. Two = di. A long chain = poly. Energy snack.">
      <div className="bio-rings">
        <div className="bio-ring bio-pop">mono</div>
        <div className="bio-ring bio-pop" style={{ animationDelay: '0.1s' }}>
          di
        </div>
        <div className="bio-ring-chain bio-pop" style={{ animationDelay: '0.2s' }}>
          poly
        </div>
      </div>
    </Scene>
  )
}

function PolyCarbsVisual() {
  return (
    <Scene caption="Starch stores in plants. Glycogen stores in you. Cellulose is a wall.">
      <div className="bio-chip-row">
        {['starch 🥔', 'glycogen 💪', 'cellulose 🌿', 'chitin 🐛'].map((item, i) => (
          <span key={item} className="bio-chip" style={{ animationDelay: `${i * 0.08}s` }}>
            {item}
          </span>
        ))}
      </div>
    </Scene>
  )
}

function LipidsVisual() {
  return (
    <Scene caption="Glycerol can hold three fatty acid tails = triglyceride.">
      <div className="bio-tri">
        <div className="bio-glycerol">glycerol</div>
        <div className="bio-tails">
          <i />
          <i />
          <i />
        </div>
      </div>
    </Scene>
  )
}

function FattyAcidsVisual() {
  return (
    <Scene caption="Straight = saturated/solid. Kinked = unsaturated/liquid.">
      <div className="bio-split">
        <div className="bio-split-col">
          <div className="bio-tail-straight" />
          <span>saturated</span>
        </div>
        <div className="bio-split-col">
          <div className="bio-tail-kink" />
          <span>unsaturated</span>
        </div>
      </div>
    </Scene>
  )
}

function PhospholipidVisual() {
  return (
    <Scene caption="Heads love water. Tails hide. That is a membrane.">
      <div className="bio-bilayer">
        <div className="bio-pl-row bio-pl-top">
          {Array.from({ length: 6 }, (_, i) => (
            <div key={`t${i}`} className="bio-pl" />
          ))}
        </div>
        <div className="bio-pl-row bio-pl-bottom">
          {Array.from({ length: 6 }, (_, i) => (
            <div key={`b${i}`} className="bio-pl" />
          ))}
        </div>
      </div>
    </Scene>
  )
}

function ProteinVisual() {
  return (
    <Scene caption="Amino acids linked by peptide bonds. Shape decides the job.">
      <div className="bio-aa-row">
        {['AA', 'AA', 'AA', 'AA'].map((label, i) => (
          <div key={i} className="bio-aa bio-pop" style={{ animationDelay: `${i * 0.1}s` }}>
            {label}
          </div>
        ))}
      </div>
    </Scene>
  )
}

function ProteinLevelsVisual() {
  return (
    <Scene caption="1 sequence → 2 coils/sheets → 3 blob → 4 team of blobs.">
      <div className="bio-levels">
        <div className="bio-pop">1 · beads</div>
        <div className="bio-pop" style={{ animationDelay: '0.1s' }}>
          2 · coil
        </div>
        <div className="bio-pop" style={{ animationDelay: '0.2s' }}>
          3 · 3D
        </div>
        <div className="bio-pop" style={{ animationDelay: '0.3s' }}>
          4 · subunits
        </div>
      </div>
    </Scene>
  )
}

function NucleicVisual() {
  return (
    <Scene caption="A-T and G-C. A nucleotide is phosphate + sugar + base.">
      <div className="bio-dna">
        <div className="bio-base-pair">
          <b>A</b>
          <i />
          <b>T</b>
        </div>
        <div className="bio-base-pair">
          <b>G</b>
          <i />
          <b>C</b>
        </div>
        <div className="bio-base-pair">
          <b>T</b>
          <i />
          <b>A</b>
        </div>
      </div>
    </Scene>
  )
}
