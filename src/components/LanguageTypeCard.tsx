import type { CSSProperties } from 'react'
import type { LanguageType } from '../data/languageTypes'

interface LanguageTypeCardProps {
  language: LanguageType
  active: boolean
  matchCount: number
  onSelect: (id: LanguageType['id']) => void
}

function LanguagePreview({ language }: { language: LanguageType }) {
  const isRtl = language.id === 'arabic' || language.id === 'hebrew'
  const isCjk =
    language.id === 'japanese' ||
    language.id === 'korean' ||
    language.id === 'chinese-traditional' ||
    language.id === 'chinese-simplified'

  return (
    <svg viewBox="0 0 120 56" aria-hidden="true" className="road-preview">
      <rect width="120" height="56" fill="#1e293b" rx="6" />
      <rect x="10" y="12" width="100" height="32" rx="4" fill="#0f172a" stroke="#334155" />
      <text
        x="60"
        y="33"
        textAnchor="middle"
        fill={language.color === '#64748b' ? '#e2e8f0' : language.color}
        fontSize={isCjk ? 11 : 10}
        fontWeight="700"
        fontFamily={
          isCjk
            ? '"Noto Sans JP", "Noto Sans KR", "Segoe UI", sans-serif'
            : isRtl
              ? '"Segoe UI", Tahoma, sans-serif'
              : '"IBM Plex Sans", "Segoe UI", sans-serif'
        }
        direction={isRtl ? 'rtl' : 'ltr'}
      >
        {language.sample.length > 18 ? `${language.sample.slice(0, 16)}…` : language.sample}
      </text>
    </svg>
  )
}

export function LanguageTypeCard({ language, active, matchCount, onSelect }: LanguageTypeCardProps) {
  return (
    <button
      type="button"
      className={active ? 'road-card on' : 'road-card'}
      style={{ '--road-accent': language.color } as CSSProperties}
      onClick={() => onSelect(language.id)}
      aria-pressed={active}
    >
      <LanguagePreview language={language} />
      <span className="road-card-title">{language.nameJa}</span>
      <span className="road-card-sub">{language.summary}</span>
      <span className="road-card-count">{matchCount}カ国</span>
    </button>
  )
}
