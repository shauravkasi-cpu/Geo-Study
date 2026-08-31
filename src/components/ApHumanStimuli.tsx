import type { ApHumanStimulusId } from '../lib/apHumanStudy'

const CAPTIONS: Record<ApHumanStimulusId, string> = {
  'income-choropleth': 'Figure 1. Median household income by region',
  'dot-crime': 'Figure 2. Reported thefts in a metropolitan area (1 dot = 10 incidents)',
  'cartogram-pop': 'Figure 3. World population cartogram compared with land area',
  'isoline-temp': 'Figure 4. Average January temperature (°F)',
  'grad-symbol': 'Figure 5. City population shown by proportional symbols',
  'mercator-compare': 'Figure 6. Apparent size of Greenland and Africa on two projections',
  'settlement-pattern': 'Figure 7. Distribution of elementary schools',
  'gis-layers': 'Figure 8. Selected GIS data layers for a store-location study',
  'forest-change': 'Figure 9. Satellite-derived forest cover, 1990 and 2020',
  'hdi-table': 'Table 1. Selected development indicators',
  'sector-chart': 'Figure 10. Percent of labor force by economic sector',
  'core-periphery': 'Figure 11. Wallerstein’s world-systems model (simplified)',
  'dependency-flow': 'Figure 12. Flows in dependency theory',
  'brandt-line': 'Figure 13. The Brandt Line (North–South divide)',
  'gii-table': 'Table 2. Gender Inequality Index and related measures',
  'energy-chart': 'Figure 14. Energy use and renewable share',
}

export function ApHumanStimulus({ id }: { id: ApHumanStimulusId }) {
  return (
    <figure className="aph-figure">
      <div className="aph-figure-frame">{renderStimulus(id)}</div>
      <figcaption className="aph-figure-caption">{CAPTIONS[id]}</figcaption>
    </figure>
  )
}

function renderStimulus(id: ApHumanStimulusId) {
  switch (id) {
    case 'income-choropleth':
      return <IncomeChoropleth />
    case 'dot-crime':
      return <DotCrime />
    case 'cartogram-pop':
      return <CartogramPop />
    case 'isoline-temp':
      return <IsolineTemp />
    case 'grad-symbol':
      return <GradSymbol />
    case 'mercator-compare':
      return <MercatorCompare />
    case 'settlement-pattern':
      return <SettlementPattern />
    case 'gis-layers':
      return <GisLayers />
    case 'forest-change':
      return <ForestChange />
    case 'hdi-table':
      return <HdiTable />
    case 'sector-chart':
      return <SectorChart />
    case 'core-periphery':
      return <CorePeriphery />
    case 'dependency-flow':
      return <DependencyFlow />
    case 'brandt-line':
      return <BrandtLine />
    case 'gii-table':
      return <GiiTable />
    case 'energy-chart':
      return <EnergyChart />
  }
}

function IncomeChoropleth() {
  return (
    <svg viewBox="0 0 420 220" className="aph-svg" aria-hidden>
      <rect x="30" y="20" width="90" height="80" fill="#dbeafe" stroke="#1e3a8a" />
      <text x="75" y="66" textAnchor="middle" fontSize="12">West</text>
      <rect x="120" y="20" width="110" height="80" fill="#1d4ed8" stroke="#1e3a8a" />
      <text x="175" y="66" textAnchor="middle" fontSize="12" fill="#fff">Northeast</text>
      <rect x="30" y="100" width="200" height="90" fill="#60a5fa" stroke="#1e3a8a" />
      <text x="130" y="150" textAnchor="middle" fontSize="12">South</text>
      <rect x="230" y="20" width="120" height="170" fill="#93c5fd" stroke="#1e3a8a" />
      <text x="290" y="110" textAnchor="middle" fontSize="12">Midwest</text>
      <text x="30" y="212" fontSize="11" fill="#475569">Darker = higher median income</text>
      <rect x="360" y="30" width="14" height="14" fill="#1d4ed8" />
      <text x="378" y="41" fontSize="10">High</text>
      <rect x="360" y="52" width="14" height="14" fill="#60a5fa" />
      <text x="378" y="63" fontSize="10">Mid</text>
      <rect x="360" y="74" width="14" height="14" fill="#dbeafe" />
      <text x="378" y="85" fontSize="10">Low</text>
    </svg>
  )
}

function DotCrime() {
  const dots = [
    [70, 70], [78, 76], [84, 68], [90, 80], [74, 86], [96, 74], [82, 90], [88, 64],
    [160, 50], [210, 140], [250, 60], [300, 150], [40, 150], [320, 40],
  ]
  return (
    <svg viewBox="0 0 380 200" className="aph-svg" aria-hidden>
      <rect x="16" y="16" width="348" height="168" fill="#f8fafc" stroke="#94a3b8" />
      <rect x="56" y="48" width="70" height="70" fill="#e2e8f0" />
      <text x="91" y="88" textAnchor="middle" fontSize="10" fill="#475569">Downtown</text>
      {dots.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="4" fill="#0f172a" />
      ))}
    </svg>
  )
}

