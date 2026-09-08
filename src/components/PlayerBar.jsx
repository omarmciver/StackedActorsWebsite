import { useEffect, useRef, useState } from 'react'
import { usePlayer, formatTime } from '../player'

export default function PlayerBar() {
  const { current, playing, time, duration, toggle, seek } = usePlayer()
  const trackRef = useRef(null)
  const [dragging, setDragging] = useState(false)
  const [dragPct, setDragPct] = useState(0)

  const fractionAt = (clientX) => {
    const el = trackRef.current
    if (!el) return 0
    const r = el.getBoundingClientRect()
    return Math.max(0, Math.min(1, (clientX - r.left) / r.width))
  }

  /* Dragging is tracked on the window so the pointer can leave the bar
     mid-scrub without the handle sticking. */
  useEffect(() => {
    if (!dragging) return
    const onMove = (e) => setDragPct(fractionAt(e.clientX) * 100)
    const onUp = (e) => {
      seek(fractionAt(e.clientX))
      setDragging(false)
    }
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
    }
  }, [dragging, seek])

  if (!current) return null

  // While dragging, follow the pointer rather than the audio clock.
  const pct = dragging ? dragPct : duration ? (time / duration) * 100 : 0
  const shownTime = dragging && duration ? (dragPct / 100) * duration : time

  const onKeyDown = (e) => {
    if (!duration) return
    const step = e.shiftKey ? 30 : 5
    if (e.key === 'ArrowRight') { e.preventDefault(); seek((time + step) / duration) }
    if (e.key === 'ArrowLeft') { e.preventDefault(); seek((time - step) / duration) }
    if (e.key === 'Home') { e.preventDefault(); seek(0) }
    if (e.key === 'End') { e.preventDefault(); seek(0.999) }
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
        <span className="time">{formatTime(shownTime)}</span>
        <div
          ref={trackRef}
          className={`track${dragging ? ' dragging' : ''}`}
          onPointerDown={(e) => {
            e.preventDefault()
            setDragPct(fractionAt(e.clientX) * 100)
            setDragging(true)
          }}
          role="slider"
          tabIndex={0}
          aria-label="Seek"
          aria-valuemin={0}
          aria-valuemax={Math.round(duration) || 0}
          aria-valuenow={Math.round(shownTime)}
          aria-valuetext={`${formatTime(shownTime)} of ${formatTime(duration)}`}
          onKeyDown={onKeyDown}
        >
          <i style={{ width: `${pct}%` }} />
        </div>
        <span className="time">{formatTime(duration)}</span>
      </div>
    </div>
  )
}
