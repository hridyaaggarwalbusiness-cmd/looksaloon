import { useEffect, useState } from 'react'
import { useSettings } from '../hooks/useSettings'

function WhatsAppIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.2-.7.8-.8 1-.2.2-.3.2-.5.1-.2-.1-1-.4-2-1.2-.7-.7-1.2-1.4-1.4-1.7-.1-.2 0-.4.1-.5l.4-.5c.1-.2.2-.3.2-.4.1-.2 0-.3 0-.5s-.6-1.5-.8-2c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.1 0 1.2.9 2.4 1 2.6.1.2 1.8 2.7 4.3 3.8.6.3 1.1.4 1.4.5.6.2 1.2.2 1.6.1.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2-.1-.1-.2-.2-.4-.3Z" />
    </svg>
  )
}

function QuickActions() {
  const settings = useSettings()
  const [showBackToTop, setShowBackToTop] = useState(false)
  const whatsappHref = `https://wa.me/${settings.phone.replace(/[^0-9]/g, '')}`

  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 700)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <a
        href={whatsappHref}
        target="_blank"
        rel="noreferrer"
        className="whatsapp-fab"
        aria-label="Chat with us on WhatsApp"
      >
        <WhatsAppIcon />
      </a>

      <button
        type="button"
        className={`back-to-top ${showBackToTop ? 'is-visible' : ''}`}
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M12 19V5M5 12l7-7 7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <nav className="mobile-action-bar" aria-label="Quick actions">
        <a href={`tel:${settings.phone}`} className="mobile-action-item">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M4 5c0 8.3 6.7 15 15 15l3-3-4.5-4.5-2 2A11 11 0 0 1 9.5 9.5l2-2L7 3 4 5Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
          </svg>
          Call
        </a>
        <a href={whatsappHref} target="_blank" rel="noreferrer" className="mobile-action-item">
          <WhatsAppIcon />
          WhatsApp
        </a>
        <a href="#contact" className="mobile-action-item mobile-action-primary">
          Book Now
        </a>
      </nav>
    </>
  )
}

export default QuickActions
