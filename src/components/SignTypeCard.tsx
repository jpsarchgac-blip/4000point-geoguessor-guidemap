import type { CSSProperties, ReactNode } from 'react'
import type { SignType } from '../data/signTypes'

interface SignTypeCardProps {
  sign: SignType
  active: boolean
  matchCount: number
  onSelect: (id: SignType['id']) => void
}

function SignPreview({ id }: { id: SignType['id'] }) {
  const bg = '#1e293b'
  const wrap = (children: ReactNode) => (
    <svg viewBox="0 0 120 56" aria-hidden="true" className="road-preview">
      <rect width="120" height="56" fill={bg} rx="6" />
      {children}
    </svg>
  )

  switch (id) {
    case 'eu-vienna-ring':
      return wrap(
        <>
          <circle cx="44" cy="28" r="14" fill="#fff" stroke="#dc2626" strokeWidth="3" />
          <text x="44" y="32" textAnchor="middle" fill="#1e293b" fontSize="10" fontWeight="700">
            50
          </text>
          <rect x="68" y="16" width="36" height="24" rx="2" fill="#2563eb" />
          <polygon points="86,22 92,28 86,34" fill="#fff" />
        </>,
      )
    case 'uk-red-triangle':
      return wrap(
        <polygon points="60,10 78,42 42,42" fill="#fff" stroke="#dc2626" strokeWidth="2.5" />
      )
    case 'us-yellow-diamond':
      return wrap(
        <polygon points="60,12 78,28 60,44 42,28" fill="#eab308" stroke="#ca8a04" strokeWidth="1.5" />
      )
    case 'br-yellow-rect':
      return wrap(
        <rect x="42" y="14" width="36" height="28" rx="2" fill="#eab308" stroke="#ca8a04" strokeWidth="1.5" />
      )
    case 'jp-blue-sign':
      return wrap(
        <>
          <rect x="38" y="14" width="44" height="28" rx="6" fill="#1d4ed8" />
          <text x="60" y="32" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="600">
            止
          </text>
        </>,
      )
    case 'kr-hangul-sign':
      return wrap(
        <>
          <rect x="34" y="14" width="52" height="28" rx="4" fill="#059669" />
          <text x="60" y="32" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="600">
            출구
          </text>
        </>,
      )
    case 'uk-green-dir':
      return wrap(
        <>
          <rect x="28" y="16" width="64" height="24" rx="3" fill="#15803d" />
          <text x="60" y="32" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="700">
            A 1
          </text>
        </>,
      )
    case 'stop-alto':
      return wrap(
        <>
          <polygon
            points="60,10 74,16 74,40 60,46 46,40 46,16"
            fill="#dc2626"
            stroke="#991b1b"
            strokeWidth="1"
          />
          <text x="60" y="32" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="800">
            ALTO
          </text>
        </>,
      )
    case 'stop-arret':
      return wrap(
        <>
          <polygon
            points="60,10 74,16 74,40 60,46 46,40 46,16"
            fill="#dc2626"
            stroke="#991b1b"
            strokeWidth="1"
          />
          <text x="60" y="31" textAnchor="middle" fill="#fff" fontSize="7" fontWeight="800">
            ARRÊT
          </text>
        </>,
      )
    case 'cyrillic-sign':
      return wrap(
        <>
          <rect x="30" y="16" width="60" height="24" rx="3" fill="#2563eb" />
          <text x="60" y="32" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="600">
            МОСКВА
          </text>
        </>,
      )
    case 'arabic-sign':
      return wrap(
        <>
          <rect x="30" y="16" width="60" height="24" rx="3" fill="#0d9488" />
          <text x="60" y="32" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="600">
            مخرج
          </text>
        </>,
      )
    case 'thai-script':
      return wrap(
        <>
          <rect x="32" y="16" width="56" height="24" rx="3" fill="#ea580c" />
          <text x="60" y="32" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="600">
            ไทย
          </text>
        </>,
      )
    case 'nordic-warning':
      return wrap(
        <polygon points="60,12 78,28 60,44 42,28" fill="#eab308" stroke="#dc2626" strokeWidth="2.5" />
      )
    case 'ch-red-white':
      return wrap(
        <>
          <rect x="40" y="14" width="40" height="28" rx="2" fill="#fff" stroke="#dc2626" strokeWidth="2.5" />
          <line x1="50" y1="22" x2="70" y2="22" stroke="#dc2626" strokeWidth="2" />
          <line x1="50" y1="28" x2="70" y2="28" stroke="#dc2626" strokeWidth="2" />
          <line x1="50" y1="34" x2="65" y2="34" stroke="#dc2626" strokeWidth="2" />
        </>,
      )
    default:
      return null
  }
}

export function SignTypeCard({ sign, active, matchCount, onSelect }: SignTypeCardProps) {
  return (
    <button
      type="button"
      className={active ? 'road-card on' : 'road-card'}
      style={{ '--road-accent': sign.color } as CSSProperties}
      onClick={() => onSelect(sign.id)}
      aria-pressed={active}
    >
      <SignPreview id={sign.id} />
      <span className="road-card-title">{sign.nameJa}</span>
      <span className="road-card-sub">{sign.summary}</span>
      <span className="road-card-count">{matchCount}カ国</span>
    </button>
  )
}
