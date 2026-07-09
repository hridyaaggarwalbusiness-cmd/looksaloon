import Reveal from './Reveal'
import CountUp from './CountUp'
import PhotoFrame from './PhotoFrame'
import { usePhotos } from '../hooks/usePhotos'
import { useContent } from '../hooks/useContent'

function AboutCombAccent() {
  return (
    <svg viewBox="0 0 100 40" className="about-comb-accent" role="presentation" aria-hidden="true">
      <defs>
        <linearGradient id="aboutGoldLine" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#c9a15a" />
          <stop offset="100%" stopColor="#e7b6a3" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="100" height="14" rx="7" fill="url(#aboutGoldLine)" opacity="0.95" />
      <g stroke="url(#aboutGoldLine)" strokeWidth="3" strokeLinecap="round">
        <path d="M10 14v20" />
        <path d="M28 14v26" />
        <path d="M46 14v20" />
        <path d="M64 14v26" />
        <path d="M82 14v20" />
      </g>
    </svg>
  )
}

function About() {
  const photos = usePhotos()
  const { about, aboutStats } = useContent()

  return (
    <section id="about" className="section about">
      <div className="container about-inner">
        <Reveal className="about-visual" as="div">
          <PhotoFrame
            src={photos.interiorMirrors.url}
            alt={`Looks Saloon ${photos.interiorMirrors.title}, Hanumangarh`}
            className="about-photo-frame"
          >
            <div className="about-photo-caption">
              <span>Gaandhi Nagar, Hanumangarh</span>
            </div>
          </PhotoFrame>
          <AboutCombAccent />
        </Reveal>

        <Reveal className="about-copy" delay={120}>
          <p className="eyebrow">
            <span className="eyebrow-line" /> {about.eyebrow}
          </p>
          <h2 className="section-title">{about.title}</h2>
          <p className="about-lead">{about.lead}</p>
          <p>{about.body}</p>

          <div className="about-stats">
            {aboutStats.map((stat) => (
              <div className="about-stat" key={stat.label}>
                <CountUp end={Number(stat.value) || 0} suffix={stat.suffix || ''} />
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default About
