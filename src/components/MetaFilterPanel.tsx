import { COUNTRIES } from '../data/coverage'
import { LANGUAGE_TYPES, type LanguageTypeId } from '../data/languageTypes'
import type { MetaFilter, MetaTab } from '../data/metaFilter'
import { getMetaInfo, getMetaPanelTitle, isLightMetaColor } from '../data/metaFilter'
import {
  PLATE_COLOR_OPTIONS,
  PLATE_COMBO_PRESETS,
  PLATE_PATTERN_OPTIONS,
  PLATE_TYPES,
  comboPresetMatches,
  countPlateComboMatches,
  type PlateColorTag,
  type PlatePatternTag,
  type PlateTypeId,
} from '../data/plateTypes'
import { POLE_TYPES, type PoleTypeId } from '../data/poleTypes'
import { ROAD_TYPES, type RoadTypeId } from '../data/roadTypes'
import { SIGN_TYPES, type SignTypeId } from '../data/signTypes'
import { LanguageTypeCard } from './LanguageTypeCard'
import { PlateTypeCard } from './PlateTypeCard'
import { PoleTypeCard } from './PoleTypeCard'
import { RoadTypeCard } from './RoadTypeCard'
import { SignTypeCard } from './SignTypeCard'

interface MetaFilterPanelProps {
  tab: MetaTab
  onTab: (tab: MetaTab) => void
  metaFilter: MetaFilter | null
  onMetaFilter: (filter: MetaFilter | null) => void
}

