import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router'
import Home from './pages/Home'
import Templates from './pages/Templates'

function RouteEffects() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    document.title = pathname.replace(/\/$/, '') === '/templates'
      ? 'Templates — Torall Ventures'
      : 'Torall Ventures — Engineering Intelligent Systems'
    const frame = requestAnimationFrame(() => {
      const section = hash ? document.getElementById(hash.slice(1)) : null
      if (section) section.scrollIntoView({ behavior: 'instant' })
      else window.scrollTo({ top: 0, behavior: 'instant' })
    })
    return () => cancelAnimationFrame(frame)
  }, [pathname, hash])

  return null
}

export default function App() {
  return (
    <>
      <RouteEffects />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/templates" element={<Templates />} />
      </Routes>
    </>
  )
}
