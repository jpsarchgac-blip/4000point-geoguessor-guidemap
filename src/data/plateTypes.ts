import { COUNTRIES } from './coverage'

export type PlateTypeId =
  | 'eu-blue-stripe'
  | 'yellow-full'
  | 'yellow-rear'
  | 'us-plate'
  | 'mercosul'
  | 'latam-white'
  | 'co-yellow'
  | 'jp-plate'
  | 'kr-tw-plate'
  | 'au-nz-plate'
  | 'sea-plate'
  | 'in-plate'
  | 'za-plate'
  | 'africa-white'
  | 'ru-plate'

/** プレートの地色・配色 */
export type PlateColorTag = 'yellow' | 'white' | 'green' | 'blue'

/** プレートの形状・組み合わせパターン */
export type PlatePatternTag =
  | 'full-yellow'
  | 'yellow-rear'
  | 'eu-stripe'
  | 'mercosul-band'
  | 'state-name'
  | 'dual-tone'
  | 'black-text'

export interface PlateType {
  id: PlateTypeId
  nameJa: string
  nameEn: string
  summary: string
  hint: string
  color: string
  colors: PlateColorTag[]
  patterns: PlatePatternTag[]
  countries: string[]
}

export const PLATE_COLOR_OPTIONS: { id: PlateColorTag; label: string }[] = [
  { id: 'yellow', label: '黄色' },
  { id: 'white', label: '白色' },
  { id: 'green', label: '緑' },
  { id: 'blue', label: '青条' },
]

export const PLATE_PATTERN_OPTIONS: { id: PlatePatternTag; label: string }[] = [
  { id: 'full-yellow', label: '全面黄' },
  { id: 'yellow-rear', label: '前白後黄' },
  { id: 'eu-stripe', label: 'EU条' },
  { id: 'mercosul-band', label: 'メルコスール' },
  { id: 'state-name', label: '州名入り' },
  { id: 'dual-tone', label: '2色組合' },
  { id: 'black-text', label: '黒字' },
]

/** よく使う組み合わせプリセット */
export const PLATE_COMBO_PRESETS: {
  id: string
  label: string
  colors: PlateColorTag[]
  patterns: PlatePatternTag[]
}[] = [
  { id: 'yellow-all', label: '黄色系すべて', colors: ['yellow'], patterns: [] },
  { id: 'full-yellow', label: '全面黄色', colors: ['yellow'], patterns: ['full-yellow'] },
  { id: 'yellow-rear', label: '前白・後黄', colors: ['yellow', 'white'], patterns: ['yellow-rear', 'dual-tone'] },
  { id: 'white-eu', label: '白＋EU条', colors: ['white', 'blue'], patterns: ['eu-stripe'] },
  { id: 'white-state', label: '白＋州名', colors: ['white'], patterns: ['state-name'] },
  { id: 'green-jp', label: '緑（日本）', colors: ['green'], patterns: [] },
]

