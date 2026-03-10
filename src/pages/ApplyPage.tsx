import { useEffect, useRef, useState } from 'react'
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
  const ctaRef = useRef<HTMLDivElement>(null)
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index)
  }

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

      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            scrollTrigger: {
              trigger: ctaRef.current,
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
      {/* Hero Section - ExperiencePage 스타일 */}
      <section className="relative h-[calc(100vh-128px)] lg:h-[calc(100vh-160px)] flex items-center overflow-hidden">
        {/* 배경 */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-900/30 to-gray-900/95" />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 via-transparent to-transparent" />
        </div>
        {/* 왼쪽 상단 원형 장식 */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-gray-700/30 rounded-full -translate-x-1/2 -translate-y-1/2" />
        {/* 우측 하단 원형 장식 */}
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gray-600/25 rounded-full translate-x-1/3 translate-y-1/3" />

        <div ref={heroRef} className="relative w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 pt-20 flex justify-end">
          <div className="max-w-2xl text-right">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-primary-400 text-sm font-medium mb-8 border border-white/20">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-400" />
              Apply Now
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-8 leading-tight">
              입사 지원하기
            </h1>
            <p className="text-base text-gray-300 leading-relaxed mb-12">
              온담본부와 함께 성장할 준비가 되셨나요?<br className="hidden sm:block" />
              간단한 정보만 남겨주시면<br className="hidden sm:block" />
              담당자가 친절히 안내해 드립니다.
            </p>

            {/* CTA 버튼 */}
            <div className="pt-8 border-t border-white/10">
              <a
                href="#apply"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-primary-700 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                지원서 작성하기
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </a>
            </div>
          </div>
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

      {/* FAQ Section - Glassmorphism Style */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        {/* Background with subtle gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50/30" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-primary-100/40 via-transparent to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-blue-100/30 via-transparent to-transparent rounded-full blur-3xl" />

        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div ref={faqRef}>
            {/* Header */}
            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm border border-white/40 text-primary-600 text-sm font-medium mb-6 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-500 animate-pulse" />
                FAQ
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
                자주 묻는 질문
              </h2>
              <p className="text-gray-500 text-lg">
                지원 전 궁금한 점을 확인해 보세요
              </p>
            </div>

            {/* FAQ Items */}
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="relative rounded-2xl backdrop-blur-xl bg-white/70 shadow-lg shadow-gray-900/[0.04] border border-gray-200/50"
                >
                  {/* Question */}
                  <button
                    onClick={() => toggleFaq(index)}
                    className="relative w-full flex items-center gap-5 p-6 text-left"
                  >
                    {/* Number indicator */}
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                      openFaqIndex === index
                        ? 'bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/30'
                        : 'bg-gray-100 text-gray-500'
                    }`}>
                      <span className="font-semibold text-sm">{String(index + 1).padStart(2, '0')}</span>
                    </div>

                    <h3 className={`flex-1 font-semibold transition-colors duration-300 ${
                      openFaqIndex === index ? 'text-gray-900' : 'text-gray-700'
                    }`}>
                      {faq.question}
                    </h3>

                    {/* Arrow with rotation */}
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                      openFaqIndex === index
                        ? 'bg-primary-100 text-primary-600 rotate-180 shadow-sm'
                        : 'text-gray-400'
                    }`}>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>

                  {/* Answer */}
                  <div className={`grid transition-all duration-500 ease-out ${
                    openFaqIndex === index ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}>
                    <div className="overflow-hidden">
                      <div className="px-6 pb-6">
                        <div className="pl-[-20px] border-l-2 border-primary-100">
                          <p className="text-gray-600 leading-relaxed pl-4">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - 지원 혜택 카드 */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div ref={ctaRef} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {/* 지원관련 문의 카드 */}
            <div className="group relative overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: 'url(/images/contact-bg.jpg)' }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
              <div className="relative flex flex-col lg:flex-row lg:items-center justify-between p-8 lg:p-12 min-h-[280px]">
                <div className="max-w-xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white/90 text-xs font-medium mb-4">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    지원관련 문의
                  </div>
                  <h3 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-white mb-4 leading-tight">
                    궁금한 점이 있으신가요?<br className="hidden sm:block" />
                    <span className="text-primary-400">언제든지 문의</span>해 주세요.
                  </h3>
                  <p className="text-white/70 text-sm lg:text-base leading-relaxed">
                    지원 절차, 근무 조건, 급여 등<br className="hidden lg:block" />
                    궁금한 사항은 무엇이든 편하게 물어보세요.
                  </p>
                </div>
                <div className="mt-6 lg:mt-0 flex-shrink-0 flex flex-col gap-3 min-w-[200px]">
                  <a
                    href="tel:010-0000-0000"
                    className="group/btn relative overflow-hidden flex items-center gap-4 px-5 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl hover:bg-white/20 hover:border-white/40 transition-all duration-300"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-lg group-hover/btn:scale-110 transition-transform duration-300">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-white/60 text-xs">전화 문의</p>
                      <p className="text-white font-bold text-lg">010-0000-0000</p>
                    </div>
                  </a>
                  <a
                    href="mailto:recruit@example.com"
                    className="group/btn relative overflow-hidden flex items-center gap-4 px-5 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl hover:bg-white/20 hover:border-white/40 transition-all duration-300"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-lg group-hover/btn:scale-110 transition-transform duration-300">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-white/60 text-xs">이메일 문의</p>
                      <p className="text-white font-bold text-sm">recruit@example.com</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  )
}
