import { circleFig, mc, typed, type GeoMathPracticeQuestion } from './geoMathQuiz'

const C = 'central' as const
const I = 'inscribed' as const

function pts(list: [string, number, number?][]) {
  return list.map(([id, deg, dist]) => (dist == null ? { id, deg } : { id, deg, dist }))
}

export const CENTRAL_QUESTIONS: GeoMathPracticeQuestion[] = [
  mc(
    'c1',
    C,
    'Find the measure of arc AB. The central angle ∠AOB is marked.',
    ['70°', '35°', '140°', '110°'],
    0,
    'A central angle is equal to its intercepted arc, so m arc AB = 70°.',
    {
      figure: circleFig({
        points: pts([['A', 20], ['B', 90]]),
        lines: [['O', 'A'], ['O', 'B']],
        angleLabels: [{ vertex: 'O', from: 'A', to: 'B', text: '70°' }],
      }),
    },
  ),
  typed(
    'c2',
    C,
    'Find the measure of central angle ∠AOB. Arc AB is marked. Do not include the degree symbol.',
    ['112'],
    'A central angle has the same measure as its intercepted arc.',
    {
      prefix: 'm∠AOB =',
      unit: '°',
      value: 112,
      tolerance: 0.1,
      figure: circleFig({
        points: pts([['A', 200], ['B', 312]]),
        lines: [['O', 'A'], ['O', 'B']],
        arcLabels: [{ from: 'A', to: 'B', text: '112°' }],
      }),
    },
  ),
  mc(
    'c3',
    C,
    'AB is a diameter. Find m arc AC.',
    ['50°', '100°', '130°', '80°'],
    0,
    '∠AOC is a central angle, so it equals arc AC. m arc AC = 50°.',
    {
      figure: circleFig({
        points: pts([['A', 180], ['B', 0], ['C', 130]]),
        lines: [['A', 'B'], ['O', 'C']],
        angleLabels: [{ vertex: 'O', from: 'A', to: 'C', text: '50°' }],
      }),
    },
  ),
  mc(
    'c4',
    C,
    'AB is a diameter. Find m arc CB.',
    ['130°', '50°', '180°', '65°'],
    0,
    'A diameter intercepts a semicircle, so m arc AB = 180°. Then m arc CB = 180° − 50° = 130°.',
    {
      figure: circleFig({
        points: pts([['A', 180], ['B', 0], ['C', 130]]),
        lines: [['A', 'B'], ['O', 'C']],
        angleLabels: [{ vertex: 'O', from: 'A', to: 'C', text: '50°' }],
      }),
    },
  ),
  typed(
    'c5',
    C,
    'Two diameters intersect at the center. Find the measure of the vertical angle to the 38° angle.',
    ['38'],
    'Vertical angles are congruent, so the opposite angle is also 38°.',
    {
      prefix: 'm∠ =',
      unit: '°',
      value: 38,
      figure: circleFig({
        points: pts([['A', 20], ['B', 200], ['C', 110], ['D', 290]]),
        lines: [['A', 'B'], ['C', 'D']],
        angleLabels: [{ vertex: 'O', from: 'A', to: 'C', text: '38°' }],
      }),
    },
  ),
  mc(
    'c6',
    C,
    'Two diameters intersect. If one central angle is 38°, what is an adjacent central angle?',
    ['142°', '38°', '76°', '52°'],
    0,
    'Adjacent angles on a straight line (the diameter) add to 180°. 180° − 38° = 142°.',
    {
      figure: circleFig({
        points: pts([['A', 20], ['B', 200], ['C', 110], ['D', 290]]),
        lines: [['A', 'B'], ['C', 'D']],
        angleLabels: [{ vertex: 'O', from: 'A', to: 'C', text: '38°' }],
      }),
    },
  ),
  mc(
    'c7',
    C,
    'Find m arc ABC, the major arc from A through B to C.',
    ['250°', '110°', '70°', '180°'],
    0,
    'Minor arc AC is 110°, so the major arc ABC going the long way is 360° − 110° = 250°.',
    {
      figure: circleFig({
        points: pts([['A', 10], ['B', 80], ['C', 120]]),
        lines: [['O', 'A'], ['O', 'C']],
        angleLabels: [{ vertex: 'O', from: 'A', to: 'C', text: '110°' }],
      }),
    },
  ),
  mc(
    'c8',
    C,
    'Name the arc intercepted by central angle ∠POQ.',
    ['arc PQ', 'arc PO', 'arc OQ', 'arc QOP'],
    0,
    'A central angle intercepts the arc between its two sides on the circle: arc PQ.',
    {
      figure: circleFig({
        points: pts([['P', 40], ['Q', 150]]),
        lines: [['O', 'P'], ['O', 'Q']],
        angleLabels: [{ vertex: 'O', from: 'P', to: 'Q', text: '∠POQ' }],
      }),
    },
  ),
  typed(
    'c9',
    C,
    'Name the central angle that intercepts arc RS. Type the angle name like QRS or ROS.',
    ['ros', 'sor', '∠ros', 'angle ros'],
    'The central angle of an arc has its vertex at the center and sides through the arc’s endpoints.',
    {
      prefix: 'central angle',
      figure: circleFig({
        points: pts([['R', 210], ['S', 300]]),
        lines: [['O', 'R'], ['O', 'S']],
        arcLabels: [{ from: 'R', to: 'S', text: 'arc RS' }],
      }),
    },
  ),
  mc(
    'c10',
    C,
    'Congruent chords intercept congruent arcs. If chord AB ≅ chord CD and m arc AB = 84°, find m arc CD.',
    ['84°', '42°', '96°', '168°'],
    0,
    'In the same circle, congruent chords intercept congruent arcs.',
    {
      figure: circleFig({
        points: pts([['A', 20], ['B', 100], ['C', 200], ['D', 280]]),
        lines: [['A', 'B'], ['C', 'D']],
        arcLabels: [{ from: 'A', to: 'B', text: '84°' }],
        lengthLabels: [
          { from: 'A', to: 'B', text: '8' },
          { from: 'C', to: 'D', text: '8' },
        ],
      }),
    },
  ),
  mc(
    'c11',
    C,
    'A radius is perpendicular to a chord and bisects the chord. If the whole chord is 18, how long is each half?',
    ['9', '18', '36', '6'],
    0,
    'A radius (or diameter) perpendicular to a chord bisects the chord.',
    {
      figure: circleFig({
        points: pts([['A', 40], ['B', 140], ['M', 90, 0.55]]),
        lines: [['A', 'B'], ['O', 'M']],
        lengthLabels: [{ from: 'A', to: 'B', text: '18' }],
      }),
    },
  ),
  typed(
    'c12',
    C,
    'Arc AB is 75° and arc BC is 40°. Find m arc AC (the minor arc from A to C through B).',
    ['115'],
    'Adjacent arcs add: 75° + 40° = 115°.',
    {
      prefix: 'm arc AC =',
      unit: '°',
      value: 115,
      figure: circleFig({
        points: pts([['A', 10], ['B', 85], ['C', 125]]),
        lines: [['O', 'A'], ['O', 'B'], ['O', 'C']],
        arcLabels: [
          { from: 'A', to: 'B', text: '75°' },
          { from: 'B', to: 'C', text: '40°' },
        ],
      }),
    },
  ),
  mc(
    'c13',
    C,
    'Find the remaining arc if the rest of the circle is made of a 96° arc and a 124° arc.',
    ['140°', '220°', '28°', '180°'],
    0,
    'The whole circle is 360°. 360° − 96° − 124° = 140°.',
    {
      figure: circleFig({
        points: pts([['A', 0], ['B', 96], ['C', 220]]),
        lines: [['O', 'A'], ['O', 'B'], ['O', 'C']],
        arcLabels: [
          { from: 'A', to: 'B', text: '96°' },
          { from: 'B', to: 'C', text: '124°' },
        ],
      }),
    },
  ),
  mc(
    'c14',
    C,
    'If a central angle is 90°, the intercepted arc is a',
    ['quarter circle', 'semicircle', 'full circle', 'minor chord'],
    0,
    '90° / 360° = 1/4 of the circle.',
    {
      figure: circleFig({
        points: pts([['A', 0], ['B', 90]]),
        lines: [['O', 'A'], ['O', 'B']],
        angleLabels: [{ vertex: 'O', from: 'A', to: 'B', text: '90°' }],
      }),
    },
  ),
  typed(
    'c15',
    C,
    'A central angle intercepts an arc of 2/5 of the circle. What is the central angle measure?',
    ['144'],
    '(2/5) × 360° = 144°.',
    { prefix: 'angle =', unit: '°', value: 144 },
  ),
  mc(
    'c16',
    C,
    'Find m∠AOB if m arc ACB (major arc from A to B) is 230°.',
    ['130°', '230°', '65°', '50°'],
    0,
    'The central angle equals the minor arc: 360° − 230° = 130°.',
    {
      figure: circleFig({
        points: pts([['A', 20], ['C', 140], ['B', 250]]),
        lines: [['O', 'A'], ['O', 'B']],
        arcLabels: [{ from: 'A', to: 'B', text: '230°', major: true }],
      }),
    },
  ),
  mc(
    'c17',
    C,
    'Which statement is always true?',
    [
      'A central angle equals its intercepted arc',
      'A central angle is half its intercepted arc',
      'A central angle is twice its intercepted arc',
      'A central angle plus its arc is 180°',
    ],
    0,
    'That is the definition of a central angle’s measure.',
  ),
  typed(
    'c18',
    C,
    'Three central angles around a point are 88°, 141°, and x°. Find x.',
    ['131'],
    'Angles around the center add to 360°. x = 360 − 88 − 141 = 131.',
    { prefix: 'x =', unit: '°', value: 131 },
  ),
]

