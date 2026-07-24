import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import OverlayMountContext from './OverlayMountContext'

function ShadowScope({ css, children }) {
  const hostRef = useRef(null)
  const [mountNode, setMountNode] = useState(null)
  const [overlayMountNode, setOverlayMountNode] = useState(null)

  useEffect(() => {
    const host = hostRef.current
    if (!host) return

    const root = host.shadowRoot || host.attachShadow({ mode: 'open' })

    let style = root.querySelector('style[data-scope="site-preview"]')
    if (!style) {
      style = document.createElement('style')
      style.setAttribute('data-scope', 'site-preview')
      root.appendChild(style)
    }
    style.textContent = css

    let container = root.querySelector('div[data-scope="site-preview-mount"]')
    if (!container) {
      container = document.createElement('div')
      container.setAttribute('data-scope', 'site-preview-mount')
      root.appendChild(container)
    }
    setMountNode(container)

    // A top-level sibling mount, outside any transformed/animated ancestor,
    // so position: fixed overlays (the image editor) always resolve against
    // the real viewport instead of getting trapped inside a tilted card.
    let overlayContainer = root.querySelector('div[data-scope="site-preview-overlay"]')
    if (!overlayContainer) {
      overlayContainer = document.createElement('div')
      overlayContainer.setAttribute('data-scope', 'site-preview-overlay')
      root.appendChild(overlayContainer)
    }
    setOverlayMountNode(overlayContainer)
  }, [css])

  return (
    <div ref={hostRef}>
      {mountNode ? createPortal(<OverlayMountContext.Provider value={overlayMountNode}>{children}</OverlayMountContext.Provider>, mountNode) : null}
    </div>
  )
}

export default ShadowScope
