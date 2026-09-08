import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import catalog from '../data/catalog.json'
import { usePlayer } from '../player'
import { renderSheet } from '../chords'

const KIND_LABEL = {
  album: 'Album mix',
  demo: 'Demo',
  practice: 'Vulcan Studios practice',
  mix: 'Mix',
}

export default function Song() {
  const { slug } = useParams()
  const song = catalog.songs.find((s) => s.slug === slug)
  const { current, play } = usePlayer()
  const [semitones, setSemitones] = useState(0)

  if (!song) return <div className="page"><h1>Not found</h1></div>

  const album = catalog.albums.find((a) => a.slug === song.album)
  const lines = song.lyrics ? renderSheet(song.lyrics.text, semitones) : null

  return (
    <div className="page">
      <Link to={album ? `/album/${album.slug}` : '/loose'} className="back">
        &larr; {album ? album.title : 'Loose & unreleased'}
      </Link>

      <p className="eyebrow">{song.songId || 'Song'}</p>
      <h1>{song.title}</h1>

      {song.mixes.length > 0 ? (
        <>
          <h2 className="section-head">
            {song.mixes.length === 1 ? 'Recording' : `${song.mixes.length} takes`}
          </h2>
          <div className="ledger">
            {song.mixes.map((m) => {
              const isPlaying = current?.src === m.src
              return (
                <div key={m.src} className={`row${isPlaying ? ' playing' : ''}`}>
                  <button
                    className="num as-play"
                    onClick={() => play({ ...m, songTitle: song.title, slug: song.slug })}
                    aria-label={`Play ${m.label}`}
                  >
                    {isPlaying ? '▶' : '·'}
                  </button>
                  <span className="ttl">
                    {m.label}
                    <span className="sub">{KIND_LABEL[m.kind] || 'Mix'}</span>
                  </span>
                  <span className="badges">
                    <span className="badge">{(m.bytes / 1024 / 1024).toFixed(1)} MB</span>
                  </span>
                </div>
              )
            })}
          </div>
        </>
      ) : (
        <p className="empty">No mix has been recovered for this song yet.</p>
      )}

      {lines && (
        <>
          <h2 className="section-head">
            {song.lyrics.hasChords ? 'Lyrics & chords' : 'Lyrics'}
          </h2>

          {song.lyrics.hasChords && (
            <div className="transpose">
              <span>Transpose</span>
              <button onClick={() => setSemitones((n) => n - 1)} aria-label="Down a semitone">&minus;</button>
              <span className="val">{semitones > 0 ? `+${semitones}` : semitones}</span>
              <button onClick={() => setSemitones((n) => n + 1)} aria-label="Up a semitone">+</button>
              {semitones !== 0 && (
                <button onClick={() => setSemitones(0)} style={{ marginLeft: 4 }}>Reset</button>
              )}
            </div>
          )}

          <pre className="chords">
            {lines.map((l) => (
              <span key={l.key} className={l.chord ? 'chord' : undefined}>
                {l.text}{'\n'}
              </span>
            ))}
          </pre>
          <p className="note">From {song.lyrics.source}, as written.</p>
        </>
      )}

      {song.stemCount > 0 && (
        <>
          <h2 className="section-head">Multitracks</h2>
          <div className="callout">
            <p>
              <strong>{song.stemCount} stems</strong> survive for this song
              ({(song.stemBytes / 1024 / 1024 / 1024).toFixed(1)} GB).
              They&rsquo;re available to anyone who played on them &mdash; ask Omar for the link.
            </p>
          </div>
        </>
      )}

      {song.openQuestions.length > 0 && (
        <>
          <h2 className="section-head">Still unknown</h2>
          <div className="prose">
            <ul style={{ paddingLeft: 20, color: 'var(--muted)', fontWeight: 300 }}>
              {song.openQuestions.map((q, i) => <li key={i} style={{ marginBottom: 8 }}>{q}</li>)}
            </ul>
          </div>
        </>
      )}
    </div>
  )
}
