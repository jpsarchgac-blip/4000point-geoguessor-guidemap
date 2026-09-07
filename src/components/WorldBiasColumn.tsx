import type { CSSProperties } from 'react'
import {
  BIAS_INSIGHTS,
  BIAS_SOURCES,
  BIAS_TIER_COLORS,
  BIAS_TIER_LABELS,
  BIAS_TIERS,
  WORLD_BIAS_ESTIMATES,
  getBiasFilterLabel,
  getBiasTierCount,
  type BiasFilter,
  type BiasTier,
} from '../data/worldBias'

interface WorldBiasColumnProps {
  biasFilter: BiasFilter
  onBiasFilter: (filter: BiasFilter) => void
  onSelectCountry: (iso: string) => void
}

export function WorldBiasColumn({ biasFilter, onBiasFilter, onSelectCountry }: WorldBiasColumnProps) {
  const topShare = WORLD_BIAS_ESTIMATES.filter((e) => e.sharePct).reduce((s, e) => s + (e.sharePct ?? 0), 0)

  function selectTier(tier: BiasTier) {
    if (biasFilter.kind === 'tier' && biasFilter.tier === tier) {
      onBiasFilter({ kind: 'all' })
    } else {
      onBiasFilter({ kind: 'tier', tier })
    }
  }

  function selectCountry(iso: string) {
    if (biasFilter.kind === 'country' && biasFilter.iso === iso) {
      onBiasFilter({ kind: 'all' })
    } else {
      onBiasFilter({ kind: 'country', iso })
      onSelectCountry(iso)
    }
  }

  return (
    <section className="guide-column">
      <header>
        <p className="guide-eyebrow">調査まとめ</p>
        <h2>World 出題バイアス</h2>
        <p className="guide-lede">
          ティアまたは国を選ぶと、右の地図に色分け表示される。GeoGuessr 公式は出題率非公開のため参考値。
        </p>
      </header>

      <div className="bias-map-hint">
        地図表示中: <strong>{getBiasFilterLabel(biasFilter)}</strong>
        {biasFilter.kind !== 'all' && (
          <button type="button" className="road-clear inline" onClick={() => onBiasFilter({ kind: 'all' })}>
            全表示
          </button>
        )}
      </div>

      <p className="filter-label">出題ティア（地図で絞り込み）</p>
      <div className="chips">
        {BIAS_TIERS.map((tier) => (
          <button
            key={tier}
            type="button"
            className={biasFilter.kind === 'tier' && biasFilter.tier === tier ? 'chip on' : 'chip'}
            style={{ '--chip': BIAS_TIER_COLORS[tier] } as CSSProperties}
            onClick={() => selectTier(tier)}
          >
            {BIAS_TIER_LABELS[tier]} ({getBiasTierCount(tier)})
          </button>
        ))}
      </div>

      <div className="bias-summary">
        <span>
          下表15カ国の合計参考シェア: <strong>約{topShare}%</strong>
        </span>
        <span className="bias-note">行をクリックすると地図でその国を強調</span>
      </div>

      <table className="bias-table interactive">
        <thead>
          <tr>
            <th>国</th>
            <th>参考%</th>
            <th>頻度</th>
          </tr>
        </thead>
        <tbody>
          {WORLD_BIAS_ESTIMATES.map((row) => (
            <tr
              key={row.iso}
              className={biasFilter.kind === 'country' && biasFilter.iso === row.iso ? 'on' : undefined}
              onClick={() => selectCountry(row.iso)}
            >
              <td>{row.nameJa}</td>
              <td>{row.sharePct != null ? `${row.sharePct}%` : '—'}</td>
              <td>
                <span className="bias-tier" style={{ '--tier': BIAS_TIER_COLORS[row.tier] } as CSSProperties}>
                  {BIAS_TIER_LABELS[row.tier]}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="guide-block">
        <h3>ティア凡例（地図の色）</h3>
        <ul className="tier-legend-list">
          {BIAS_TIERS.map((tier) => (
            <li key={tier}>
              <i style={{ background: BIAS_TIER_COLORS[tier] }} />
              {BIAS_TIER_LABELS[tier]} — {getBiasTierCount(tier)}カ国
            </li>
          ))}
        </ul>
      </div>

      <div className="guide-block">
        <h3>要点</h3>
        <ul>
          {BIAS_INSIGHTS.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="guide-block">
        <h3>参照ソース</h3>
        <ul className="source-list">
          {BIAS_SOURCES.map((src) => (
            <li key={src.url}>
              <a href={src.url} target="_blank" rel="noreferrer">
                {src.title}
              </a>
              <p>{src.note}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
