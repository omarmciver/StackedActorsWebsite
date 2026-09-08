import { createContext, useContext, useEffect, useState } from 'react'

/* Reaching the secret vault URL unlocks the private sections (Loose, Vulcan
   Studios, Songbook, Covers) for the rest of the session, so a bandmate can
   browse them without re-entering the link on every page.

   ponytail: this is obscurity, not access control - the catalogue ships in the
   JS bundle either way, so anyone reading the source can still find the data.
   It hides these sections from casual visitors and search engines, which is
   what was asked for. Upgrade path: put /vault* behind Cloudflare Access and
   serve the private catalogue from a gated endpoint rather than the bundle. */

const KEY = 'sa.unlocked'
const AccessContext = createContext({ unlocked: false, unlock: () => {} })

export function AccessProvider({ children }) {
  const [unlocked, setUnlocked] = useState(
    () => typeof sessionStorage !== 'undefined' && sessionStorage.getItem(KEY) === '1'
  )

  const unlock = () => {
    try { sessionStorage.setItem(KEY, '1') } catch { /* private mode */ }
    setUnlocked(true)
  }

  return (
    <AccessContext.Provider value={{ unlocked, unlock }}>
      {children}
    </AccessContext.Provider>
  )
}

export const useAccess = () => useContext(AccessContext)

/** Mounted by the vault page: arriving there is what grants access. */
export function useUnlockOnMount() {
  const { unlock } = useAccess()
  useEffect(unlock, []) // eslint-disable-line react-hooks/exhaustive-deps
}
