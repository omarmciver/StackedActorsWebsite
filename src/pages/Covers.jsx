import { Link } from 'react-router-dom'
import catalog from '../data/catalog.json'

export default function Covers() {
  const covers = [...catalog.covers].sort((a, b) => a.title.localeCompare(b.title))
  const withStems = covers.filter((c) => c.stemCount > 0).length

  return (
    <div className="page">
      <Link to="/" className="back">&larr; Stacked Actors</Link>
      <p className="eyebrow">Collection</p>
      <h1>Covers</h1>
      <p className="lede">
        Other people&rsquo;s songs that we recorded, mostly for the fun of it. These are
        listed for the record but not streamed here &mdash; they aren&rsquo;t ours to publish.
      </p>

      <div className="ledger" style={{ marginTop: 36 }}>
        {covers.map((c) => (
          <div key={c.slug} className="row">
            <span className="num">·</span>
            <span className="ttl">
              {c.title}
              {c.originalArtist && <span className="sub">{c.originalArtist}</span>}
            </span>
            <span className="badges">
              {c.stemCount > 0 && <span className="badge stem">{c.stemCount} stems</span>}
            </span>
          </div>
        ))}
      </div>

      <p className="note">
        {covers.length} covers recorded, {withStems} with multitracks still intact.
      </p>

      <div className="callout">
        <p>
          <strong>No audio here by design.</strong> These are recordings of songs written
          by other people, so streaming them publicly isn&rsquo;t ours to do. If you played
          on them, the recordings and stems are available &mdash; ask Omar.
        </p>
      </div>
    </div>
  )
}
