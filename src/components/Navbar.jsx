import { useEffect, useState } from 'react'
import MagneticButton from './MagneticButton'

const LINKS = [
  { href: '/#services', label: 'Services', id: 'services' },
  { href: '/#gallery', label: 'Gallery', id: 'gallery' },
  { href: '/#about', label: 'About', id: 'about' },
  { href: '/#faq', label: 'FAQ', id: 'faq' },
  { href: '/#testimonials', label: 'Reviews', id: 'testimonials' },
  { href: '/#contact', label: 'Contact', id: 'contact' },
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
        <a className="brand" href="/#top" onClick={handleLinkClick}>
          <span className="brand-mark" aria-hidden="true">
            <img
              src="https://imagur.org/wp-content/uploads/2026/07/ChatGPT-Image-Jul-12-2026-12_53_01-PM-1.png"
              alt=""
              width="34"
              height="34"
            />
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
          <MagneticButton className="btn btn-primary btn-sm" href="/#contact" strength={0.25}>
            Book Appointment
          </MagneticButton>
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
        <a className="btn btn-primary" href="/#contact" onClick={handleLinkClick}>
          Book Appointment
        </a>
      </div>
    </header>
  )
}

export default Navbar
