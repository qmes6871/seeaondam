import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const strengths = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    title: '안정적인 병원 인하우스',
    description: '정해진 병원에서 안정적으로 근무하며 환자분들과 신뢰를 쌓아갑니다. 콜드콜 없이 따뜻한 만남을 이어갑니다.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    title: '체계적인 교육 시스템',
    description: '신입부터 경력까지 맞춤형 교육 프로그램을 제공합니다. 보험 전문가로 성장할 수 있는 토대를 마련해 드립니다.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
    title: '높은 MDRT 달성률',
    description: '온담본부 구성원의 40%가 MDRT 달성. 검증된 시스템과 노하우로 여러분의 성공을 함께 만들어 갑니다.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    title: '팀워크 중심 문화',
    description: '개인이 아닌 팀으로 성장합니다. 선배와 동료의 지원 속에서 함께 목표를 달성하는 문화를 만들어갑니다.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    title: '명확한 성장 경로',
    description: '설계사에서 팀장, 본부장까지. 체계적인 성장 경로와 함께 여러분의 커리어를 설계해 드립니다.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: '워라밸 보장',
    description: '정해진 병원 근무로 출퇴근이 명확합니다. 일과 삶의 균형 속에서 지속 가능한 커리어를 만들어 갑니다.',
  },
]

export function StrengthsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.children,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
            },
          }
        )
      }

      // Cards animation
      if (cardsRef.current) {
        gsap.fromTo(
          cardsRef.current.children,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.12,
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 75%',
            },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="strengths"
      className="py-14 sm:py-20 lg:py-32 bg-gray-50"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-10 sm:mb-16 lg:mb-20">
          <span className="inline-block px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-primary-100 text-primary-700 text-xs sm:text-sm font-medium mb-3 sm:mb-4">
            Why ONDAM
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-6">
            온담본부의 <span className="text-primary-600">핵심 강점</span>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto">
            성공적인 보험 커리어를 위한 최적의 환경을 제공합니다
          </p>
        </div>

        {/* Strengths Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
        >
          {strengths.map((strength, index) => (
            <div
              key={index}
              className="group p-5 sm:p-6 lg:p-10 rounded-2xl border border-gray-100 bg-white hover:border-primary-200 hover:shadow-xl transition-all duration-300"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-primary-600 group-hover:text-white transition-colors duration-300">
                {strength.icon}
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-4">
                {strength.title}
              </h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                {strength.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
