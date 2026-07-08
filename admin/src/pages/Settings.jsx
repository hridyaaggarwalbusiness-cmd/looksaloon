import { useEffect, useState } from 'react'
import { saveSettings, useSettings } from '../hooks/useSettings'

function Settings() {
  const { settings, loading } = useSettings()
  const [form, setForm] = useState(settings)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (!loading) setForm(settings)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading])

  const handleChange = (field) => (event) => {
    setForm({ ...form, [field]: event.target.value })
    setSaved(false)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSaving(true)
    try {
      await saveSettings(form)
      setSaved(true)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="page">
      <header className="page-header">
        <div>
          <h1>Studio Settings</h1>
          <p>Business info shown across the public site, live.</p>
        </div>
      </header>

      <div className="panel panel-narrow">
        <form onSubmit={handleSubmit} className="modal-form">
          <label>
            <span>Studio Address</span>
            <input type="text" value={form.address} onChange={handleChange('address')} required />
          </label>
          <div className="form-row">
            <label>
              <span>Phone Number</span>
              <input type="text" value={form.phone} onChange={handleChange('phone')} required />
            </label>
            <label>
              <span>Email Address</span>
              <input type="email" value={form.email} onChange={handleChange('email')} required />
            </label>
          </div>
          <label>
            <span>Studio Hours</span>
            <input type="text" value={form.hours} onChange={handleChange('hours')} required />
          </label>
          <div className="form-row">
            <label>
              <span>Instagram URL</span>
              <input type="url" value={form.instagram} onChange={handleChange('instagram')} placeholder="https://instagram.com/…" />
            </label>
            <label>
              <span>Facebook URL</span>
              <input type="url" value={form.facebook} onChange={handleChange('facebook')} placeholder="https://facebook.com/…" />
            </label>
          </div>
          <label>
            <span>WhatsApp Link</span>
            <input type="url" value={form.whatsapp} onChange={handleChange('whatsapp')} placeholder="https://wa.me/…" />
          </label>

          <div className="modal-actions">
            {saved && <span className="save-confirm">Saved</span>}
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? 'Saving…' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Settings
