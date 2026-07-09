import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import Layout from './components/Layout'
import Login from './pages/Login'
import Overview from './pages/Overview'
import Bookings from './pages/Bookings'
import Categories from './pages/Categories'
import Packages from './pages/Packages'
import Services from './pages/Services'
import Testimonials from './pages/Testimonials'
import Feedback from './pages/Feedback'
import Media from './pages/Media'
import Content from './pages/Content'
import Settings from './pages/Settings'

function Gate() {
  const { user, isAdmin, loading } = useAuth()

  if (loading) {
    return (
      <div className="login-screen">
        <p className="loading-text">Loading…</p>
      </div>
    )
  }

  if (!user) {
    return <Login />
  }

  if (!isAdmin) {
    return (
      <div className="login-screen">
        <div className="login-card">
          <p className="login-warning">
            This account is signed in but isn&rsquo;t authorized as a studio admin. Contact
            the studio owner to be added.
          </p>
        </div>
      </div>
    )
  }

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Overview />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/services" element={<Services />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/photos" element={<Media />} />
        <Route path="/content" element={<Content />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Gate />
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
