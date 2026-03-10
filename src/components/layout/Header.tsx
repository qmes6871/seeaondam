import { useState, useEffect, useRef, useCallback } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { cn } from '@/lib/utils'

const navItems = [
  { path: '/about', label: '온담본부 소개', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
  { path: '/customer-benefits', label: '고객혜택', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
  { path: '/agent-benefits', label: '설계사 혜택', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
  { path: '/experience', label: '병원근무 체험', icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
  { path: '/seminar', label: '사업설명회 신청', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
  // { path: '/apply', label: '입사지원', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
  { path: '/recruit', label: '인재채용', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
  // { path: '/news', label: '홍보센터', icon: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z' },
  // { path: '/insurance', label: '보험정보', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const isHome = location.pathname === '/'

  const lastScrollY = useRef(0)
  const ticking = useRef(false)

  const updateScrollState = useCallback(() => {
    const shouldBeScrolled = window.scrollY > 50
    if (shouldBeScrolled !== (lastScrollY.current > 50)) {
      setIsScrolled(shouldBeScrolled)
    }
    lastScrollY.current = window.scrollY
    ticking.current = false
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(updateScrollState)
        ticking.current = true
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [updateScrollState])

  // 페이지 이동 시 모바일 메뉴 닫기
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location])

  // 모바일 메뉴 열릴 때 body 스크롤 방지
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  const headerBg = isScrolled || !isHome
  const textColor = headerBg ? 'text-gray-600' : 'text-white/90'

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          headerBg
            ? 'bg-white/80 backdrop-blur-xl shadow-[0_1px_3px_rgba(0,0,0,0.05)]'
            : 'bg-gradient-to-b from-black/20 to-transparent'
        )}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between lg:h-20">
            {/* Logo */}
            <Link
              to="/"
              className="group flex items-center"
            >
              <img
                src="/images/logo.png"
                alt="SEEAASSET 온담"
                className="h-8 w-auto"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      'relative px-4 py-2 text-[15px] font-medium tracking-wide transition-all duration-300 rounded-lg group',
                      isActive
                        ? 'text-primary-600'
                        : cn(textColor, 'hover:text-primary-600')
                    )}
                  >
                    <span className="relative z-10">{item.label}</span>
                    {/* Hover Background */}
                    <div className={cn(
                      'absolute inset-0 rounded-lg transition-all duration-300',
                      isActive
                        ? 'bg-primary-50'
                        : 'bg-transparent group-hover:bg-primary-50/50'
                    )} />
                    {/* Active Indicator */}
                    <div className={cn(
                      'absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-primary-500 rounded-full transition-all duration-300',
                      isActive ? 'w-6' : 'w-0 group-hover:w-4'
                    )} />
                  </Link>
                )
              })}

              {/* 병원찾기 버튼 */}
              <button
                onClick={() => {
                  const scrollToMap = () => {
                    const mapSection = document.getElementById('map-section')
                    if (mapSection) {
                      const headerHeight = 80
                      const elementPosition = mapSection.getBoundingClientRect().top + window.scrollY
                      window.scrollTo({ top: elementPosition - headerHeight, behavior: 'smooth' })
                    }
                  }

                  if (location.pathname === '/') {
                    scrollToMap()
                  } else {
                    navigate('/')
                    // 페이지 이동 후 스크롤
                    setTimeout(scrollToMap, 100)
                  }
                }}
                className={cn(
                  'ml-4 px-6 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 border-2',
                  headerBg
                    ? 'border-primary-500 text-primary-600 bg-primary-50 hover:bg-primary-100'
                    : 'border-white/70 text-white bg-white/10 hover:bg-white/20'
                )}
              >
                온담본부와 함께 하는 병원 찾기
              </button>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={cn(
                'lg:hidden relative w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-300',
                headerBg
                  ? 'bg-gray-100 hover:bg-gray-200'
                  : 'bg-white/10 backdrop-blur-sm hover:bg-white/20'
              )}
              aria-label="메뉴"
            >
              <div className="relative w-5 h-4 flex flex-col justify-between">
                <span className={cn(
                  'block h-0.5 rounded-full transition-all duration-300 origin-center',
                  headerBg ? 'bg-gray-800' : 'bg-white',
                  isMobileMenuOpen && 'rotate-45 translate-y-[7px]'
                )} />
                <span className={cn(
                  'block h-0.5 rounded-full transition-all duration-300',
                  headerBg ? 'bg-gray-800' : 'bg-white',
                  isMobileMenuOpen && 'opacity-0 scale-0'
                )} />
                <span className={cn(
                  'block h-0.5 rounded-full transition-all duration-300 origin-center',
                  headerBg ? 'bg-gray-800' : 'bg-white',
                  isMobileMenuOpen && '-rotate-45 -translate-y-[7px]'
                )} />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          'fixed inset-0 z-[200] lg:hidden transition-all duration-500',
          isMobileMenuOpen ? 'visible' : 'invisible'
        )}
      >
        {/* Backdrop */}
        <div
          className={cn(
            'absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500',
            isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
          )}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Menu Panel */}
        <div
          className={cn(
            'absolute top-0 right-0 h-full w-full max-w-sm bg-white shadow-2xl transition-transform duration-500 ease-out',
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          )}
        >
          {/* Menu Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <div className="flex items-center">
              <img
                src="/images/logo.png"
                alt="SEEAASSET 온담"
                className="h-7 w-auto brightness-0"
              />
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Menu Items */}
          <nav className="p-4 space-y-1">
            {navItems.map((item, index) => {
              const isActive = location.pathname === item.path

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    'flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-300',
                    isActive
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-gray-700 hover:bg-gray-50 active:scale-[0.98]'
                  )}
                  style={{
                    transitionDelay: isMobileMenuOpen ? `${index * 50}ms` : '0ms',
                    transform: isMobileMenuOpen ? 'translateX(0)' : 'translateX(20px)',
                    opacity: isMobileMenuOpen ? 1 : 0,
                  }}
                >
                  <div className={cn(
                    'w-10 h-10 rounded-xl flex items-center justify-center transition-colors',
                    isActive ? 'bg-primary-100' : 'bg-gray-100'
                  )}>
                    <svg
                      className={cn('w-5 h-5', isActive ? 'text-primary-600' : 'text-gray-500')}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <span className="font-medium">{item.label}</span>
                  </div>
                  <svg
                    className={cn('w-5 h-5 transition-colors', isActive ? 'text-primary-400' : 'text-gray-300')}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              )
            })}
          </nav>

          {/* Menu Footer */}
          <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-100 bg-gray-50">
            <a
              href="https://pf.kakao.com/XXXXXX"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40 transition-all duration-300 active:scale-[0.98]"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              지금 바로 문의하기
            </a>
            <p className="text-center text-xs text-gray-400 mt-4">
              궁금한 점이 있으시면 언제든 문의해주세요
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
