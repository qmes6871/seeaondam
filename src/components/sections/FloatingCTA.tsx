import { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'

export function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isMobileRef = useRef(false)

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024
      isMobileRef.current = mobile
      setIsMobile(mobile)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile, { passive: true })
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleScroll = useCallback(() => {
    if (!isMobileRef.current) return

    setIsVisible(false)

    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current)
    }

    scrollTimeoutRef.current = setTimeout(() => {
      setIsVisible(true)
    }, 300)
  }, [])

  useEffect(() => {
    if (!isMobile) {
      setIsVisible(true)
      return
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [isMobile, handleScroll])

  return (
    <div
      className={cn(
        'fixed bottom-0 left-0 right-0 z-50 transition-transform duration-300',
        isVisible ? 'translate-y-0' : 'translate-y-full'
      )}
    >
      <div className="bg-gray-800 py-4 px-4 md:py-5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center md:justify-between gap-4">
          {/* 텍스트 */}
          <p className="text-white text-center text-sm md:text-base font-medium flex-1 order-2 md:order-1">
            신청하신 모든 분들께 교통비 5만원 지원
          </p>

          {/* 버튼 */}
          <div className="flex gap-2 md:gap-3 flex-shrink-0 order-1 md:order-2">
            <Link
              to="/seminar"
              className="px-4 py-2.5 md:px-6 md:py-3 bg-primary-600 hover:bg-primary-700 text-white text-sm md:text-base font-semibold rounded-lg transition-all duration-300 whitespace-nowrap"
            >
              사업설명회 참석하기
            </Link>
            <Link
              to="/experience"
              className="px-4 py-2.5 md:px-6 md:py-3 bg-primary-600 hover:bg-primary-700 text-white text-sm md:text-base font-semibold rounded-lg transition-all duration-300 whitespace-nowrap"
            >
              병원근무 체험하기
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
