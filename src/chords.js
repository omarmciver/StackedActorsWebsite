/* Chord sheets in the archive put chords on their own line, positioned above
   the lyric they land on. Transposing must preserve that column alignment,
   so a chord that gets longer (F -> F#) steals a following space rather than
   pushing the rest of the line sideways. */

const SHARPS = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#']
const FLATS = ['A', 'Bb', 'B', 'C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab']

const ROOT = '[A-G](?:#|b)?'
const QUALITY = '(?:maj|min|m|sus|dim|aug|add|M)?[0-9]*(?:sus[0-9]*)?(?:add[0-9]*)?'
const CHORD_RE = new RegExp(`^(${ROOT})(${QUALITY})(?:/(${ROOT}))?$`)

const index = (note) => {
  const i = SHARPS.indexOf(note)
  return i !== -1 ? i : FLATS.indexOf(note)
}

/** True if every token on the line parses as a chord. */
export function isChordLine(line) {
  const toks = line.trim().split(/\s+/).filter(Boolean)
  if (!toks.length || toks.length > 14) return false
  return toks.every((t) => CHORD_RE.test(t))
}

function shiftNote(note, semitones, preferFlats) {
  const i = index(note)
  if (i === -1) return note
  const table = preferFlats ? FLATS : SHARPS
  return table[(((i + semitones) % 12) + 12) % 12]
}

export function transposeChord(chord, semitones, preferFlats) {
  const m = chord.match(CHORD_RE)
  if (!m) return chord
  const [, root, quality, bass] = m
  const out = shiftNote(root, semitones, preferFlats) + (quality || '')
  return bass ? `${out}/${shiftNote(bass, semitones, preferFlats)}` : out
}

/** Transpose one chord line, holding each chord's starting column. */
function transposeLine(line, semitones, preferFlats) {
  let out = ''
  // Walk token-by-token, keeping track of where each one started.
  const re = /(\s*)(\S+)/g
  let m
  while ((m = re.exec(line)) !== null) {
    const [, gap, token] = m
    const moved = transposeChord(token, semitones, preferFlats)
    // Keep the column: if the chord grew, eat spaces from the gap we just
    // emitted; if it shrank, pad. Never let a line drift left of column 0.
    const delta = moved.length - token.length
    let space = gap
    if (delta > 0) space = gap.slice(0, Math.max(0, gap.length - delta))
    else if (delta < 0) space = gap + ' '.repeat(-delta)
    // A chord at the very start of a line has no gap to steal from; in that
    // case everything after it shifts, which is unavoidable and harmless.
    out += space + moved
  }
  return out
}

/** Split a sheet into lines tagged as chords or lyrics, transposing chords. */
export function renderSheet(text, semitones = 0) {
  // Flats read better going down, sharps going up - matches how the sheets
  // were written (they use Eb, Bb rather than D#, A#).
  const preferFlats = semitones <= 0
  return text.split('\n').map((line, i) => {
    const chord = isChordLine(line)
    return {
      key: i,
      chord,
      text: chord && semitones ? transposeLine(line, semitones, preferFlats) : line,
    }
  })
}
