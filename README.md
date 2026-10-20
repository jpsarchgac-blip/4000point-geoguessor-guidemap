# GeoGuessor — 出題エリアマップ

GeoGuessr の **World** マップ向けに、公式 Street View カバー国の分布と攻略用メタ情報を **インタラクティブな世界地図** で見る Web アプリです。

> **注意:** 本プロジェクトは GeoGuessr 公式とは無関係です。出題頻度・バイアスは参考値であり、ゲーム仕様は変更される可能性があります。

## できること

### 出題エリアマップ（メイン）

- 国単位で **公式カバー** の有無と、World での出題イメージを色分け表示
  - **頻出** / **出る** / **稀少**
  - カバーなしの国も表示可能（オプション）
- サイドバーで国を検索（日本語名・英語名・ISO コード）
- **通行方向**（左／右）・**地域**（西ヨーロッパ、北米など）で絞り込み
- 地図上の国をクリックすると、メモ付きの国詳細を表示

### メタフィルター（地図上部パネル）

道路・ナンバープレート・言語・電柱・道路標識などの手がかりで、**該当しやすい国だけ** を地図上で強調できます。

| タブ | 内容の例 |
|------|----------|
| 道路 | 道路の色・舗装・中央線など |
| プレート | 色・パターンの組み合わせプリセット |
| 言語 | 文字体系・公用語の手がかり |
| 電柱 | 形状・設備のタイプ |
| 標識 | 標識デザインのタイプ |

フィルターをもう一度選ぶと解除されます。

### World 出題バイアス（サイドバー「バイアス」）

公式に出題率は公開されていないため、**コミュニティ調査・学術データ等に基づく参考値** をティア表示します（Top / High / Mid / Low / Rare）。ティアや国で絞り込み、地図で強調できます。出典リンクはアプリ内に記載しています。

### 太陽メタ攻略（サイドバー「太陽」）

影の向き・太陽の位置から半球や方位を推測するための **読み物コラム**（地図フィルターではありません）。

## スクリーンショット

<img width="2580" height="1240" alt="スクリーンショット 2026-10-20 195307" src="https://github.com/user-attachments/assets/5ed1a625-60b6-44c3-8515-0edecde386d0" />


## 技術スタック

- [React](https://react.dev/) 19 + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/) 8
- [Leaflet](https://leafletjs.com/)（地図表示）
- [Oxlint](https://oxc.rs/)（Lint）

## 必要条件

- Node.js 18 以上（推奨: 20 LTS 前後）
- npm

## セットアップと起動

```bash
git clone https://github.com/jpsarchgac-blip/4000point-geoguessor-guidemap.git
cd 4000point-geoguessor-guidemap
npm install
npm run dev
```

ブラウザで **http://localhost:5173/** を開きます。

### その他のコマンド

| コマンド | 説明 |
|----------|------|
| `npm run build` | 本番用ビルド（`dist/`） |
| `npm run preview` | ビルド結果のローカルプレビュー |
| `npm run lint` | Oxlint で静的解析 |

## プロジェクト構成（概要）

```
src/
├── App.tsx                 # 画面全体・フィルター状態
├── components/             # 地図・サイドバー・メタパネルなど
└── data/
    ├── coverage.ts         # 国別カバー・頻度・メモ
    ├── metaFilter.ts       # メタフィルター統合
    ├── roadTypes.ts        # 道路メタ
    ├── plateTypes.ts       # ナンバープレート
    ├── languageTypes.ts    # 言語メタ
    ├── poleTypes.ts        # 電柱
    ├── signTypes.ts        # 標識
    ├── worldBias.ts        # World 出題バイアス（参考値）
    └── sunMeta.ts          # 太陽メタ攻略テキスト
public/                     # 静的アセット（favicon など）
```

国データやメタ定義の更新は、主に `src/data/` を編集します。

## データの前提と限界

- **カバー表示は国単位**です。国内のどの道路に SV があるかは示しません。
- **頻出／出る／稀少** は攻略・体験に基づく目安であり、公式の出題確率ではありません。
- **バイアス地図**は推定値です。プレイ環境・モード・期間で変わります。
- GeoGuessr および Google Street View は各社の商標です。

## ライセンス

<!-- package.json は private のため、公開リポジトリなら MIT / CC BY などを明記するとよいです -->

（未定の場合はここに追記）

## 謝辞・参考

- カバー国リストの整理: [Geometas](https://geometas.com/learn/geoguessr_country_coverage) など
- バイアス参考: [geoguessr-statistics](https://github.com/Crrrrrrr/geoguessr-statistics)、[Plonk It Maps](https://www.plonkit.net/maps) など（詳細はアプリ内「バイアス」画面）

---
