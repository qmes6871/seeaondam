import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const messages = [
  {
    number: '01',
    title: '콜드콜 없는 영업 환경',
    description: '병원에 내원하시는 환자분들과 자연스럽게 상담하세요. 거절당하는 스트레스 없이 진정한 상담에 집중할 수 있습니다.',
    highlight: '자연스러운 고객 접점',
  },
  {
    number: '02',
    title: '검증된 성과 시스템',
    description: '10년 이상 병원 인하우스 시장을 개척해온 노하우가 있습니다. 입증된 시스템으로 빠르게 성과를 낼 수 있습니다.',
    highlight: '10년+ 노하우',
  },
  {
    number: '03',
    title: '안정적인 수입 구조',
    description: '정착지원금과 함께 체계적인 수수료 구조를 제공합니다. 노력한 만큼 정당한 보상을 받을 수 있습니다.',
    highlight: '정착지원금 제공',
  },
  {
    number: '04',
    title: '일과 삶의 균형',
    description: '정해진 근무지, 안정적인 업무 시간. 가족과 함께하는 시간도 소중히 여길 수 있는 환경을 만들어 드립니다.',
    highlight: 'Work-Life Balance',
  },
  {
    number: '05',
    title: '성장하는 조직',
    description: '온담본부는 계속해서 성장하고 있습니다. 함께 성장할 리더를 찾고 있으며, 그 자리는 당신의 것일 수 있습니다.',
    highlight: '리더 양성',
  },
]

export function MessagesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

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

      // List items animation
      if (listRef.current) {
        gsap.fromTo(
          listRef.current.children,
          { opacity: 0, x: -50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            stagger: 0.12,
            scrollTrigger: {
              trigger: listRef.current,
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
      id="messages"
      className="py-14 sm:py-20 lg:py-32 bg-white"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-10 sm:mb-16 lg:mb-20">
          <span className="inline-block px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-primary-100 text-primary-700 text-xs sm:text-sm font-medium mb-3 sm:mb-4">
            Core Messages
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-6">
            왜 <span className="text-primary-600">온담</span>인가?
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto">
            온담본부를 선택해야 하는 5가지 이유
          </p>
        </div>

        {/* Messages List */}
        <div ref={listRef} className="space-y-4 sm:space-y-6">
          {messages.map((message, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-xl sm:rounded-2xl bg-gray-50 p-5 sm:p-6 lg:p-10 hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-100"
            >
              <div className="flex flex-col lg:flex-row lg:items-center gap-3 sm:gap-6 lg:gap-10">
                {/* Number */}
                <div className="flex-shrink-0">
                  <span className="text-4xl sm:text-5xl lg:text-7xl font-bold text-primary-100 group-hover:text-primary-200 transition-colors">
                    {message.number}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-grow">
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                    <h3 className="text-base sm:text-lg lg:text-2xl font-bold text-gray-900">
                      {message.title}
                    </h3>
                    <span className="px-2 py-0.5 sm:px-3 sm:py-1 rounded-full bg-primary-50 text-primary-700 text-xs sm:text-sm font-medium">
                      {message.highlight}
                    </span>
                  </div>
                  <p className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed">
                    {message.description}
                  </p>
                </div>

                {/* Arrow */}
                <div className="hidden lg:block flex-shrink-0">
                  <div className="w-14 h-14 rounded-full bg-white group-hover:bg-primary-600 flex items-center justify-center transition-all duration-300 shadow-sm">
                    <svg
                      className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
