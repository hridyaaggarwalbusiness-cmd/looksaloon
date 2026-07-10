import { useEffect, useState } from 'react'
import { saveContent, useContent } from '../hooks/useContent'

function Content() {
  const { content, loading } = useContent()
  const [form, setForm] = useState(content)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (!loading) setForm(content)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading])

  const updateHero = (field) => (event) => {
    setForm({ ...form, hero: { ...form.hero, [field]: event.target.value } })
    setSaved(false)
  }

  const updateAbout = (field) => (event) => {
    setForm({ ...form, about: { ...form.about, [field]: event.target.value } })
    setSaved(false)
  }

  const updateShowcase = (index, field) => (event) => {
    const showcase = form.showcase.map((item, i) => (i === index ? { ...item, [field]: event.target.value } : item))
    setForm({ ...form, showcase })
    setSaved(false)
  }

  const addShowcase = () => {
    setForm({ ...form, showcase: [...form.showcase, { title: '', description: '', imageUrl: '' }] })
    setSaved(false)
  }

  const removeShowcase = (index) => {
    setForm({ ...form, showcase: form.showcase.filter((_, i) => i !== index) })
    setSaved(false)
  }

  const updateCarousel = (index, field) => (event) => {
    const carousel = form.carousel.map((item, i) => (i === index ? { ...item, [field]: event.target.value } : item))
    setForm({ ...form, carousel })
    setSaved(false)
  }

  const addCarousel = () => {
    setForm({ ...form, carousel: [...form.carousel, { title: '', description: '', imageUrl: '' }] })
    setSaved(false)
  }

  const removeCarousel = (index) => {
    setForm({ ...form, carousel: form.carousel.filter((_, i) => i !== index) })
    setSaved(false)
  }

  const updateFaq = (index, field) => (event) => {
    const faq = form.faq.map((item, i) => (i === index ? { ...item, [field]: event.target.value } : item))
    setForm({ ...form, faq })
    setSaved(false)
  }

  const addFaq = () => {
    setForm({ ...form, faq: [...form.faq, { q: '', a: '' }] })
    setSaved(false)
  }

  const removeFaq = (index) => {
    setForm({ ...form, faq: form.faq.filter((_, i) => i !== index) })
    setSaved(false)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSaving(true)
    try {
      await saveContent(form)
      setSaved(true)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="page">
      <header className="page-header">
        <div>
          <h1>Site Content</h1>
          <p>Edit the hero, about, and FAQ copy shown on the public site, live.</p>
        </div>
      </header>

      <form onSubmit={handleSubmit}>
        <div className="panel">
          <div className="panel-header">
            <h2>Hero Section</h2>
          </div>
          <div className="modal-form">
            <label>
              <span>Eyebrow Label</span>
              <input type="text" value={form.hero.eyebrow} onChange={updateHero('eyebrow')} required />
            </label>
            <div className="form-row">
              <label>
                <span>Headline Line 1</span>
                <input type="text" value={form.hero.headline1} onChange={updateHero('headline1')} required />
              </label>
              <label>
                <span>Headline Line 2</span>
                <input type="text" value={form.hero.headline2} onChange={updateHero('headline2')} required />
              </label>
              <label>
                <span>Headline Line 3 (accent)</span>
                <input type="text" value={form.hero.headline3} onChange={updateHero('headline3')} required />
              </label>
            </div>
            <label>
              <span>Subtext</span>
              <textarea rows="3" value={form.hero.subtext} onChange={updateHero('subtext')} required />
            </label>
            <div className="form-row">
              <label>
                <span>Rating Value</span>
                <input type="text" value={form.hero.ratingValue} onChange={updateHero('ratingValue')} placeholder="4.5" />
              </label>
              <label>
                <span>Review Count</span>
                <input type="text" value={form.hero.reviewCount} onChange={updateHero('reviewCount')} placeholder="124" />
              </label>
            </div>
            <div className="form-row">
              <label>
                <span>Booking Badge Title</span>
                <input type="text" value={form.hero.bookingBadgeTitle} onChange={updateHero('bookingBadgeTitle')} />
              </label>
              <label>
                <span>Booking Badge Subtitle</span>
                <input type="text" value={form.hero.bookingBadgeSub} onChange={updateHero('bookingBadgeSub')} />
              </label>
            </div>
          </div>
        </div>

        <div className="panel">
          <div className="panel-header">
            <h2>About Section</h2>
          </div>
          <div className="modal-form">
            <label>
              <span>Eyebrow Label</span>
              <input type="text" value={form.about.eyebrow} onChange={updateAbout('eyebrow')} required />
            </label>
            <label>
              <span>Title</span>
              <input type="text" value={form.about.title} onChange={updateAbout('title')} required />
            </label>
            <label>
              <span>Lead Paragraph</span>
              <textarea rows="3" value={form.about.lead} onChange={updateAbout('lead')} required />
            </label>
            <label>
              <span>Body Paragraph</span>
              <textarea rows="3" value={form.about.body} onChange={updateAbout('body')} required />
            </label>
          </div>
        </div>

        <div className="panel">
          <div className="panel-header">
            <h2>Scrolling Showcase Sections</h2>
            <button type="button" className="btn btn-ghost btn-sm" onClick={addShowcase}>
              + Add Section
            </button>
          </div>
          <p className="table-sub">
            Full-width sections shown between Services and About on the home page, each pairing a
            headline and description with an image (alternating sides as the visitor scrolls).
          </p>
          <div className="modal-form">
            {form.showcase.map((item, index) => (
              <div className="showcase-editor-item" key={index}>
                <div className="showcase-editor-header">
                  <strong>Section {index + 1}</strong>
                  <button type="button" className="btn btn-ghost btn-sm" onClick={() => removeShowcase(index)}>
                    Remove
                  </button>
                </div>
                <label>
                  <span>Title</span>
                  <input type="text" value={item.title} onChange={updateShowcase(index, 'title')} required />
                </label>
                <label>
                  <span>Description</span>
                  <textarea rows="3" value={item.description} onChange={updateShowcase(index, 'description')} required />
                </label>
                <label>
                  <span>Image URL (optional)</span>
                  <input
                    type="url"
                    placeholder="https://example.com/photo.jpg"
                    value={item.imageUrl}
                    onChange={updateShowcase(index, 'imageUrl')}
                  />
                  <span className="field-hint">Paste a direct image link. Leave blank to show a placeholder.</span>
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="panel">
          <div className="panel-header">
            <h2>Auto-Rotating Carousel</h2>
            <button type="button" className="btn btn-ghost btn-sm" onClick={addCarousel}>
              + Add Story
            </button>
          </div>
          <p className="table-sub">
            Shown below the showcase sections on the home page. A new photo and story fades in
            automatically every 3 seconds, cycling through all entries.
          </p>
          <div className="modal-form">
            {form.carousel.map((item, index) => (
              <div className="showcase-editor-item" key={index}>
                <div className="showcase-editor-header">
                  <strong>Story {index + 1}</strong>
                  <button type="button" className="btn btn-ghost btn-sm" onClick={() => removeCarousel(index)}>
                    Remove
                  </button>
                </div>
                <label>
                  <span>Title</span>
                  <input type="text" value={item.title} onChange={updateCarousel(index, 'title')} required />
                </label>
                <label>
                  <span>Description</span>
                  <textarea rows="3" value={item.description} onChange={updateCarousel(index, 'description')} required />
                </label>
                <label>
                  <span>Image URL (optional)</span>
                  <input
                    type="url"
                    placeholder="https://example.com/photo.jpg"
                    value={item.imageUrl}
                    onChange={updateCarousel(index, 'imageUrl')}
                  />
                  <span className="field-hint">Paste a direct image link. Leave blank to show a placeholder.</span>
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="panel">
          <div className="panel-header">
            <h2>FAQ</h2>
            <button type="button" className="btn btn-ghost btn-sm" onClick={addFaq}>
              + Add Question
            </button>
          </div>
          <div className="modal-form">
            {form.faq.map((item, index) => (
              <div className="faq-editor-row" key={index}>
                <label>
                  <span>Question</span>
                  <input type="text" value={item.q} onChange={updateFaq(index, 'q')} required />
                </label>
                <label>
                  <span>Answer</span>
                  <textarea rows="2" value={item.a} onChange={updateFaq(index, 'a')} required />
                </label>
                <button type="button" className="btn btn-ghost btn-sm" onClick={() => removeFaq(index)}>
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="modal-actions content-save-bar">
          {saved && <span className="save-confirm">Saved</span>}
          <button type="submit" className="btn btn-primary" disabled={saving}>
            {saving ? 'Saving…' : 'Save All Changes'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default Content
