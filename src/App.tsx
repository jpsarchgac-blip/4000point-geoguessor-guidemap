import { useState } from 'react'
import { CoverageMap } from './components/CoverageMap'
import { MetaFilterPanel } from './components/MetaFilterPanel'
import { Sidebar } from './components/Sidebar'
import { LEVEL_COLORS, LEVEL_LABELS, type CoverageLevel, type DrivingSide, type RegionId } from './data/coverage'
import {
  getMetaInfo,
  getMetaTabLabel,
  isLightMetaColor,
  type MetaFilter,
  type MetaTab,
  type SidebarView,
} from './data/metaFilter'
import { BIAS_TIER_COLORS, BIAS_TIER_LABELS, BIAS_TIERS, getBiasFilterLabel, type BiasFilter } from './data/worldBias'

const ALL_LEVELS: CoverageLevel[] = ['common', 'uncommon', 'rare']

export default function App() {
  const [query, setQuery] = useState('')
  const [levels, setLevels] = useState<CoverageLevel[]>(ALL_LEVELS)
  const [driving, setDriving] = useState<DrivingSide | 'all'>('all')
  const [region, setRegion] = useState<RegionId | 'all'>('all')
  const [showUncovered, setShowUncovered] = useState(true)
  const [selectedIso, setSelectedIso] = useState<string | null>(null)
  const [uncoveredName, setUncoveredName] = useState<string | null>(null)
  const [metaTab, setMetaTab] = useState<MetaTab>('road')
  const [metaFilter, setMetaFilter] = useState<MetaFilter | null>(null)
  const [sidebarView, setSidebarView] = useState<SidebarView>('main')
  const [biasFilter, setBiasFilter] = useState<BiasFilter>({ kind: 'all' })

  function toggleLevel(level: CoverageLevel) {
    setLevels((current) => {
      if (current.includes(level)) {
        const next = current.filter((item) => item !== level)
        return next.length === 0 ? ALL_LEVELS : next
      }
      return [...current, level]
    })
  }

  function selectCountry(iso: string | null, uncovered?: string) {
    setSelectedIso(iso)
    setUncoveredName(iso ? null : uncovered ?? null)
  }

  function handleTabChange(tab: MetaTab) {
    setMetaTab(tab)
    setMetaFilter(null)
  }

  function handleSidebarView(view: SidebarView) {
    setSidebarView(view)
    if (view === 'bias') {
      setBiasFilter({ kind: 'all' })
      setMetaFilter(null)
    }
  }

  const activeMeta = getMetaInfo(metaFilter)
  const biasMode = sidebarView === 'bias'

  return (
    <div className="app">
      <Sidebar
        query={query}
        onQuery={setQuery}
        levels={levels}
        onToggleLevel={toggleLevel}
        driving={driving}
        onDriving={setDriving}
        region={region}
        onRegion={setRegion}
        showUncovered={showUncovered}
        onShowUncovered={setShowUncovered}
        selectedIso={selectedIso}
        uncoveredName={uncoveredName}
        metaFilter={metaFilter}
        sidebarView={sidebarView}
        onSidebarView={handleSidebarView}
        biasFilter={biasFilter}
        onBiasFilter={setBiasFilter}
        onSelect={(iso) => selectCountry(iso)}
      />
      <main className="map-wrap">
        {!biasMode && (
          <MetaFilterPanel
            tab={metaTab}
            onTab={handleTabChange}
            metaFilter={metaFilter}
            onMetaFilter={setMetaFilter}
          />
        )}
        <CoverageMap
          selectedIso={selectedIso}
          onSelect={selectCountry}
          levels={levels}
          driving={driving}
          region={region}
          showUncovered={showUncovered}
          metaFilter={biasMode ? null : metaFilter}
          biasMode={biasMode}
          biasFilter={biasFilter}
        />
        <div className="legend">
          {biasMode ? (
            <>
              {BIAS_TIERS.map((tier) => (
                <span key={tier}>
                  <i style={{ background: BIAS_TIER_COLORS[tier] }} />
                  {BIAS_TIER_LABELS[tier]}
                </span>
              ))}
              <span>
                <i className="none" />
                非該当
              </span>
              <small>
                {biasFilter.kind === 'all'
                  ? 'バイアス地図表示中。ティアまたは国を選んで絞り込み'
                  : `${getBiasFilterLabel(biasFilter)} を強調表示中`}
              </small>
            </>
          ) : metaFilter && activeMeta ? (
            <>
              <span>
                <i
                  style={{
                    background: activeMeta.color,
                    outline: isLightMetaColor(activeMeta.color) ? '1px solid #64748b' : undefined,
                  }}
                />
                {activeMeta.nameJa} の該当エリア
              </span>
              <span>
                <i className="none" />
                該当なし
              </span>
              <small>
                {getMetaTabLabel(metaTab)}の手がかりで地域を絞り込み中。もう一度クリックで解除
              </small>
            </>
          ) : (
            <>
              {ALL_LEVELS.map((level) => (
                <span key={level}>
                  <i style={{ background: LEVEL_COLORS[level] }} />
                  {LEVEL_LABELS[level]}
                </span>
              ))}
              <span>
                <i className="none" />
                カバーなし
              </span>
              <small>国単位の公式カバー。道路の有無までは示していない</small>
            </>
          )}
        </div>
      </main>
    </div>
  )
}
