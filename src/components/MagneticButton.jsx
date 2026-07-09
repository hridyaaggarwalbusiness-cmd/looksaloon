import { useMagnetic } from '../hooks/useMagnetic'

function MagneticButton({ as: Tag = 'a', className = '', strength, children, ...rest }) {
  const ref = useMagnetic(strength)

  return (
    <Tag ref={ref} className={`magnetic-btn ${className}`} {...rest}>
      {children}
    </Tag>
  )
}

export default MagneticButton
