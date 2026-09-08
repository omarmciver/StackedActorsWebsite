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
import { useAccess } from './access'

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
          <Route path="/archive" element={<Archive />} />
          <Route path={`/${VAULT_PATH}`} element={<Vault />} />

          {/* Private sections: reachable only once the secret link has been
              visited this session. Locked, they render as 404 rather than an
              access-denied page, which would advertise that they exist. */}
          <Route path="/loose" element={<Private><Collection section="loose" /></Private>} />
          <Route path="/practice" element={<Private><Collection section="practice" /></Private>} />
          <Route path="/songbook" element={<Private><Songbook /></Private>} />
          <Route path="/covers" element={<Private><Covers /></Private>} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <PlayerBar />
    </div>
  )
}

/* Gates a private section. Renders the 404 when locked so a stray visitor
   learns nothing about what is behind the link. */
function Private({ children }) {
  const { unlocked } = useAccess()
  return unlocked ? children : <NotFound />
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