function CartogramPop() {
  return (
    <svg viewBox="0 0 420 210" className="aph-svg" aria-hidden>
      <text x="20" y="22" fontSize="12" fontWeight="700">True land area</text>
      <rect x="20" y="32" width="70" height="50" fill="#cbd5e1" stroke="#334155" />
      <text x="55" y="62" textAnchor="middle" fontSize="10">Russia</text>
      <rect x="100" y="48" width="36" height="34" fill="#cbd5e1" stroke="#334155" />
      <text x="118" y="68" textAnchor="middle" fontSize="9">China</text>
      <rect x="146" y="54" width="28" height="28" fill="#cbd5e1" stroke="#334155" />
      <text x="160" y="71" textAnchor="middle" fontSize="8">India</text>
      <text x="220" y="22" fontSize="12" fontWeight="700">Population cartogram</text>
      <rect x="220" y="50" width="28" height="32" fill="#f59e0b" stroke="#92400e" />
      <text x="234" y="70" textAnchor="middle" fontSize="8">Rus.</text>
      <rect x="258" y="32" width="70" height="60" fill="#f59e0b" stroke="#92400e" />
      <text x="293" y="66" textAnchor="middle" fontSize="10">China</text>
      <rect x="336" y="36" width="64" height="56" fill="#f59e0b" stroke="#92400e" />
      <text x="368" y="68" textAnchor="middle" fontSize="10">India</text>
      <text x="20" y="198" fontSize="11" fill="#475569">Country size is scaled to population, not square miles.</text>
    </svg>
  )
}

function IsolineTemp() {
  return (
    <svg viewBox="0 0 380 210" className="aph-svg" aria-hidden>
      <ellipse cx="190" cy="110" rx="150" ry="80" fill="none" stroke="#1d4ed8" strokeWidth="2" />
      <ellipse cx="190" cy="110" rx="105" ry="54" fill="none" stroke="#2563eb" strokeWidth="2" />
      <ellipse cx="190" cy="110" rx="60" ry="30" fill="none" stroke="#dc2626" strokeWidth="2" />
      <text x="190" y="114" textAnchor="middle" fontSize="12" fontWeight="700">50°</text>
      <text x="190" y="66" textAnchor="middle" fontSize="11">40°</text>
      <text x="190" y="38" textAnchor="middle" fontSize="11">30°</text>
      <text x="20" y="200" fontSize="11" fill="#475569">Lines connect places with the same temperature.</text>
    </svg>
  )
}

function GradSymbol() {
  return (
    <svg viewBox="0 0 380 200" className="aph-svg" aria-hidden>
      <circle cx="80" cy="110" r="46" fill="#93c5fd" stroke="#1e3a8a" />
      <text x="80" y="114" textAnchor="middle" fontSize="11">8.4M</text>
      <circle cx="190" cy="120" r="28" fill="#93c5fd" stroke="#1e3a8a" />
      <text x="190" y="124" textAnchor="middle" fontSize="10">2.7M</text>
      <circle cx="280" cy="128" r="16" fill="#93c5fd" stroke="#1e3a8a" />
      <text x="280" y="132" textAnchor="middle" fontSize="9">0.8M</text>
      <circle cx="340" cy="132" r="10" fill="#93c5fd" stroke="#1e3a8a" />
      <text x="20" y="190" fontSize="11" fill="#475569">Larger circle = larger city population</text>
    </svg>
  )
}

function MercatorCompare() {
  return (
    <svg viewBox="0 0 420 210" className="aph-svg" aria-hidden>
      <text x="30" y="24" fontSize="12" fontWeight="700">Mercator</text>
      <rect x="40" y="40" width="70" height="86" fill="#86efac" stroke="#166534" />
      <text x="75" y="86" textAnchor="middle" fontSize="10">Africa</text>
      <rect x="130" y="36" width="62" height="94" fill="#fda4af" stroke="#9f1239" />
      <text x="161" y="86" textAnchor="middle" fontSize="10">Greenland</text>
      <text x="230" y="24" fontSize="12" fontWeight="700">Gall-Peters</text>
      <rect x="240" y="48" width="96" height="78" fill="#86efac" stroke="#166534" />
      <text x="288" y="90" textAnchor="middle" fontSize="10">Africa</text>
      <rect x="348" y="70" width="40" height="34" fill="#fda4af" stroke="#9f1239" />
      <text x="368" y="90" textAnchor="middle" fontSize="8">Grn.</text>
      <text x="20" y="198" fontSize="11" fill="#475569">True area: Africa is about 14 times larger than Greenland.</text>
    </svg>
  )
}

