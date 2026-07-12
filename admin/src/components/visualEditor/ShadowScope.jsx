import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

function ShadowScope({ css, children }) {
  const hostRef = useRef(null)
  const [mountNode, setMountNode] = useState(null)

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
  }, [css])

  return (
    <div ref={hostRef}>{mountNode ? createPortal(children, mountNode) : null}</div>
  )
}

export default ShadowScope
