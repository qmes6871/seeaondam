import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ApplicationForm } from '@/components/sections/ApplicationForm'

gsap.registerPlugin(ScrollTrigger)

// 지원 혜택
const applyBenefits = [
  {
    icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
    title: '빠른 피드백',
    description: '지원 후 1-2일 내 연락',
  },
  {
    icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
    title: '간편한 절차',
    description: '복잡한 서류 없이 간단히',
  },
  {
    icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
    title: '1:1 상담',
    description: '담당자와 직접 상담',
  },
  {
    icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
    title: '부담 없이',
    description: '문의만 해도 OK',
  },
]

// 자주 묻는 질문
const faqs = [
  {
    question: '보험 자격증이 없어도 지원할 수 있나요?',
    answer: '네, 자격증이 없어도 지원 가능합니다. 입사 후 자격증 취득을 위한 교육과 지원을 제공해 드립니다.',
  },
  {
    question: '경력이 없어도 괜찮을까요?',
    answer: '물론입니다. 신입 분들도 많이 지원하고 계시며, 체계적인 교육 프로그램을 통해 전문가로 성장할 수 있습니다.',
  },
  {
    question: '근무 지역은 어떻게 되나요?',
    answer: '서울과 경기 지역의 협력 병원 중 거주지와 가까운 곳으로 배치됩니다. 면접 시 희망 지역을 말씀해 주세요.',
  },
  {
    question: '급여는 어떻게 되나요?',
    answer: '기본 수수료 + 성과급 체계로 운영됩니다. 자세한 내용은 면접 시 안내해 드립니다.',
  },
]

export function ApplyPage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const benefitsRef = useRef<HTMLDivElement>(null)
  const faqRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (heroRef.current) {
        gsap.fromTo(
          heroRef.current.children,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.15 }
        )
      }

      if (benefitsRef.current) {
        gsap.fromTo(
          benefitsRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            scrollTrigger: {
              trigger: benefitsRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        )
      }

      if (faqRef.current) {
        gsap.fromTo(
          faqRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            scrollTrigger: {
              trigger: faqRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        )
      }
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="pt-16 lg:pt-20">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-white rounded-full translate-x-1/3 translate-y-1/3" />
        </div>
        <div ref={heroRef} className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/20 text-white/90 text-sm font-medium mb-6">
            Apply Now
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            입사 지원하기
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            온담본부와 함께할 준비가 되셨나요?<br />
            아래 양식을 작성해주시면 담당자가 연락드립니다.
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-8 bg-white border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div ref={benefitsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
            {applyBenefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-3 p-4">
                <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={benefit.icon} />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{benefit.title}</p>
                  <p className="text-xs text-gray-500">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <ApplicationForm />

      {/* FAQ Section */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div ref={faqRef}>
            <div className="text-center mb-10">
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary-100 text-primary-700 text-sm font-medium mb-4">
                FAQ
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                자주 묻는 질문
              </h2>
              <p className="text-gray-600">
                지원 전 궁금한 점을 확인해 보세요.
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-lg bg-primary-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-primary-700 font-bold text-sm">Q</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 mb-3">{faq.question}</h3>
                      <div className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                          <span className="text-gray-500 font-bold text-sm">A</span>
                        </div>
                        <p className="text-gray-600 text-sm leading-relaxed pt-1">{faq.answer}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-12 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 lg:p-12">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                  지원 관련 문의
                </h2>
                <p className="text-gray-400 mb-6">
                  지원서 작성 전 궁금한 점이 있으시면<br />
                  언제든지 연락 주세요.
                </p>
                <div className="space-y-4">
                  <a
                    href="tel:010-0000-0000"
                    className="flex items-center gap-4 text-white hover:text-primary-400 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">전화 문의</p>
                      <p className="font-semibold">010-0000-0000</p>
                    </div>
                  </a>
                  <a
                    href="mailto:recruit@example.com"
                    className="flex items-center gap-4 text-white hover:text-primary-400 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">이메일 문의</p>
                      <p className="font-semibold">recruit@example.com</p>
                    </div>
                  </a>
                </div>
              </div>
              <div className="hidden lg:block">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-primary-600/20 rounded-2xl blur-xl" />
                  <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white font-bold">
                        온담
                      </div>
                      <div>
                        <p className="font-bold text-white">시어에셋 온담본부</p>
                        <p className="text-sm text-gray-400">함께 성장하는 파트너</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-sm">
                        <svg className="w-5 h-5 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-300">빠른 합격 결과 안내</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <svg className="w-5 h-5 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-300">체계적인 신입 교육</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <svg className="w-5 h-5 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-300">안정적인 병원 근무</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <svg className="w-5 h-5 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-300">업계 최고 수수료</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