function SettlementPattern() {
  return (
    <svg viewBox="0 0 420 190" className="aph-svg" aria-hidden>
      <text x="40" y="22" fontSize="12" fontWeight="700">City A</text>
      <rect x="20" y="32" width="170" height="130" fill="#f8fafc" stroke="#94a3b8" />
      {[
        [70, 80], [82, 86], [90, 74], [78, 96], [96, 90], [86, 70],
      ].map(([x, y], i) => (
        <circle key={`a${i}`} cx={x} cy={y} r="5" fill="#0f172a" />
      ))}
      <text x="250" y="22" fontSize="12" fontWeight="700">City B</text>
      <rect x="220" y="32" width="170" height="130" fill="#f8fafc" stroke="#94a3b8" />
      {[
        [250, 55], [340, 50], [280, 120], [360, 130], [300, 80], [240, 140],
      ].map(([x, y], i) => (
        <circle key={`b${i}`} cx={x} cy={y} r="5" fill="#0f172a" />
      ))}
    </svg>
  )
}

function GisLayers() {
  return (
    <svg viewBox="0 0 400 210" className="aph-svg" aria-hidden>
      <rect x="70" y="28" width="220" height="36" fill="#fde68a" stroke="#b45309" />
      <text x="180" y="51" textAnchor="middle" fontSize="12">Household income</text>
      <rect x="82" y="68" width="220" height="36" fill="#bfdbfe" stroke="#1d4ed8" />
      <text x="192" y="91" textAnchor="middle" fontSize="12">Traffic / road network</text>
      <rect x="94" y="108" width="220" height="36" fill="#bbf7d0" stroke="#15803d" />
      <text x="204" y="131" textAnchor="middle" fontSize="12">Zoning / land use</text>
      <rect x="106" y="148" width="220" height="36" fill="#fecaca" stroke="#b91c1c" />
      <text x="216" y="171" textAnchor="middle" fontSize="12">Competing stores</text>
    </svg>
  )
}

function ForestChange() {
  return (
    <svg viewBox="0 0 420 190" className="aph-svg" aria-hidden>
      <text x="70" y="24" fontSize="12" fontWeight="700">1990</text>
      <rect x="20" y="36" width="170" height="120" fill="#166534" />
      <rect x="130" y="100" width="50" height="56" fill="#a3a3a3" />
      <text x="280" y="24" fontSize="12" fontWeight="700">2020</text>
      <rect x="220" y="36" width="170" height="120" fill="#a3a3a3" />
      <rect x="220" y="36" width="70" height="50" fill="#166534" />
      <text x="20" y="178" fontSize="11" fill="#475569">Dark green = forest. Gray = cleared land.</text>
    </svg>
  )
}

function HdiTable() {
  return (
    <table className="aph-table">
      <thead>
        <tr>
          <th>Country</th>
          <th>HDI</th>
          <th>GNI per capita</th>
          <th>Life exp.</th>
          <th>TFR</th>
          <th>IMR</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Norway</td>
          <td>0.96</td>
          <td>$80,000</td>
          <td>83</td>
          <td>1.5</td>
          <td>2</td>
        </tr>
        <tr>
          <td>China</td>
          <td>0.79</td>
          <td>$20,000</td>
          <td>78</td>
          <td>1.2</td>
          <td>6</td>
        </tr>
        <tr>
          <td>India</td>
          <td>0.64</td>
          <td>$7,000</td>
          <td>70</td>
          <td>2.0</td>
          <td>26</td>
        </tr>
        <tr>
          <td>Niger</td>
          <td>0.40</td>
          <td>$1,300</td>
          <td>62</td>
          <td>6.7</td>
          <td>60</td>
        </tr>
      </tbody>
    </table>
  )
}

function SectorChart() {
  const rows = [
    { name: 'United States', p: 2, s: 18, t: 80 },
    { name: 'Country X', p: 58, s: 16, t: 26 },
  ]
  return (
    <div className="aph-bars">
      {rows.map((row) => (
        <div key={row.name} className="aph-bar-row">
          <p className="aph-bar-label">{row.name}</p>
          <div className="aph-bar-track">
            <span className="aph-bar-p" style={{ width: `${row.p}%` }} />
            <span className="aph-bar-s" style={{ width: `${row.s}%` }} />
            <span className="aph-bar-t" style={{ width: `${row.t}%` }} />
          </div>
          <p className="aph-bar-nums">
            P {row.p}% · S {row.s}% · T+ {row.t}%
          </p>
        </div>
      ))}
      <p className="aph-bar-legend">P = primary · S = secondary · T+ = tertiary and above</p>
    </div>
  )
}

