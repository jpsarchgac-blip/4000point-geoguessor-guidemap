export type RoadTypeId =
  | 'yellow-center'
  | 'white-center'
  | 'green-motorway'
  | 'blue-motorway'
  | 'gravel-dirt'
  | 'e-road'
  | 'us-interstate'
  | 'state-shield'
  | 'km-post'
  | 'mile-marker'

export interface RoadType {
  id: RoadTypeId
  nameJa: string
  nameEn: string
  summary: string
  hint: string
  color: string
  /** この道路タイプで絞り込める国（ISO A2） */
  countries: string[]
}

export const ROAD_TYPES: RoadType[] = [
  {
    id: 'yellow-center',
    nameJa: '中央黄線',
    nameEn: 'Yellow center line',
    summary: 'アメカス圏の本命手がかり',
    hint: '中央に黄色の実線・破線がある。米国・カナダ・中南米の大半。欧州・アジアではほぼ出ない。',
    color: '#facc15',
    countries: [
      'US', 'CA', 'MX', 'GT', 'CR', 'PA', 'DO', 'PR', 'VI', 'CW',
      'AR', 'BO', 'BR', 'CL', 'CO', 'EC', 'PE', 'UY',
    ],
  },
  {
    id: 'white-center',
    nameJa: '白線のみ',
    nameEn: 'White markings only',
    summary: '黄線がない＝アメカス以外',
    hint: '中央線が白、または白線のみ。欧州・アジア・アフリカ・豪州・日本が中心。黄線が見えたら即アメカス寄り。',
    color: '#f8fafc',
    countries: [
      'AD', 'AT', 'BE', 'FR', 'DE', 'GR', 'IE', 'IM', 'IT', 'LU', 'MT', 'MC', 'NL', 'PT', 'ES', 'CH', 'GB',
      'AL', 'BG', 'HR', 'CZ', 'HU', 'ME', 'MK', 'PL', 'RO', 'RU', 'RS', 'SK', 'SI', 'UA',
      'DK', 'FO', 'FI', 'GL', 'IS', 'NO', 'SE', 'EE', 'LV', 'LT',
      'BD', 'BT', 'KH', 'CX', 'IN', 'ID', 'LA', 'MY', 'PK', 'PH', 'SG', 'LK', 'TH', 'VN',
      'CN', 'HK', 'JP', 'KZ', 'KG', 'MN', 'KR', 'TW',
      'AS', 'AU', 'GU', 'NZ', 'MP', 'UM',
      'BW', 'SZ', 'GH', 'KE', 'LS', 'MG', 'NG', 'RE', 'RW', 'SN', 'ZA', 'UG',
      'IL', 'JO', 'PS', 'QA', 'TN', 'TR', 'AE',
    ],
  },
  {
    id: 'green-motorway',
    nameJa: '緑高速標識',
    nameEn: 'Green motorway signs',
    summary: 'Autobahn型 A番号',
    hint: '高速入口・案内が緑地に白文字。A1/A8 など。ド独・オー・スイスが代表。',
    color: '#22c55e',
    countries: ['DE', 'AT', 'CH', 'CZ', 'SK', 'SI', 'HR', 'PL', 'HU', 'RO', 'BG'],
  },
  {
    id: 'blue-motorway',
    nameJa: '青高速標識',
    nameEn: 'Blue motorway signs',
    summary: '仏・伊・西・英型',
    hint: '高速案内が青地。A道路（仏）・A/M（英）・autostrada（伊）など。西欧〜南欧で広い。',
    color: '#3b82f6',
    countries: [
      'FR', 'IT', 'ES', 'PT', 'GB', 'IE', 'NL', 'BE', 'LU', 'GR',
      'HR', 'SI', 'RO', 'TR', 'PL', 'CZ', 'SK', 'HU', 'BG', 'RS', 'ME', 'MK', 'AL',
      'KR', 'TW', 'MY', 'TH', 'ID',
    ],
  },
  {
    id: 'gravel-dirt',
    nameJa: '砂利・土路',
    nameEn: 'Gravel / dirt roads',
    summary: '北欧の砂利はフィンランド',
    hint: '舗装されていない砂利・土。北欧の砂利道ならフィンランドが第一候補。アフリカ内陸でも出る。',
    color: '#a16207',
    countries: ['FI', 'NO', 'SE', 'IS', 'MN', 'BW', 'LS', 'SZ', 'MG', 'UG', 'KE', 'GH', 'SN', 'RW', 'NG', 'ZA'],
  },
  {
    id: 'e-road',
    nameJa: 'E道路番号',
    nameEn: 'E-road shields',
    summary: '緑地の E番号',
    hint: '緑の盾形に E-XX。国境をまたぐ欧州幹線。単独では国特定は難しいが「欧州確定」には使える。',
    color: '#16a34a',
    countries: [
      'NO', 'SE', 'FI', 'DK', 'IS', 'EE', 'LV', 'LT',
      'DE', 'AT', 'CH', 'NL', 'BE', 'LU', 'FR', 'GB', 'IE',
      'ES', 'PT', 'IT', 'GR',
      'PL', 'CZ', 'SK', 'HU', 'RO', 'BG', 'HR', 'SI', 'RS', 'ME', 'MK', 'AL', 'UA', 'TR',
    ],
  },
  {
    id: 'us-interstate',
    nameJa: 'Interstate',
    nameEn: 'US Interstate shield',
    summary: '赤白青の盾形',
    hint: 'I-95 など赤白青の Interstate 盾。米国限定。州道盾とセットで州絞りも可能。',
    color: '#ef4444',
    countries: ['US'],
  },
  {
    id: 'state-shield',
    nameJa: '州コード標識',
    nameEn: 'State / province shields',
    summary: '州・県名入り道路番号',
    hint: '標識に州名・県コード（TX, CA, SP, NSW 等）。米・伯・豪・加で州/州内絞りの起点。',
    color: '#f97316',
    countries: ['US', 'CA', 'BR', 'AU', 'MX', 'AR', 'CL', 'CO', 'PE', 'ZA'],
  },
  {
    id: 'km-post',
    nameJa: 'km距離標',
    nameEn: 'Kilometre posts',
    summary: '白柱に km 表示',
    hint: '道路脇の白い距離標に km。大陸欧州・日本・韓国・豪州など。マイル標と対になる。',
    color: '#e2e8f0',
    countries: [
      'FR', 'DE', 'IT', 'ES', 'PT', 'NL', 'BE', 'CH', 'AT', 'PL', 'CZ', 'SK', 'HU', 'RO', 'GR', 'TR',
      'JP', 'KR', 'TW', 'AU', 'NZ', 'ZA', 'CL', 'AR', 'BR', 'MX', 'IN', 'TH', 'MY', 'ID', 'PH',
    ],
  },
  {
    id: 'mile-marker',
    nameJa: 'マイル距離標',
    nameEn: 'Mile markers',
    summary: 'mi / mile 表記',
    hint: '距離標や標識に mile/mi。米国・英国（一部）・プエルトリコ等。km 表記とセットで切り分け。',
    color: '#94a3b8',
    countries: ['US', 'GB', 'IE', 'PR', 'VI', 'GU', 'AS', 'MP', 'UM', 'BM'],
  },
]

export const roadTypeById = new Map(ROAD_TYPES.map((r) => [r.id, r]))

export const roadTypeCountrySet = (id: RoadTypeId | null): Set<string> | null => {
  if (!id) return null
  const road = roadTypeById.get(id)
  return road ? new Set(road.countries) : null
}

export function countryMatchesRoadType(iso: string, roadTypeId: RoadTypeId | null): boolean {
  if (!roadTypeId) return true
  const set = roadTypeCountrySet(roadTypeId)
  return set ? set.has(iso) : true
}
