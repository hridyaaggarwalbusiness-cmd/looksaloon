import { useCallback, useEffect, useState } from 'react'
import Reveal from './Reveal'
import ReviewForm from './ReviewForm'
import { useTestimonials } from '../hooks/useTestimonials'

function Stars() {
  return (
    <div className="stars" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.9L12 17.8 5.8 21l1.2-6.9-5-4.9 6.9-1L12 2Z" />
        </svg>
      ))}
    </div>
  )
}

function Testimonials() {
  const testimonials = useTestimonials()
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (index >= testimonials.length) setIndex(0)
  }, [testimonials.length, index])

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % testimonials.length)
  }, [testimonials.length])

  const prev = () => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length)

  useEffect(() => {
    const timer = setInterval(next, 6000)
    return () => clearInterval(timer)
  }, [next])

  const current = testimonials[index]
  if (!current) return null

  return (
    <section id="testimonials" className="section testimonials">
      <div className="container">
        <Reveal className="section-head">
          <p className="eyebrow">
            <span className="eyebrow-line" /> Client Love
          </p>
          <h2 className="section-title">Don&rsquo;t just take our word for it.</h2>
        </Reveal>

        <Reveal className="testimonial-card" delay={100}>
          <svg className="quote-mark" width="42" height="34" viewBox="0 0 42 34" fill="none" aria-hidden="true">
            <path
              d="M12 0C5 3 0 10 0 18c0 9 6 16 15 16v-8c-4 0-7-3-7-7 0-1 0-2 1-3l9-2V0h-6ZM33 0c-7 3-12 10-12 18 0 9 6 16 15 16v-8c-4 0-7-3-7-7 0-1 0-2 1-3l9-2V0h-6Z"
              fill="currentColor"
            />
          </svg>
          <div className="testimonial-content" key={current.id}>
            <Stars />
            <p className="testimonial-quote">&ldquo;{current.quote}&rdquo;</p>
            <div className="testimonial-author">
              <span className="testimonial-name">{current.name}</span>
              <span className="testimonial-role">{current.role}</span>
            </div>
          </div>

          <div className="testimonial-controls">
            <button type="button" aria-label="Previous review" onClick={prev}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <div className="testimonial-dots">
              {testimonials.map((review, i) => (
                <button
                  key={review.id}
                  type="button"
                  className={i === index ? 'is-active' : ''}
                  aria-label={`Show review from ${review.name}`}
                  onClick={() => setIndex(i)}
                />
              ))}
            </div>
            <button type="button" aria-label="Next review" onClick={next}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </Reveal>

        <Reveal className="review-cta-wrap" delay={150}>
          <ReviewForm />
        </Reveal>
      </div>
    </section>
  )
}

export default Testimonials
