import { Link } from 'react-router-dom'
import catalog from '../data/catalog.json'

export default function Songbook() {
  const songs = catalog.songs
    .filter((s) => s.lyrics)
    .sort((a, b) => a.title.localeCompare(b.title))

  return (
    <div className="page">
      <Link to="/" className="back">&larr; Stacked Actors</Link>
      <p className="eyebrow">Songbook</p>
      <h1>Lyrics &amp; chords</h1>
      <p className="lede">
        Most of these were typed up with the chords sitting above the words, the way
        you&rsquo;d write them out to teach someone the song. They&rsquo;re reproduced
        here exactly as written, with a transpose control on each one.
      </p>

      <div className="grid" style={{ marginTop: 36 }}>
        {songs.map((s) => (
          <Link key={s.slug} to={`/song/${s.slug}`} className="card">
            <h3>{s.title}</h3>
            <div className="meta">
              {s.lyrics.hasChords ? 'Lyrics + chords' : 'Lyrics only'}
              {s.mixes.length > 0 && ' · playable'}
            </div>
          </Link>
        ))}
      </div>

      <p className="note">
        {songs.length} sheets, {songs.filter((s) => s.lyrics.hasChords).length} with chords.
      </p>
    </div>
  )
}
