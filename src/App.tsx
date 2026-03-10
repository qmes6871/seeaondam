import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { FloatingCTA } from '@/components/sections/FloatingCTA'
import { FloatingSideButtons } from '@/components/sections/FloatingSideButtons'
import { HomePage } from '@/pages/HomePage'
import { AboutPage } from '@/pages/AboutPage'
import { NewsPage } from '@/pages/NewsPage'
import { InsurancePage } from '@/pages/InsurancePage'
import { ExperiencePage } from '@/pages/ExperiencePage'
import { ApplyPage } from '@/pages/ApplyPage'
import { RecruitPage } from '@/pages/RecruitPage'
import { SeminarPage } from '@/pages/SeminarPage'
import { CustomerBenefitsPage } from '@/pages/CustomerBenefitsPage'
import { AgentBenefitsPage } from '@/pages/AgentBenefitsPage'

// 페이지 이동 시 스크롤 맨 위로
function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen bg-white">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/insurance" element={<InsurancePage />} />
            <Route path="/experience" element={<ExperiencePage />} />
            <Route path="/apply" element={<ApplyPage />} />
            <Route path="/recruit" element={<RecruitPage />} />
            <Route path="/seminar" element={<SeminarPage />} />
            <Route path="/customer-benefits" element={<CustomerBenefitsPage />} />
            <Route path="/agent-benefits" element={<AgentBenefitsPage />} />
          </Routes>
        </main>
        <Footer />
        <FloatingCTA />
        <FloatingSideButtons />
      </div>
    </BrowserRouter>
  )
}

export default App