function CorePeriphery() {
  return (
    <svg viewBox="0 0 420 210" className="aph-svg" aria-hidden>
      <circle cx="210" cy="105" r="88" fill="#fecaca" stroke="#991b1b" />
      <circle cx="210" cy="105" r="56" fill="#fde68a" stroke="#92400e" />
      <circle cx="210" cy="105" r="26" fill="#86efac" stroke="#166534" />
      <text x="210" y="109" textAnchor="middle" fontSize="11" fontWeight="700">Core</text>
      <text x="210" y="62" textAnchor="middle" fontSize="11">Semi-periphery</text>
      <text x="210" y="28" textAnchor="middle" fontSize="11">Periphery</text>
      <text x="16" y="198" fontSize="11" fill="#475569">US, Germany · China, Brazil, Mexico · Kenya, Peru</text>
    </svg>
  )
}

function DependencyFlow() {
  return (
    <svg viewBox="0 0 420 190" className="aph-svg" aria-hidden>
      <rect x="20" y="70" width="110" height="50" fill="#fecaca" stroke="#991b1b" />
      <text x="75" y="100" textAnchor="middle" fontSize="12">Periphery</text>
      <rect x="155" y="70" width="110" height="50" fill="#fde68a" stroke="#92400e" />
      <text x="210" y="100" textAnchor="middle" fontSize="11">Semi-periph.</text>
      <rect x="290" y="70" width="110" height="50" fill="#86efac" stroke="#166534" />
      <text x="345" y="100" textAnchor="middle" fontSize="12">Core</text>
      <path d="M130 80 H290" stroke="#0f172a" markerEnd="url(#arr)" />
      <text x="210" y="68" textAnchor="middle" fontSize="10">cheap labor &amp; raw materials</text>
      <path d="M290 110 H130" stroke="#0f172a" markerEnd="url(#arr2)" />
      <text x="210" y="140" textAnchor="middle" fontSize="10">expensive consumer goods</text>
      <defs>
        <marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6" fill="#0f172a" />
        </marker>
        <marker id="arr2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6" fill="#0f172a" />
        </marker>
      </defs>
    </svg>
  )
}

function BrandtLine() {
  return (
    <svg viewBox="0 0 420 200" className="aph-svg" aria-hidden>
      <rect x="20" y="20" width="380" height="80" fill="#93c5fd" />
      <text x="210" y="66" textAnchor="middle" fontSize="14" fontWeight="700">MDCs — “North”</text>
      <path d="M20 100 C 140 88, 250 120, 400 100" fill="none" stroke="#0f172a" strokeWidth="3" strokeDasharray="8 6" />
      <rect x="20" y="100" width="380" height="80" fill="#fde68a" />
      <text x="210" y="148" textAnchor="middle" fontSize="14" fontWeight="700">LDCs — “South”</text>
      <text x="20" y="194" fontSize="11" fill="#475569">Dashed line = Brandt Line (generalization, not a border)</text>
    </svg>
  )
}

function GiiTable() {
  return (
    <table className="aph-table">
      <thead>
        <tr>
          <th>Country</th>
          <th>GII</th>
          <th>HDI</th>
          <th>Women in parliament</th>
          <th>Maternal deaths</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Germany</td>
          <td>0.07</td>
          <td>0.95</td>
          <td>High</td>
          <td>Very low</td>
        </tr>
        <tr>
          <td>Mexico</td>
          <td>0.30</td>
          <td>0.78</td>
          <td>Medium</td>
          <td>Medium</td>
        </tr>
        <tr>
          <td>Yemen</td>
          <td>0.77</td>
          <td>0.46</td>
          <td>Very low</td>
          <td>High</td>
        </tr>
      </tbody>
    </table>
  )
}

function EnergyChart() {
  return (
    <table className="aph-table">
      <thead>
        <tr>
          <th>Country</th>
          <th>Energy use per person</th>
          <th>Trend, last 30 years</th>
          <th>Share from renewables</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>United States</td>
          <td>Very high</td>
          <td>High but relatively stable</td>
          <td>Moderate and rising</td>
        </tr>
        <tr>
          <td>China</td>
          <td>High and rising</td>
          <td>Rapid increase</td>
          <td>Rising from a lower base</td>
        </tr>
        <tr>
          <td>Country Y (LDC)</td>
          <td>Low</td>
          <td>Slow increase</td>
          <td>Low (except hydro where available)</td>
        </tr>
        <tr>
          <td>Iceland</td>
          <td>High</td>
          <td>Stable</td>
          <td>Very high (geothermal)</td>
        </tr>
      </tbody>
    </table>
  )
}
