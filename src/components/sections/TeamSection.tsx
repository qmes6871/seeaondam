import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const teamMembers = [
  {
    name: '김온담',
    role: '본부장',
    achievement: 'MDRT 5회 달성',
    quote: '함께 성장하는 것이 온담의 가장 큰 강점입니다.',
  },
  {
    name: '이따뜻',
    role: '팀장',
    achievement: 'MDRT 3회 달성',
    quote: '신입 때 받았던 도움을 이제 후배들에게 돌려주고 있습니다.',
  },
  {
    name: '박성장',
    role: '수석 설계사',
    achievement: 'MDRT 2회 달성',
    quote: '체계적인 교육 덕분에 빠르게 성장할 수 있었습니다.',
  },
]

const stats = [
  { value: '40%', label: 'MDRT 비율', description: '온담본부 구성원 중' },
  { value: '8개', label: '협력 병원', description: '수도권 전역' },
  { value: '10+', label: '년 노하우', description: '병원 인하우스 전문' },
  { value: '100+', label: '명 설계사', description: '함께 성장 중' },
]

export function TeamSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const membersRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

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

      // Stats animation
      if (statsRef.current) {
        gsap.fromTo(
          statsRef.current.children,
          { opacity: 0, scale: 0.9 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            stagger: 0.1,
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 80%',
            },
          }
        )
      }

      // Members animation
      if (membersRef.current) {
        gsap.fromTo(
          membersRef.current.children,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.15,
            scrollTrigger: {
              trigger: membersRef.current,
              start: 'top 75%',
            },
          }
        )
      }

      // CTA animation
      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            scrollTrigger: {
              trigger: ctaRef.current,
              start: 'top 85%',
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
      id="team"
      className="py-14 sm:py-20 lg:py-32 bg-gray-50"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-10 sm:mb-16 lg:mb-20">
          <span className="inline-block px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-primary-100 text-primary-700 text-xs sm:text-sm font-medium mb-3 sm:mb-4">
            Our Team
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-6">
            함께하는 <span className="text-primary-600">인재들</span>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto">
            온담본부의 성장을 이끌어가는 팀원들을 소개합니다
          </p>
        </div>

        {/* Stats Grid */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8 mb-12 sm:mb-20"
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-4 sm:p-6 lg:p-10 rounded-xl sm:rounded-2xl bg-white border border-gray-100 shadow-sm"
            >
              <div className="text-2xl sm:text-3xl lg:text-5xl font-bold text-primary-600 mb-1 sm:mb-2">
                {stat.value}
              </div>
              <div className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900 mb-0.5 sm:mb-1">
                {stat.label}
              </div>
              <div className="text-xs sm:text-sm text-gray-500">{stat.description}</div>
            </div>
          ))}
        </div>

        {/* Team Members */}
        <div
          ref={membersRef}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
        >
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-xl sm:rounded-2xl bg-white p-5 sm:p-6 lg:p-10 hover:bg-primary-600 transition-all duration-500 border border-gray-100 hover:border-primary-600 shadow-sm hover:shadow-xl"
            >
              {/* Avatar Placeholder */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-primary-100 group-hover:bg-white/20 flex items-center justify-center mb-4 sm:mb-6 transition-colors">
                <svg
                  className="w-8 h-8 sm:w-10 sm:h-10 text-primary-600 group-hover:text-white transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>

              {/* Info */}
              <div className="mb-3 sm:mb-4">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-white transition-colors">
                  {member.name}
                </h3>
                <p className="text-sm sm:text-base text-primary-600 group-hover:text-primary-200 font-medium transition-colors">
                  {member.role}
                </p>
              </div>

              {/* Achievement Badge */}
              <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-primary-50 group-hover:bg-white/20 mb-4 sm:mb-6 transition-colors">
                <svg
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary-600 group-hover:text-white transition-colors"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-xs sm:text-sm font-medium text-primary-700 group-hover:text-white transition-colors">
                  {member.achievement}
                </span>
              </div>

              {/* Quote */}
              <p className="text-sm sm:text-base text-gray-600 group-hover:text-white/80 leading-relaxed transition-colors">
                "{member.quote}"
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div ref={ctaRef} className="mt-12 sm:mt-20 text-center">
          <p className="text-base sm:text-lg lg:text-xl text-gray-700 mb-6 sm:mb-8">
            당신도 온담본부의 <span className="font-bold text-primary-600">다음 성공 스토리</span>가 될 수 있습니다
          </p>
          <button
            onClick={() => {
              const element = document.getElementById('apply')
              if (element) element.scrollIntoView({ behavior: 'smooth' })
            }}
            className="inline-flex items-center gap-2 sm:gap-3 px-6 py-3 sm:px-8 sm:py-4 rounded-xl bg-primary-600 text-white text-sm sm:text-base font-semibold hover:bg-primary-700 hover:shadow-lg transition-all duration-300"
          >
            지금 지원하기
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}
