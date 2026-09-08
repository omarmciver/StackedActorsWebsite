import { NavLink, Link } from 'react-router-dom'
import catalog from '../data/catalog.json'

export default function Rail() {
  return (
    <nav className="rail">
      <Link to="/" className="brand">
        Stacked Actors
        <small>ARCHIVE / {catalog.stats.songs} SONGS</small>
      </Link>

      <div className="nav">
        <div className="nav-label">Records</div>
        {catalog.albums.map((a) => (
          <NavLink key={a.slug} to={`/album/${a.slug}`}>{a.title}</NavLink>
        ))}

        <div className="nav-label">More</div>
        <NavLink to="/loose">Loose &amp; unreleased</NavLink>
        <NavLink to="/practice">Vulcan Studios</NavLink>
        <NavLink to="/songbook">Songbook</NavLink>
        <NavLink to="/covers">Covers</NavLink>

        <div className="nav-label">About</div>
        <NavLink to="/archive">The archive</NavLink>
      </div>

      <div className="rail-foot">
        {catalog.stats.mixes} mixes<br />
        {catalog.stats.chordSheets} chord sheets<br />
        {catalog.stats.stems.toLocaleString()} stems preserved
      </div>
    </nav>
  )
}
