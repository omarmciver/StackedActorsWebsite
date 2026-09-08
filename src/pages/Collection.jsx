import { Link } from 'react-router-dom'
import catalog from '../data/catalog.json'
import TrackRow from '../components/TrackRow'
import { usePlayer } from '../player'

const COPY = {
  loose: {
    title: 'Loose & unreleased',
    lede: `Songs that never made it onto a record — demos, one-offs, re-writes and
           things that were abandoned halfway. Some are finished mixes; some are
           an idea and a drum machine.`,
  },
  practice: {
    title: 'Vulcan Studios',
    lede: `Recorded live in the practice room at Vulcan Studios. Rough, loud, and much
           closer to what the band actually sounded like in a room than any of the
           studio mixes.`,
  },
}

export default function Collection({ section }) {
  const copy = COPY[section]

  return (
    <div className="page">
      <Link to="/" className="back">&larr; Stacked Actors</Link>
      <p className="eyebrow">Collection</p>
      <h1>{copy.title}</h1>
      <p className="lede">{copy.lede}</p>
      {section === 'practice' ? <PracticeTakes /> : <LooseSongs />}
    </div>
  )
}

function LooseSongs() {
  const songs = catalog.songs
    .filter((s) => s.section === 'loose')
    .sort((a, b) => a.title.localeCompare(b.title))

  return (
    <>
      <div className="ledger" style={{ marginTop: 36 }}>
        {songs.map((s) => <TrackRow key={s.slug} song={s} />)}
      </div>
      <p className="note">{songs.length} songs.</p>
    </>
  )
}

/* Practice takes are a property of the recording, not the song: most of them
   belong to songs that also have studio mixes. List the takes themselves so
   none stay buried on a song page. */
function PracticeTakes() {
  const { current, play } = usePlayer()

  const takes = catalog.songs
    .flatMap((song) => song.mixes
      .filter((m) => m.kind === 'practice')
      .map((mix) => ({ song, mix })))
    .sort((a, b) => a.song.title.localeCompare(b.song.title))

  return (
    <>
      <div className="ledger" style={{ marginTop: 36 }}>
        {takes.map(({ song, mix }) => {
          const isPlaying = current?.src === mix.src
          return (
            <div key={mix.src} className={`row${isPlaying ? ' playing' : ''}`}>
              <button
                className="num as-play"
                onClick={() => play({ ...mix, songTitle: song.title, slug: song.slug })}
                aria-label={`Play ${song.title} practice take`}
              >
                {isPlaying ? '▶' : '·'}
              </button>
              <span className="ttl">
                <Link to={`/song/${song.slug}`}>{song.title}</Link>
                <span className="sub">{mix.label}</span>
              </span>
              <span className="badges">
                {song.mixes.some((m) => m.kind !== 'practice') && (
                  <span className="badge">also a studio mix</span>
                )}
              </span>
            </div>
          )
        })}
      </div>
      <p className="note">
        {takes.length} takes from {new Set(takes.map((t) => t.song.slug)).size} songs.
      </p>
    </>
  )
}
