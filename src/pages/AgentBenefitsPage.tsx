import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const benefits = [
  {
    number: '01',
    title: '여행자보험 평생 무료 서비스',
    description: '온담 설계사는 여행자보험을 언제든 무료로 이용할 수 있습니다.',
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
    title: '대학병원 연계진료 서비스',
    description: '전문 진료가 필요한 경우 대학병원 연계를 지원합니다.',
    features: [
      '대학병원 진료 연계',
      '빠른 예약 지원',
      '전문의 상담 연결',
    ],
    summary: '설계사님의 건강을 위한 의료 네트워크를 제공합니다.',
    icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
  },
  {
    number: '04',
    title: '보험청구 전담 비서 서비스',
    description: '복잡한 보험금 청구를 전담비서가 대신 처리해드립니다.',
    features: [
      '보험청구 서류 안내',
      '보험금 청구 대행',
      '신속한 처리 지원',
    ],
    summary: '시간과 노력을 절약해드립니다.',
    icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01',
  },
  {
    number: '05',
    title: '제휴병원 10% 할인 혜택',
    description: '온담 제휴병원에서 진료비 할인 혜택을 받으세요.',
    features: [
      '전국 제휴병원 네트워크',
      '진료비 10% 할인',
      '건강검진 할인 프로그램',
    ],
    summary: '',
    icon: 'M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z',
  },
  {
    number: '06',
    title: '건강검진 할인 혜택',
    description: '제휴 병원에서 건강검진 할인을 받으실 수 있습니다.',
    features: [
      '정기 건강검진 할인',
      '맞춤형 검진 상담',
      '건강관리 정보 제공',
    ],
    summary: '설계사님의 건강을 지속적으로 관리합니다.',
    icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
  },
]

const finalFeatures = [
  '체계적인 설계사 지원 시스템',
  '보험청구 전담 지원 서비스',
  '전국 병원 헬스케어 서비스',
  '전문 교육 프로그램 운영',
]

export function AgentBenefitsPage() {
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (heroRef.current) {
      gsap.fromTo(
        heroRef.current.children,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: 'power3.out' }
      )
    }
  }, [])

  return (
    <div className="pt-16 lg:pt-20">
      {/* Hero Section */}
      <section className="relative h-[calc(100vh-128px)] lg:h-[calc(100vh-160px)] flex items-center overflow-hidden">
        {/* 배경 */}
        <div className="absolute inset-0 bg-[#847466]" />
        {/* Dot Pattern */}
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(255, 255, 255) 1px, transparent 0px)', backgroundSize: '32px 32px' }} />
        {/* 그라데이션 오버레이 */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#847466]/50 via-transparent to-transparent" />

        <div ref={heroRef} className="relative w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 pt-20">
          <div className="max-w-2xl ml-auto text-right">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-primary-400 text-sm font-medium mb-8 border border-white/20">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-400" />
              Agent Benefits
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-8 leading-tight">
              온담 설계사가 누리는<br />
              <span className="text-primary-300">특별한 혜택</span>
            </h1>
            <p className="text-base text-gray-300 leading-relaxed mb-12">
              온담본부와 함께하시면 다양한 혜택을<br className="hidden sm:block" />
              무료로 제공받으실 수 있습니다.<br className="hidden sm:block" />
              설계사님의 성공과 행복을 위해 최선을 다하겠습니다.
            </p>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 text-primary-700 text-sm font-semibold mb-6 border border-primary-100">
            시어에셋 온담 설계사 혜택
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            설계사님을 위한 <span className="text-primary-600">특별한 지원</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            온담본부는 설계사님의 성공적인 영업 활동을 위해<br className="hidden sm:block" />
            다양한 복리후생과 지원 서비스를 제공합니다.
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 lg:py-28 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              온담 설계사 <span className="text-primary-600">특별 혜택</span>
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
      <section className="relative py-20 lg:py-28 overflow-hidden">
        {/* 배경 */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700" />
        {/* 배경 패턴 */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)', backgroundSize: '32px 32px' }} />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-6 leading-tight">
            온담 설계사가 되어 <span className="text-primary-200">특별한 혜택</span>을 누리세요
          </h2>
          <p className="text-white/80 text-lg mb-10 max-w-3xl mx-auto leading-relaxed">
            온담본부는 설계사님께 최고의 서비스와 혜택을 제공하기 위해 항상 노력합니다.<br className="hidden sm:block" />
            지금 바로 상담을 신청하시고 다양한 혜택을 경험해보세요.
          </p>

          {/* Features */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {finalFeatures.map((feature, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-2 px-5 py-3 bg-white/10 backdrop-blur-sm rounded-xl text-white border border-white/20"
              >
                <svg className="w-5 h-5 text-primary-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {feature}
              </span>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:02-1234-5678"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary-700 font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              전화 상담하기
            </a>
            <a
              href="/"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold rounded-xl border border-white/30 transition-all duration-300"
            >
              홈으로 돌아가기
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
