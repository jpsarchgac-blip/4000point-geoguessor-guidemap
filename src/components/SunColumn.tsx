import {
  SUN_BASICS,
  SUN_COUNTRY_HINTS,
  SUN_HEMISPHERE_RULES,
  SUN_LATITUDE_RULES,
  SUN_LIMITATIONS,
  SUN_TIME_RULES,
  SUN_WORKFLOW,
} from '../data/sunMeta'

function TipList({ items }: { items: { title: string; body: string }[] }) {
  return (
    <ul className="tip-list">
      {items.map((tip) => (
        <li key={tip.title}>
          <strong>{tip.title}</strong>
          <p>{tip.body}</p>
        </li>
      ))}
    </ul>
  )
}

export function SunColumn() {
  return (
    <section className="guide-column">
      <header>
        <p className="guide-eyebrow">攻略コラム</p>
        <h2>{SUN_BASICS.title}</h2>
        <p className="guide-lede">{SUN_BASICS.lede}</p>
      </header>

      <div className="sun-diagram" aria-hidden="true">
        <div className="sun-scene north">
          <span className="sun-label">北半球</span>
          <div className="sun-body" />
          <div className="sun-pole" />
          <div className="sun-shadow north" />
          <p>太陽は南 → 影は北</p>
        </div>
        <div className="sun-scene south">
          <span className="sun-label">南半球</span>
          <div className="sun-body south-pos" />
          <div className="sun-pole" />
          <div className="sun-shadow south" />
          <p>太陽は北 → 影は南</p>
        </div>
      </div>

      <div className="guide-block">
        <h3>半球の判定</h3>
        <TipList items={SUN_HEMISPHERE_RULES} />
      </div>

      <div className="guide-block">
        <h3>緯度の目安</h3>
        <TipList items={SUN_LATITUDE_RULES} />
      </div>

      <div className="guide-block">
        <h3>時刻・方角</h3>
        <TipList items={SUN_TIME_RULES} />
      </div>

      <div className="guide-block">
        <h3>国当てでの使い方</h3>
        <TipList items={SUN_COUNTRY_HINTS} />
      </div>

      <div className="guide-block">
        <h3>実戦フロー</h3>
        <ol className="workflow-list">
          {SUN_WORKFLOW.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </div>

      <div className="guide-block warn">
        <h3>限界（注意）</h3>
        <ul>
          {SUN_LIMITATIONS.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}
