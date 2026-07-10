import { useSettings } from '../hooks/useSettings'

function Footer() {
  const settings = useSettings()

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <span className="brand-text">
            Looks <em>Saloon</em>
          </span>
          <p>Premium hair, skin, and beauty studio for the modern individual.</p>
        </div>

        <div className="footer-links">
          <div>
            <h4>Explore</h4>
            <a href="/#services">Services</a>
            <a href="/#gallery">Gallery</a>
            <a href="/#about">About Us</a>
            <a href="/#testimonials">Reviews</a>
          </div>
          <div>
            <h4>Studio</h4>
            <a href="/#contact">Book Appointment</a>
            <a href={`tel:${settings.phone}`}>{settings.phone}</a>
            <a href={`mailto:${settings.email}`}>{settings.email}</a>
          </div>
          <div>
            <h4>Follow</h4>
            {settings.instagram && (
              <a href={settings.instagram} target="_blank" rel="noreferrer">
                Instagram
              </a>
            )}
            {settings.facebook && (
              <a href={settings.facebook} target="_blank" rel="noreferrer">
                Facebook
              </a>
            )}
            <a
              href={`https://wa.me/${settings.phone.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <span>&copy; {new Date().getFullYear()} Looks Saloon. All rights reserved.</span>
          <span>Designed with care for the modern client.</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
