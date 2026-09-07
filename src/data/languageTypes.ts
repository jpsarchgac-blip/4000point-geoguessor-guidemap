export type LanguageTypeId =
  | 'english'
  | 'german'
  | 'french'
  | 'spanish'
  | 'portuguese'
  | 'italian'
  | 'nordic'
  | 'cee-latin'
  | 'cyrillic'
  | 'greek'
  | 'turkish'
  | 'vietnamese'
  | 'arabic'
  | 'hebrew'
  | 'japanese'
  | 'korean'
  | 'chinese-traditional'
  | 'chinese-simplified'
  | 'thai'
  | 'khmer'
  | 'lao'
  | 'devanagari'
  | 'bengali'
  | 'sinhala-tamil'
  | 'malay-indonesian'

export interface LanguageType {
  id: LanguageTypeId
  nameJa: string
  nameEn: string
  summary: string
  hint: string
  sample: string
  color: string
  countries: string[]
}

export const LANGUAGE_TYPES: LanguageType[] = [
  {
    id: 'english',
    nameJa: '英語',
    nameEn: 'English',
    summary: '英語表記が主',
    hint: 'STOP, City Centre, School など。米・英・豪・NZ・愛・南ア・アフリカ英語圏。他国でも英語併記はあるが、単独なら英語圏寄り。',
    sample: 'STOP · Main St',
    color: '#3b82f6',
    countries: ['US', 'GB', 'IE', 'AU', 'NZ', 'CA', 'ZA', 'NG', 'KE', 'GH', 'BW', 'UG', 'RW', 'SG', 'PH', 'IN', 'PR', 'VI', 'GU', 'AS', 'MP', 'UM', 'BM', 'IM', 'CX', 'LS', 'SZ'],
  },
  {
    id: 'german',
    nameJa: 'ドイツ語',
    nameEn: 'German',
    summary: 'ß, ä, ö, ü',
    hint: 'Straße, Überholen, Ausfahrt。独・オー・スイス（独語地域）。オランダ語と混同しない（ij, aa）。',
    sample: 'Straße · Ausfahrt',
    color: '#fbbf24',
    countries: ['DE', 'AT', 'CH', 'LU', 'NL'],
  },
  {
    id: 'french',
    nameJa: 'フランス語',
    nameEn: 'French',
    summary: 'é, è, ç, ô',
    hint: 'Arrêt, École, Rue。仏・比（仏語圏）・スイス（仏語圏）・カナダ（ケベック）・セネガル・レユニオン等。',
    sample: 'Arrêt · École',
    color: '#2563eb',
    countries: ['FR', 'BE', 'CH', 'LU', 'MC', 'AD', 'SN', 'RE', 'TN', 'CA', 'DO', 'MG'],
  },
  {
    id: 'spanish',
    nameJa: 'スペイン語',
    nameEn: 'Spanish',
    summary: 'ñ, ¿, ¡',
    hint: 'Calle, Prohibido, Peatonal。スペイン＋中南米の大半。ポルトガル語（ão, ão）と区別。',
    sample: 'Calle · Peatón',
    color: '#ef4444',
    countries: ['ES', 'MX', 'GT', 'CR', 'PA', 'DO', 'CO', 'EC', 'PE', 'BO', 'CL', 'AR', 'UY', 'PR', 'CW', 'AD'],
  },
  {
    id: 'portuguese',
    nameJa: 'ポルトガル語',
    nameEn: 'Portuguese',
    summary: 'ã, õ, ç',
    hint: 'Rua, Proibido, Saída。ブラジル・ポルトガル。スペイン語より ã/õ が多い。',
    sample: 'Saída · Praça',
    color: '#16a34a',
    countries: ['PT', 'BR'],
  },
  {
    id: 'italian',
    nameJa: 'イタリア語',
    nameEn: 'Italian',
    summary: 'Via, Divieto',
    hint: 'Via, Uscita, Divieto。イタリア・マルタ（イタ語も）。',
    sample: 'Via · Divieto',
    color: '#22c55e',
    countries: ['IT', 'MT'],
  },
  {
    id: 'nordic',
    nameJa: '北欧語',
    nameEn: 'Nordic',
    summary: 'å, æ, ø, ä, ö',
    hint: 'Gata, Vej, Tie。ノルウェー（æ, ø）、デンマーク（æ, ø）、スウェーデン（å, ä, ö）、フィンランド（ä, ö）。',
    sample: 'Gata · Vej · Tie',
    color: '#06b6d4',
    countries: ['NO', 'DK', 'SE', 'FI', 'IS', 'FO', 'GL'],
  },
  {
    id: 'cee-latin',
    nameJa: '東欧ラテン',
    nameEn: 'CEE Latin script',
    summary: 'ł, č, ř, ő',
    hint: '波（ł, ą）、チェコ（ř, ě）、ハンガリー（ő, ű）、クロアチア（č, š）。キリルと混同しない。',
    sample: 'Łódź · Řeka · Őrs',
    color: '#a855f7',
    countries: ['PL', 'CZ', 'SK', 'HU', 'RO', 'HR', 'SI', 'AL', 'ME', 'MK', 'EE', 'LV', 'LT'],
  },
  {
    id: 'cyrillic',
    nameJa: 'キリル文字',
    nameEn: 'Cyrillic',
    summary: '俄・ウク・保等',
    hint: 'ул., пр. など。ロシア（ы, ъ, ё）、ウクライナ（і, ї, є）、セルビアはラテン併用も。',
    sample: 'улица · STOP',
    color: '#64748b',
    countries: ['RU', 'UA', 'BG', 'RS', 'MK', 'ME', 'KZ', 'KG', 'MN'],
  },
  {
    id: 'greek',
    nameJa: 'ギリシャ文字',
    nameEn: 'Greek',
    summary: 'α, β, γ, ω',
    hint: 'Οδός, ΣΤΟΠ。ギリシャのみ。キリルと形が似る文字もあるが、ギリシャ固有。',
    sample: 'Οδός · ΣΤΟP',
    color: '#0ea5e9',
    countries: ['GR'],
  },
  {
    id: 'turkish',
    nameJa: 'トルコ語',
    nameEn: 'Turkish',
    summary: 'ğ, ş, ı, ü',
    hint: 'ラテン文字だが ğ（無音g）、ı（無点i）が特徴。アラビア文字の中東と区別。',
    sample: 'Çıkış · Yol',
    color: '#dc2626',
    countries: ['TR'],
  },
  {
    id: 'vietnamese',
    nameJa: 'ベトナム語',
    nameEn: 'Vietnamese',
    summary: '声調記号だらけ',
    hint: 'ă, â, đ, ư と大量の声調符号。ラテン文字だが東南アジアで唯一この密度。',
    sample: 'Đường · Cấm',
    color: '#eab308',
    countries: ['VN'],
  },
  {
    id: 'arabic',
    nameJa: 'アラビア文字',
    nameEn: 'Arabic script',
    summary: '右から左へ',
    hint: '連続したカーブ状の文字。ヨルダン・UAE・カタール・チュニジア・パレスチナ・パキスタン（ウルドゥー）等。',
    sample: 'ممنوع · STOP',
    color: '#059669',
    countries: ['JO', 'PS', 'QA', 'AE', 'TN', 'PK'],
  },
  {
    id: 'hebrew',
    nameJa: 'ヘブライ文字',
    nameEn: 'Hebrew',
    summary: '右から左・角ばる',
    hint: 'アラビアより角ばった文字。イスラエル。英語・アラビア語併記も多い。',
    sample: 'עצור · STOP',
    color: '#1d4ed8',
    countries: ['IL'],
  },
  {
    id: 'japanese',
    nameJa: '日本語',
    nameEn: 'Japanese',
    summary: 'ひらがな＋漢字',
    hint: 'ひらがなの曲線（の, ん）と漢字の混在。韓国・中国と全く別。',
    sample: '止まれ · 国道',
    color: '#15803d',
    countries: ['JP'],
  },
  {
    id: 'korean',
    nameJa: 'ハングル',
    nameEn: 'Korean (Hangul)',
    summary: 'ブロック状の文字',
    hint: 'ㄱ, ㄴ から作る四角い組み合わせ。日本のひらがなとは全く形が違う。',
    sample: '서울 · 정지',
    color: '#6366f1',
    countries: ['KR'],
  },
  {
    id: 'chinese-traditional',
    nameJa: '繁体字',
    nameEn: 'Traditional Chinese',
    summary: '台湾・香港',
    hint: '繁体字（國, 廣, 門）。台湾・香港。簡体字（国, 广）とは画数が違う。',
    sample: '國道 · 停',
    color: '#b91c1c',
    countries: ['TW', 'HK'],
  },
  {
    id: 'chinese-simplified',
    nameJa: '簡体字',
    nameEn: 'Simplified Chinese',
    summary: '中国本土',
    hint: '画数が少ない簡体字。中国（カバー極少）。繁体字より画が簡略化されている。',
    sample: '国道 · 停',
    color: '#dc2626',
    countries: ['CN'],
  },
  {
    id: 'thai',
    nameJa: 'タイ文字',
    nameEn: 'Thai',
    summary: '丸みのある文字',
    hint: '頭にループ、上に記号（่, ้）。カンボジア・ラオスとは形が違う。',
    sample: 'หยุด · ทาง',
    color: '#7c3aed',
    countries: ['TH'],
  },
  {
    id: 'khmer',
    nameJa: 'クメール文字',
    nameEn: 'Khmer',
    summary: 'カンボジア固有',
    hint: 'タイより複雑で上下に付属文字。カンボジアのみ。',
    sample: 'ផ្លូវ · ឈប់',
    color: '#c026d3',
    countries: ['KH'],
  },
  {
    id: 'lao',
    nameJa: 'ラオ文字',
    nameEn: 'Lao',
    summary: 'タイに似るが独立',
    hint: 'タイ文字の親戚だが形が異なる。ラオス。',
    sample: 'ຢຸດ · ທາງ',
    color: '#0891b2',
    countries: ['LA'],
  },
  {
    id: 'devanagari',
    nameJa: 'デーヴァナーガリー',
    nameEn: 'Devanagari',
    summary: '頭上の横線',
    hint: '文字の上に連続した横線（शिरोरेखा）。インド・ブータン。',
    sample: 'रास्ता · STOP',
    color: '#f97316',
    countries: ['IN', 'BT'],
  },
  {
    id: 'bengali',
    nameJa: 'ベンガル文字',
    nameEn: 'Bengali',
    summary: '横線＋丸み',
    hint: 'デーヴァナーガリーに似るが形が丸い。バングラデシュ。',
    sample: 'রাস্তা · STOP',
    color: '#059669',
    countries: ['BD'],
  },
  {
    id: 'sinhala-tamil',
    nameJa: 'シンハラ/タミル',
    nameEn: 'Sinhala / Tamil',
    summary: 'スリランカ',
    hint: 'シンハラ（丸い）かタミル（角ばる）のどちらか。スリランカ。',
    sample: 'මග · STOP',
    color: '#ca8a04',
    countries: ['LK'],
  },
  {
    id: 'malay-indonesian',
    nameJa: 'マレー/インドネシア語',
    nameEn: 'Malay / Indonesian',
    summary: 'ラテン・Jalan/Keluar',
    hint: 'Jalan, Keluar, Dilarang。マレーシア・インドネシア。英語併記も多いが、語彙で判別。',
    sample: 'Jalan · Keluar',
    color: '#14b8a6',
    countries: ['MY', 'ID'],
  },
]

export const languageTypeById = new Map(LANGUAGE_TYPES.map((l) => [l.id, l]))

export function countryMatchesLanguageType(iso: string, languageTypeId: LanguageTypeId | null): boolean {
  if (!languageTypeId) return true
  const lang = languageTypeById.get(languageTypeId)
  return lang ? lang.countries.includes(iso) : true
}
