import { useEffect, useRef, useState, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const strengths = [
  {
    icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
    title: '병원 인하우스',
    description: '안정적인 근무 환경',
    gradient: 'from-blue-500 to-cyan-400',
  },
  {
    icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
    title: '체계적 교육',
    description: '맞춤형 프로그램',
    gradient: 'from-violet-500 to-purple-400',
  },
  {
    icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z',
    title: 'MDRT 40%',
    description: '검증된 성과',
    gradient: 'from-amber-500 to-orange-400',
  },
  {
    icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
    title: '팀워크 문화',
    description: '함께 성장',
    gradient: 'from-emerald-500 to-teal-400',
  },
  {
    icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6',
    title: '성장 경로',
    description: '체계적 커리어',
    gradient: 'from-rose-500 to-pink-400',
  },
  {
    icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
    title: '워라밸',
    description: '명확한 출퇴근',
    gradient: 'from-sky-500 to-blue-400',
  },
  {
    icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    title: '높은 수익',
    description: '최고 수수료율',
    gradient: 'from-indigo-500 to-violet-400',
  },
  {
    icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01',
    title: '전문 DB',
    description: '안정적 영업',
    gradient: 'from-fuchsia-500 to-pink-400',
  },
  {
    icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
    title: '전용 공간',
    description: '쾌적한 환경',
    gradient: 'from-cyan-500 to-blue-400',
  },
  {
    icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
    title: '복리후생',
    description: '다양한 지원',
    gradient: 'from-red-500 to-rose-400',
  },
  {
    icon: 'M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z',
    title: '실적 관리',
    description: '분석 시스템',
    gradient: 'from-lime-500 to-green-400',
  },
  {
    icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
    title: '유연한 일정',
    description: '자율 조율',
    gradient: 'from-orange-500 to-amber-400',
  },
]

export function StrengthsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const carouselRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemsPerView, setItemsPerView] = useState(6)

  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(4)
      } else if (window.innerWidth < 1024) {
        setItemsPerView(6)
      } else {
        setItemsPerView(6)
      }
    }

    updateItemsPerView()
    window.addEventListener('resize', updateItemsPerView)
    return () => window.removeEventListener('resize', updateItemsPerView)
  }, [])

  const totalSlides = Math.ceil(strengths.length / itemsPerView)

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index)
  }, [])

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === totalSlides - 1 ? 0 : prev + 1))
  }, [totalSlides])

  useEffect(() => {
    const interval = setInterval(() => {
      goToNext()
    }, 5000)

    return () => clearInterval(interval)
  }, [goToNext])

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
            },
          }
        )
      }

      if (carouselRef.current) {
        gsap.fromTo(
          carouselRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            scrollTrigger: {
              trigger: carouselRef.current,
              start: 'top 80%',
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
      className="hidden relative py-20 sm:py-28 lg:py-36 bg-gradient-to-b from-slate-50 via-white to-blue-50/30 overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Gradient orbs */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-primary-100/50 via-transparent to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-blue-100/40 via-transparent to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-16 sm:mb-20 lg:mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm border border-gray-200/50 shadow-sm mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-500 animate-pulse" />
            <span className="text-gray-600 text-sm font-medium tracking-wide">Why ONDAM</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            온담본부의{' '}
            <span className="bg-gradient-to-r from-primary-600 via-primary-500 to-primary-700 bg-clip-text text-transparent">
              핵심 강점
            </span>
          </h2>

          <p className="text-gray-600 max-w-2xl mx-auto px-4">
            성공적인 보험 커리어를 위한 최적의 환경
          </p>
        </div>

        {/* Carousel Container */}
        <div ref={carouselRef} className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-out"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                <div
                  key={slideIndex}
                  className="w-full flex-shrink-0 grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-5 lg:gap-6"
                >
                  {strengths
                    .slice(slideIndex * itemsPerView, (slideIndex + 1) * itemsPerView)
                    .map((strength, index) => (
                      <div
                        key={index}
                        className="group relative"
                      >
                        {/* Card */}
                        <div className="relative h-full p-5 sm:p-6 lg:p-7 rounded-2xl bg-white/70 backdrop-blur-sm border border-gray-200/50 shadow-lg shadow-gray-900/[0.03] hover:bg-white hover:shadow-xl hover:shadow-gray-900/[0.08] hover:border-gray-200 transition-all duration-500">
                          {/* Hover glow effect */}
                          <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${strength.gradient} opacity-0 group-hover:opacity-[0.05] transition-opacity duration-500`} />

                          {/* Icon with gradient */}
                          <div className={`relative w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${strength.gradient} flex items-center justify-center mb-5 shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
                            <svg
                              className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d={strength.icon}
                              />
                            </svg>
                          </div>

                          {/* Content */}
                          <div className="relative">
                            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1.5 tracking-tight">
                              {strength.title}
                            </h3>
                            <p className="text-sm text-gray-500 font-light">
                              {strength.description}
                            </p>
                          </div>

                          {/* Subtle bottom gradient line */}
                          <div className={`absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r ${strength.gradient} opacity-0 group-hover:opacity-40 transition-opacity duration-500`} />
                        </div>
                      </div>
                    ))}
                </div>
              ))}
            </div>
          </div>

          {/* Dot Indicators */}
          <div className="flex items-center justify-center gap-2 mt-10 sm:mt-12">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-500 rounded-full ${
                  index === currentIndex
                    ? 'w-8 h-1.5 bg-gradient-to-r from-primary-500 to-primary-600'
                    : 'w-1.5 h-1.5 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
