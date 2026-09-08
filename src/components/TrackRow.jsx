import { Link } from 'react-router-dom'
import { usePlayer } from '../player'

/** One line in a track ledger.
 *  Clicking the number plays; the title links through to the song page. */
export default function TrackRow({ track, song, mix }) {
  const { current, play } = usePlayer()

  if (!song) {
    return (
      <div className="row missing">
        <span className="num">{String(track).padStart(2, '0')}</span>
        <span className="ttl">never found</span>
        <span className="badges"><span className="badge">Missing</span></span>
      </div>
    )
  }

  const primary = mix || song.mixes[0]
  const isPlaying = primary && current?.src === primary.src

  return (
    <div className={`row${isPlaying ? ' playing' : ''}`}>
      <button
        className="num as-play"
        onClick={() => primary && play({ ...primary, songTitle: song.title, slug: song.slug })}
        disabled={!primary}
        aria-label={primary ? `Play ${song.title}` : `${song.title} has no audio`}
      >
        {isPlaying ? '▶' : track != null ? String(track).padStart(2, '0') : '·'}
      </button>

      <span className="ttl">
        <Link to={`/song/${song.slug}`}>{song.title}</Link>
        {primary && primary.label !== song.title && (
          <span className="sub">{primary.label}</span>
        )}
        {!primary && <span className="sub">no mix recovered</span>}
      </span>

      <span className="badges">
        {song.mixes.length > 1 && <span className="badge">{song.mixes.length} takes</span>}
        {song.lyrics?.hasChords && <span className="badge lyr">Chords</span>}
        {song.stemCount > 0 && <span className="badge stem">{song.stemCount} stems</span>}
      </span>
    </div>
  )
}