export const PLATE_TYPES: PlateType[] = [
  {
    id: 'eu-blue-stripe',
    nameJa: 'EU条・白',
    nameEn: 'EU blue-stripe white',
    summary: '大陸欧州の定番',
    hint: '左端に青地＋EU星と国コード（D, F, PL 等）。独・仏・西・波などEU圏の本命。',
    color: '#2563eb',
    colors: ['white', 'blue'],
    patterns: ['eu-stripe', 'black-text'],
    countries: [
      'DE', 'AT', 'BE', 'FR', 'IT', 'ES', 'PT', 'CH', 'GR', 'AD', 'MC', 'MT',
      'PL', 'CZ', 'SK', 'HU', 'RO', 'BG', 'HR', 'SI', 'RS', 'ME', 'MK', 'AL', 'UA',
      'EE', 'LV', 'LT', 'DK', 'SE', 'FI', 'NO', 'IS', 'FO', 'GL', 'RE',
      'TR', 'IL',
    ],
  },
  {
    id: 'yellow-full',
    nameJa: '全面黄色',
    nameEn: 'Full yellow plates',
    summary: '比較的ユニーク',
    hint: '前後とも黄色。オランダとルクセンブルクが代表。EU条は付かない。',
    color: '#eab308',
    colors: ['yellow'],
    patterns: ['full-yellow', 'black-text'],
    countries: ['NL', 'LU'],
  },
  {
    id: 'yellow-rear',
    nameJa: '前白・後黄',
    nameEn: 'White front / yellow rear',
    summary: '英愛の定番',
    hint: '前方は白、後方は黄色。英国・アイルランド・マン島。欧州で最も識別しやすいプレート差の一つ。',
    color: '#fbbf24',
    colors: ['yellow', 'white'],
    patterns: ['yellow-rear', 'dual-tone', 'black-text'],
    countries: ['GB', 'IE', 'IM', 'BM'],
  },
  {
    id: 'us-plate',
    nameJa: '米国各州',
    nameEn: 'US state plates',
    summary: '州名・州柄',
    hint: '白地に州名・州の配色。州絞りの起点。プエルトリコ等の米領も同系統。',
    color: '#64748b',
    colors: ['white'],
    patterns: ['state-name', 'black-text'],
    countries: ['US', 'PR', 'VI', 'GU', 'AS', 'MP', 'UM'],
  },
  {
    id: 'mercosul',
    nameJa: 'メルコスール',
    nameEn: 'Mercosur plates',
    summary: '南米3国の新型',
    hint: '上部に青帯＋国名、白地に黒字。ブラジル・アルゼンチン・ウルグアイ。旧緑プレートもまだ残る。',
    color: '#1e40af',
    colors: ['white', 'blue'],
    patterns: ['mercosul-band', 'black-text'],
    countries: ['BR', 'AR', 'UY'],
  },
  {
    id: 'latam-white',
    nameJa: '中南米白',
    nameEn: 'Latin America white',
    summary: 'メルコスール以外',
    hint: '白地中心の中南米。メキシコ・チリ・ペルー・エクアドル等。コロンビアの全面黄とは別。',
    color: '#e2e8f0',
    colors: ['white'],
    patterns: ['black-text'],
    countries: ['MX', 'GT', 'PA', 'DO', 'EC', 'BO', 'CL', 'PE', 'CR', 'CW'],
  },
  {
    id: 'co-yellow',
    nameJa: 'コロンビア黄',
    nameEn: 'Colombia yellow',
    summary: '全面黄色',
    hint: '全面が黄色系。南米でコロンビア固有。メルコスール型や中南米白と混同しない。',
    color: '#ca8a04',
    colors: ['yellow'],
    patterns: ['full-yellow', 'black-text'],
    countries: ['CO'],
  },
  {
    id: 'jp-plate',
    nameJa: '日本',
    nameEn: 'Japan plates',
    summary: '緑地白字＋地名',
    hint: '緑地に白文字、上部に地名（品川・なにわ等）と分類番号。非常に識別しやすい。',
    color: '#16a34a',
    colors: ['green', 'white'],
    patterns: ['black-text'],
    countries: ['JP'],
  },
  {
    id: 'kr-tw-plate',
    nameJa: '韓国・台湾',
    nameEn: 'Korea / Taiwan',
    summary: '東アジア白地',
    hint: '白地に黒/青文字。韓国は左端に細い色帯、台湾は英字併記が多い。日本とは全く別。',
    color: '#f1f5f9',
    colors: ['white'],
    patterns: ['black-text', 'dual-tone'],
    countries: ['KR', 'TW', 'HK', 'CN'],
  },
  {
    id: 'au-nz-plate',
    nameJa: '豪州・NZ',
    nameEn: 'Australia / New Zealand',
    summary: '州名・黒字',
    hint: '白/黄地に州名（NSW, VIC 等）や NZ の黒字。左端に細い色帯の州別配色。',
    color: '#fcd34d',
    colors: ['yellow', 'white'],
    patterns: ['state-name', 'black-text'],
    countries: ['AU', 'NZ', 'CX'],
  },
  {
    id: 'sea-plate',
    nameJa: '東南アジア',
    nameEn: 'Southeast Asia',
    summary: '黒字白/黄地',
    hint: 'タイ・マレーシア・シンガポール・インドネシア・フィリピン・ベトナム等。国ごとに細部は違うが「黒字の横長プレート」が共通。',
    color: '#0f172a',
    colors: ['white', 'yellow'],
    patterns: ['black-text'],
    countries: ['TH', 'MY', 'SG', 'ID', 'PH', 'VN', 'KH', 'LA'],
  },
  {
    id: 'in-plate',
    nameJa: 'インド',
    nameEn: 'India plates',
    summary: 'IND白/黄地',
    hint: 'IND と州コード、白または黄色地。左端に青帯の場合も。南アジアでほぼインド固有。',
    color: '#fef08a',
    colors: ['yellow', 'white', 'blue'],
    patterns: ['eu-stripe', 'state-name', 'black-text'],
    countries: ['IN', 'BD', 'LK', 'PK', 'BT'],
  },
  {
    id: 'za-plate',
    nameJa: '南アフリカ',
    nameEn: 'South Africa',
    summary: '州名入り白',
    hint: '白地に黒字、左端に州名（GP, WC 等）。南部アフリカ諸国と形状が似ることも。',
    color: '#f8fafc',
    colors: ['white'],
    patterns: ['state-name', 'black-text'],
    countries: ['ZA', 'BW', 'LS', 'SZ'],
  },
  {
    id: 'africa-white',
    nameJa: 'アフリカ白地',
    nameEn: 'Africa white general',
    summary: '英語圏中心',
    hint: '白地に黒字の汎用型。ケニア・ガーナ・ナイジェリア・ウガンダ等。細部は国で異なる。',
    color: '#cbd5e1',
    colors: ['white'],
    patterns: ['black-text'],
    countries: ['KE', 'GH', 'NG', 'UG', 'RW', 'SN', 'MG', 'TN', 'JO', 'PS', 'QA', 'AE'],
  },
  {
    id: 'ru-plate',
    nameJa: 'ロシア',
    nameEn: 'Russia plates',
    summary: '白地＋RUS/地域',
    hint: '白地に黒字、左端に RUS と地域コード。キリル文字。東欧でロシア/Ukraine等と見分ける。',
    color: '#ffffff',
    colors: ['white'],
    patterns: ['black-text'],
    countries: ['RU', 'KZ', 'KG', 'MN'],
  },
]

