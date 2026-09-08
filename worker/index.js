/**
 * Serves the static site and streams the mixes out of R2.
 *
 * Audio is public (they're our songs). The vault page is a secret URL: not
 * linked anywhere, excluded from robots.txt, and served with noindex so it
 * doesn't end up in a search index. That is obscurity rather than access
 * control, which is the deliberate trade for a small trusted group.
 */

const AUDIO_PREFIX = '/audio/'

export default {
  async fetch(request, env) {
    const url = new URL(request.url)

    if (url.pathname.startsWith(AUDIO_PREFIX)) {
      return serveAudio(request, env, decodeURIComponent(url.pathname.slice(AUDIO_PREFIX.length)))
    }

    if (url.pathname === '/robots.txt') {
      // The site is behind a holding page until the catalogue work is done, so
      // nothing should be indexed yet. Deliberately does NOT name the vault
      // path: robots.txt is public, and a Disallow line would publish the
      // secret to anyone who looked.
      return new Response('User-agent: *\nDisallow: /\n', {
        headers: { 'content-type': 'text/plain' },
      })
    }

    const res = await env.ASSETS.fetch(request)

    // Nothing is indexable while the site sits behind the holding page.
    // Drop this blanket header (keeping the vault case) when going public.
    const headers = new Headers(res.headers)
    headers.set('x-robots-tag', 'noindex, nofollow, noarchive')

    // The vault must not be cached by anything in front of us either.
    if (env.VAULT_PATH && url.pathname.startsWith(`/${env.VAULT_PATH}`)) {
      headers.set('cache-control', 'private, no-store')
    }

    return new Response(res.body, { status: res.status, headers })
  },
}

async function serveAudio(request, env, key) {
  if (!key || key.includes('..')) return new Response('Not found', { status: 404 })

  const object = await env.MIXES.get(key, {
    range: request.headers.get('range') ? request.headers : undefined,
  })
  if (!object) return new Response('Not found', { status: 404 })

  const headers = new Headers()
  object.writeHttpMetadata(headers)
  headers.set('etag', object.httpEtag)
  headers.set('accept-ranges', 'bytes')
  headers.set('cache-control', 'public, max-age=31536000, immutable')
  if (!headers.has('content-type')) headers.set('content-type', 'audio/mpeg')

  // A ranged hit comes back as a partial body and needs the 206 + range header.
  if (object.range && request.headers.get('range')) {
    const { offset = 0, length = object.size - offset } = object.range
    headers.set('content-range', `bytes ${offset}-${offset + length - 1}/${object.size}`)
    return new Response(object.body, { status: 206, headers })
  }

  return new Response(object.body, { headers })
}
