export type SignTypeId =
  | 'eu-vienna-ring'
  | 'uk-red-triangle'
  | 'us-yellow-diamond'
  | 'br-yellow-rect'
  | 'jp-blue-sign'
  | 'kr-hangul-sign'
  | 'uk-green-dir'
  | 'stop-alto'
  | 'stop-arret'
  | 'cyrillic-sign'
  | 'arabic-sign'
  | 'thai-script'
  | 'nordic-warning'
  | 'ch-red-white'

export interface SignType {
  id: SignTypeId
  nameJa: string
  nameEn: string
  summary: string
  hint: string
  color: string
  countries: string[]
}

export const SIGN_TYPES: SignType[] = [
  {
    id: 'eu-vienna-ring',
    nameJa: '赤輪・青地（ウィーン条約）',
    nameEn: 'Vienna Convention signs',
    summary: '欧州の定番',
    hint: '円形標識に赤い縁取り（制限・禁止）。案内は青地に白ピクト。英国・アイルランド・米加豪は別系統。',
    color: '#2563eb',
    countries: [
      'AD', 'AT', 'BE', 'FR', 'DE', 'GR', 'IT', 'LU', 'MC', 'NL', 'PT', 'ES', 'CH',
      'AL', 'BG', 'HR', 'CZ', 'HU', 'ME', 'MK', 'PL', 'RO', 'RS', 'SK', 'SI', 'UA', 'TR',
      'IL', 'TN',
    ],
  },
  {
    id: 'uk-red-triangle',
    nameJa: '赤枠三角（警告）',
    nameEn: 'UK-style red triangle',
    summary: '英型警告',
    hint: '白地に赤枠の正三角形が警告標識。英国・愛爾が代表。香港・マルタ・百慕大も同系。南アも似るが別カテゴリあり。',
    color: '#ef4444',
    countries: ['GB', 'IE', 'BM', 'HK', 'MT', 'SG'],
  },
  {
    id: 'us-yellow-diamond',
    nameJa: '黄菱形（警告）',
    nameEn: 'Yellow diamond warning',
    summary: '北米・豪州型',
    hint: '黄色い菱形が警告の定番。米国・カナダ・豪州・NZ・多くの中南米。欧州本土ではほぼ出ない。',
    color: '#eab308',
    countries: [
      'US', 'CA', 'PR', 'VI', 'GU', 'MX', 'GT', 'CR', 'PA', 'DO',
      'AR', 'CL', 'CO', 'EC', 'PE', 'UY', 'BO',
      'AU', 'NZ', 'AS', 'MP',
    ],
  },
  {
    id: 'br-yellow-rect',
    nameJa: '黄四角（警告）',
    nameEn: 'Brazil yellow rectangular',
    summary: 'ブラジル独自',
    hint: '警告が黄色い四角形（菱形ではない）。Mercosul プレート・白塗り電柱とセットで南米では BR 確定寄り。',
    color: '#facc15',
    countries: ['BR'],
  },
  {
    id: 'jp-blue-sign',
    nameJa: '日本型青標識',
    nameEn: 'Japanese blue signs',
    summary: '日本の形状',
    hint: '青地に白文字・独特の角丸四角や逆三角形。漢字＋ひらがな。韓国・台湾と混同しやすいが形状で区別。',
    color: '#1d4ed8',
    countries: ['JP'],
  },
  {
    id: 'kr-hangul-sign',
    nameJa: '韓国型（ハングル）',
    nameEn: 'Korean Hangul signs',
    summary: '韓国の字体',
    hint: '標識にハングルが目立つ。青・緑の案内板。日本の漢字標識と比べ文字体系で即判別。',
    color: '#059669',
    countries: ['KR'],
  },
  {
    id: 'uk-green-dir',
    nameJa: '緑案内（英型）',
    nameEn: 'UK green direction',
    summary: 'A道路の緑板',
    hint: '主要道路案内が緑地に白文字（A1, M25 等）。英国・愛爾の高速・主要路。仏国の青板と対比。',
    color: '#15803d',
    countries: ['GB', 'IE', 'BM'],
  },
  {
    id: 'stop-alto',
    nameJa: 'STOP「ALTO」',
    nameEn: 'ALTO stop sign',
    summary: '中南米の停止',
    hint: '八角形の停止標識に ALTO（または PARE）。スペイン語圏の中南米・カリブ。米国の STOP と混同しない。',
    color: '#dc2626',
    countries: ['MX', 'GT', 'CR', 'PA', 'DO', 'CO', 'EC', 'PE', 'CL', 'AR', 'UY', 'BO', 'CW', 'PR'],
  },
  {
    id: 'stop-arret',
    nameJa: 'STOP「ARRÊT」',
    nameEn: 'ARRÊT stop sign',
    summary: '仏語圏の停止',
    hint: '八角形に ARRÊT。フランス・ベルギー・カナダ（ケベック）・ルクセンbourg・レユニオン等。',
    color: '#b91c1c',
    countries: ['FR', 'BE', 'CA', 'LU', 'MC', 'RE', 'SN'],
  },
  {
    id: 'cyrillic-sign',
    nameJa: 'キリル文字標識',
    nameEn: 'Cyrillic script signs',
    summary: 'ロシア文字',
    hint: '標識の地名・案内がキリル文字。ロシア・ウクライナ・ブルガリア・セルビア等。ラテン文字圏と即区別。',
    color: '#7c3aed',
    countries: ['RU', 'UA', 'BG', 'RS', 'MK', 'KZ', 'KG', 'MN'],
  },
  {
    id: 'arabic-sign',
    nameJa: 'アラビア文字標識',
    nameEn: 'Arabic script signs',
    summary: 'アラビア文字',
    hint: '右から左のアラビア文字が目立つ。中東・北アフリカ（チュニジア等）。トルコはラテン併記が多い。',
    color: '#0d9488',
    countries: ['TN', 'JO', 'AE', 'PS', 'QA'],
  },
  {
    id: 'thai-script',
    nameJa: 'タイ文字標識',
    nameEn: 'Thai script signs',
    summary: 'タイ・ラオ',
    hint: '丸みのあるタイ文字。タイが本命。ラオスも類似。東南アジアで独自の文字体系。',
    color: '#ea580c',
    countries: ['TH', 'LA'],
  },
  {
    id: 'nordic-warning',
    nameJa: '北欧型警告',
    nameEn: 'Nordic warning signs',
    summary: '北欧の菱形',
    hint: '黄菱形＋赤枠の警告（米国より枠が強調）。ノルウェー・スウェーデン・フィンランド・バルト三国。',
    color: '#f59e0b',
    countries: ['NO', 'SE', 'FI', 'DK', 'IS', 'EE', 'LV', 'LT'],
  },
  {
    id: 'ch-red-white',
    nameJa: 'スイス赤白標識',
    nameEn: 'Swiss red/white signs',
    summary: 'CH独自デザイン',
    hint: '白地に赤い縁・独特のピクトグラム。停止は赤八角形だが全体デザインが独仏と微妙に異なる。',
    color: '#ef4444',
    countries: ['CH'],
  },
]

export const signTypeById = new Map(SIGN_TYPES.map((s) => [s.id, s]))

export function countryMatchesSignType(iso: string, signTypeId: SignTypeId | null): boolean {
  if (!signTypeId) return true
  const sign = signTypeById.get(signTypeId)
  return sign ? sign.countries.includes(iso) : true
}
