import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const benefits = [
  {
    number: '01',
    title: '여행자보험 평생 무료 서비스',
    description: '온담 고객은 여행자보험을 언제든 무료로 이용할 수 있습니다.',
    features: [
      '국내/해외 여행 시 자동 지원',
      '연간 횟수 제한 없음',
      '간편 가입 시스템 제공',
    ],
    summary: '여행을 떠날 때마다 보험 걱정 없이 이용하세요.',
    icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  },
  {
    number: '02',
    title: '자동차보험 비교견적 + 페이백',
    description: '자동차보험 갱신 시 가장 합리적인 보험을 추천해드립니다.',
    features: [
      '자동차보험 비교견적 제공',
      '가입 시 추가 페이백 혜택',
      '전문 상담을 통한 보험 최적화',
    ],
    summary: '보험료 절감과 혜택을 동시에 제공합니다.',
    icon: 'M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4',
  },
  {
    number: '03',
    title: '제휴 병원 치료비 할인',
    description: '전국 제휴 병원을 통해 다양한 의료 혜택을 제공합니다.',
    features: [
      '주요 병원 치료비 할인',
      '건강검진 및 치료 프로그램 혜택',
      '병원 상담 및 예약 지원',
    ],
    summary: '고객의 건강을 위한 의료 네트워크를 제공합니다.',
    icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
  },
  {
    number: '04',
    title: '전국 건강검진 제휴 할인',
    description: '전국 건강검진 센터와 제휴하여 고객 건강관리를 지원합니다.',
    features: [
      '건강검진 할인 프로그램',
      '맞춤형 검진 상담',
      '건강관리 정보 제공',
    ],
    summary: '',
    icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
  },
  {
    number: '05',
    title: '보험청구 전담 비서 서비스',
    description: '보험금 청구가 어려울 때 전담 담당자가 직접 도와드립니다.',
    features: [
      '보험청구 서류 안내',
      '보험금 청구 지원',
      '고객 문의 응대 서비스',
    ],
    summary: '복잡한 보험 청구를 대신 도와드립니다.',
    icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01',
  },
  {
    number: '06',
    title: '보험 보장 점검 서비스',
    description: '보험은 시간이 지나면 보장이 맞지 않을 수 있습니다.',
    features: [
      '정기 보장 점검 서비스',
      '중복 보험 정리',
      '부족한 보장 안내',
    ],
    summary: '고객 상황에 맞게 보험을 지속적으로 관리합니다.',
    icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
  },
  {
    number: '07',
    title: '의료 & 보험 상담 서비스',
    description: '병원 치료와 보험은 함께 관리되어야 합니다.',
    features: [
      '병원 치료 상담',
      '보험금 지급 상담',
      '치료 후 보험금 안내',
    ],
    summary: '',
    icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
  },
]

const finalFeatures = [
  '체계적인 고객관리 시스템',
  '보험청구 전담 지원 서비스',
  '전국 병원 헬스케어 서비스',
  '전문 상담팀 운영',
]

