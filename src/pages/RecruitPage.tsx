import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// 인재상
const idealCandidates = [
  {
    icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
    title: '따뜻한 마음',
    description: '환자분들의 어려움에 공감하고 진심으로 돕고 싶은 마음을 가진 분',
  },
  {
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
    title: '성장 의지',
    description: '현재에 안주하지 않고 끊임없이 배우고 성장하려는 열정이 있는 분',
  },
  {
    icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
    title: '협업 능력',
    description: '동료, 병원 관계자와 원활하게 소통하고 협력할 수 있는 분',
  },
  {
    icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z',
    title: '책임감',
    description: '맡은 일에 책임감을 가지고 끝까지 완수하려는 자세를 가진 분',
  },
]

// 모집 분야
const positions = [
  {
    title: '병원 인하우스 보험 설계사',
    type: '정규직',
    location: '서울, 경기',
    isHot: true,
    requirements: [
      '학력 무관, 경력 무관',
      '보험 자격증 미소지자 지원 가능 (입사 후 취득 지원)',
      '고객 응대에 자신 있는 분',
      '장기 근속 의지가 있는 분',
    ],
    tasks: [
      '협력 병원 내 보험 상담 및 계약 체결',
      '환자 대상 보험 니즈 파악 및 맞춤 설계',
      '기존 고객 관리 및 추가 계약 상담',
      '병원 내 보험 관련 업무 지원',
    ],
  },
  {
    title: '영업 관리자 (팀장급)',
    type: '정규직',
    location: '서울, 경기',
    isHot: false,
    requirements: [
      '보험업 경력 3년 이상',
      'GA 또는 보험사 팀 관리 경험자 우대',
      '신규 인력 육성에 관심 있는 분',
      '리더십과 커뮤니케이션 능력 보유자',
    ],
    tasks: [
      '팀원 영업 활동 지원 및 관리',
      '신규 설계사 교육 및 멘토링',
      '병원 관계자와의 관계 관리',
      '팀 목표 달성을 위한 전략 수립',
    ],
  },
]

// 복리후생
const benefits = [
  { icon: '💰', title: '업계 최고 수수료', description: '높은 수수료율과 인센티브 제공' },
  { icon: '📚', title: '체계적 교육', description: '신입부터 전문가까지 단계별 교육 프로그램' },
  { icon: '🏥', title: '안정적 근무환경', description: '병원 내 고정 근무지 제공' },
  { icon: '🍽️', title: '식사 제공', description: '병원 구내식당 이용 가능' },
  { icon: '🎯', title: '성과 보상', description: 'MDRT 달성 시 해외 연수 및 포상' },
  { icon: '⏰', title: '워라밸', description: '정시 출퇴근, 주말 휴무' },
  { icon: '👨‍👩‍👧‍👦', title: '가족 같은 분위기', description: '서로 돕고 성장하는 조직 문화' },
  { icon: '📈', title: '성장 기회', description: '관리자로 성장할 수 있는 커리어 패스' },
]

