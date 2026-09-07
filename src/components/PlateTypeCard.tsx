import type { CSSProperties, ReactNode } from 'react'
import type { PlateType } from '../data/plateTypes'

interface PlateTypeCardProps {
  plate: PlateType
  active: boolean
  matchCount: number
  onSelect: (id: PlateType['id']) => void
}

function PlatePreview({ id }: { id: PlateType['id'] }) {
  const bg = '#1e293b'
  const plateBase = (children: ReactNode) => (
    <svg viewBox="0 0 120 56" aria-hidden="true" className="road-preview">
      <rect width="120" height="56" fill={bg} rx="6" />
      {children}
    </svg>
  )

  switch (id) {
    case 'eu-blue-stripe':
      return plateBase(
        <>
          <rect x="18" y="16" width="84" height="24" rx="3" fill="#fff" stroke="#94a3b8" />
          <rect x="18" y="16" width="14" height="24" rx="3" fill="#1d4ed8" />
          <circle cx="25" cy="24" r="1.2" fill="#fbbf24" />
          <circle cx="28" cy="24" r="1.2" fill="#fbbf24" />
          <text x="58" y="32" textAnchor="middle" fill="#0f172a" fontSize="11" fontWeight="700" fontFamily="Arial,sans-serif">
            B-AB 1234
          </text>
        </>,
      )
    case 'yellow-full':
      return plateBase(
        <>
          <rect x="18" y="16" width="84" height="24" rx="3" fill="#facc15" stroke="#ca8a04" />
          <text x="60" y="32" textAnchor="middle" fill="#0f172a" fontSize="11" fontWeight="700" fontFamily="Arial,sans-serif">
            12-ABC-3
          </text>
        </>,
      )
    case 'yellow-rear':
      return plateBase(
        <>
          <rect x="14" y="16" width="40" height="24" rx="3" fill="#fff" stroke="#94a3b8" />
          <rect x="66" y="16" width="40" height="24" rx="3" fill="#facc15" stroke="#ca8a04" />
          <text x="34" y="31" textAnchor="middle" fill="#0f172a" fontSize="8" fontWeight="700" fontFamily="Arial,sans-serif">
            AB12
          </text>
          <text x="86" y="31" textAnchor="middle" fill="#0f172a" fontSize="8" fontWeight="700" fontFamily="Arial,sans-serif">
            CDE
          </text>
        </>,
      )
    case 'us-plate':
      return plateBase(
        <>
          <rect x="16" y="14" width="88" height="28" rx="4" fill="#f8fafc" stroke="#64748b" />
          <text x="60" y="24" textAnchor="middle" fill="#1e3a8a" fontSize="7" fontWeight="700" fontFamily="Arial,sans-serif">
            CALIFORNIA
          </text>
          <text x="60" y="36" textAnchor="middle" fill="#0f172a" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">
            7ABC123
          </text>
        </>,
      )
    case 'mercosul':
      return plateBase(
        <>
          <rect x="18" y="16" width="84" height="24" rx="3" fill="#fff" stroke="#94a3b8" />
          <rect x="18" y="16" width="84" height="8" rx="3" fill="#1e40af" />
          <text x="60" y="22" textAnchor="middle" fill="#fff" fontSize="5" fontWeight="700" fontFamily="Arial,sans-serif">
            BRASIL
          </text>
          <text x="60" y="34" textAnchor="middle" fill="#0f172a" fontSize="9" fontWeight="700" fontFamily="Arial,sans-serif">
            ABC1D23
          </text>
        </>,
      )
    case 'latam-white':
      return plateBase(
        <>
          <rect x="20" y="17" width="80" height="22" rx="3" fill="#fff" stroke="#94a3b8" />
          <text x="60" y="32" textAnchor="middle" fill="#0f172a" fontSize="10" fontWeight="700" fontFamily="Arial,sans-serif">
            ABC-1234
          </text>
        </>,
      )
    case 'co-yellow':
      return plateBase(
        <>
          <rect x="18" y="16" width="84" height="24" rx="3" fill="#fbbf24" stroke="#b45309" />
          <text x="60" y="32" textAnchor="middle" fill="#0f172a" fontSize="10" fontWeight="700" fontFamily="Arial,sans-serif">
            ABC 123
          </text>
        </>,
      )
    case 'jp-plate':
      return plateBase(
        <>
          <rect x="16" y="15" width="88" height="26" rx="3" fill="#15803d" stroke="#22c55e" />
          <text x="60" y="24" textAnchor="middle" fill="#fff" fontSize="7" fontWeight="700" fontFamily="Arial,sans-serif">
            品川 500
          </text>
          <text x="60" y="36" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="700" fontFamily="Arial,sans-serif">
            あ 12-34
          </text>
        </>,
      )
    case 'kr-tw-plate':
      return plateBase(
        <>
          <rect x="18" y="16" width="84" height="24" rx="3" fill="#fff" stroke="#94a3b8" />
          <rect x="18" y="16" width="6" height="24" fill="#2563eb" />
          <text x="62" y="32" textAnchor="middle" fill="#0f172a" fontSize="10" fontWeight="700" fontFamily="Arial,sans-serif">
            123가 4567
          </text>
        </>,
      )
    case 'au-nz-plate':
      return plateBase(
        <>
          <rect x="18" y="16" width="84" height="24" rx="3" fill="#fef08a" stroke="#ca8a04" />
          <text x="60" y="24" textAnchor="middle" fill="#166534" fontSize="7" fontWeight="700" fontFamily="Arial,sans-serif">
            NSW
          </text>
          <text x="60" y="35" textAnchor="middle" fill="#0f172a" fontSize="10" fontWeight="700" fontFamily="Arial,sans-serif">
            ABC·12D
          </text>
        </>,
      )
    case 'sea-plate':
      return plateBase(
        <>
          <rect x="18" y="16" width="84" height="24" rx="3" fill="#fff" stroke="#64748b" />
          <text x="60" y="32" textAnchor="middle" fill="#0f172a" fontSize="10" fontWeight="700" fontFamily="Arial,sans-serif">
            1กก 1234
          </text>
        </>,
      )
    case 'in-plate':
      return plateBase(
        <>
          <rect x="18" y="16" width="84" height="24" rx="3" fill="#fff" stroke="#94a3b8" />
          <rect x="18" y="16" width="10" height="24" fill="#1d4ed8" />
          <text x="62" y="32" textAnchor="middle" fill="#0f172a" fontSize="9" fontWeight="700" fontFamily="Arial,sans-serif">
            MH 12 AB 1234
          </text>
        </>,
      )
    case 'za-plate':
      return plateBase(
        <>
          <rect x="18" y="16" width="84" height="24" rx="3" fill="#fff" stroke="#94a3b8" />
          <text x="32" y="32" textAnchor="middle" fill="#166534" fontSize="8" fontWeight="700" fontFamily="Arial,sans-serif">
            GP
          </text>
          <text x="68" y="32" textAnchor="middle" fill="#0f172a" fontSize="10" fontWeight="700" fontFamily="Arial,sans-serif">
            CA 123-456
          </text>
        </>,
      )
    case 'africa-white':
      return plateBase(
        <>
          <rect x="20" y="17" width="80" height="22" rx="3" fill="#fff" stroke="#94a3b8" />
          <text x="60" y="32" textAnchor="middle" fill="#0f172a" fontSize="9" fontWeight="700" fontFamily="Arial,sans-serif">
            KCA 123A
          </text>
        </>,
      )
    case 'ru-plate':
      return plateBase(
        <>
          <rect x="18" y="16" width="84" height="24" rx="3" fill="#fff" stroke="#94a3b8" />
          <text x="60" y="32" textAnchor="middle" fill="#0f172a" fontSize="9" fontWeight="700" fontFamily="Arial,sans-serif">
            A123BC 77
          </text>
        </>,
      )
    default:
      return null
  }
}

export function PlateTypeCard({ plate, active, matchCount, onSelect }: PlateTypeCardProps) {
  return (
    <button
      type="button"
      className={active ? 'road-card on' : 'road-card'}
      style={{ '--road-accent': plate.color } as CSSProperties}
      onClick={() => onSelect(plate.id)}
      aria-pressed={active}
    >
      <PlatePreview id={plate.id} />
      <span className="road-card-title">{plate.nameJa}</span>
      <span className="road-card-sub">{plate.summary}</span>
      <span className="road-card-count">{matchCount}カ国</span>
    </button>
  )
}
