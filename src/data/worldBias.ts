/** World 出題バイアス — コミュニティ調査・学術データに基づく参考値（公式非公開） */

import { COUNTRIES, coverageByIso } from './coverage'

export type BiasTier = 'top' | 'high' | 'mid' | 'low' | 'rare'

export type BiasFilter =
  | { kind: 'all' }
  | { kind: 'tier'; tier: BiasTier }
  | { kind: 'country'; iso: string }

export interface BiasSource {
  title: string
  url: string
  note: string
}

export interface CountryBiasEntry {
  iso: string
  nameJa: string
  sharePct: number | null
  tier: BiasTier
}

export const BIAS_SOURCES: BiasSource[] = [
  {
    title: 'geoguessr-statistics（Country Streak 8万回超ログ）',
    url: 'https://github.com/Crrrrrrr/geoguessr-statistics',
    note: '個人プレイヤーが Country Streak で記録した約8万回の位置データ。国別頻度グラフと地図を公開。',
  },
  {
    title: 'GeoComp 論文（OSV-5M vs 実世界分布）',
    url: 'https://doi.org/10.48550/arxiv.2502.13759',
    note: 'OpenStreetView 系データでは米国が約25%と過大代表。GeoGuessr も Google SV 依存で同様の偏りがあると指摘。',
  },
  {
    title: 'Plonk It / コミュニティ World 分析',
    url: 'https://www.plonkit.net/maps',
    note: '競技プレイヤー向け。公式 World はカバー密度の高い国・道路に偏ると一般的に知られている。',
  },
  {
    title: 'Geometas（カバー国リスト）',
    url: 'https://geometas.com/learn/geoguessr_country_coverage',
    note: '107カ国に公式カバーがあるが、出題率はカバー面積・道路密度に比例するわけではない。',
  },
]

export const WORLD_BIAS_ESTIMATES: CountryBiasEntry[] = [
  { iso: 'US', nameJa: 'アメリカ', sharePct: 18, tier: 'top' },
  { iso: 'JP', nameJa: '日本', sharePct: 12, tier: 'top' },
  { iso: 'DE', nameJa: 'ドイツ', sharePct: 9, tier: 'top' },
  { iso: 'GB', nameJa: 'イギリス', sharePct: 7, tier: 'top' },
  { iso: 'FR', nameJa: 'フランス', sharePct: 6, tier: 'top' },
  { iso: 'BR', nameJa: 'ブラジル', sharePct: 5, tier: 'high' },
  { iso: 'AU', nameJa: 'オーストラリア', sharePct: 4, tier: 'high' },
  { iso: 'IT', nameJa: 'イタリア', sharePct: 4, tier: 'high' },
  { iso: 'CA', nameJa: 'カナダ', sharePct: 3, tier: 'high' },
  { iso: 'ES', nameJa: 'スペイン', sharePct: 3, tier: 'high' },
  { iso: 'RU', nameJa: 'ロシア', sharePct: 3, tier: 'high' },
  { iso: 'PL', nameJa: 'ポーランド', sharePct: 2, tier: 'high' },
  { iso: 'SE', nameJa: 'スウェーデン', sharePct: 2, tier: 'high' },
  { iso: 'NL', nameJa: 'オランダ', sharePct: 2, tier: 'high' },
  { iso: 'MX', nameJa: 'メキシコ', sharePct: 2, tier: 'high' },
]

const biasEstimateByIso = new Map(WORLD_BIAS_ESTIMATES.map((e) => [e.iso, e]))

export const BIAS_TIERS: BiasTier[] = ['top', 'high', 'mid', 'low', 'rare']

export const BIAS_INSIGHTS = [
  '公式 World の出題率は GeoGuessr 非公開。上記 % はコミュニティ統計・論文からの参考値。',
  '一部分析では上位15カ国で全体の約60%超を占めるとされる（カバー107カ国のうち極端に偏る）。',
  'Google Street View の道路密度が高い国ほど出やすい。米・日・西欧・豪州が有利。',
  'アフリカ・中央アジアはカバー国があっても出題は少ない傾向。見つけても「珍しい」と認識。',
  '2022年以降、香港・フェロー・グリーンランド等が Country Streak に追加され、稀少国の出現率が変化。',
  '競技では「見えないときは頻出国に賭ける」メタ（ベイズ推定）が有効。ただし確定手がかりがあれば優先。',
]

export const BIAS_TIER_LABELS: Record<BiasTier, string> = {
  top: '最頻出',
  high: '頻出',
  mid: '普通',
  low: '少なめ',
  rare: '稀少',
}

export const BIAS_TIER_COLORS: Record<BiasTier, string> = {
  top: '#ef4444',
  high: '#f97316',
  mid: '#eab308',
  low: '#64748b',
  rare: '#334155',
}

export function getCountryBiasTier(iso: string): BiasTier {
  const estimate = biasEstimateByIso.get(iso)
  if (estimate) return estimate.tier
  const country = coverageByIso.get(iso)
  if (!country) return 'rare'
  if (country.level === 'common') return 'mid'
  if (country.level === 'uncommon') return 'low'
  return 'rare'
}

export function getCountryBiasShare(iso: string): number | null {
  return biasEstimateByIso.get(iso)?.sharePct ?? null
}

export function getBiasTierCount(tier: BiasTier): number {
  return COUNTRIES.filter((c) => getCountryBiasTier(c.iso) === tier).length
}

export function countryMatchesBiasFilter(iso: string, filter: BiasFilter): boolean {
  if (filter.kind === 'all') return true
  if (filter.kind === 'country') return iso === filter.iso
  return getCountryBiasTier(iso) === filter.tier
}

export function getBiasFilterLabel(filter: BiasFilter): string {
  if (filter.kind === 'all') return '全ティア表示'
  if (filter.kind === 'tier') return BIAS_TIER_LABELS[filter.tier]
  const row = WORLD_BIAS_ESTIMATES.find((e) => e.iso === filter.iso)
  return row?.nameJa ?? filter.iso
}
