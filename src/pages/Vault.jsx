import { useState } from 'react'
import catalog from '../data/catalog.json'
import vault from '../data/vault.json'
import { useUnlockOnMount } from '../access'

/* The stems live on OneDrive. One shared root folder is configured here; each
   song deep-links into its own subfolder, so new songs need no new share.
   ponytail: a secret URL is obscurity, not access control - anyone with the
   link is in. That is the accepted trade for a trusted group of ex-bandmates.
   Upgrade path: put the /vault route behind Cloudflare Access. */
const ROOT = vault.oneDriveRoot

const folderUrl = (kind, slug) =>
  ROOT ? `${ROOT.replace(/\/$/, '')}/${kind}/${slug}` : null

const gb = (bytes) => (bytes / 1024 / 1024 / 1024).toFixed(2)

export default function Vault() {
  // Arriving here is what unlocks the private sections for this session.
  useUnlockOnMount()
  const [tab, setTab] = useState('songs')
  const [q, setQ] = useState('')

  const songs = catalog.songs
    .filter((s) => s.stemCount > 0)
    .sort((a, b) => b.stemCount - a.stemCount)
  const covers = catalog.covers
    .filter((c) => c.stemCount > 0)
    .sort((a, b) => b.stemCount - a.stemCount)

  const items = (tab === 'songs' ? songs : covers)
    .filter((i) => i.title.toLowerCase().includes(q.toLowerCase()))

  const totalBytes = [...songs, ...covers].reduce((n, i) => n + i.stemBytes, 0)

  return (
    <div className="page">
      <p className="eyebrow">Private</p>
      <h1>The vault</h1>
      <p className="lede">
        Every multitrack that survived, plus the cover recordings. If you played on any
        of this, it&rsquo;s yours &mdash; take what you want.
      </p>

      <div className="tally">
        <div><b>{songs.length}</b><span>Songs with stems</span></div>
        <div><b>{covers.length}</b><span>Covers with stems</span></div>
        <div><b>{catalog.stats.stems.toLocaleString()}</b><span>Total stems</span></div>
        <div><b>{gb(totalBytes)}<small style={{ fontSize: '0.5em' }}> GB</small></b><span>Total size</span></div>
      </div>

      {!ROOT && (
        <div className="callout">
          <p>
            <strong>Download links aren&rsquo;t live yet.</strong> The file list below is
            complete and accurate, but the OneDrive share hasn&rsquo;t been set up.
            Ask and the files can be sent directly.
          </p>
        </div>
      )}

      <h2 className="section-head">Files</h2>

      <div className="vault-controls">
        <div className="tabs">
          <button
            className={tab === 'songs' ? 'on' : ''}
            onClick={() => setTab('songs')}
          >
            Songs ({songs.length})
          </button>
          <button
            className={tab === 'covers' ? 'on' : ''}
            onClick={() => setTab('covers')}
          >
            Covers ({covers.length})
          </button>
        </div>
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Filter by title"
          aria-label="Filter by title"
        />
      </div>

      <div className="ledger">
        {items.map((i) => {
          const url = folderUrl(tab === 'songs' ? 'songs' : 'covers', i.slug)
          return (
            <div key={i.slug} className="row">
              <span className="num">·</span>
              <span className="ttl">
                {i.title}
                <span className="sub">{i.stemCount} files · {gb(i.stemBytes)} GB</span>
              </span>
              <span className="badges">
                {url
                  ? <a className="badge stem" href={url} target="_blank" rel="noreferrer">Open folder</a>
                  : <span className="badge">On request</span>}
              </span>
            </div>
          )
        })}
        {items.length === 0 && <p className="empty" style={{ padding: '20px 16px' }}>Nothing matches &ldquo;{q}&rdquo;.</p>}
      </div>

      <div className="callout">
        <p>
          <strong>Please don&rsquo;t share this link.</strong> It isn&rsquo;t password
          protected &mdash; anyone who has it can get in. The cover recordings in
          particular are other people&rsquo;s songs, so they stay between us.
        </p>
      </div>

      <p className="note">
        Stems are the raw multitrack recordings &mdash; one file per instrument, before
        mixing. They open in any DAW. Original files, unmodified.
      </p>
    </div>
  )
}
