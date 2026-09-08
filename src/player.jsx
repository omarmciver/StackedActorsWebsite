import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react'

/* Audio lives in R2; the base URL is baked in at build time so the site
   stays fully static. */
const AUDIO_BASE = (import.meta.env.VITE_AUDIO_BASE || '/audio').replace(/\/$/, '')

export const audioUrl = (src) => `${AUDIO_BASE}/${src.split('/').map(encodeURIComponent).join('/')}`

const PlayerContext = createContext(null)

export function PlayerProvider({ children }) {
  const audioRef = useRef(null)
  const [current, setCurrent] = useState(null) // { src, label, songTitle, slug }
  const [playing, setPlaying] = useState(false)
  const [time, setTime] = useState(0)
  const [duration, setDuration] = useState(0)

  if (!audioRef.current && typeof Audio !== 'undefined') {
    audioRef.current = new Audio()
    audioRef.current.preload = 'metadata'
  }

  useEffect(() => {
    const a = audioRef.current
    if (!a) return
    const onTime = () => setTime(a.currentTime)
    const onMeta = () => setDuration(a.duration || 0)
    const onEnd = () => setPlaying(false)
    const onPlay = () => setPlaying(true)
    const onPause = () => setPlaying(false)
    a.addEventListener('timeupdate', onTime)
    a.addEventListener('loadedmetadata', onMeta)
    a.addEventListener('ended', onEnd)
    a.addEventListener('play', onPlay)
    a.addEventListener('pause', onPause)
    return () => {
      a.removeEventListener('timeupdate', onTime)
      a.removeEventListener('loadedmetadata', onMeta)
      a.removeEventListener('ended', onEnd)
      a.removeEventListener('play', onPlay)
      a.removeEventListener('pause', onPause)
    }
  }, [])

  const value = useMemo(() => ({
    current,
    playing,
    time,
    duration,

    play(track) {
      const a = audioRef.current
      if (!a) return
      if (current?.src === track.src) {
        a.paused ? a.play().catch(() => {}) : a.pause()
        return
      }
      a.src = audioUrl(track.src)
      setCurrent(track)
      setTime(0)
      setDuration(0)
      a.play().catch(() => {})
    },

    toggle() {
      const a = audioRef.current
      if (!a || !current) return
      a.paused ? a.play().catch(() => {}) : a.pause()
    },

    seek(fraction) {
      const a = audioRef.current
      if (!a || !a.duration) return
      a.currentTime = Math.max(0, Math.min(1, fraction)) * a.duration
    },
  }), [current, playing, time, duration])

  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
}

export const usePlayer = () => useContext(PlayerContext)

export function formatTime(s) {
  if (!s || !isFinite(s)) return '0:00'
  const m = Math.floor(s / 60)
  return `${m}:${String(Math.floor(s % 60)).padStart(2, '0')}`
}
