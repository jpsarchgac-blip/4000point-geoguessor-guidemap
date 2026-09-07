export type PoleTypeId =
  | 'jp-stripe'
  | 'kr-tw-stripe'
  | 'us-wood'
  | 'fr-aframe'
  | 'br-white-base'
  | 'au-steel'
  | 'eu-concrete'
  | 'uk-pole'
  | 'nordic-wood'
  | 'latam-wood'
  | 'in-wood-messy'

export interface PoleType {
  id: PoleTypeId
  nameJa: string
  nameEn: string
  summary: string
  hint: string
  color: string
  countries: string[]
}

export const POLE_TYPES: PoleType[] = [
  {
    id: 'jp-stripe',
    nameJa: '黄黒・縦縞',
    nameEn: 'JP vertical stripes',
    summary: '日本の定番',
    hint: '電柱標識板に黒地＋黄色の縦縞（虎柄）。コンクリ柱が多い。韓国・台湾は斜めや全貌巻きで区別。',
    color: '#eab308',
    countries: ['JP'],
  },
  {
    id: 'kr-tw-stripe',
    nameJa: '斜め/全貌縞',
    nameEn: 'KR/TW diagonal stripes',
    summary: '韓国・台湾',
    hint: '韓国: 縞が斜め。台湾: 縞が柱の根本まで巻かれる。日本の縦縞と混同しない。',
    color: '#f59e0b',
    countries: ['KR', 'TW'],
  },
  {
    id: 'us-wood',
    nameJa: '木柱＋変圧器',
    nameEn: 'US wooden poles',
    summary: '北米の木柱',
    hint: '木製の電柱に缶型トランス（変圧器）が付く。米国・カナダの市街地・郊外で典型。',
    color: '#92400e',
    countries: ['US', 'CA', 'PR', 'VI', 'GU'],
  },
  {
    id: 'fr-aframe',
    nameJa: 'A-frameコンクリ',
    nameEn: 'French A-frame concrete',
    summary: 'フランス農村',
    hint: 'コンクリ製でA字・はしご型の断面。仏国農村の強い手がかり。近隣国にも似るが仏が本命。',
    color: '#94a3b8',
    countries: ['FR', 'BE', 'LU', 'MC', 'RE'],
  },
  {
    id: 'br-white-base',
    nameJa: '下部白塗り',
    nameEn: 'Brazil white base',
    summary: 'ブラジル',
    hint: '柱の下1〜2mが白く塗られている。赤土道路とセットで南米ではブラジル寄り。',
    color: '#f8fafc',
    countries: ['BR'],
  },
  {
    id: 'au-steel',
    nameJa: '亜鉛メッキ鋼',
    nameEn: 'AU galvanized steel',
    summary: '豪州の鉄柱',
    hint: '細い亜鉛メッキ鋼柱（Stobie pole 等）。南半球で木柱より鉄が目立つ。',
    color: '#64748b',
    countries: ['AU', 'NZ'],
  },
  {
    id: 'eu-concrete',
    nameJa: '欧州コンクリ',
    nameEn: 'EU concrete poles',
    summary: '独・伊・西欧',
    hint: '無地のコンクリ柱。仏A-frameほど特徴的でないが、木柱よりコンクリが多い欧州内陸。',
    color: '#cbd5e1',
    countries: ['DE', 'AT', 'CH', 'IT', 'ES', 'PT', 'PL', 'CZ', 'SK', 'HU', 'RO', 'GR', 'HR', 'SI', 'BG', 'RS', 'ME', 'MK', 'AL', 'UA', 'TR', 'TN', 'IL'],
  },
  {
    id: 'uk-pole',
    nameJa: '英国型',
    nameEn: 'UK / Ireland poles',
    summary: '英愛の柱',
    hint: '木柱とコンクリ柱が混在。英国・愛爾の標識や道路文脈とセットで見る。',
    color: '#475569',
    countries: ['GB', 'IE', 'IM', 'BM'],
  },
  {
    id: 'nordic-wood',
    nameJa: '北欧木柱',
    nameEn: 'Nordic wooden poles',
    summary: '北欧・バルト',
    hint: '細めの木柱が多い。白い空・針葉樹とセット。フィンランド砂利道メタとも相性良い。',
    color: '#a16207',
    countries: ['NO', 'SE', 'FI', 'DK', 'IS', 'FO', 'EE', 'LV', 'LT'],
  },
  {
    id: 'latam-wood',
    nameJa: '中南米木柱',
    nameEn: 'Latin America wood',
    summary: 'メキシコ〜南米',
    hint: '木柱＋大量の配線。ブラジル白塗り・メルコスールプレートと組み合わせて国を絞る。',
    color: '#78350f',
    countries: ['MX', 'GT', 'CR', 'PA', 'DO', 'CO', 'EC', 'BO', 'CL', 'AR', 'UY', 'PE', 'CW'],
  },
  {
    id: 'in-wood-messy',
    nameJa: 'インド雑多配線',
    nameEn: 'India messy wiring',
    summary: '南アジア',
    hint: '木柱に配線が乱雑に張り出す。インド・バングラデシュ等。低画質カメラとセット。',
    color: '#78716c',
    countries: ['IN', 'BD', 'PK', 'LK', 'NP', 'BT'],
  },
]

export const poleTypeById = new Map(POLE_TYPES.map((p) => [p.id, p]))

export function countryMatchesPoleType(iso: string, poleTypeId: PoleTypeId | null): boolean {
  if (!poleTypeId) return true
  const pole = poleTypeById.get(poleTypeId)
  return pole ? pole.countries.includes(iso) : true
}
