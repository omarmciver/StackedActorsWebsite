import { usePlayer, formatTime } from '../player'

export default function PlayerBar() {
  const { current, playing, time, duration, toggle, seek } = usePlayer()
  if (!current) return null

  const pct = duration ? (time / duration) * 100 : 0

  const onSeek = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    seek((e.clientX - r.left) / r.width)
  }

  return (
    <div className="bar">
      <button className="play" onClick={toggle} aria-label={playing ? 'Pause' : 'Play'}>
        {playing ? '❚❚' : '▶'}
      </button>

      <div className="bar-meta">
        <div className="bar-title">{current.songTitle}</div>
        <div className="bar-sub">{current.label}</div>
      </div>

      <div className="bar-scrub">
        <span className="time">{formatTime(time)}</span>
        <div
          className="track"
          onClick={onSeek}
          role="slider"
          tabIndex={0}
          aria-label="Seek"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pct)}
          onKeyDown={(e) => {
            if (e.key === 'ArrowRight') seek((time + 5) / (duration || 1))
            if (e.key === 'ArrowLeft') seek((time - 5) / (duration || 1))
          }}
        >
          <i style={{ width: `${pct}%` }} />
        </div>
        <span className="time">{formatTime(duration)}</span>
      </div>
    </div>
  )
}
