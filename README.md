# stackedactors.com

The public site for the Stacked Actors song archive. Everything on it is generated
from the archive itself — no track data is typed in by hand, so the site cannot drift
away from what actually exists on disk.

## How it fits together

| Where | What |
|---|---|
| `S:\My Music` (`/mnt/s/My Music`) | The archive. Source of truth. **Never written to.** |
| `scripts/build-catalog.mjs` | Reads the archive → `src/data/catalog.json` |
| R2 bucket `stackedactors-mixes` | The 78 playable mixes (354 MB) |
| OneDrive | The 2,733 stems (48 GB) + cover audio (7.7 GB) |
| `worker/index.js` | Serves the site and streams audio from R2 |

Stems are deliberately **not** in R2 — 56 GB of WAVs that a handful of people touch
occasionally doesn't justify the storage cost. The vault links out to OneDrive instead.

## Running it

```bash
yarn install
yarn catalog        # regenerate catalog.json from the archive
yarn dev            # local dev server
yarn build          # catalog + production build
yarn deploy         # build + push to Cloudflare
```

The archive must be mounted for `yarn catalog`. Point it elsewhere with
`node scripts/build-catalog.mjs --archive /some/path` or `MUSIC_ARCHIVE=...`.

`catalog.json` is gitignored — it's a build artifact, regenerated from the archive.

## Checks

```bash
node scripts/build-catalog.mjs && node scripts/build-catalog.test.mjs
node scripts/chords.test.mjs
```

The catalog check guards the things that would silently ship wrong content: local
filesystem paths leaking into the browser bundle, cover audio being exposed, chord
detection regressing, and album runs losing tracks. The chord check covers
transposition and — importantly — that chords stay aligned above their words.

## Uploading audio

```bash
node scripts/upload-mixes.mjs --dry    # list what would go up
node scripts/upload-mixes.mjs          # upload all
node scripts/upload-mixes.mjs --resume # skip files already uploaded
```

Safe to re-run — `put` overwrites. Add `--resume` after a partial upload to skip
files already in the bucket (slower per file, but avoids re-sending them).
Mixes only — never stems.

## The vault

`/<secret-path>` lists every song and cover with surviving multitracks, linking into
OneDrive. It is not linked from anywhere on the site and is served with
`x-robots-tag: noindex, nofollow, noarchive` so it stays out of search results.

Note that `robots.txt` deliberately does **not** mention the vault path — robots.txt
is public, so a `Disallow:` line would hand the secret to anyone who read it.

**This is obscurity, not access control.** Anyone with the URL can open it, and
sharing it hands over the same access. That's the accepted trade for a small trusted
group. To make it real access control instead, put the route behind Cloudflare Access.

The path is kept out of git — it's the only thing gating the vault. It lives in two
places, which must match:

```bash
npx wrangler secret put VAULT_PATH   # the Worker (robots.txt + noindex)
# VITE_VAULT_PATH=... in .env.local  # the build (which route to mount)
```

To rotate the link, set both to a new value and redeploy.

### Wiring up the OneDrive links

1. Put the stems on OneDrive as `songs/<slug>/` and `covers/<slug>/`, using the same
   slugs as the archive.
2. Share the **parent** folder and copy the link.
3. Paste it into `src/data/vault.json` as `oneDriveRoot`.

Until that's set, the vault still lists everything accurately and shows "on request"
instead of a broken link.

## Covers

Covers are listed but never streamed — they're other people's songs. The build check
asserts no cover audio path can reach the catalogue, so this can't regress by accident.

## Editing content

Song titles, lyrics, chords and stem counts all come from the archive — fix them there
and re-run `yarn catalog`. Things that live in this repo:

- Album track lists: `ALBUMS` in `scripts/build-catalog.mjs`
- Page copy: `src/pages/*.jsx`
- Design tokens: `src/styles/app.css`
