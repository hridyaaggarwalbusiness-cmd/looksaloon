import { createContext, useContext } from 'react'

const OverlayMountContext = createContext(null)

export function useOverlayMount() {
  return useContext(OverlayMountContext)
}

export default OverlayMountContext
