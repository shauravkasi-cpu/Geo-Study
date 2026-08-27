import type { ReactElement } from 'react'
import type { BioStructureId } from '../lib/bioQuiz'

interface BioStructureProps {
  id: BioStructureId
}

const SVG = {
  className: 'bio-struct-svg',
  viewBox: '0 0 280 160',
} as const

function Ring({ cx, cy, r = 22 }: { cx: number; cy: number; r?: number }) {
  return <polygon points={hexPoints(cx, cy, r)} fill="#fef3c7" stroke="#b45309" strokeWidth="2" />
}

function hexPoints(cx: number, cy: number, r: number) {
  return Array.from({ length: 6 }, (_, i) => {
    const angle = (Math.PI / 180) * (60 * i - 30)
    return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`
  }).join(' ')
}

function Zigzag({
  x,
  y,
  length = 7,
  kinkAt,
}: {
  x: number
  y: number
  length?: number
  kinkAt?: number
}) {
  const pts: string[] = []
  let px = x
  let py = y
  for (let i = 0; i < length; i++) {
    pts.push(`${px},${py}`)
    px += 12
    py += i % 2 === 0 ? -8 : 8
    if (kinkAt === i) py += 10
  }
  return <polyline points={pts.join(' ')} fill="none" stroke="#334155" strokeWidth="2.4" />
}

function WaterMol({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r="16" fill="#ef4444" />
      <text x={x} y={y + 5} textAnchor="middle" fontSize="12" fill="#fff" fontWeight="700">
        O
      </text>
      <circle cx={x - 22} cy={y - 16} r="10" fill="#e2e8f0" stroke="#64748b" />
      <text x={x - 22} y={y - 12} textAnchor="middle" fontSize="11">
        H
      </text>
      <circle cx={x - 22} cy={y + 16} r="10" fill="#e2e8f0" stroke="#64748b" />
      <text x={x - 22} y={y + 20} textAnchor="middle" fontSize="11">
        H
      </text>
    </g>
  )
}

function WaterPolar() {
  return (
    <svg {...SVG} aria-hidden>
      <WaterMol x={150} y={80} />
      <text x="178" y="70" fontSize="16" fill="#dc2626" fontWeight="700">
        δ−
      </text>
      <text x="90" y="48" fontSize="16" fill="#2563eb" fontWeight="700">
        δ+
      </text>
      <text x="90" y="124" fontSize="16" fill="#2563eb" fontWeight="700">
        δ+
      </text>
    </svg>
  )
}

function WaterHbonds() {
  return (
    <svg {...SVG} aria-hidden>
      <WaterMol x={90} y={80} />
      <WaterMol x={210} y={80} />
      <line x1="108" y1="64" x2="176" y2="64" stroke="#38bdf8" strokeWidth="3" strokeDasharray="5 5" />
      <text x="140" y="52" textAnchor="middle" fontSize="11" fill="#0284c7">
        H-bond
      </text>
    </svg>
  )
}

function Glucose() {
  return (
    <svg {...SVG} aria-hidden>
      <Ring cx={140} cy={88} r={32} />
      <text x="140" y="94" textAnchor="middle" fontSize="13" fill="#92400e" fontWeight="700">
        O
      </text>
      <text x="140" y="38" textAnchor="middle" fontSize="12">
        CH₂OH
      </text>
      <line x1="140" y1="56" x2="140" y2="44" stroke="#b45309" strokeWidth="2" />
      <text x="178" y="78" fontSize="12">
        OH
      </text>
      <text x="92" y="118" fontSize="12">
        OH
      </text>
    </svg>
  )
}

function Disaccharide() {
  return (
    <svg {...SVG} aria-hidden>
      <Ring cx={95} cy={88} />
      <Ring cx={185} cy={88} />
      <line x1="117" y1="88" x2="163" y2="88" stroke="#b45309" strokeWidth="3" />
      <circle cx="140" cy="88" r="7" fill="#fff" stroke="#b45309" strokeWidth="2" />
      <text x="140" y="92" textAnchor="middle" fontSize="10" fill="#92400e">
        O
      </text>
      <text x="140" y="128" textAnchor="middle" fontSize="11" fill="#92400e">
        glycosidic linkage
      </text>
    </svg>
  )
}

function Polysaccharide() {
  return (
    <svg {...SVG} aria-hidden>
      {[55, 115, 175, 235].map((cx) => (
        <g key={cx}>
          <Ring cx={cx} cy={80} r={20} />
        </g>
      ))}
      <line x1="75" y1="80" x2="95" y2="80" stroke="#b45309" strokeWidth="2" />
      <line x1="135" y1="80" x2="155" y2="80" stroke="#b45309" strokeWidth="2" />
      <line x1="195" y1="80" x2="215" y2="80" stroke="#b45309" strokeWidth="2" />
    </svg>
  )
}

function AminoAcid() {
  return (
    <svg {...SVG} aria-hidden>
      <text x="36" y="88" fontSize="16" fontWeight="700" fill="#2563eb">
        H₂N
      </text>
      <line x1="78" y1="82" x2="108" y2="82" stroke="#334155" strokeWidth="2" />
      <circle cx="128" cy="82" r="14" fill="#f8fafc" stroke="#334155" strokeWidth="2" />
      <text x="128" y="87" textAnchor="middle" fontSize="14" fontWeight="700">
        C
      </text>
      <line x1="128" y1="68" x2="128" y2="42" stroke="#334155" strokeWidth="2" />
      <rect x="108" y="18" width="40" height="22" rx="6" fill="#fde68a" stroke="#b45309" />
      <text x="128" y="34" textAnchor="middle" fontSize="13" fontWeight="700">
        R
      </text>
      <line x1="128" y1="96" x2="128" y2="118" stroke="#334155" strokeWidth="2" />
      <text x="128" y="136" textAnchor="middle" fontSize="14">
        H
      </text>
      <line x1="142" y1="82" x2="172" y2="82" stroke="#334155" strokeWidth="2" />
      <text x="178" y="88" fontSize="16" fontWeight="700" fill="#dc2626">
        COOH
      </text>
    </svg>
  )
}

function Dipeptide() {
  return (
    <svg {...SVG} aria-hidden>
      <rect x="18" y="58" width="70" height="44" rx="8" fill="#dbeafe" stroke="#2563eb" />
      <text x="53" y="85" textAnchor="middle" fontSize="12">
        AA 1
      </text>
      <line x1="88" y1="80" x2="122" y2="80" stroke="#7c3aed" strokeWidth="4" />
      <text x="105" y="70" textAnchor="middle" fontSize="11" fill="#6d28d9">
        peptide
      </text>
      <rect x="122" y="58" width="70" height="44" rx="8" fill="#dbeafe" stroke="#2563eb" />
      <text x="157" y="85" textAnchor="middle" fontSize="12">
        AA 2
      </text>
      <text x="210" y="86" fontSize="13" fill="#0284c7">
        + H₂O
      </text>
    </svg>
  )
}

function Glycerol() {
  return (
    <svg {...SVG} aria-hidden>
      {[48, 80, 112].map((y, i) => (
        <g key={y}>
          <circle cx="120" cy={y} r="12" fill="#e2e8f0" stroke="#334155" strokeWidth="2" />
          <text x="120" y={y + 4} textAnchor="middle" fontSize="11">
            C
          </text>
          <text x="148" y={y + 5} fontSize="13" fill="#dc2626">
            OH
          </text>
          {i < 2 && <line x1="120" y1={y + 12} x2="120" y2={y + 20} stroke="#334155" strokeWidth="2" />}
        </g>
      ))}
    </svg>
  )
}

function Triglyceride() {
  return (
    <svg {...SVG} aria-hidden>
      <rect x="36" y="36" width="44" height="90" rx="8" fill="#bbf7d0" stroke="#15803d" />
      <text x="58" y="84" textAnchor="middle" fontSize="11">
        glycerol
      </text>
      {[48, 80, 112].map((y) => (
        <g key={y}>
          <line x1="80" y1={y} x2="108" y2={y} stroke="#15803d" strokeWidth="2" />
          <Zigzag x={108} y={y} />
        </g>
      ))}
    </svg>
  )
}

function Phospholipid() {
  return (
    <svg {...SVG} aria-hidden>
      <circle cx="70" cy="80" r="22" fill="#38bdf8" stroke="#0369a1" strokeWidth="2" />
      <text x="70" y="76" textAnchor="middle" fontSize="11" fill="#0f172a" fontWeight="700">
        P
      </text>
      <text x="70" y="92" textAnchor="middle" fontSize="9" fill="#0f172a">
        head
      </text>
      <rect x="92" y="62" width="36" height="36" rx="6" fill="#bbf7d0" stroke="#15803d" />
      <Zigzag x={136} y={68} length={8} />
      <Zigzag x={136} y={96} length={8} kinkAt={3} />
    </svg>
  )
}

function Steroid() {
  return (
    <svg {...SVG} aria-hidden>
      <Ring cx={110} cy={78} r={24} />
      <Ring cx={152} cy={78} r={24} />
      <Ring cx={110} cy={118} r={24} />
      <polygon
        points="164,102 186,88 208,102 198,128 174,128"
        fill="#fef3c7"
        stroke="#b45309"
        strokeWidth="2"
      />
    </svg>
  )
}

function SatFa() {
  return (
    <svg {...SVG} aria-hidden>
      <text x="24" y="86" fontSize="14" fontWeight="700" fill="#dc2626">
        HOOC
      </text>
      <Zigzag x={78} y={80} length={12} />
    </svg>
  )
}

function UnsatFa() {
  return (
    <svg {...SVG} aria-hidden>
      <text x="24" y="86" fontSize="14" fontWeight="700" fill="#dc2626">
        HOOC
      </text>
      <Zigzag x={78} y={72} length={12} kinkAt={5} />
      <text x="148" y="48" fontSize="12" fill="#7c3aed">
        C=C
      </text>
    </svg>
  )
}

function FattyCompare() {
  return (
    <svg {...SVG} aria-hidden>
      <text x="24" y="48" fontSize="12">
        A
      </text>
      <Zigzag x={48} y={44} length={10} />
      <text x="24" y="108" fontSize="12">
        B
      </text>
      <Zigzag x={48} y={100} length={10} kinkAt={4} />
    </svg>
  )
}

function Nucleotide() {
  return (
    <svg {...SVG} aria-hidden>
      <circle cx="58" cy="80" r="22" fill="#facc15" stroke="#a16207" strokeWidth="2" />
      <text x="58" y="85" textAnchor="middle" fontSize="13" fontWeight="700">
        P
      </text>
      <polygon points="118,48 148,66 148,98 118,116 88,98 88,66" fill="#fdba74" stroke="#c2410c" strokeWidth="2" />
      <text x="118" y="86" textAnchor="middle" fontSize="11">
        sugar
      </text>
      <rect x="168" y="58" width="70" height="44" rx="8" fill="#c4b5fd" stroke="#6d28d9" strokeWidth="2" />
      <text x="203" y="85" textAnchor="middle" fontSize="12">
        base
      </text>
    </svg>
  )
}

function Dna() {
  return (
    <svg {...SVG} aria-hidden>
      <path d="M70 30 C 70 70, 210 50, 210 90 C 210 130, 70 110, 70 150" fill="none" stroke="#2563eb" strokeWidth="4" />
      <path d="M210 30 C 210 70, 70 50, 70 90 C 70 130, 210 110, 210 150" fill="none" stroke="#dc2626" strokeWidth="4" />
      <line x1="92" y1="55" x2="188" y2="55" stroke="#64748b" strokeWidth="2" />
      <line x1="80" y1="80" x2="200" y2="80" stroke="#64748b" strokeWidth="2" />
      <line x1="92" y1="105" x2="188" y2="105" stroke="#64748b" strokeWidth="2" />
      <text x="128" y="76" fontSize="11">
        A–T
      </text>
      <text x="128" y="101" fontSize="11">
        G–C
      </text>
    </svg>
  )
}

function Dehydration() {
  return (
    <svg {...SVG} aria-hidden>
      <rect x="16" y="58" width="70" height="40" rx="8" fill="#fef3c7" stroke="#b45309" />
      <text x="51" y="83" textAnchor="middle" fontSize="12">
        A–OH
      </text>
      <rect x="96" y="58" width="70" height="40" rx="8" fill="#fef3c7" stroke="#b45309" />
      <text x="131" y="83" textAnchor="middle" fontSize="12">
        H–B
      </text>
      <text x="176" y="82" fontSize="18">
        →
      </text>
      <rect x="198" y="50" width="64" height="32" rx="8" fill="#bbf7d0" stroke="#15803d" />
      <text x="230" y="71" textAnchor="middle" fontSize="12">
        A–B
      </text>
      <text x="230" y="108" textAnchor="middle" fontSize="12" fill="#0284c7">
        + H₂O
      </text>
    </svg>
  )
}

function Hydrolysis() {
  return (
    <svg {...SVG} aria-hidden>
      <rect x="16" y="50" width="64" height="32" rx="8" fill="#bbf7d0" stroke="#15803d" />
      <text x="48" y="71" textAnchor="middle" fontSize="12">
        A–B
      </text>
      <text x="48" y="108" textAnchor="middle" fontSize="12" fill="#0284c7">
        + H₂O
      </text>
      <text x="92" y="82" fontSize="18">
        →
      </text>
      <rect x="118" y="58" width="70" height="40" rx="8" fill="#fef3c7" stroke="#b45309" />
      <text x="153" y="83" textAnchor="middle" fontSize="12">
        A–OH
      </text>
      <rect x="198" y="58" width="64" height="40" rx="8" fill="#fef3c7" stroke="#b45309" />
      <text x="230" y="83" textAnchor="middle" fontSize="12">
        H–B
      </text>
    </svg>
  )
}

const MAP: Record<BioStructureId, () => ReactElement> = {
  'water-polar': WaterPolar,
  'water-hbonds': WaterHbonds,
  glucose: Glucose,
  disaccharide: Disaccharide,
  polysaccharide: Polysaccharide,
  'amino-acid': AminoAcid,
  dipeptide: Dipeptide,
  triglyceride: Triglyceride,
  phospholipid: Phospholipid,
  steroid: Steroid,
  'sat-fa': SatFa,
  'unsat-fa': UnsatFa,
  glycerol: Glycerol,
  nucleotide: Nucleotide,
  dna: Dna,
  dehydration: Dehydration,
  hydrolysis: Hydrolysis,
  'fatty-compare': FattyCompare,
}

export function BioStructure({ id }: BioStructureProps) {
  const Diagram = MAP[id]
  return (
    <div className="bio-struct">
      <Diagram />
    </div>
  )
}
