import { Routes, Route, Navigate } from 'react-router'
import { Layout } from './components/Layout'
import Home from './pages/Home'
import ServiceDetailPage from './pages/ServiceDetailPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import Portfolio from './pages/Portfolio'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Navigate to="/portfolio" replace />} />
        <Route path="/services/:slug" element={<ServiceDetailPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/templates" element={<Navigate to="/portfolio" replace />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
