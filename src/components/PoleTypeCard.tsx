import type { CSSProperties, ReactNode } from 'react'
import type { PoleType } from '../data/poleTypes'

interface PoleTypeCardProps {
  pole: PoleType
  active: boolean
  matchCount: number
  onSelect: (id: PoleType['id']) => void
}

function PolePreview({ id }: { id: PoleType['id'] }) {
  const bg = '#1e293b'
  const wrap = (children: ReactNode) => (
    <svg viewBox="0 0 120 56" aria-hidden="true" className="road-preview">
      <rect width="120" height="56" fill={bg} rx="6" />
      {children}
    </svg>
  )

  switch (id) {
    case 'jp-stripe':
      return wrap(
        <>
          <rect x="56" y="8" width="8" height="40" fill="#94a3b8" />
          <rect x="56" y="28" width="8" height="6" fill="#facc15" />
          <rect x="56" y="36" width="8" height="6" fill="#0f172a" />
          <rect x="56" y="44" width="8" height="6" fill="#facc15" />
        </>,
      )
    case 'kr-tw-stripe':
      return wrap(
        <>
          <rect x="56" y="8" width="8" height="40" fill="#94a3b8" />
          <path d="M56 40 L64 32 L56 24 L64 16 L56 8" fill="none" stroke="#facc15" strokeWidth="2" />
          <path d="M56 40 L64 32 L56 24 L64 16 L56 8" fill="none" stroke="#0f172a" strokeWidth="1" transform="translate(0,3)" />
        </>,
      )
    case 'us-wood':
      return wrap(
        <>
          <rect x="57" y="6" width="6" height="44" fill="#92400e" />
          <rect x="50" y="18" width="20" height="14" rx="2" fill="#374151" stroke="#64748b" />
          <line x1="45" y1="22" x2="75" y2="22" stroke="#1e293b" strokeWidth="1" />
        </>,
      )
    case 'fr-aframe':
      return wrap(
        <>
          <path d="M60 8 L68 48 L52 48 Z" fill="#cbd5e1" stroke="#64748b" />
          <rect x="58" y="20" width="4" height="4" fill="#475569" />
          <rect x="58" y="30" width="4" height="4" fill="#475569" />
        </>,
      )
    case 'br-white-base':
      return wrap(
        <>
          <rect x="56" y="8" width="8" height="40" fill="#78716c" />
          <rect x="56" y="36" width="8" height="12" fill="#f8fafc" />
        </>,
      )
    case 'au-steel':
      return wrap(
        <>
          <rect x="58" y="10" width="4" height="38" fill="#94a3b8" />
          <line x1="40" y1="16" x2="80" y2="16" stroke="#64748b" strokeWidth="1.5" />
          <line x1="42" y1="24" x2="78" y2="24" stroke="#64748b" strokeWidth="1" />
        </>,
      )
    case 'eu-concrete':
      return wrap(
        <>
          <rect x="56" y="8" width="8" height="40" fill="#cbd5e1" stroke="#64748b" />
          <line x1="42" y1="20" x2="78" y2="20" stroke="#475569" strokeWidth="1" />
        </>,
      )
    case 'uk-pole':
      return wrap(
        <>
          <rect x="57" y="10" width="6" height="38" fill="#78716c" />
          <line x1="44" y1="18" x2="76" y2="18" stroke="#334155" strokeWidth="1" />
        </>,
      )
    case 'nordic-wood':
      return wrap(
        <>
          <rect x="58" y="12" width="4" height="36" fill="#a16207" />
          <line x1="46" y1="20" x2="74" y2="20" stroke="#422006" strokeWidth="0.8" />
        </>,
      )
    case 'latam-wood':
      return wrap(
        <>
          <rect x="57" y="10" width="6" height="38" fill="#92400e" />
          <line x1="38" y1="16" x2="82" y2="16" stroke="#1e293b" strokeWidth="0.6" />
          <line x1="40" y1="20" x2="80" y2="20" stroke="#1e293b" strokeWidth="0.6" />
          <line x1="36" y1="24" x2="84" y2="24" stroke="#1e293b" strokeWidth="0.6" />
        </>,
      )
    case 'in-wood-messy':
      return wrap(
        <>
          <rect x="57" y="10" width="6" height="38" fill="#78716c" />
          <path d="M40 14 Q60 22 80 14 M38 20 Q60 30 82 18 M42 26 Q60 34 78 26" fill="none" stroke="#1e293b" strokeWidth="0.8" />
        </>,
      )
    default:
      return null
  }
}

export function PoleTypeCard({ pole, active, matchCount, onSelect }: PoleTypeCardProps) {
  return (
    <button
      type="button"
      className={active ? 'road-card on' : 'road-card'}
      style={{ '--road-accent': pole.color } as CSSProperties}
      onClick={() => onSelect(pole.id)}
      aria-pressed={active}
    >
      <PolePreview id={pole.id} />
      <span className="road-card-title">{pole.nameJa}</span>
      <span className="road-card-sub">{pole.summary}</span>
      <span className="road-card-count">{matchCount}カ国</span>
    </button>
  )
}
