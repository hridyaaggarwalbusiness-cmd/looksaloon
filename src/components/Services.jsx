import { Link } from 'react-router-dom'
import Reveal from './Reveal'
import TiltCard from './TiltCard'
import { useServices } from '../hooks/useServices'
import { SERVICE_ICONS } from './serviceIcons'

function Services() {
  const { services } = useServices()

  return (
    <section id="services" className="section services">
      <div className="container">
        <Reveal className="section-head">
          <p className="eyebrow">
            <span className="eyebrow-line" /> What We Offer
          </p>
          <h2 className="section-title">Services, priced with total transparency.</h2>
          <p className="section-sub">
            Every treatment is performed by a certified specialist using premium,
            salon-grade products.
          </p>
        </Reveal>

        <div className="services-grid">
          {services.map((service, index) => (
            <Reveal
              key={service.id}
              className="card-wrap"
              variant="3d"
              delay={index * 70}
            >
              <TiltCard
                as="article"
                className={`service-card ${service.popular ? 'service-card-popular' : ''}`}
              >
                {service.popular && <span className="service-tag">Most Popular</span>}
                <div className="service-icon">{SERVICE_ICONS[service.icon] || SERVICE_ICONS.sparkle}</div>
                <h3>{service.name}</h3>
                <p>{service.description}</p>
                <div className="service-footer">
                  <span className="service-price">{service.price}</span>
                  <div className="service-footer-actions">
                    <Link to={`/services/${service.id}`} className="service-link service-link-ghost">
                      Details
                    </Link>
                    <a href="#contact" className="service-link">
                      Book
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
