import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Button } from '@/components/ui/Button'

gsap.registerPlugin(ScrollTrigger)

export function IntroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!contentRef.current) return

    const elements = contentRef.current.children

    gsap.fromTo(
      elements,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      }
    )
  }, [])

  const scrollToApply = () => {
    const element = document.getElementById('apply')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section
      ref={sectionRef}
      className="relative py-16 sm:py-24 lg:py-40 bg-white"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          ref={contentRef}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-primary-50 text-primary-700 text-xs sm:text-sm font-medium mb-6 sm:mb-8">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-primary-500" />
            병원 인하우스 전문
          </div>

          {/* Headline */}
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4 sm:mb-6">
            시어에셋 온담본부는
            <br />
            <span className="text-primary-600">병원 인하우스 전문 조직</span>입니다.
          </h2>

          {/* Subheadline */}
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed mb-8 sm:mb-12 max-w-2xl mx-auto">
            서울·경기 주요 협력 병원 인하우스 운영으로
            <br className="hidden sm:block" />
            확실한 성장을 지원합니다.
          </p>

          {/* CTA Button */}
          <Button size="lg" onClick={scrollToApply}>
            입사 지원하기
          </Button>

          {/* Trust Indicators */}
          <div className="mt-10 pt-10 sm:mt-16 sm:pt-16 border-t border-gray-100">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
              <div className="text-center p-3 sm:p-0">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary-600 mb-1 sm:mb-2">8</div>
                <div className="text-xs sm:text-sm text-gray-500">협력 병원</div>
              </div>
              <div className="text-center p-3 sm:p-0">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary-600 mb-1 sm:mb-2">40%</div>
                <div className="text-xs sm:text-sm text-gray-500">MDRT 비율</div>
              </div>
              <div className="text-center p-3 sm:p-0">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary-600 mb-1 sm:mb-2">체계적</div>
                <div className="text-xs sm:text-sm text-gray-500">교육 시스템</div>
              </div>
              <div className="text-center p-3 sm:p-0">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary-600 mb-1 sm:mb-2">안정적</div>
                <div className="text-xs sm:text-sm text-gray-500">근무 환경</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
