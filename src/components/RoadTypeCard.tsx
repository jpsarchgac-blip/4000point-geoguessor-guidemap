import type { CSSProperties } from 'react'
import type { RoadType } from '../data/roadTypes'

interface RoadTypeCardProps {
  road: RoadType
  active: boolean
  matchCount: number
  onSelect: (id: RoadType['id']) => void
}

function RoadPreview({ id }: { id: RoadType['id'] }) {
  switch (id) {
    case 'yellow-center':
      return (
        <svg viewBox="0 0 120 56" aria-hidden="true" className="road-preview">
          <rect width="120" height="56" fill="#1e293b" rx="6" />
          <rect x="0" y="22" width="120" height="12" fill="#334155" />
          <rect x="58" y="24" width="4" height="8" fill="#facc15" />
          <rect x="0" y="26" width="120" height="2" fill="#f8fafc" opacity="0.35" />
        </svg>
      )
    case 'white-center':
      return (
        <svg viewBox="0 0 120 56" aria-hidden="true" className="road-preview">
          <rect width="120" height="56" fill="#1e293b" rx="6" />
          <rect x="0" y="22" width="120" height="12" fill="#334155" />
          <rect x="58" y="24" width="4" height="8" fill="#f8fafc" />
        </svg>
      )
    case 'green-motorway':
      return (
        <svg viewBox="0 0 120 56" aria-hidden="true" className="road-preview">
          <rect width="120" height="56" fill="#1e293b" rx="6" />
          <rect x="28" y="10" width="64" height="36" rx="4" fill="#15803d" stroke="#22c55e" strokeWidth="2" />
          <text x="60" y="34" textAnchor="middle" fill="#ecfdf5" fontSize="18" fontWeight="700" fontFamily="Arial,sans-serif">
            A 8
          </text>
        </svg>
      )
    case 'blue-motorway':
      return (
        <svg viewBox="0 0 120 56" aria-hidden="true" className="road-preview">
          <rect width="120" height="56" fill="#1e293b" rx="6" />
          <rect x="24" y="10" width="72" height="36" rx="4" fill="#1d4ed8" stroke="#60a5fa" strokeWidth="2" />
          <text x="60" y="34" textAnchor="middle" fill="#eff6ff" fontSize="16" fontWeight="700" fontFamily="Arial,sans-serif">
            A 6
          </text>
        </svg>
      )
    case 'gravel-dirt':
      return (
        <svg viewBox="0 0 120 56" aria-hidden="true" className="road-preview">
          <rect width="120" height="56" fill="#365314" rx="6" />
          <rect x="0" y="20" width="120" height="16" fill="#a16207" />
          <circle cx="20" cy="28" r="2" fill="#713f12" />
          <circle cx="45" cy="31" r="1.5" fill="#713f12" />
          <circle cx="78" cy="27" r="2" fill="#713f12" />
          <circle cx="98" cy="30" r="1.5" fill="#713f12" />
        </svg>
      )
    case 'e-road':
      return (
        <svg viewBox="0 0 120 56" aria-hidden="true" className="road-preview">
          <rect width="120" height="56" fill="#1e293b" rx="6" />
          <path d="M38 12 h44 a8 8 0 0 1 8 8 v16 a8 8 0 0 1 -8 8 H38 a8 8 0 0 1 -8 -8 V20 a8 8 0 0 1 8 -8z" fill="#166534" stroke="#4ade80" strokeWidth="2" />
          <text x="60" y="35" textAnchor="middle" fill="#ecfdf5" fontSize="15" fontWeight="700" fontFamily="Arial,sans-serif">
            E 45
          </text>
        </svg>
      )
    case 'us-interstate':
      return (
        <svg viewBox="0 0 120 56" aria-hidden="true" className="road-preview">
          <rect width="120" height="56" fill="#1e293b" rx="6" />
          <path d="M60 8 L88 48 H32 Z" fill="#1d4ed8" stroke="#93c5fd" strokeWidth="1.5" />
          <rect x="32" y="38" width="56" height="10" fill="#dc2626" />
          <text x="60" y="30" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="700" fontFamily="Arial,sans-serif">
            95
          </text>
        </svg>
      )
    case 'state-shield':
      return (
        <svg viewBox="0 0 120 56" aria-hidden="true" className="road-preview">
          <rect width="120" height="56" fill="#1e293b" rx="6" />
          <path d="M38 10 h44 l8 18 -8 18 H38 l-8 -18z" fill="#ea580c" stroke="#fdba74" strokeWidth="1.5" />
          <text x="60" y="24" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="700" fontFamily="Arial,sans-serif">
            TEXAS
          </text>
          <text x="60" y="40" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="700" fontFamily="Arial,sans-serif">
            35
          </text>
        </svg>
      )
    case 'km-post':
      return (
        <svg viewBox="0 0 120 56" aria-hidden="true" className="road-preview">
          <rect width="120" height="56" fill="#1e293b" rx="6" />
          <rect x="78" y="8" width="18" height="40" rx="2" fill="#f1f5f9" stroke="#94a3b8" />
          <text x="87" y="24" textAnchor="middle" fill="#0f172a" fontSize="8" fontWeight="700" fontFamily="Arial,sans-serif">
            km
          </text>
          <text x="87" y="38" textAnchor="middle" fill="#0f172a" fontSize="11" fontWeight="700" fontFamily="Arial,sans-serif">
            142
          </text>
          <rect x="0" y="24" width="70" height="8" fill="#475569" />
        </svg>
      )
    case 'mile-marker':
      return (
        <svg viewBox="0 0 120 56" aria-hidden="true" className="road-preview">
          <rect width="120" height="56" fill="#1e293b" rx="6" />
          <rect x="76" y="10" width="22" height="36" rx="2" fill="#64748b" stroke="#cbd5e1" />
          <text x="87" y="26" textAnchor="middle" fill="#f8fafc" fontSize="7" fontWeight="700" fontFamily="Arial,sans-serif">
            MILE
          </text>
          <text x="87" y="40" textAnchor="middle" fill="#f8fafc" fontSize="11" fontWeight="700" fontFamily="Arial,sans-serif">
            87
          </text>
          <rect x="58" y="24" width="4" height="8" fill="#facc15" />
          <rect x="0" y="24" width="56" height="8" fill="#475569" />
        </svg>
      )
    default:
      return null
  }
}

export function RoadTypeCard({ road, active, matchCount, onSelect }: RoadTypeCardProps) {
  return (
    <button
      type="button"
      className={active ? 'road-card on' : 'road-card'}
      style={{ '--road-accent': road.color } as CSSProperties}
      onClick={() => onSelect(road.id)}
      aria-pressed={active}
    >
      <RoadPreview id={road.id} />
      <span className="road-card-title">{road.nameJa}</span>
      <span className="road-card-sub">{road.summary}</span>
      <span className="road-card-count">{matchCount}カ国</span>
    </button>
  )
}
