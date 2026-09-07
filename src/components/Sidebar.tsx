import type { CSSProperties } from 'react'
import {
  COUNTRIES,
  LEVEL_COLORS,
  LEVEL_COUNTS,
  LEVEL_LABELS,
  REGION_LABELS,
  isoToFlag,
  type CoverageLevel,
  type CountryCoverage,
  type DrivingSide,
  type RegionId,
} from '../data/coverage'
import { countryMatchesMeta, getMetaInfo, getMetaKindLabel, isLightMetaColor, type MetaFilter, type SidebarView } from '../data/metaFilter'
import type { BiasFilter } from '../data/worldBias'
import { SunColumn } from './SunColumn'
import { WorldBiasColumn } from './WorldBiasColumn'

interface SidebarProps {
  query: string
  onQuery: (value: string) => void
  levels: CoverageLevel[]
  onToggleLevel: (level: CoverageLevel) => void
  driving: DrivingSide | 'all'
  onDriving: (value: DrivingSide | 'all') => void
  region: RegionId | 'all'
  onRegion: (value: RegionId | 'all') => void
  showUncovered: boolean
  onShowUncovered: (value: boolean) => void
  selectedIso: string | null
  uncoveredName: string | null
  metaFilter: MetaFilter | null
  sidebarView: SidebarView
  onSidebarView: (view: SidebarView) => void
  biasFilter: BiasFilter
  onBiasFilter: (filter: BiasFilter) => void
  onSelect: (iso: string) => void
}

const LEVELS: CoverageLevel[] = ['common', 'uncommon', 'rare']

