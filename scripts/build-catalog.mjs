#!/usr/bin/env node
/**
 * Reads the song archive and emits src/data/catalog.json.
 *
 * The archive is the single source of truth; this script never writes to it.
 * Run: node scripts/build-catalog.mjs [--archive <path>]
 */

import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync, statSync } from 'node:fs'
import { join, dirname, basename, extname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')

const argArchive = process.argv.indexOf('--archive')
const ARCHIVE = argArchive !== -1
  ? process.argv[argArchive + 1]
  : process.env.MUSIC_ARCHIVE || '/mnt/s/My Music'

/* ---------------------------------------------------------------- helpers */

/** Minimal YAML reader for the flat `key: value` pairs this archive uses.
 *  ponytail: not a general YAML parser - handles scalars and `- ` lists at any
 *  indent, which is all song.yaml/cover.yaml need. Ceiling: nested maps inside
 *  lists are returned as raw strings. Upgrade path: `yaml` package if the
 *  archive schema ever grows. */
function readYaml(path) {
  const out = {}
  let listKey = null
  for (const raw of readFileSync(path, 'utf8').split('\n')) {
    const line = raw.replace(/\s+#.*$/, '').trimEnd()
    if (!line.trim() || line.trim().startsWith('#')) continue

    const item = line.match(/^\s*-\s+(.*)$/)
    if (item && listKey) {
      out[listKey].push(unquote(item[1]))
      continue
    }

    const kv = line.match(/^(\s*)([A-Za-z0-9_]+):\s*(.*)$/)
    if (!kv) continue
    const [, indent, key, value] = kv
    if (indent.length > 0) continue // only top-level keys

    if (value === '') {
      listKey = key
      out[key] = []
    } else {
      listKey = null
      out[key] = unquote(value)
    }
  }
  return out
}

const unquote = (s) => s.replace(/^["']|["']$/g, '').trim()

/** Normalise a title or filename down to a comparable key. */
function normalise(s) {
  return s
    .toLowerCase()
    .replace(/\.[a-z0-9]+$/, '')          // extension
    .replace(/^\d{1,2}\s*[-.]\s*/, '')     // leading track number
    .replace(/\([^)]*\)/g, '')             // parentheticals: (16-bit master)
    .replace(/\b(16|24)[\s-]?bit\b/g, '')
    .replace(/\bmp3\s*320\b/g, '')
    .replace(/\bmaster(ed)?\b/g, '')
    .replace(/\bwith verb\b/g, '')
    .replace(/[^a-z0-9]+/g, '')
    .trim()
}

function walk(dir, filter, acc = []) {
  if (!existsSync(dir)) return acc
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) walk(full, filter, acc)
    else if (filter(entry.name)) acc.push(full)
  }
  return acc
}

const isAudio = (n) => /\.(mp3|m4a)$/i.test(n)
const isStem = (n) => /\.wav$/i.test(n)

/* ------------------------------------------------------------------ mixes */

/** Classify a mix by its filename, so the site can group takes sensibly. */
function classifyMix(filename) {
  const n = filename.toLowerCase()
  if (n.includes('vulcan')) return 'practice'
  if (/\bdemo\b/.test(n)) return 'demo'
  if (/^\d{2}\s*-\s*/.test(filename)) return 'album'
  return 'mix'
}

/** Track number if the filename carries one. */
function trackNumber(filename) {
  const m = filename.match(/^(\d{1,2})\s*-\s*/)
  return m ? parseInt(m[1], 10) : null
}

/** Human title from a mix filename. */
function mixLabel(filename) {
  return basename(filename, extname(filename))
    .replace(/^\d{1,2}\s*-\s*/, '')
    .trim()
}

/* ----------------------------------------------------------------- lyrics */

function loadLyrics(archive) {
  const dir = join(archive, 'lyrics')
  if (!existsSync(dir)) return []
  return readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => {
      const body = readFileSync(join(dir, f), 'utf8')
      return {
        file: f,
        key: normalise(f),
        title: basename(f, '.md'),
        ...parseLyricBody(body),
      }
    })
}

