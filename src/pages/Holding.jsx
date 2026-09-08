import catalog from '../data/catalog.json'

/* Shown to everyone until the catalogue work is finished. The secret link
   bypasses it - see App.jsx - so the real site stays reviewable meanwhile. */
export default function Holding() {
  return (
    <div className="holding">
      <div className="holding-inner">
        <p className="eyebrow">Coming soon</p>
        <h1>Stacked Actors</h1>
        <p className="holding-lede">
          Twenty years of recorded music is being dug out of a stack of backup CDs,
          catalogued and preserved. {catalog.stats.songs} songs so far.
        </p>
        <p className="holding-lede">
          It&rsquo;ll be here when it&rsquo;s ready.
        </p>
      </div>
    </div>
  )
}
