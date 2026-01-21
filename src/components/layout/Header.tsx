import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'

const navItems = [
  { path: '/about', label: '온담본부 소개', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
  { path: '/news', label: '홍보센터', icon: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z' },
  // { path: '/insurance', label: '보험정보', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
  { path: '/experience', label: '병원 근무 체험', icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
  { path: '/apply', label: '입사지원', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
  { path: '/recruit', label: '인재채용', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
  const logoTextColor = headerBg ? 'text-gray-900' : 'text-white'

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
              className="group flex items-center gap-3"
            >
              <div className={cn(
                'relative flex h-10 w-10 items-center justify-center rounded-xl font-bold text-sm transition-all duration-300',
                headerBg
                  ? 'bg-gradient-to-br from-primary-500 to-primary-700 text-white shadow-lg shadow-primary-500/30'
                  : 'bg-white/20 backdrop-blur-sm text-white border border-white/30'
              )}>
                <span className="relative z-10">온담</span>
                <div className="absolute inset-0 rounded-xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="flex flex-col">
                <span className={cn(
                  'font-bold text-lg transition-all duration-300 group-hover:tracking-wide',
                  logoTextColor
                )}>
                  온담본부
                </span>
                <span className={cn(
                  'text-[10px] font-medium tracking-wider uppercase transition-colors duration-300',
                  headerBg ? 'text-gray-400' : 'text-white/60'
                )}>
                  SEEAASSET ONDAM
                </span>
              </div>
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
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 text-white font-bold text-sm shadow-lg shadow-primary-500/30">
                온담
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-gray-900">온담본부</span>
                <span className="text-[10px] text-gray-400 tracking-wider uppercase">SEEAASSET ONDAM</span>
              </div>
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
            <Link
              to="/apply"
              className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40 transition-all duration-300 active:scale-[0.98]"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
              </svg>
              지금 바로 지원하기
            </Link>
            <p className="text-center text-xs text-gray-400 mt-4">
              궁금한 점이 있으시면 언제든 문의해주세요
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
