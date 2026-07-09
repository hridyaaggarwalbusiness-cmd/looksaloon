import { useTilt } from '../hooks/useTilt'

function TiltCard({ as: Tag = 'div', className = '', tiltMax, tiltScale, children, ...rest }) {
  const ref = useTilt({ max: tiltMax, scale: tiltScale })

  return (
    <Tag ref={ref} className={`tilt-card ${className}`} {...rest}>
      <span className="tilt-glare" aria-hidden="true" />
      <span className="tilt-content">{children}</span>
    </Tag>
  )
}

export default TiltCard