/** Strip the markdown heading + code fence, and detect chords above lines. */
function parseLyricBody(raw) {
  let text = raw.replace(/^#\s+.*\n/, '')
  const fence = text.match(/```(?:text)?\n([\s\S]*?)```/)
  if (fence) text = fence[1]
  text = text.replace(/\n{3,}/g, '\n\n').trim()

  // A chord line is short, and made only of chord-ish tokens.
  const chordRe = /^[A-G](#|b)?(maj|min|m|sus|dim|aug|add)?[0-9]*(\/[A-G](#|b)?)?$/
  const hasChords = text.split('\n').some((line) => {
    const toks = line.trim().split(/\s+/).filter(Boolean)
    return toks.length > 0 && toks.length <= 12 && toks.every((t) => chordRe.test(t))
  })

  return { text, hasChords }
}

/* ------------------------------------------------------------------ songs */

function buildSongs(archive, lyrics) {
  const songsDir = join(archive, 'songs')
  const songs = []

  for (const slug of readdirSync(songsDir).sort()) {
    const dir = join(songsDir, slug)
    if (!statSync(dir).isDirectory()) continue

    const yamlPath = join(dir, 'song.yaml')
    const meta = existsSync(yamlPath) ? readYaml(yamlPath) : {}

    const title = meta.canonical_title || slug.replace(/-/g, ' ')

    const mixes = walk(dir, isAudio).map((full) => {
      const file = basename(full)
      return {
        file,
        label: mixLabel(file),
        kind: classifyMix(file),
        track: trackNumber(file),
        // Flat key in the R2 bucket; the archive nests these under mixes/ or audio/.
        src: `mixes/${slug}/${file}`,
        from: full,
        bytes: statSync(full).size,
      }
    }).sort((a, b) => (a.track ?? 99) - (b.track ?? 99) || a.label.localeCompare(b.label))

    const stems = walk(dir, isStem)

    // Match a lyric sheet by normalised title, then by any mix filename.
    // Several songs have duplicate sheets (e.g. "Tonight.md" and
    // "04 - Tonight.md"); prefer the one with chords, then the longer one.
    const keys = [normalise(title), ...mixes.map((m) => normalise(m.file))]
    const lyric = lyrics
      .filter((l) => keys.includes(l.key))
      .sort((a, b) => (b.hasChords - a.hasChords) || (b.text.length - a.text.length))[0]

    songs.push({
      slug,
      songId: meta.song_id || null,
      title,
      status: meta.archive_status_identification || meta.identification || null,
      tags: Array.isArray(meta.tags) ? meta.tags : parseInlineList(meta.tags),
      mixes,
      stemCount: stems.length,
      stemBytes: stems.reduce((s, f) => s + statSync(f).size, 0),
      lyrics: lyric ? { text: lyric.text, hasChords: lyric.hasChords, source: lyric.file } : null,
      openQuestions: Array.isArray(meta.open_questions) ? meta.open_questions : [],
    })
  }

  return songs
}

function parseInlineList(v) {
  if (!v || typeof v !== 'string') return []
  return v.replace(/^\[|\]$/g, '').split(',').map((s) => s.trim()).filter(Boolean)
}

/* ----------------------------------------------------------------- covers */

function buildCovers(archive) {
  const dir = join(archive, 'covers')
  if (!existsSync(dir)) return []

  return readdirSync(dir)
    .filter((s) => statSync(join(dir, s)).isDirectory())
    .sort()
    .map((slug) => {
      const cdir = join(dir, slug)
      const yamlPath = join(cdir, 'cover.yaml')
      const meta = existsSync(yamlPath) ? readYaml(yamlPath) : {}
      const stems = walk(cdir, isStem)
      return {
        slug,
        title: meta.title || slug.replace(/-/g, ' '),
        originalArtist: meta.original_artist === 'null' ? null : meta.original_artist || null,
        stemCount: stems.length,
        stemBytes: stems.reduce((s, f) => s + statSync(f).size, 0),
        // Deliberately no audio: covers are other people's songs.
        lyrics: null,
      }
    })
}

/* ----------------------------------------------------------------- albums */

/** The two coherent numbered runs, confirmed against the archive. */
const ALBUMS = [
  {
    slug: 'time-lost',
    title: 'Time Lost',
    blurb: 'The closest thing to a finished record. Track 11 was never titled.',
    tracks: [
      ['fighting-my-own-demons', 1], ['terri', 2], ['unintended-lies', 3], ['tonight', 4],
      ['inner-child', 5], ['spiders', 6], ['something-s-missing', 7], ['i-understand-you', 8],
      ['you-are-there', 9], ['stolen-promise', 10], ['time-lost-track-11', 11],
    ],
  },
  {
    slug: 'early-demo-cd',
    title: 'Early Demo CD',
    blurb: 'A complete ten-track run, recovered intact from the backup CDs.',
    tracks: [
      ['oveconfident', 1], ['latrigg', 2], ['fallen-angels', 3], ['which-way-to-go', 4],
      ['make-it-clear', 5], ['just-one-of-those-days', 6], ['shed-song', 7],
      ['stay-untamed', 8], ['a-girl-like-you', 9], ['not-there', 10],
    ],
  },
]

/* ------------------------------------------------------------------- main */

const lyrics = loadLyrics(ARCHIVE)
const songs = buildSongs(ARCHIVE, lyrics)
const covers = buildCovers(ARCHIVE)

const bySlug = new Map(songs.map((s) => [s.slug, s]))
const albums = ALBUMS.map((a) => ({
  ...a,
  tracks: a.tracks.map(([slug, n]) => {
    if (!slug) return { track: n, missing: true }
    const song = bySlug.get(slug)
    if (!song) {
      console.warn(`  ! album ${a.slug} track ${n}: no song "${slug}"`)
      return { track: n, missing: true }
    }
    return { track: n, slug, title: song.title }
  }),
}))

// Songs on an album are shown there; the rest are grouped by what they are.
for (const s of songs) {
  s.album = albums.find((a) => a.tracks.some((t) => t.slug === s.slug))?.slug || null
  const kinds = new Set(s.mixes.map((m) => m.kind))
  s.section = s.album ? 'album'
    : kinds.has('practice') && kinds.size === 1 ? 'practice'
    : s.mixes.length ? 'loose'
    : 'unreleased'
}

const playable = songs.filter((s) => s.mixes.length > 0)

// The manifest the upload script reads. Mixes only - stems live on OneDrive.
// Built before `from` is stripped, since the uploader needs the local path.
const manifest = playable.flatMap((s) =>
  s.mixes.map((m) => ({ src: m.src, from: m.from }))
)
// `from` is an absolute local path - useful to the uploader, noise in the app.
for (const s of songs) for (const m of s.mixes) delete m.from

const catalog = {
  generated: new Date().toISOString().slice(0, 10),
  stats: {
    songs: songs.length,
    playable: playable.length,
    mixes: songs.reduce((n, s) => n + s.mixes.length, 0),
    lyrics: songs.filter((s) => s.lyrics).length,
    chordSheets: songs.filter((s) => s.lyrics?.hasChords).length,
    stems: songs.reduce((n, s) => n + s.stemCount, 0),
    covers: covers.length,
  },
  albums,
  songs,
  covers,
}

const outDir = join(ROOT, 'src', 'data')
mkdirSync(outDir, { recursive: true })
writeFileSync(join(outDir, 'catalog.json'), JSON.stringify(catalog, null, 2))

const { stats } = catalog
console.log(`catalog.json written from ${ARCHIVE}`)
console.log(`  ${stats.songs} songs (${stats.playable} playable, ${stats.mixes} mixes)`)
console.log(`  ${stats.lyrics} lyric sheets (${stats.chordSheets} with chords)`)
console.log(`  ${stats.stems} stems, ${stats.covers} covers`)

writeFileSync(join(outDir, 'upload-manifest.json'), JSON.stringify(manifest, null, 2))
console.log(`  upload-manifest.json: ${manifest.length} files`)
