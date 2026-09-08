import { useParams, Link } from 'react-router-dom'
import catalog from '../data/catalog.json'
import TrackRow from '../components/TrackRow'

export default function Album() {
  const { slug } = useParams()
  const album = catalog.albums.find((a) => a.slug === slug)
  if (!album) return <div className="page"><h1>Not found</h1></div>

  const bySlug = new Map(catalog.songs.map((s) => [s.slug, s]))
  const found = album.tracks.filter((t) => !t.missing).length

  return (
    <div className="page">
      <Link to="/" className="back">&larr; Stacked Actors</Link>
      <p className="eyebrow">Record</p>
      <h1>{album.title}</h1>
      <p className="lede">{album.blurb}</p>

      <div className="ledger" style={{ marginTop: 36 }}>
        {album.tracks.map((t) => (
          <TrackRow
            key={t.track}
            track={t.track}
            song={t.missing ? null : bySlug.get(t.slug)}
          />
        ))}
      </div>

      <p className="note">
        {found} of {album.tracks.length} tracks recovered.
        {' '}Click a track number to play; click a title for lyrics, chords and other takes.
      </p>
    </div>
  )
}
