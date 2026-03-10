import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Button } from '@/components/ui/Button'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { value: 40, suffix: '%', label: 'MDRT 비율', subLabel: '온담본부 구성원 중' },
  { value: 8, suffix: '개', label: '협력 병원', subLabel: '수도권 전역' },
  { value: 10, suffix: '+', label: '년 노하우', subLabel: '병원 인하우스 전문' },
  { value: 100, suffix: '+', label: '명 설계사', subLabel: '함께 성장 중' },
]

function useCountUp(end: number, duration: number = 2, shouldStart: boolean = false) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!shouldStart) return

    let startTime: number | null = null
    let animationFrame: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      setCount(Math.floor(easeOutQuart * end))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animationFrame)
  }, [end, duration, shouldStart])

  return count
}

function StatCard({ stat, startCounting }: { stat: typeof stats[0]; startCounting: boolean }) {
  const count = useCountUp(stat.value, 2, startCounting)

  return (
    <div className="bg-gray-50 rounded-2xl p-6 sm:p-8 text-center border border-gray-100 hover:border-primary-200 hover:shadow-lg transition-all duration-300">
      <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-600 mb-2">
        {count}{stat.suffix}
      </div>
      <div className="text-sm sm:text-base font-semibold text-gray-900 mb-1">
        {stat.label}
      </div>
      <div className="text-xs sm:text-sm text-gray-500">
        {stat.subLabel}
      </div>
    </div>
  )
}

export function IntroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const [startCounting, setStartCounting] = useState(false)

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

    // Stats count-up trigger
    if (statsRef.current) {
      ScrollTrigger.create({
        trigger: statsRef.current,
        start: 'top 80%',
        onEnter: () => setStartCounting(true),
      })
    }
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
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed mb-4 max-w-2xl mx-auto">
            우리는 보험을 '판매'하기보다
            <br />
            병원 현장에서 환자를 돕는 <span className="font-semibold text-primary-600">상담</span>을 먼저 합니다.
          </p>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed mb-8 sm:mb-12 max-w-2xl mx-auto">
            온마음을 담은 상담으로
            <br />
            고객과 설계사 모두의 <span className="font-semibold text-primary-600">지속</span>을 설계합니다.
          </p>

          {/* CTA Button */}
          <Button size="lg" onClick={scrollToApply} className="hidden">
            입사 지원하기
          </Button>

          {/* Trust Indicators - Card Style */}
          <div ref={statsRef} className="hidden mt-10 pt-10 sm:mt-16 sm:pt-16 border-t border-gray-100">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {stats.map((stat, index) => (
                <StatCard key={index} stat={stat} startCounting={startCounting} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
