import { useState, useEffect, useCallback } from 'react'
import { cn } from '@/lib/utils'

export function FloatingSideButtons() {
  const [showScrollTop, setShowScrollTop] = useState(false)

  const handleScroll = useCallback(() => {
    setShowScrollTop(window.scrollY > 300)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const openKakaoChannel = () => {
    // 카카오톡 채널 URL (실제 채널 ID로 변경 필요)
    window.open('https://pf.kakao.com/_xkxkxk', '_blank')
  }

  return (
    <div className="fixed right-4 md:right-6 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-3">
      {/* 카카오톡 채널 버튼 */}
      <button
        onClick={openKakaoChannel}
        className="group w-12 h-12 md:w-14 md:h-14 bg-[#FEE500] hover:bg-[#FDD835] rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center hover:scale-110"
        aria-label="카카오톡 채널"
      >
        <svg
          className="w-7 h-7 md:w-8 md:h-8 text-[#3C1E1E]"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 3C6.477 3 2 6.463 2 10.714c0 2.675 1.758 5.022 4.407 6.37-.14.52-.506 1.88-.58 2.17-.09.357.13.352.275.256.114-.074 1.81-1.23 2.54-1.727.436.063.885.095 1.358.095 5.523 0 10-3.463 10-7.714S17.523 3 12 3z" />
        </svg>
      </button>

      {/* 위로 이동 버튼 */}
      <button
        onClick={scrollToTop}
        className={cn(
          'w-12 h-12 md:w-14 md:h-14 bg-primary-600 hover:bg-primary-700 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center hover:scale-110',
          showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        )}
        aria-label="위로 이동"
      >
        <svg
          className="w-5 h-5 md:w-6 md:h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={3}
            d="M12 19V5M5 12l7-7 7 7"
          />
        </svg>
      </button>
    </div>
  )
}
