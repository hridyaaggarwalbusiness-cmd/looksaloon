import { useEffect, useState } from 'react'

function Preloader({ onDone }) {
  const alreadySeen =
    typeof window !== 'undefined' && sessionStorage.getItem('ls-intro-seen')
  const [stage, setStage] = useState(alreadySeen ? 'exit' : 'mark')
  const [visible, setVisible] = useState(!alreadySeen)

  useEffect(() => {
    if (alreadySeen) {
      onDone()
      return undefined
    }

    document.body.classList.add('loading')

    const t1 = setTimeout(() => setStage('sweep'), 900)
    const t2 = setTimeout(() => setStage('exit'), 1700)
    const t3 = setTimeout(() => {
      sessionStorage.setItem('ls-intro-seen', '1')
      document.body.classList.remove('loading')
      onDone()
      setVisible(false)
    }, 2300)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
    }
  }, [alreadySeen, onDone])

  if (!visible) return null

  return (
    <div className={`preloader preloader-${stage}`} aria-hidden="true">
      <div className="preloader-curtain preloader-curtain-left" />
      <div className="preloader-curtain preloader-curtain-right" />
      <div className="preloader-mark">
        <svg viewBox="0 0 48 48" width="52" height="52">
          <path d="M24 4c6 6 6 14 0 20-6-6-6-14 0-20Z" fill="currentColor" />
          <path d="M24 22c0 10-6 16-16 20 4-10 6-16 16-20Z" fill="currentColor" opacity="0.7" />
          <path d="M24 22c0 10 6 16 16 20-4-10-6-16-16-20Z" fill="currentColor" opacity="0.45" />
        </svg>
        <span>Looks Saloon</span>
      </div>
    </div>
  )
}

export default Preloader