export function Sidebar({
  query,
  onQuery,
  levels,
  onToggleLevel,
  driving,
  onDriving,
  region,
  onRegion,
  showUncovered,
  onShowUncovered,
  selectedIso,
  uncoveredName,
  metaFilter,
  sidebarView,
  onSidebarView,
  biasFilter,
  onBiasFilter,
  onSelect,
}: SidebarProps) {
  const q = query.trim().toLowerCase()
  const visible = COUNTRIES.filter((c) => {
    if (metaFilter && !countryMatchesMeta(c.iso, metaFilter)) return false
    if (!levels.includes(c.level)) return false
    if (driving !== 'all' && c.driving !== driving) return false
    if (region !== 'all' && c.region !== region) return false
    if (!q) return true
    return (
      c.nameJa.includes(query.trim()) ||
      c.nameEn.toLowerCase().includes(q) ||
      c.iso.toLowerCase() === q
    )
  })

  const grouped = new Map<RegionId, CountryCoverage[]>()
  for (const country of visible) {
    const list = grouped.get(country.region) ?? []
    list.push(country)
    grouped.set(country.region, list)
  }

  const selected = COUNTRIES.find((c) => c.iso === selectedIso) ?? null
  const activeMeta = getMetaInfo(metaFilter)

  return (
    <aside className="sidebar">
      <header className="brand">
        <p className="eyebrow">GeoGuessr 攻略</p>
        <h1>出題エリアマップ</h1>
        <p className="lede">
          Google Street View の公式カバーがある国が、通常の World マップで出題される。
        </p>
        <div className="stats">
          <span>
            <strong>{COUNTRIES.length}</strong>カ国
          </span>
          <span>
            <strong>{LEVEL_COUNTS.common}</strong>頻出
          </span>
          <span>
            <strong>{LEVEL_COUNTS.uncommon}</strong>出る
          </span>
          <span>
            <strong>{LEVEL_COUNTS.rare}</strong>稀少
          </span>
        </div>
        <div className="sidebar-view-tabs">
          {(
            [
              ['main', '地図'],
              ['bias', 'バイアス'],
              ['sun', '太陽'],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              className={sidebarView === id ? 'sidebar-view-tab on' : 'sidebar-view-tab'}
              onClick={() => onSidebarView(id)}
            >
              {label}
            </button>
          ))}
        </div>
      </header>

      {sidebarView === 'bias' && (
        <WorldBiasColumn
          biasFilter={biasFilter}
          onBiasFilter={onBiasFilter}
          onSelectCountry={onSelect}
        />
      )}
      {sidebarView === 'sun' && <SunColumn />}

      {sidebarView === 'main' && (
        <>
      <label className="search">
        <span className="sr-only">国を検索</span>
        <input
          value={query}
          onChange={(e) => onQuery(e.target.value)}
          placeholder="国名・英語名・ISOで検索"
        />
      </label>

      <section className="filters">
        <p className="filter-label">出題頻度</p>
        <div className="chips">
          {LEVELS.map((level) => (
            <button
              key={level}
              type="button"
              className={levels.includes(level) ? 'chip on' : 'chip'}
              style={{ '--chip': LEVEL_COLORS[level] } as CSSProperties}
              onClick={() => onToggleLevel(level)}
            >
              {LEVEL_LABELS[level]}
            </button>
          ))}
        </div>

        <p className="filter-label">通行方向</p>
        <div className="chips">
          {(
            [
              ['all', 'すべて'],
              ['left', '左通行'],
              ['right', '右通行'],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              className={driving === id ? 'chip on muted' : 'chip muted'}
              onClick={() => onDriving(id)}
            >
              {label}
            </button>
          ))}
        </div>

        <p className="filter-label">地域</p>
        <select
          className="region-select"
          value={region}
          onChange={(e) => onRegion(e.target.value as RegionId | 'all')}
        >
          <option value="all">すべての地域</option>
          {(Object.keys(REGION_LABELS) as RegionId[]).map((id) => (
            <option key={id} value={id}>
              {REGION_LABELS[id]}
            </option>
          ))}
        </select>

        <label className="toggle">
          <input
            type="checkbox"
            checked={showUncovered}
            onChange={(e) => onShowUncovered(e.target.checked)}
          />
          カバーなしの国を灰色で表示
        </label>
      </section>

      <section className="detail">
        {activeMeta && metaFilter && (
          <article className="road-active-banner">
            <p className="road-active-label">{getMetaKindLabel(metaFilter)}</p>
            <p className="road-active-name">
              <i style={{ background: activeMeta.color, outline: isLightMetaColor(activeMeta.color) ? '1px solid #64748b' : undefined } as CSSProperties} />
              {activeMeta.nameJa}
            </p>
            <p className="note">{activeMeta.hint}</p>
          </article>
        )}
        {selected ? (
          <article>
            <p className="detail-flag">
              {isoToFlag(selected.iso)} {selected.nameJa}
            </p>
            <p className="detail-en">{selected.nameEn}</p>
            <ul className="meta">
              <li>
                <span>頻度</span>
                <b style={{ color: LEVEL_COLORS[selected.level] }}>{LEVEL_LABELS[selected.level]}</b>
              </li>
              <li>
                <span>通行</span>
                <b>{selected.driving === 'left' ? '左通行' : '右通行'}</b>
              </li>
              <li>
                <span>地域</span>
                <b>{REGION_LABELS[selected.region]}</b>
              </li>
            </ul>
            <p className="note">{selected.note}</p>
          </article>
        ) : uncoveredName ? (
          <article>
            <p className="detail-flag">{uncoveredName}</p>
            <p className="detail-en">公式カバーなし</p>
            <p className="note">
              Google Street View の公式車載カバーがなく、通常の GeoGuessr World
              では出題されない。特殊マップや非公式フォトスフィアを除き、ここには当てない。
            </p>
          </article>
        ) : (
          <p className="empty">地図の国をクリックすると、出題のされ方と攻略メモを表示する。</p>
        )}
      </section>

      <section className="list">
        <p className="filter-label">
          表示中 {visible.length} / {COUNTRIES.length}
        </p>
        {[...grouped.entries()].map(([id, countries]) => (
          <div key={id} className="group">
            <h2>{REGION_LABELS[id]}</h2>
            <ul>
              {countries.map((c) => (
                <li key={c.iso}>
                  <button
                    type="button"
                    className={c.iso === selectedIso ? 'row on' : 'row'}
                    onClick={() => onSelect(c.iso)}
                  >
                    <span className="row-flag">{isoToFlag(c.iso)}</span>
                    <span className="row-name">
                      {c.nameJa}
                      <small>{c.nameEn}</small>
                    </span>
                    <span className="row-tags">
                      <i className={`dot ${c.level}`} />
                      {c.driving === 'left' ? 'LHT' : 'RHT'}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
        </>
      )}
    </aside>
  )
}