export function MetaFilterPanel({ tab, onTab, metaFilter, onMetaFilter }: MetaFilterPanelProps) {
  const activeInfo = getMetaInfo(metaFilter)
  const selectedRoadId = metaFilter?.kind === 'road' ? metaFilter.id : null
  const selectedPlateId = metaFilter?.kind === 'plate' ? metaFilter.id : null
  const comboColors = metaFilter?.kind === 'plate-combo' ? metaFilter.colors : []
  const comboPatterns = metaFilter?.kind === 'plate-combo' ? metaFilter.patterns : []
  const selectedLanguageId = metaFilter?.kind === 'language' ? metaFilter.id : null
  const selectedPoleId = metaFilter?.kind === 'pole' ? metaFilter.id : null
  const selectedSignId = metaFilter?.kind === 'sign' ? metaFilter.id : null

  function toggleRoad(id: RoadTypeId) {
    onMetaFilter(selectedRoadId === id ? null : { kind: 'road', id })
  }

  function togglePlate(id: PlateTypeId) {
    onMetaFilter(selectedPlateId === id ? null : { kind: 'plate', id })
  }

  function applyCombo(colors: PlateColorTag[], patterns: PlatePatternTag[]) {
    if (colors.length === 0 && patterns.length === 0) {
      onMetaFilter(null)
    } else {
      onMetaFilter({ kind: 'plate-combo', colors, patterns })
    }
  }

  function toggleColor(color: PlateColorTag) {
    const current = metaFilter?.kind === 'plate-combo' ? [...metaFilter.colors] : []
    const next = current.includes(color) ? current.filter((c) => c !== color) : [...current, color]
    const patterns = metaFilter?.kind === 'plate-combo' ? metaFilter.patterns : []
    applyCombo(next, patterns)
  }

  function togglePattern(pattern: PlatePatternTag) {
    const current = metaFilter?.kind === 'plate-combo' ? [...metaFilter.patterns] : []
    const next = current.includes(pattern) ? current.filter((p) => p !== pattern) : [...current, pattern]
    const colors = metaFilter?.kind === 'plate-combo' ? metaFilter.colors : []
    applyCombo(colors, next)
  }

  function applyPreset(preset: (typeof PLATE_COMBO_PRESETS)[number]) {
    if (comboPresetMatches(comboColors, comboPatterns, preset)) {
      applyCombo([], [])
    } else {
      applyCombo([...preset.colors], [...preset.patterns])
    }
  }

  function toggleLanguage(id: LanguageTypeId) {
    onMetaFilter(selectedLanguageId === id ? null : { kind: 'language', id })
  }

  function togglePole(id: PoleTypeId) {
    onMetaFilter(selectedPoleId === id ? null : { kind: 'pole', id })
  }

  function toggleSign(id: SignTypeId) {
    onMetaFilter(selectedSignId === id ? null : { kind: 'sign', id })
  }

  function clear() {
    onMetaFilter(null)
  }

  const comboMatchCount = countPlateComboMatches(comboColors, comboPatterns)

  return (
    <section className="road-panel">
      <div className="road-panel-head">
        <div>
          <p className="road-panel-eyebrow">メタ絞り込み</p>
          <div className="meta-tabs">
            {(
              [
                ['road', '道路'],
                ['plate', 'ナンバー'],
                ['sign', '標識'],
                ['language', '言語'],
                ['pole', '電柱'],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                type="button"
                className={tab === id ? 'meta-tab on' : 'meta-tab'}
                onClick={() => onTab(id)}
              >
                {label}
              </button>
            ))}
          </div>
          <h2>{getMetaPanelTitle(tab)}</h2>
        </div>
        {metaFilter && (
          <button type="button" className="road-clear" onClick={clear}>
            選択解除
          </button>
        )}
      </div>

      {tab === 'plate' && (
        <div className="plate-combo-panel">
          <p className="filter-label">色（複数可）</p>
          <div className="chips">
            {PLATE_COLOR_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                type="button"
                className={comboColors.includes(opt.id) ? 'chip on' : 'chip'}
                onClick={() => toggleColor(opt.id)}
              >
                {opt.label}
              </button>
            ))}
          </div>

          <p className="filter-label">パターン（複数可・AND）</p>
          <div className="chips">
            {PLATE_PATTERN_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                type="button"
                className={comboPatterns.includes(opt.id) ? 'chip on muted' : 'chip muted'}
                onClick={() => togglePattern(opt.id)}
              >
                {opt.label}
              </button>
            ))}
          </div>

          <p className="filter-label">よく使う組み合わせ</p>
          <div className="chips">
            {PLATE_COMBO_PRESETS.map((preset) => (
              <button
                key={preset.id}
                type="button"
                className={
                  comboPresetMatches(comboColors, comboPatterns, preset) ? 'chip on preset' : 'chip preset'
                }
                onClick={() => applyPreset(preset)}
              >
                {preset.label}
              </button>
            ))}
          </div>

          {(comboColors.length > 0 || comboPatterns.length > 0) && (
            <p className="combo-count">
              組み合わせ該当: <strong>{comboMatchCount}</strong>カ国
            </p>
          )}
        </div>
      )}

      <div className="road-grid">
        {tab === 'road' &&
          ROAD_TYPES.map((road) => {
            const matchCount = COUNTRIES.filter((c) => road.countries.includes(c.iso)).length
            return (
              <RoadTypeCard
                key={road.id}
                road={road}
                active={selectedRoadId === road.id}
                matchCount={matchCount}
                onSelect={toggleRoad}
              />
            )
          })}
        {tab === 'plate' &&
          PLATE_TYPES.map((plate) => {
            const matchCount = COUNTRIES.filter((c) => plate.countries.includes(c.iso)).length
            return (
              <PlateTypeCard
                key={plate.id}
                plate={plate}
                active={selectedPlateId === plate.id}
                matchCount={matchCount}
                onSelect={togglePlate}
              />
            )
          })}
        {tab === 'language' &&
          LANGUAGE_TYPES.map((language) => {
            const matchCount = COUNTRIES.filter((c) => language.countries.includes(c.iso)).length
            return (
              <LanguageTypeCard
                key={language.id}
                language={language}
                active={selectedLanguageId === language.id}
                matchCount={matchCount}
                onSelect={toggleLanguage}
              />
            )
          })}
        {tab === 'pole' &&
          POLE_TYPES.map((pole) => {
            const matchCount = COUNTRIES.filter((c) => pole.countries.includes(c.iso)).length
            return (
              <PoleTypeCard
                key={pole.id}
                pole={pole}
                active={selectedPoleId === pole.id}
                matchCount={matchCount}
                onSelect={togglePole}
              />
            )
          })}
        {tab === 'sign' &&
          SIGN_TYPES.map((sign) => {
            const matchCount = COUNTRIES.filter((c) => sign.countries.includes(c.iso)).length
            return (
              <SignTypeCard
                key={sign.id}
                sign={sign}
                active={selectedSignId === sign.id}
                matchCount={matchCount}
                onSelect={toggleSign}
              />
            )
          })}
      </div>

      {activeInfo && metaFilter && (
        <div className="road-detail">
          <p className="road-detail-title">
            <i
              style={{
                background: activeInfo.color,
                outline: isLightMetaColor(activeInfo.color) ? '1px solid #64748b' : undefined,
              }}
            />
            {activeInfo.nameJa}
            <small>{activeInfo.nameEn}</small>
          </p>
          <p>{activeInfo.hint}</p>
        </div>
      )}
    </section>
  )
}
