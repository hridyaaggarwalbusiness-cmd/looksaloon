import { useEffect, useState } from 'react'

const LINKS = [
  { href: '#services', label: 'Services', id: 'services' },
  { href: '#gallery', label: 'Gallery', id: 'gallery' },
  { href: '#about', label: 'About', id: 'about' },
  { href: '#faq', label: 'FAQ', id: 'faq' },
  { href: '#testimonials', label: 'Reviews', id: 'testimonials' },
  { href: '#contact', label: 'Contact', id: 'contact' },
]

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('nav-open', menuOpen)
    return () => document.body.classList.remove('nav-open')
  }, [menuOpen])

  useEffect(() => {
    const sections = LINKS.map((link) => document.getElementById(link.id)).filter(Boolean)
    if (sections.length === 0 || typeof IntersectionObserver === 'undefined') return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const handleLinkClick = () => setMenuOpen(false)

  return (
    <header className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <div className="container navbar-inner">
        <a className="brand" href="#top" onClick={handleLinkClick}>
          <span className="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 48 48" width="30" height="30">
              <path
                d="M24 4c6 6 6 14 0 20-6-6-6-14 0-20Z"
                fill="currentColor"
              />
              <path
                d="M24 22c0 10-6 16-16 20 4-10 6-16 16-20Z"
                fill="currentColor"
                opacity="0.7"
              />
              <path
                d="M24 22c0 10 6 16 16 20-4-10-6-16-16-20Z"
                fill="currentColor"
                opacity="0.45"
              />
            </svg>
          </span>
          <span className="brand-text">
            Looks <em>Saloon</em>
          </span>
        </a>

        <nav className="nav-links" aria-label="Primary">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={handleLinkClick}
              className={activeSection === link.id ? 'active' : ''}
              aria-current={activeSection === link.id ? 'true' : undefined}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="navbar-actions">
          <a className="btn btn-primary btn-sm" href="#contact">
            Book Appointment
          </a>
          <button
            type="button"
            className={`nav-toggle ${menuOpen ? 'is-open' : ''}`}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <div className={`nav-drawer ${menuOpen ? 'is-open' : ''}`}>
        {LINKS.map((link) => (
          <a key={link.href} href={link.href} onClick={handleLinkClick}>
            {link.label}
          </a>
        ))}
        <a className="btn btn-primary" href="#contact" onClick={handleLinkClick}>
          Book Appointment
        </a>
      </div>
    </header>
  )
}

export default Navbar
