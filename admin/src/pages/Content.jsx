import { useEffect, useState } from 'react'
import { saveContent, useContent } from '../hooks/useContent'

const WHY_US_ICON_OPTIONS = ['shield', 'flask', 'sterile', 'consult']

function Content() {
  const { content, loading } = useContent()
  const [form, setForm] = useState(content)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (!loading) setForm(content)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading])

  const markDirty = () => setSaved(false)

  const updateHero = (field) => (event) => {
    setForm({ ...form, hero: { ...form.hero, [field]: event.target.value } })
    markDirty()
  }

  const updateAbout = (field) => (event) => {
    setForm({ ...form, about: { ...form.about, [field]: event.target.value } })
    markDirty()
  }

  const updateFaq = (index, field) => (event) => {
    const faq = form.faq.map((item, i) => (i === index ? { ...item, [field]: event.target.value } : item))
    setForm({ ...form, faq })
    markDirty()
  }

  const addFaq = () => {
    setForm({ ...form, faq: [...form.faq, { q: '', a: '' }] })
    markDirty()
  }

  const removeFaq = (index) => {
    setForm({ ...form, faq: form.faq.filter((_, i) => i !== index) })
    markDirty()
  }

  const updateHeroStat = (index, field) => (event) => {
    const heroStats = form.heroStats.map((item, i) => (i === index ? { ...item, [field]: event.target.value } : item))
    setForm({ ...form, heroStats })
    markDirty()
  }

  const addHeroStat = () => {
    setForm({ ...form, heroStats: [...form.heroStats, { value: '', label: '' }] })
    markDirty()
  }

  const removeHeroStat = (index) => {
    setForm({ ...form, heroStats: form.heroStats.filter((_, i) => i !== index) })
    markDirty()
  }

  const updateAboutStat = (index, field) => (event) => {
    const value = field === 'value' ? Number(event.target.value) : event.target.value
    const aboutStats = form.aboutStats.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    setForm({ ...form, aboutStats })
    markDirty()
  }

  const addAboutStat = () => {
    setForm({ ...form, aboutStats: [...form.aboutStats, { value: 0, suffix: '', label: '' }] })
    markDirty()
  }

  const removeAboutStat = (index) => {
    setForm({ ...form, aboutStats: form.aboutStats.filter((_, i) => i !== index) })
    markDirty()
  }

  const updateWhyUsFeature = (index, field) => (event) => {
    const whyUsFeatures = form.whyUsFeatures.map((item, i) =>
      i === index ? { ...item, [field]: event.target.value } : item,
    )
    setForm({ ...form, whyUsFeatures })
    markDirty()
  }

  const addWhyUsFeature = () => {
    setForm({
      ...form,
      whyUsFeatures: [...form.whyUsFeatures, { icon: 'shield', title: '', description: '' }],
    })
    markDirty()
  }

  const removeWhyUsFeature = (index) => {
    setForm({ ...form, whyUsFeatures: form.whyUsFeatures.filter((_, i) => i !== index) })
    markDirty()
  }

  const updateNavLink = (index, field) => (event) => {
    const navLinks = form.navLinks.map((item, i) => (i === index ? { ...item, [field]: event.target.value } : item))
    setForm({ ...form, navLinks })
    markDirty()
  }

  const addNavLink = () => {
    setForm({ ...form, navLinks: [...form.navLinks, { href: '#', label: '', id: '' }] })
    markDirty()
  }

  const removeNavLink = (index) => {
    setForm({ ...form, navLinks: form.navLinks.filter((_, i) => i !== index) })
    markDirty()
  }

  const updateFooterLink = (index, field) => (event) => {
    const footerLinks = form.footerLinks.map((item, i) =>
      i === index ? { ...item, [field]: event.target.value } : item,
    )
    setForm({ ...form, footerLinks })
    markDirty()
  }

  const addFooterLink = () => {
    setForm({ ...form, footerLinks: [...form.footerLinks, { href: '#', label: '' }] })
    markDirty()
  }

  const removeFooterLink = (index) => {
    setForm({ ...form, footerLinks: form.footerLinks.filter((_, i) => i !== index) })
    markDirty()
  }

  const updateMarqueeItem = (index) => (event) => {
    const marqueeItems = form.marqueeItems.map((item, i) => (i === index ? event.target.value : item))
    setForm({ ...form, marqueeItems })
    markDirty()
  }

  const addMarqueeItem = () => {
    setForm({ ...form, marqueeItems: [...form.marqueeItems, ''] })
    markDirty()
  }

  const removeMarqueeItem = (index) => {
    setForm({ ...form, marqueeItems: form.marqueeItems.filter((_, i) => i !== index) })
    markDirty()
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
          <p>Edit the copy, stats, navigation, and homepage sections shown on the public site, live.</p>
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
            <h2>Hero Stats Row</h2>
            <button type="button" className="btn btn-ghost btn-sm" onClick={addHeroStat}>
              + Add Stat
            </button>
          </div>
          <div className="modal-form">
            {form.heroStats.map((stat, index) => (
              <div className="form-row" key={index}>
                <label>
                  <span>Value</span>
                  <input type="text" value={stat.value} onChange={updateHeroStat(index, 'value')} placeholder="12+" />
                </label>
                <label>
                  <span>Label</span>
                  <input type="text" value={stat.label} onChange={updateHeroStat(index, 'label')} placeholder="Years of craft" />
                </label>
                <button type="button" className="btn btn-ghost btn-sm" onClick={() => removeHeroStat(index)}>
                  Remove
                </button>
              </div>
            ))}
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
            <h2>About Stats</h2>
            <button type="button" className="btn btn-ghost btn-sm" onClick={addAboutStat}>
              + Add Stat
            </button>
          </div>
          <div className="modal-form">
            {form.aboutStats.map((stat, index) => (
              <div className="form-row" key={index}>
                <label>
                  <span>Number</span>
                  <input type="number" value={stat.value} onChange={updateAboutStat(index, 'value')} />
                </label>
                <label>
                  <span>Suffix</span>
                  <input type="text" value={stat.suffix} onChange={updateAboutStat(index, 'suffix')} placeholder="+, %, k+" />
                </label>
                <label>
                  <span>Label</span>
                  <input type="text" value={stat.label} onChange={updateAboutStat(index, 'label')} />
                </label>
                <button type="button" className="btn btn-ghost btn-sm" onClick={() => removeAboutStat(index)}>
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="panel">
          <div className="panel-header">
            <h2>Why Choose Us Features</h2>
            <button type="button" className="btn btn-ghost btn-sm" onClick={addWhyUsFeature}>
              + Add Feature
            </button>
          </div>
          <div className="modal-form">
            {form.whyUsFeatures.map((feature, index) => (
              <div className="faq-editor-row" key={index}>
                <div className="form-row">
                  <label>
                    <span>Icon</span>
                    <select value={feature.icon} onChange={updateWhyUsFeature(index, 'icon')}>
                      {WHY_US_ICON_OPTIONS.map((icon) => (
                        <option key={icon} value={icon}>
                          {icon}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label>
                    <span>Title</span>
                    <input type="text" value={feature.title} onChange={updateWhyUsFeature(index, 'title')} required />
                  </label>
                </div>
                <label>
                  <span>Description</span>
                  <textarea rows="2" value={feature.description} onChange={updateWhyUsFeature(index, 'description')} required />
                </label>
                <button type="button" className="btn btn-ghost btn-sm" onClick={() => removeWhyUsFeature(index)}>
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="panel">
          <div className="panel-header">
            <h2>Navigation Links</h2>
            <button type="button" className="btn btn-ghost btn-sm" onClick={addNavLink}>
              + Add Link
            </button>
          </div>
          <div className="modal-form">
            {form.navLinks.map((link, index) => (
              <div className="form-row" key={index}>
                <label>
                  <span>Label</span>
                  <input type="text" value={link.label} onChange={updateNavLink(index, 'label')} required />
                </label>
                <label>
                  <span>Link (#section-anchor)</span>
                  <input type="text" value={link.href} onChange={updateNavLink(index, 'href')} required />
                </label>
                <label>
                  <span>Section ID (for scroll highlight)</span>
                  <input type="text" value={link.id} onChange={updateNavLink(index, 'id')} />
                </label>
                <button type="button" className="btn btn-ghost btn-sm" onClick={() => removeNavLink(index)}>
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="panel">
          <div className="panel-header">
            <h2>Footer Links</h2>
            <button type="button" className="btn btn-ghost btn-sm" onClick={addFooterLink}>
              + Add Link
            </button>
          </div>
          <div className="modal-form">
            {form.footerLinks.map((link, index) => (
              <div className="form-row" key={index}>
                <label>
                  <span>Label</span>
                  <input type="text" value={link.label} onChange={updateFooterLink(index, 'label')} required />
                </label>
                <label>
                  <span>Link</span>
                  <input type="text" value={link.href} onChange={updateFooterLink(index, 'href')} required />
                </label>
                <button type="button" className="btn btn-ghost btn-sm" onClick={() => removeFooterLink(index)}>
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="panel">
          <div className="panel-header">
            <h2>Scrolling Marquee Items</h2>
            <button type="button" className="btn btn-ghost btn-sm" onClick={addMarqueeItem}>
              + Add Item
            </button>
          </div>
          <div className="modal-form">
            {form.marqueeItems.map((item, index) => (
              <div className="form-row" key={index}>
                <label>
                  <span>Item {index + 1}</span>
                  <input type="text" value={item} onChange={updateMarqueeItem(index)} required />
                </label>
                <button type="button" className="btn btn-ghost btn-sm" onClick={() => removeMarqueeItem(index)}>
                  Remove
                </button>
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
