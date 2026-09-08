#!/usr/bin/env node
/** Self-check for chord transposition: node scripts/chords.test.mjs */

import assert from 'node:assert/strict'
import { transposeChord, isChordLine, renderSheet } from '../src/chords.js'

/* Roots and wrap-around. */
assert.equal(transposeChord('A', 2, false), 'B')
assert.equal(transposeChord('G', 1, false), 'G#')
assert.equal(transposeChord('G', 1, true), 'Ab')
assert.equal(transposeChord('B', 1, false), 'C')      // wraps
assert.equal(transposeChord('C', -1, true), 'B')      // wraps back
assert.equal(transposeChord('A', 12, false), 'A')     // full octave
assert.equal(transposeChord('A', -12, false), 'A')

/* Qualities and slash chords survive intact. */
assert.equal(transposeChord('Am', 2, false), 'Bm')
assert.equal(transposeChord('Ebmaj7', 1, false), 'Emaj7')
assert.equal(transposeChord('Csus4', 2, false), 'Dsus4')
assert.equal(transposeChord('F#m7', 1, false), 'Gm7')
assert.equal(transposeChord('C/G', 2, false), 'D/A')
assert.equal(transposeChord('Bb', 0, true), 'Bb')

/* Non-chords pass through untouched. */
assert.equal(transposeChord('Racing', 2, false), 'Racing')

/* Chord-line detection: the archive's real lines. */
assert.ok(isChordLine('Eb                 Am'))
assert.ok(isChordLine('       Eb           A'))
assert.ok(isChordLine('Gm Ebmaj7 Gm'))
assert.ok(!isChordLine("Racing through the streets"))
assert.ok(!isChordLine('I really don\'t know where to go'))
assert.ok(!isChordLine(''))
// "A lie I don't care about" starts with a valid chord token but isn't a chord line.
assert.ok(!isChordLine("A lie I don't care about"))

/* Column alignment is the whole point - chords must stay above their word. */
const sheet = 'Eb                 Am\nRacing through the streets'
const up = renderSheet(sheet, 1)
assert.equal(up[0].chord, true)
assert.equal(up[1].chord, false)
assert.equal(up[1].text, 'Racing through the streets', 'lyrics must not be transposed')

/* A chord that grows by one char steals a space, holding the next column. */
const grow = renderSheet('C    F\nword here', 6)   // C->F#, F->B
assert.equal(grow[0].text.indexOf('B'), grow[0].text.length - 1)
assert.ok(grow[0].text.length <= 'C    F'.length + 1, 'line should not drift right')

/* A chord that shrinks pads, holding alignment. */
const shrink = renderSheet('C#   F#\nword', -1)     // C#->C, F#->F
assert.equal(shrink[0].text.length, 'C#   F#'.length, 'shrunk line should keep its width')

/* Zero transpose is a pure passthrough. */
const same = renderSheet(sheet, 0)
assert.equal(same[0].text, 'Eb                 Am')

console.log('ok - chord transposition, detection, and column alignment')
