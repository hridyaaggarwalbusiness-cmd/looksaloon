import { useParams } from 'react-router-dom'
import Reveal from '../components/Reveal'
import PhotoFrame from '../components/PhotoFrame'
import { SERVICE_ICONS } from '../components/serviceIcons'
import { useServices } from '../hooks/useServices'
import { BOOKING_SERVICE_STORAGE_KEY } from '../bookingService'

function ServiceDetail() {
  const { id } = useParams()
  const { services } = useServices()
  const service = services.find((item) => item.id === id)

  if (!service) {
    return (
      <section className="section service-detail">
        <div className="container service-detail-empty">
          <p className="eyebrow">
            <span className="eyebrow-line" /> Service Not Found
          </p>
          <h1 className="section-title">We couldn&rsquo;t find that service.</h1>
          <p className="section-sub">
            It may have been renamed or removed. Explore our full menu instead.
          </p>
          <a href="/#services" className="btn btn-primary btn-lg">
            Back to Services
          </a>
        </div>
      </section>
    )
  }

  return (
    <section className="section service-detail">
      <div className="container">
        <a href="/#services" className="service-detail-back">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M19 12H5M11 6l-6 6 6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          All Services
        </a>

        <div className="service-detail-grid">
          <Reveal className="service-detail-visual" as="div">
            <PhotoFrame src={service.imageUrl} alt={service.name} className="service-detail-frame" />
          </Reveal>

          <Reveal className="service-detail-copy" delay={100}>
            <div className="service-detail-icon">{SERVICE_ICONS[service.icon] || SERVICE_ICONS.sparkle}</div>
            <p className="eyebrow">
              <span className="eyebrow-line" /> Service Details
            </p>
            <h1 className="section-title">{service.name}</h1>
            {service.popular && <span className="service-tag service-detail-tag">Most Popular</span>}
            <p className="service-detail-price">{service.price}</p>
            <p className="service-detail-description">{service.description}</p>

            <div className="service-detail-actions">
              <a
                href="/#contact"
                className="btn btn-primary btn-lg"
                onClick={() => sessionStorage.setItem(BOOKING_SERVICE_STORAGE_KEY, service.name)}
              >
                Book This Service
              </a>
              <a href="/#services" className="btn btn-ghost btn-lg">
                View All Services
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export default ServiceDetail
