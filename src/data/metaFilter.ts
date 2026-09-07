import { countryMatchesLanguageType, languageTypeById, type LanguageTypeId } from './languageTypes'
import {
  buildPlateComboLabel,
  countryMatchesPlateCombo,
  countryMatchesPlateType,
  plateTypeById,
  type PlateColorTag,
  type PlatePatternTag,
  type PlateTypeId,
} from './plateTypes'
import { countryMatchesPoleType, poleTypeById, type PoleTypeId } from './poleTypes'
import { countryMatchesRoadType, roadTypeById, type RoadTypeId } from './roadTypes'
import { countryMatchesSignType, signTypeById, type SignTypeId } from './signTypes'
import type { BiasFilter } from './worldBias'

export type MetaFilter =
  | { kind: 'road'; id: RoadTypeId }
  | { kind: 'plate'; id: PlateTypeId }
  | { kind: 'plate-combo'; colors: PlateColorTag[]; patterns: PlatePatternTag[] }
  | { kind: 'language'; id: LanguageTypeId }
  | { kind: 'pole'; id: PoleTypeId }
  | { kind: 'sign'; id: SignTypeId }

export type MetaTab = 'road' | 'plate' | 'language' | 'pole' | 'sign'

export type SidebarView = 'main' | 'bias' | 'sun'

export interface MetaFilterInfo {
  nameJa: string
  nameEn: string
  hint: string
  color: string
}

const LIGHT_META_COLORS = new Set([
  '#ffffff',
  '#f1f5f9',
  '#f8fafc',
  '#e2e8f0',
  '#fef08a',
  '#fcd34d',
  '#cbd5e1',
  '#fbbf24',
  '#eab308',
])

export function isLightMetaColor(color: string): boolean {
  return LIGHT_META_COLORS.has(color)
}

export function countryMatchesMeta(iso: string, filter: MetaFilter | null): boolean {
  if (!filter) return true
  if (filter.kind === 'road') return countryMatchesRoadType(iso, filter.id)
  if (filter.kind === 'plate') return countryMatchesPlateType(iso, filter.id)
  if (filter.kind === 'plate-combo') {
    return countryMatchesPlateCombo(iso, filter.colors, filter.patterns)
  }
  if (filter.kind === 'language') return countryMatchesLanguageType(iso, filter.id)
  if (filter.kind === 'sign') return countryMatchesSignType(iso, filter.id)
  return countryMatchesPoleType(iso, filter.id)
}

export function getMetaInfo(filter: MetaFilter | null): MetaFilterInfo | null {
  if (!filter) return null
  if (filter.kind === 'road') {
    const road = roadTypeById.get(filter.id)
    if (!road) return null
    return { nameJa: road.nameJa, nameEn: road.nameEn, hint: road.hint, color: road.color }
  }
  if (filter.kind === 'plate') {
    const plate = plateTypeById.get(filter.id)
    if (!plate) return null
    return { nameJa: plate.nameJa, nameEn: plate.nameEn, hint: plate.hint, color: plate.color }
  }
  if (filter.kind === 'plate-combo') {
    const label = buildPlateComboLabel(filter.colors, filter.patterns)
    const hasYellow = filter.colors.includes('yellow')
    const hasGreen = filter.colors.includes('green')
    const hasBlue = filter.colors.includes('blue')
    const color = hasYellow ? '#eab308' : hasGreen ? '#16a34a' : hasBlue ? '#2563eb' : '#f8fafc'
    return {
      nameJa: label,
      nameEn: 'Plate combination',
      hint: '選択した色・パターンの組み合わせに一致する国を表示。複数条件は AND（すべて満たすプレート型）。',
      color,
    }
  }
  if (filter.kind === 'language') {
    const language = languageTypeById.get(filter.id)
    if (!language) return null
    return {
      nameJa: language.nameJa,
      nameEn: language.nameEn,
      hint: language.hint,
      color: language.color,
    }
  }
  if (filter.kind === 'sign') {
    const sign = signTypeById.get(filter.id)
    if (!sign) return null
    return { nameJa: sign.nameJa, nameEn: sign.nameEn, hint: sign.hint, color: sign.color }
  }
  const pole = poleTypeById.get(filter.id)
  if (!pole) return null
  return { nameJa: pole.nameJa, nameEn: pole.nameEn, hint: pole.hint, color: pole.color }
}

export function getMetaKindLabel(filter: MetaFilter | null): string {
  if (!filter) return ''
  if (filter.kind === 'road') return '道路絞り込み中'
  if (filter.kind === 'plate' || filter.kind === 'plate-combo') return 'ナンバー絞り込み中'
  if (filter.kind === 'language') return '言語絞り込み中'
  if (filter.kind === 'sign') return '標識絞り込み中'
  return '電柱絞り込み中'
}

export function getMetaTabLabel(tab: MetaTab): string {
  if (tab === 'road') return '道路'
  if (tab === 'plate') return 'ナンバー'
  if (tab === 'language') return '言語'
  if (tab === 'sign') return '標識'
  return '電柱'
}

export function getMetaPanelTitle(tab: MetaTab): string {
  if (tab === 'road') return '道路の種類を選ぶと、該当エリアが地図で光る'
  if (tab === 'plate') return '色・組み合わせまたはプレート型で絞り込む'
  if (tab === 'language') return '言語の特徴を選ぶと、該当エリアが地図で光る'
  if (tab === 'sign') return '特徴的な標識を選ぶと、該当エリアが地図で光る'
  return '電柱の特徴を選ぶと、該当エリアが地図で光る'
}

export type { BiasFilter }