export const plateTypeById = new Map(PLATE_TYPES.map((p) => [p.id, p]))

export function countryMatchesPlateType(iso: string, plateTypeId: PlateTypeId | null): boolean {
  if (!plateTypeId) return true
  const plate = plateTypeById.get(plateTypeId)
  return plate ? plate.countries.includes(iso) : true
}

export function countryMatchesPlateCombo(
  iso: string,
  colors: PlateColorTag[],
  patterns: PlatePatternTag[],
): boolean {
  if (colors.length === 0 && patterns.length === 0) return true
  const types = PLATE_TYPES.filter((t) => t.countries.includes(iso))
  if (types.length === 0) return false
  return types.some((t) => {
    const colorOk = colors.length === 0 || colors.some((c) => t.colors.includes(c))
    const patternOk = patterns.length === 0 || patterns.every((p) => t.patterns.includes(p))
    return colorOk && patternOk
  })
}

export function countPlateComboMatches(colors: PlateColorTag[], patterns: PlatePatternTag[]): number {
  return COUNTRIES.filter((c) => countryMatchesPlateCombo(c.iso, colors, patterns)).length
}

export function comboPresetMatches(
  colors: PlateColorTag[],
  patterns: PlatePatternTag[],
  preset: (typeof PLATE_COMBO_PRESETS)[number],
): boolean {
  if (preset.colors.length !== colors.length || preset.patterns.length !== patterns.length) return false
  return (
    preset.colors.every((c) => colors.includes(c)) &&
    preset.patterns.every((p) => patterns.includes(p)) &&
    colors.every((c) => preset.colors.includes(c)) &&
    patterns.every((p) => preset.patterns.includes(p))
  )
}

export function buildPlateComboLabel(colors: PlateColorTag[], patterns: PlatePatternTag[]): string {
  const colorLabels = colors.map((c) => PLATE_COLOR_OPTIONS.find((o) => o.id === c)?.label ?? c)
  const patternLabels = patterns.map((p) => PLATE_PATTERN_OPTIONS.find((o) => o.id === p)?.label ?? p)
  return [...colorLabels, ...patternLabels].join('＋') || '組み合わせ'
}
