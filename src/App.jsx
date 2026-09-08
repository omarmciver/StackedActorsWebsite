import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Rail from './components/Rail'
import PlayerBar from './components/PlayerBar'
import Home from './pages/Home'
import Album from './pages/Album'
import Song from './pages/Song'
import Collection from './pages/Collection'
import Songbook from './pages/Songbook'
import Covers from './pages/Covers'
import Archive from './pages/Archive'
import Vault from './pages/Vault'

/* The vault path is a secret URL. It is injected at build time so it never
   appears in the repo; without it the route falls back to something
   unguessable-but-known, which is only useful for local development. */
const VAULT_PATH = import.meta.env.VITE_VAULT_PATH || 'vault-dev-only'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

export default function App() {
  return (
    <div className="shell">
      <Rail />
      <main className="main">
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/album/:slug" element={<Album />} />
          <Route path="/song/:slug" element={<Song />} />
          <Route path="/loose" element={<Collection section="loose" />} />
          <Route path="/practice" element={<Collection section="practice" />} />
          <Route path="/songbook" element={<Songbook />} />
          <Route path="/covers" element={<Covers />} />
          <Route path="/archive" element={<Archive />} />
          <Route path={`/${VAULT_PATH}`} element={<Vault />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <PlayerBar />
    </div>
  )
}

function NotFound() {
  return (
    <div className="page">
      <p className="eyebrow">404</p>
      <h1>Nothing here</h1>
      <p className="lede">That page doesn&rsquo;t exist. Plenty of the archive does.</p>
    </div>
  )
}