export function CustomerBenefitsPage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const sectionsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (heroRef.current) {
      gsap.fromTo(
        heroRef.current.children,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: 'power3.out' }
      )
    }

    // Sections animation - 아래에서 위로 올라오는 효과
    const ctx = gsap.context(() => {
      if (sectionsRef.current) {
        const sections = sectionsRef.current.querySelectorAll('.animate-section')
        sections.forEach((section) => {
          gsap.fromTo(
            section,
            { opacity: 0, y: 60 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: section,
                start: 'top 85%',
                once: true,
              },
            }
          )
        })
      }
    })

    return () => ctx.revert()
  }, [])

  return (
    <div ref={sectionsRef} className="pt-16 lg:pt-20">
      {/* Hero Section */}
      <section className="relative h-[calc(100vh-128px)] lg:h-[calc(100vh-160px)] flex items-center overflow-hidden">
        {/* 배경 */}
        <div className="absolute inset-0 bg-[#847466]" />
        {/* Dot Pattern */}
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(255, 255, 255) 1px, transparent 0px)', backgroundSize: '32px 32px' }} />
        {/* 왼쪽 상단 원형 장식 */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-gray-500/30 rounded-full -translate-x-1/2 -translate-y-1/2" />
        {/* 우측 하단 원형 장식 */}
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gray-400/10 rounded-full translate-x-1/3 translate-y-1/3" />

        <div ref={heroRef} className="relative w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 pt-20">
          <div className="max-w-2xl ml-auto text-right">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-primary-400 text-sm font-medium mb-8 border border-white/20">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-400" />
              Life Care Service
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-8 leading-tight">
              시어에셋 온담은<br />
              <span className="text-primary-300">평생 관리 서비스</span>를 제공합니다
            </h1>
            <p className="text-base text-gray-300 leading-relaxed mb-12">
              시어에셋 온담본부는 보험 가입으로 끝나는 관계가 아니라<br className="hidden sm:block" />
              고객의 건강, 금융, 생활을 함께 관리하는<br className="hidden sm:block" />
              라이프 케어 서비스를 제공합니다.
            </p>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-16 lg:py-20 bg-white animate-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 text-primary-700 text-sm font-semibold mb-6 border border-primary-100">
            시어에셋 온담 고객 서비스
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            보험 이후가 <span className="text-primary-600">더 중요합니다</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            시어에셋 온담본부는 보험 가입으로 끝나는 관계가 아니라<br className="hidden sm:block" />
            고객의 건강, 금융, 생활을 함께 관리하는 라이프 케어 서비스를 제공합니다.
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 lg:py-28 bg-gradient-to-b from-slate-50 to-white animate-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              온담 고객 <span className="text-primary-600">특별 혜택</span>
            </h2>
          </div>

          {/* Benefits Grid */}
          <div className="space-y-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-2xl p-8 lg:p-10 shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-gray-100 hover:shadow-[0_8px_40px_rgba(0,0,0,0.08)] transition-all duration-500"
              >
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
                  {/* Left - Number & Icon */}
                  <div className="flex items-start gap-4 lg:w-48 flex-shrink-0">
                    <span className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 text-white font-bold text-lg shadow-lg shadow-primary-500/30">
                      {benefit.number}
                    </span>
                    <div className="w-14 h-14 rounded-2xl bg-primary-100 flex items-center justify-center group-hover:bg-primary-500 transition-colors duration-300">
                      <svg
                        className="w-7 h-7 text-primary-600 group-hover:text-white transition-colors duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={benefit.icon} />
                      </svg>
                    </div>
                  </div>

                  {/* Right - Content */}
                  <div className="flex-1">
                    <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                    <p className="text-gray-600 mb-4">{benefit.description}</p>

                    {/* Features */}
                    <div className="flex flex-wrap gap-3 mb-4">
                      {benefit.features.map((feature, fIndex) => (
                        <span
                          key={fIndex}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg text-sm text-gray-700"
                        >
                          <svg className="w-4 h-4 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          {feature}
                        </span>
                      ))}
                    </div>

                    {benefit.summary && (
                      <p className="text-primary-600 font-medium">{benefit.summary}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative py-20 lg:py-28 overflow-hidden animate-section">
        {/* 배경 */}
        <div className="absolute inset-0 bg-primary-600" />
        {/* 배경 패턴 */}
        <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)', backgroundSize: '32px 32px' }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            {/* Left - Text Content */}
            <div className="flex-1 text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
                <span className="w-2 h-2 rounded-full bg-primary-400 animate-pulse" />
                <span className="text-white/80 text-sm font-medium">온담 고객 서비스</span>
              </div>

              {/* Heading */}
              <h2 className="text-[27px] sm:text-[33px] lg:text-[45px] font-bold text-white mb-5 leading-tight">
                보험은 가입보다
                <br />
                <span className="text-primary-300">관리가 중요합니다</span>
              </h2>

              <p className="text-[14px] sm:text-base text-white/70 mb-8 max-w-md mx-auto lg:mx-0 leading-relaxed">
                시어에셋 온담본부는<br />
                고객의 삶을 오래 관리하는 평생 보험 파트너가 되겠습니다.
              </p>
            </div>

            {/* Right - Features */}
            <div className="flex-1 w-full max-w-lg">
              <div className="space-y-3">
                {finalFeatures.map((feature, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center gap-4"
                  >
                    <div className="w-10 h-10 rounded-full bg-primary-400/20 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-primary-300" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-white font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