// 채용 프로세스
const recruitProcess = [
  { step: '01', title: '지원서 접수', description: '온라인 지원서 작성', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
  { step: '02', title: '서류 심사', description: '지원서 검토 (1-2일)', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4' },
  { step: '03', title: '면접', description: '실무자 면접 진행', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
  { step: '04', title: '최종 합격', description: '합격 통보 및 입사 안내', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
]

export function RecruitPage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const sectionsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (heroRef.current) {
        gsap.fromTo(
          heroRef.current.children,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.15 }
        )
      }

      sectionsRef.current.forEach((section) => {
        if (section) {
          gsap.fromTo(
            section,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              scrollTrigger: {
                trigger: section,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
            }
          )
        }
      })
    })

    return () => ctx.revert()
  }, [])

  const addToRefs = (el: HTMLDivElement | null, index: number) => {
    if (el) {
      sectionsRef.current[index] = el
    }
  }

  return (
    <div className="pt-16 lg:pt-20">
      {/* Hero Section - 통일된 스타일 */}
      <section className="relative h-[calc(100vh-128px)] lg:h-[calc(100vh-160px)] flex items-center overflow-hidden">
        {/* 배경 */}
        <div className="absolute inset-0 bg-[#847466]" />
        {/* Dot Pattern */}
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(255, 255, 255) 1px, transparent 0px)', backgroundSize: '32px 32px' }} />
        {/* 왼쪽 상단 원형 장식 */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-gray-500/30 rounded-full -translate-x-1/2 -translate-y-1/2" />
        {/* 우측 하단 원형 장식 */}
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gray-400/10 rounded-full translate-x-1/3 translate-y-1/3" />

        <div ref={heroRef} className="relative w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 pt-20 flex justify-end">
          <div className="max-w-2xl text-right">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-primary-400 text-sm font-medium mb-8 border border-white/20">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-400" />
              We're Hiring
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-8 leading-tight">
              함께 성장할 인재를 찾습니다
            </h1>
            <p className="text-base text-gray-300 leading-relaxed mb-12">
              온담본부에서 새로운 도전을 시작하세요.<br className="hidden sm:block" />
              당신의 열정이 빛날 수 있는 곳입니다.
            </p>

            {/* CTA 버튼 */}
            <div className="pt-8 border-t border-white/10">
              <Link
                to="/apply"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-primary-700 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                지금 지원하기
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 인재상 */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div ref={(el) => addToRefs(el, 0)}>
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary-100 text-primary-700 text-sm font-medium mb-4">
                Ideal Candidate
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                온담본부가 찾는 인재
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                경력이나 학력보다 마음가짐과 태도를 중요하게 생각합니다.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {idealCandidates.map((item, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-2xl p-6 text-center hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                    </svg>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 모집 분야 */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div ref={(el) => addToRefs(el, 1)}>
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary-100 text-primary-700 text-sm font-medium mb-4">
                Open Positions
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                모집 분야
              </h2>
              <p className="text-gray-600">
                현재 채용 중인 포지션을 확인해 보세요.
              </p>
            </div>

            <div className="space-y-6">
              {positions.map((position, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden"
                >
                  {/* Header */}
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-xl font-bold text-gray-900">{position.title}</h3>
                          {position.isHot && (
                            <span className="px-2 py-0.5 rounded bg-red-100 text-red-600 text-xs font-bold">
                              적극 채용중
                            </span>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <span className="px-3 py-1 rounded-full bg-primary-100 text-primary-700 text-sm">
                            {position.type}
                          </span>
                          <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-sm">
                            {position.location}
                          </span>
                        </div>
                      </div>
                      <Link
                        to="/apply"
                        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary-600 text-white font-medium hover:bg-primary-700 transition-colors"
                      >
                        지원하기
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </Link>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        지원 자격
                      </h4>
                      <ul className="space-y-2">
                        {position.requirements.map((req, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2 flex-shrink-0" />
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        담당 업무
                      </h4>
                      <ul className="space-y-2">
                        {position.tasks.map((task, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                            <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 flex-shrink-0" />
                            {task}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 복리후생 */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div ref={(el) => addToRefs(el, 2)}>
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary-100 text-primary-700 text-sm font-medium mb-4">
                Benefits
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                복리후생
              </h2>
              <p className="text-gray-600">
                온담본부와 함께하는 설계사에게 드리는 혜택입니다.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-2xl p-5 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="text-3xl mb-3">{benefit.icon}</div>
                  <h3 className="font-bold text-gray-900 mb-1 text-sm lg:text-base">{benefit.title}</h3>
                  <p className="text-xs lg:text-sm text-gray-500">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 채용 프로세스 */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div ref={(el) => addToRefs(el, 3)}>
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary-100 text-primary-700 text-sm font-medium mb-4">
                Process
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                채용 프로세스
              </h2>
              <p className="text-gray-600">
                간단하고 빠른 채용 절차로 진행됩니다.
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              {recruitProcess.map((process, index) => (
                <div key={index} className="relative">
                  {/* Connector Line - Desktop */}
                  {index < recruitProcess.length - 1 && (
                    <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-0.5 bg-primary-200" />
                  )}

                  <div className="bg-white rounded-2xl p-6 text-center relative z-10 shadow-sm hover:shadow-lg transition-shadow">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center">
                      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={process.icon} />
                      </svg>
                    </div>
                    <span className="inline-block px-3 py-1 rounded-full bg-primary-100 text-primary-700 text-sm font-bold mb-2">
                      STEP {process.step}
                    </span>
                    <h3 className="font-bold text-gray-900 mb-1">{process.title}</h3>
                    <p className="text-sm text-gray-500">{process.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-primary-600 to-primary-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div ref={(el) => addToRefs(el, 4)} className="text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
              새로운 시작을 함께하세요
            </h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
              온담본부는 여러분의 도전을 응원합니다.<br className="hidden sm:block" />
              지금 바로 지원하고 새로운 커리어를 시작하세요.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/apply"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white text-primary-700 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                입사 지원하기
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                to="/experience"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white/10 text-white font-semibold border border-white/30 hover:bg-white/20 transition-all duration-300"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                먼저 체험해보기
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
