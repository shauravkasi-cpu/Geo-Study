import { AP_HUMAN_REGIONS_QUIZ_NAME } from '../lib/apHumanRegionsQuiz'
import { RegionBubbleMap } from './RegionBubbleMap'

interface ApHumanRegionsMapProps {
  onBack: () => void
}

export function ApHumanRegionsMap({ onBack }: ApHumanRegionsMapProps) {
  return (
    <div className="reference-map-page region-study-page">
      <header className="reference-map-header">
        <button type="button" className="btn-secondary btn-sm" onClick={onBack}>
          ← Back
        </button>
        <div className="reference-map-header-text">
          <h1>{AP_HUMAN_REGIONS_QUIZ_NAME} — Study Maps</h1>
        </div>
      </header>

      <div className="region-study-stack">
        <div className="reference-map-container region-study-card">
          <RegionBubbleMap mapId="big-picture" labeled />
        </div>
        <div className="reference-map-container region-study-card">
          <RegionBubbleMap mapId="closer-look" labeled />
        </div>
      </div>
    </div>
  )
}
