import { useReveal } from '../hooks/useReveal'

function Reveal({ as: Tag = 'div', className = '', delay = 0, variant = 'fade', children, ...rest }) {
  const [ref, visible] = useReveal()

  return (
    <Tag
      ref={ref}
      className={`reveal reveal-${variant} ${visible ? 'reveal-visible' : ''} ${className}`}
      style={{ transitionDelay: visible ? `${delay}ms` : '0ms' }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

export default Reveal
