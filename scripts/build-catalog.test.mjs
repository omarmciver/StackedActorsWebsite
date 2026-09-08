#!/usr/bin/env node
/**
 * Self-check for the catalog build. Run after build-catalog.mjs:
 *   node scripts/build-catalog.mjs && node scripts/build-catalog.test.mjs
 *
 * Guards the things that would silently ship wrong content:
 * local paths leaking to the browser, cover audio being exposed,
 * chord detection breaking, and album runs losing tracks.
 */

import { readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import assert from 'node:assert/strict'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const catalog = JSON.parse(readFileSync(join(ROOT, 'src/data/catalog.json'), 'utf8'))
const manifest = JSON.parse(readFileSync(join(ROOT, 'src/data/upload-manifest.json'), 'utf8'))

const { songs, covers, albums, stats } = catalog

/* No local filesystem paths may reach the client bundle. */
const serialised = JSON.stringify(catalog)
assert.ok(!serialised.includes('/mnt/'), 'catalog leaks local archive paths')
assert.ok(!/"from"/.test(serialised), 'catalog leaks uploader `from` field')

/* Covers are other people\'s songs: metadata only, never audio. */
for (const c of covers) {
  assert.ok(!('mixes' in c), `cover ${c.slug} has mixes`)
  assert.ok(!('src' in c), `cover ${c.slug} has an audio src`)
}
assert.ok(!serialised.includes('covers/'), 'a covers/ audio path reached the catalog')

/* The uploader needs real local paths, and only mixes - never stems. */
assert.equal(manifest.length, stats.mixes, 'manifest does not cover every mix')
for (const m of manifest) {
  assert.ok(m.from.startsWith('/'), `manifest entry lacks an absolute path: ${m.src}`)
  assert.ok(m.src.startsWith('mixes/'), `manifest entry outside mixes/: ${m.src}`)
  assert.ok(!/\.wav$/i.test(m.from), `manifest contains a stem: ${m.from}`)
}

/* Album runs must keep every slot, including the known gaps. */
const timeLost = albums.find((a) => a.slug === 'time-lost')
assert.equal(timeLost.tracks.length, 11, 'Time Lost lost a track slot')
assert.ok(timeLost.tracks.find((t) => t.track === 2).missing, 'Time Lost 02 should be missing')
assert.equal(albums.find((a) => a.slug === 'early-demo-cd').tracks.length, 10)
for (const a of albums) {
  for (const t of a.tracks) {
    assert.ok(t.missing || t.title, `${a.slug} track ${t.track} has no title`)
  }
}

/* Chord detection is the site\'s differentiator - assert it actually fires. */
assert.ok(stats.chordSheets >= 30, `chord detection regressed: ${stats.chordSheets}`)
const terri = songs.find((s) => s.slug === 'terri')
assert.ok(terri?.lyrics?.hasChords, 'Terri should have a chord sheet')
assert.ok(terri.lyrics.text.includes('Racing through the streets'), 'Terri lyrics body missing')
assert.ok(!terri.lyrics.text.includes('```'), 'code fence not stripped from lyrics')

/* Duplicate lyric sheets: the richer one must win. */
const tonight = songs.find((s) => s.slug === 'tonight')
if (tonight?.lyrics) assert.ok(tonight.lyrics.hasChords, 'Tonight picked the chordless duplicate')

/* Every playable mix needs somewhere to stream from. */
for (const s of songs) {
  for (const m of s.mixes) {
    assert.ok(m.src && m.label, `${s.slug} has a malformed mix`)
    assert.ok(['album', 'demo', 'practice', 'mix'].includes(m.kind), `bad kind ${m.kind}`)
  }
}

console.log(`ok - ${stats.songs} songs, ${stats.mixes} mixes, ${stats.chordSheets} chord sheets, ${covers.length} covers (no audio)`)
