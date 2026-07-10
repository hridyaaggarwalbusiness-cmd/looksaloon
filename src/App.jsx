import { useCallback, useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import QuickActions from './components/QuickActions'
import CustomCursor from './components/CustomCursor'
import IntroReveal from './components/IntroReveal'
import Home from './pages/Home'
import ServiceDetail from './pages/ServiceDetail'

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    if (pathname !== '/') window.scrollTo(0, 0)
  }, [pathname])

  return null
}

function App() {
  const [introDone, setIntroDone] = useState(false)
  const handleIntroDone = useCallback(() => setIntroDone(true), [])

  return (
    <BrowserRouter>
      <IntroReveal onDone={handleIntroDone} />
      <div className="grain" aria-hidden="true" />
      <CustomCursor />
      <Navbar />
      <ScrollToTop />
      <main id="main" className={introDone ? 'is-revealed' : ''}>
        <Routes>
          <Route path="/" element={<Home revealed={introDone} />} />
          <Route path="/services/:id" element={<ServiceDetail />} />
        </Routes>
      </main>
      <Footer />
      <QuickActions />
    </BrowserRouter>
  )
}

export default App
