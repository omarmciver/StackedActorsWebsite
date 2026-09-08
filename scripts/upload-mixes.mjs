#!/usr/bin/env node
/**
 * Uploads the 78 mixes to R2 from src/data/upload-manifest.json.
 *
 *   node scripts/upload-mixes.mjs [--dry] [--force]
 *
 * Skips anything already in the bucket, so it is safe to re-run after a
 * failure. Stems are NOT uploaded - those live on OneDrive.
 */

import { readFileSync, existsSync, statSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const BUCKET = process.env.R2_BUCKET || 'stackedactors-mixes'
const DRY = process.argv.includes('--dry')
const FORCE = process.argv.includes('--force')

const manifest = JSON.parse(readFileSync(join(ROOT, 'src/data/upload-manifest.json'), 'utf8'))

const wrangler = (args, opts = {}) =>
  execFileSync('npx', ['wrangler', ...args], {
    cwd: ROOT,
    encoding: 'utf8',
    stdio: opts.quiet ? ['ignore', 'pipe', 'pipe'] : 'inherit',
    ...opts,
  })

/* Which keys are already up there? One list call beats 78 head calls. */
function existingKeys() {
  if (FORCE) return new Set()
  try {
    const out = wrangler(['r2', 'object', 'list', BUCKET, '--remote'], { quiet: true })
    return new Set(
      out.split('\n')
        .map((l) => l.trim())
        .filter((l) => l.startsWith('mixes/'))
    )
  } catch {
    // Bucket may not exist yet, or the CLI shape differs; fall back to uploading all.
    return new Set()
  }
}

const missingLocal = manifest.filter((m) => !existsSync(m.from))
if (missingLocal.length) {
  console.error(`! ${missingLocal.length} file(s) in the manifest are missing locally:`)
  for (const m of missingLocal.slice(0, 5)) console.error(`    ${m.from}`)
  console.error('  Re-run `yarn catalog` with the archive mounted.')
  process.exit(1)
}

const totalBytes = manifest.reduce((n, m) => n + statSync(m.from).size, 0)
console.log(`${manifest.length} mixes, ${(totalBytes / 1024 / 1024).toFixed(0)} MB -> r2://${BUCKET}`)

if (DRY) {
  for (const m of manifest) console.log(`  would upload ${m.src}`)
  process.exit(0)
}

const already = existingKeys()
let done = 0
let skipped = 0
let failed = 0

for (const m of manifest) {
  const n = `${String(done + skipped + failed + 1).padStart(3)}/${manifest.length}`
  if (already.has(m.src)) {
    skipped++
    continue
  }
  try {
    wrangler(
      ['r2', 'object', 'put', `${BUCKET}/${m.src}`, '--file', m.from,
       '--content-type', 'audio/mpeg', '--remote'],
      { quiet: true }
    )
    done++
    console.log(`${n} ok   ${m.src}`)
  } catch (e) {
    failed++
    // wrangler writes the real reason to stderr; surface it rather than just
    // "Command failed", which hides things like an unsupported CLI flag.
    const detail = (e.stderr || e.stdout || e.message || '').toString().trim()
    console.error(`${n} FAIL ${m.src}`)
    console.error(`      ${detail.split('\n').filter(Boolean).slice(-3).join('\n      ')}`)
    // If the very first upload fails, stop: it is almost certainly a config or
    // CLI problem, not a bad file, and 77 more identical failures help nobody.
    if (failed === 1 && done === 0) {
      console.error('\nFirst upload failed - stopping. Fix the above, then re-run.')
      process.exit(1)
    }
  }
}

console.log(`\nuploaded ${done}, skipped ${skipped} already present, ${failed} failed`)
if (failed) {
  console.log('Re-run to retry the failures (successful uploads are skipped).')
  process.exit(1)
}
