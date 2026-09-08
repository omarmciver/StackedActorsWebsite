import { Link } from 'react-router-dom'
import catalog from '../data/catalog.json'

export default function Archive() {
  const { stats } = catalog
  const unknown = catalog.songs.filter((s) => s.openQuestions.length > 0)
  const noMix = catalog.songs.filter((s) => s.mixes.length === 0)

  return (
    <div className="page">
      <Link to="/" className="back">&larr; Stacked Actors</Link>
      <p className="eyebrow">About</p>
      <h1>The archive</h1>
      <p className="lede">
        All of this came off a stack of backup CDs, a few dead hard drives and a pile of
        Cakewalk project folders with names like <em>temp3</em>. Putting it back together
        took a while.
      </p>

      <h2 className="section-head">What survived</h2>
      <div className="tally" style={{ marginTop: 0 }}>
        <div><b>{stats.songs}</b><span>Songs identified</span></div>
        <div><b>{stats.mixes}</b><span>Finished mixes</span></div>
        <div><b>{stats.stems.toLocaleString()}</b><span>Individual stems</span></div>
        <div><b>{stats.covers}</b><span>Covers</span></div>
      </div>

      <h2 className="section-head">How it was done</h2>
      <div className="prose">
        <p>
          Every original file was copied, never moved or renamed in place, and checksummed
          on the way in. Filenames, folder names and timestamps were all treated as
          evidence rather than noise &mdash; even when they contradicted each other, which
          was often.
        </p>
      </div>

      <h2 className="section-head">What&rsquo;s still missing</h2>
      <div className="prose">
        <p>
          <strong>{noMix.length} of the {stats.songs} songs</strong> have no recovered mix
          at all &mdash; project files and stems survive, but no finished version has turned
          up yet. <strong>{unknown.length} songs</strong> still carry open questions about
          dates, versions, or whether two copies are the same performance.
        </p>
        <p>
          There are also several CDs of untitled rips that haven&rsquo;t been matched to
          anything. If you were around for any of this and recognise something, that
          would genuinely help.
        </p>
      </div>

      <div className="callout">
        <p>
          <strong>Played on any of this?</strong> The multitracks are all preserved and
          available &mdash; ask for the link to the vault.
        </p>
      </div>

      <h2 className="section-head">Catalogued, but silent</h2>
      <p className="lede" style={{ fontSize: '1rem', marginBottom: 24 }}>
        These {noMix.length} songs are known and catalogued &mdash; project files, stems or
        lyrics survive &mdash; but no finished mix has been recovered. They&rsquo;re listed
        here so nothing is quietly dropped.
      </p>
      <div className="ledger">
        {noMix
          .slice()
          .sort((a, b) => a.title.localeCompare(b.title))
          .map((s) => (
            <div key={s.slug} className="row">
              <span className="num">·</span>
              <span className="ttl">
                <Link to={`/song/${s.slug}`}>{s.title}</Link>
              </span>
              <span className="badges">
                {s.lyrics && <span className="badge lyr">Lyrics</span>}
                {s.stemCount > 0 && <span className="badge stem">{s.stemCount} stems</span>}
              </span>
            </div>
          ))}
      </div>
    </div>
  )
}