export const INSCRIBED_QUESTIONS: GeoMathPracticeQuestion[] = [
  mc(
    'i1',
    I,
    'Is ∠BAC an inscribed angle? If it is, which arc does it intercept?',
    ['Yes; arc BC', 'Yes; arc AB', 'Yes; arc AC', 'No, the vertex is not on the circle'],
    0,
    'An inscribed angle has its vertex on the circle and sides that are chords. ∠BAC intercepts arc BC.',
    {
      figure: circleFig({
        points: pts([['A', 110], ['B', 200], ['C', 330]]),
        lines: [['A', 'B'], ['A', 'C']],
      }),
    },
  ),
  mc(
    'i2',
    I,
    'Point T is inside the circle, not on it. Is ∠RTS an inscribed angle?',
    ['No', 'Yes; it intercepts arc RS', 'Yes; it intercepts arc RT', 'Yes; vertex can be inside'],
    0,
    'Inscribed angles must have the vertex on the circle. T is interior, so ∠RTS is not inscribed.',
    {
      figure: circleFig({
        points: pts([['R', 20], ['S', 160], ['T', 90, 0.35]]),
        lines: [['R', 'T'], ['S', 'T']],
        showCenter: false,
      }),
    },
  ),
  mc(
    'i3',
    I,
    'Find m∠BTR. Arc BR is 84°.',
    ['42°', '84°', '168°', '96°'],
    0,
    'An inscribed angle is half of its intercepted arc: 84° / 2 = 42°.',
    {
      figure: circleFig({
        points: pts([['B', 20], ['T', 130], ['R', 250]]),
        lines: [['B', 'T'], ['T', 'R']],
        arcLabels: [{ from: 'B', to: 'R', text: '84°' }],
      }),
    },
  ),
  typed(
    'i4',
    I,
    'Find m∠RTS. Arc RS is 110°.',
    ['55'],
    'Inscribed angle = half the intercepted arc: 110° / 2 = 55°.',
    {
      prefix: 'm∠RTS =',
      unit: '°',
      value: 55,
      figure: circleFig({
        points: pts([['R', 200], ['T', 40], ['S', 310]]),
        lines: [['R', 'T'], ['T', 'S']],
        arcLabels: [{ from: 'R', to: 'S', text: '110°' }],
      }),
    },
  ),
  mc(
    'i5',
    I,
    'AB is a diameter. Find m∠ACB, the angle in the semicircle.',
    ['90°', '45°', '180°', '60°'],
    0,
    'An angle inscribed in a semicircle (intercepting a diameter) is a right angle.',
    {
      figure: circleFig({
        points: pts([['A', 180], ['B', 0], ['C', 70]]),
        lines: [['A', 'B'], ['A', 'C'], ['B', 'C']],
      }),
    },
  ),
  mc(
    'i6',
    I,
    'Find m arc WY if inscribed ∠WXY = 31°.',
    ['62°', '31°', '15.5°', '149°'],
    0,
    'The intercepted arc is twice the inscribed angle: 2 × 31° = 62°.',
    {
      figure: circleFig({
        points: pts([['W', 30], ['X', 140], ['Y', 250]]),
        lines: [['W', 'X'], ['X', 'Y']],
        angleLabels: [{ vertex: 'X', from: 'W', to: 'Y', text: '31°' }],
      }),
    },
  ),
  typed(
    'i7',
    I,
    'Two chords intersect inside the circle. Arc BR = 50° and arc TS = 80°. Find m∠BTR.',
    ['65'],
    'An interior angle is half the sum of the intercepted arcs: (50 + 80) / 2 = 65°.',
    {
      prefix: 'm∠BTR =',
      unit: '°',
      value: 65,
      figure: circleFig({
        points: pts([['B', 20], ['R', 200], ['T', 110], ['S', 290]]),
        lines: [['B', 'R'], ['T', 'S']],
        arcLabels: [
          { from: 'B', to: 'R', text: '50°' },
          { from: 'T', to: 'S', text: '80°' },
        ],
      }),
    },
  ),
  mc(
    'i8',
    I,
    'Chords AC and BD intersect inside the circle. Arc AD = 40° and arc BC = 70°. Find the vertical intersection angles.',
    ['55°', '110°', '35°', '15°'],
    0,
    'Interior angle = ½(arc AD + arc BC) = ½(40 + 70) = 55°.',
    {
      figure: circleFig({
        points: pts([['A', 30], ['C', 210], ['B', 120], ['D', 300]]),
        lines: [['A', 'C'], ['B', 'D']],
        arcLabels: [
          { from: 'A', to: 'D', text: '40°' },
          { from: 'B', to: 'C', text: '70°' },
        ],
      }),
    },
  ),
  mc(
    'i9',
    I,
    'm∠DCA = 5x + 4 and it intercepts a 78° arc. Solve for x. Round to three decimal places if needed.',
    ['7', '14.8', '37', '3.4'],
    0,
    'Inscribed angle 5x + 4 = 78/2 = 39. 5x = 35, x = 7.',
    {
      math: 'm∠DCA = 5x + 4,  m arc DA = 78°',
      figure: circleFig({
        points: pts([['D', 40], ['C', 160], ['A', 280]]),
        lines: [['D', 'C'], ['C', 'A']],
        arcLabels: [{ from: 'D', to: 'A', text: '78°' }],
        angleLabels: [{ vertex: 'C', from: 'D', to: 'A', text: '5x+4' }],
      }),
    },
  ),
  typed(
    'i10',
    I,
    'm arc NP = 67x − 2 and an inscribed angle intercepting that arc measures 66°. Solve for x.',
    ['2'],
    'The arc is twice the inscribed angle: 67x − 2 = 132. 67x = 134, x = 2.',
    {
      prefix: 'x =',
      value: 2,
      tolerance: 0.01,
      math: 'm arc NP = 67x − 2,  inscribed angle = 66°',
    },
  ),
  mc(
    'i11',
    I,
    'ABCD is a cyclic quadrilateral. If m∠A = 78°, find m∠C (the opposite angle).',
    ['102°', '78°', '12°', '156°'],
    0,
    'Opposite angles of a cyclic quadrilateral add to 180°. 180° − 78° = 102°.',
    {
      figure: circleFig({
        points: pts([['A', 40], ['B', 120], ['C', 210], ['D', 300]]),
        lines: [['A', 'B'], ['B', 'C'], ['C', 'D'], ['D', 'A']],
        angleLabels: [{ vertex: 'A', from: 'D', to: 'B', text: '78°' }],
      }),
    },
  ),
  typed(
    'i12',
    I,
    'In cyclic quadrilateral PQRS, m∠P = 3x + 10 and m∠R = 2x + 20. Find x.',
    ['30'],
    'Opposite angles sum to 180°: 3x + 10 + 2x + 20 = 180 → 5x = 150 → x = 30.',
    { prefix: 'x =', value: 30 },
  ),
  mc(
    'i13',
    I,
    'Two secants from exterior point E intercept far arc 130° and near arc 40°. Find m∠E.',
    ['45°', '85°', '90°', '35°'],
    0,
    'An exterior angle is half the difference of the intercepted arcs: ½(130 − 40) = 45°.',
    {
      figure: circleFig({
        points: pts([
          ['A', 40],
          ['B', 150],
          ['C', 210],
          ['D', 320],
          ['E', 270, 1.7],
        ]),
        lines: [
          ['E', 'B'],
          ['E', 'C'],
        ],
        arcLabels: [
          { from: 'A', to: 'D', text: '130°' },
          { from: 'B', to: 'C', text: '40°' },
        ],
      }),
    },
  ),
  mc(
    'i14',
    I,
    'Two tangents from an exterior point intercept a major arc of 220° and a minor arc of 140°. Find the angle between the tangents.',
    ['40°', '80°', '110°', '70°'],
    0,
    '½(major − minor) = ½(220 − 140) = 40°.',
    {
      figure: circleFig({
        points: pts([
          ['A', 40],
          ['B', 140],
          ['P', 270, 1.85],
        ]),
        lines: [
          ['P', 'A'],
          ['P', 'B'],
        ],
        arcLabels: [
          { from: 'A', to: 'B', text: '140°' },
          { from: 'A', to: 'B', text: '220°', major: true },
        ],
      }),
    },
  ),
  typed(
    'i15',
    I,
    'A tangent and a chord meet at B. The intercepted far arc is 110°. Find the angle between the tangent and the chord.',
    ['55'],
    'Tangent-chord angle equals half the intercepted arc (alternate segment): 110° / 2 = 55°.',
    {
      prefix: 'angle =',
      unit: '°',
      value: 55,
      figure: circleFig({
        points: pts([
          ['A', 200, 1.65],
          ['B', 180],
          ['C', 40],
        ]),
        lines: [
          ['A', 'B'],
          ['B', 'C'],
        ],
        arcLabels: [{ from: 'B', to: 'C', text: '110°' }],
      }),
    },
  ),
  mc(
    'i16',
    I,
    'Radius OA meets tangent line at A. What is m∠OAT?',
    ['90°', '45°', '180°', 'cannot tell'],
    0,
    'A tangent is perpendicular to the radius at the point of tangency.',
    {
      figure: circleFig({
        points: pts([
          ['A', 0],
          ['T', 0, 1.7],
          ['S', 0, 0.4],
        ]),
        lines: [
          ['O', 'A'],
          ['T', 'A'],
        ],
      }),
    },
  ),
  mc(
    'i17',
    I,
    'Radius is 8 and the distance from the center to an exterior point P is 17. If PA is tangent at A, find PA.',
    ['15', '9', '25', '√353'],
    0,
    'Right triangle: 8² + PA² = 17² → PA² = 289 − 64 = 225 → PA = 15. (8-15-17 triangle.)',
    {
      figure: circleFig({
        points: pts([
          ['A', 20],
          ['P', 20, 1.78],
        ]),
        lines: [
          ['O', 'A'],
          ['A', 'P'],
          ['O', 'P'],
        ],
        lengthLabels: [
          { from: 'O', to: 'A', text: '8' },
          { from: 'O', to: 'P', text: '17' },
        ],
      }),
    },
  ),
  typed(
    'i18',
    I,
    'Determine if AB is tangent. OA = 6, OB = 10, AB = 8. Type yes or no.',
    ['yes'],
    'If tangent, ∠OAB = 90°, so 6² + 8² should equal 10². 36 + 64 = 100. It is a right triangle, so AB is tangent.',
    {
      prefix: 'tangent?',
      figure: circleFig({
        points: pts([
          ['A', 50],
          ['B', 50, 1.67],
        ]),
        lines: [
          ['O', 'A'],
          ['A', 'B'],
          ['O', 'B'],
        ],
        lengthLabels: [
          { from: 'O', to: 'A', text: '6' },
          { from: 'A', to: 'B', text: '8' },
          { from: 'O', to: 'B', text: '10' },
        ],
      }),
    },
  ),
  mc(
    'i19',
    I,
    'OA = 9, OB = 15, AB = 10. Is AB tangent to the circle?',
    ['No, because 9² + 10² ≠ 15²', 'Yes, 9-12-15 scaled', 'Yes, 9² + 10² = 15²', 'Cannot tell without a picture'],
    0,
    '81 + 100 = 181, and 15² = 225. Not a right triangle, so AB is not tangent.',
    {
      figure: circleFig({
        points: pts([
          ['A', 40],
          ['B', 40, 1.67],
        ]),
        lines: [
          ['O', 'A'],
          ['A', 'B'],
          ['O', 'B'],
        ],
        lengthLabels: [
          { from: 'O', to: 'A', text: '9' },
          { from: 'A', to: 'B', text: '10' },
          { from: 'O', to: 'B', text: '15' },
        ],
      }),
    },
  ),
  mc(
    'i20',
    I,
    'Two tangents from the same exterior point are congruent. If one tangent is 12, the other is',
    ['12', '6', '24', '√12'],
    0,
    'Tangent segments from a common external point are equal in length.',
    {
      figure: circleFig({
        points: pts([
          ['A', 50],
          ['B', 130],
          ['P', 90, 1.85],
        ]),
        lines: [
          ['P', 'A'],
          ['P', 'B'],
        ],
        lengthLabels: [{ from: 'P', to: 'A', text: '12' }],
      }),
    },
  ),
  typed(
    'i21',
    I,
    'Two chords intersect: AE = 3, EB = 8, CE = 4, ED = x. Find x.',
    ['6'],
    'Power of a point (intersecting chords): AE · EB = CE · ED → 3 · 8 = 4x → x = 6.',
    {
      prefix: 'x =',
      value: 6,
      figure: circleFig({
        points: pts([
          ['A', 20],
          ['B', 200],
          ['C', 110],
          ['D', 290],
        ]),
        lines: [
          ['A', 'B'],
          ['C', 'D'],
        ],
        lengthLabels: [
          { from: 'A', to: 'O', text: '3' },
          { from: 'O', to: 'B', text: '8' },
          { from: 'C', to: 'O', text: '4' },
          { from: 'O', to: 'D', text: 'x' },
        ],
      }),
    },
  ),
  mc(
    'i22',
    I,
    'Tangent PA = 6 and secant from P hits the circle at B then C, with PB = 4. Find PC (the whole secant).',
    ['9', '12', '2.67', '10'],
    0,
    'Tangent-secant: (tangent)² = external · whole → 36 = 4 · PC → PC = 9.',
    {
      figure: circleFig({
        points: pts([
          ['A', 40],
          ['B', 200],
          ['C', 230],
          ['P', 270, 1.75],
        ]),
        lines: [
          ['P', 'A'],
          ['P', 'C'],
        ],
        lengthLabels: [
          { from: 'P', to: 'A', text: '6' },
          { from: 'P', to: 'B', text: '4' },
        ],
      }),
    },
  ),
  mc(
    'i23',
    I,
    'Two secants from P: external 5 and whole 12 on one; external 6 and whole x on the other. Find x.',
    ['10', '7.2', '2.5', '13'],
    0,
    '5 · 12 = 6x → 60 = 6x → x = 10.',
    {
      figure: circleFig({
        points: pts([
          ['A', 40],
          ['B', 80],
          ['C', 160],
          ['D', 210],
          ['P', 280, 1.7],
        ]),
        lines: [
          ['P', 'B'],
          ['P', 'D'],
        ],
      }),
    },
  ),
  typed(
    'i24',
    I,
    'A tangent is 9 and the external part of a secant is 3. Find the internal segment of the secant (between the two intersection points).',
    ['24'],
    '9² = 3 · whole → whole = 27. Internal = 27 − 3 = 24.',
    { prefix: 'internal =', value: 24 },
  ),
  mc(
    'i25',
    I,
    'Inscribed ∠A and inscribed ∠B intercept the same arc. Then',
    ['∠A ≅ ∠B', '∠A is twice ∠B', '∠A + ∠B = 180°', '∠A is a central angle'],
    0,
    'Inscribed angles that intercept the same arc are congruent.',
  ),
]
