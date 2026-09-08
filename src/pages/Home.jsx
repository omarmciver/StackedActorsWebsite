import { Link } from 'react-router-dom'
import catalog from '../data/catalog.json'
import { useAccess } from '../access'

export default function Home() {
  const { stats, albums } = catalog
  const { unlocked } = useAccess()

  return (
    <div className="page">
      <p className="eyebrow">Since about 1998</p>
      <h1>Twenty years of tape</h1>
      <p className="lede">
        Everything here was recorded to a hard drive, burned to a CD, and then more or
        less forgotten about. It has spent the last while being dug back out, catalogued
        and preserved. Some of it is finished. Most of it isn't.
      </p>

      <div className="tally">
        <div><b>{stats.songs}</b><span>Songs catalogued</span></div>
        <div><b>{stats.mixes}</b><span>Playable mixes</span></div>
        <div><b>{stats.stems.toLocaleString()}</b><span>Stems preserved</span></div>
      </div>

      <h2 className="section-head">The records</h2>
      <div className="grid">
        {albums.map((a) => (
          <Link key={a.slug} to={`/album/${a.slug}`} className="card">
            <h3>{a.title}</h3>
            <p>{a.blurb}</p>
            <div className="meta">
              {a.tracks.filter((t) => !t.missing).length} of {a.tracks.length} recovered
            </div>
          </Link>
        ))}
      </div>

      {unlocked && (
        <>
          <h2 className="section-head">Everything else</h2>
          <div className="grid">
            <Link to="/loose" className="card">
              <h3>Loose &amp; unreleased</h3>
              <p>Demos, one-offs and songs that never made it onto a record.</p>
              <div className="meta">
                {catalog.songs.filter((s) => s.section === 'loose').length} songs
              </div>
            </Link>
            <Link to="/practice" className="card">
              <h3>Vulcan Studios</h3>
              <p>Practice-room takes. Rough, live, and a different animal to the mixes.</p>
              <div className="meta">
                {catalog.songs.filter((s) => s.section === 'practice').length} takes
              </div>
            </Link>
            <Link to="/songbook" className="card">
              <h3>Songbook</h3>
              <p>Lyrics with the chords written above them, exactly as they were on paper.</p>
              <div className="meta">{stats.chordSheets} sheets</div>
            </Link>
            <Link to="/covers" className="card">
              <h3>Covers</h3>
              <p>Other people&rsquo;s songs we recorded. Listed, but not streamed.</p>
              <div className="meta">{stats.covers} recorded</div>
            </Link>
          </div>
        </>
      )}

      <h2 className="section-head">About the archive</h2>
      <div className="prose">
        <p>
          This site is generated directly from the archive catalogue, so what you see
          is what actually survived &mdash; including the gaps. Where a recording date
          or a title is genuinely unknown, it says so rather than guessing.
        </p>
        <p>
          <Link to="/archive">More about the preservation project &rarr;</Link>
        </p>
      </div>
    </div>
  )
}
