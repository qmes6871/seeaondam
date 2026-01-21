import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// 체험 프로그램 특징
const programFeatures = [
  {
    icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
    title: '실제 병원 환경',
    description: '협력 병원에서 실제 근무 환경을 직접 체험합니다.',
  },
  {
    icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
    title: '멘토 동행',
    description: '경험 많은 선배 설계사와 함께 현장을 경험합니다.',
  },
  {
    icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
    title: '유연한 일정',
    description: '본인 일정에 맞춰 체험 날짜를 선택할 수 있습니다.',
  },
  {
    icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
    title: '부담 없는 참여',
    description: '의무 가입 없이 순수하게 업무를 체험해 볼 수 있습니다.',
  },
]

// 하루 일과
const dailySchedule = [
  { time: '09:00', activity: '출근 및 조회', description: '병원 도착, 하루 일정 브리핑' },
  { time: '09:30', activity: '환자 응대 참관', description: '선배 설계사의 상담 과정 참관' },
  { time: '11:00', activity: '보험 상담 체험', description: '멘토와 함께 실제 상담 참여' },
  { time: '12:00', activity: '점심 식사', description: '병원 구내식당 이용' },
  { time: '13:00', activity: '오후 업무', description: '서류 작업, 고객 관리 업무 체험' },
  { time: '15:00', activity: '질의응답', description: '궁금한 점 Q&A 시간' },
  { time: '16:00', activity: '마무리', description: '하루 체험 정리 및 피드백' },
]

// 체험 후기
const testimonials = [
  {
    name: '김OO',
    age: '32세',
    content: '막연하게 생각했던 병원 인하우스 업무를 직접 체험해보니 제가 하고 싶은 일이라는 확신이 생겼어요. 환자분들께 직접 도움을 드릴 수 있다는 점이 좋았습니다.',
    joinedAfter: true,
  },
  {
    name: '이OO',
    age: '28세',
    content: '보험 영업에 대한 편견이 있었는데, 체험을 통해 완전히 달라졌어요. 병원이라는 안정적인 환경에서 일할 수 있다는 게 매력적이었습니다.',
    joinedAfter: true,
  },
  {
    name: '박OO',
    age: '35세',
    content: '선배 설계사분이 친절하게 알려주셔서 하루 동안 많은 것을 배웠습니다. 실제 상담 과정을 보면서 이 일의 보람을 느낄 수 있었어요.',
    joinedAfter: false,
  },
]

// 자주 묻는 질문
const faqs = [
  {
    question: '체험 프로그램 참가 비용이 있나요?',
    answer: '아니요, 체험 프로그램은 무료로 진행됩니다. 점심 식사도 제공됩니다.',
  },
  {
    question: '보험 관련 경험이 없어도 참가할 수 있나요?',
    answer: '네, 경험이 없으셔도 참가 가능합니다. 오히려 보험업에 처음 관심을 가진 분들을 위한 프로그램입니다.',
  },
  {
    question: '체험 후 반드시 입사해야 하나요?',
    answer: '아니요, 체험 후 입사 결정은 본인의 선택입니다. 부담 없이 체험만 해보셔도 됩니다.',
  },
  {
    question: '어떤 병원에서 체험하나요?',
    answer: '서울, 경기 지역의 협력 병원 중 거주지와 가까운 곳에서 체험하실 수 있습니다.',
  },
]

export function ExperiencePage() {
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
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-white rounded-full translate-x-1/3 translate-y-1/3" />
        </div>
        <div ref={heroRef} className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/20 text-white/90 text-sm font-medium mb-6">
            Experience Program
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6">
            병원 근무 체험
          </h1>
          <p className="text-lg lg:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed mb-8">
            병원 인하우스 보험 설계사의 하루를 직접 경험해 보세요.<br />
            백문이 불여일견, 직접 체험하고 결정하세요.
          </p>
          <Link
            to="/apply"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-primary-700 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            체험 신청하기
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>

      {/* 프로그램 소개 */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div ref={(el) => addToRefs(el, 0)}>
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary-100 text-primary-700 text-sm font-medium mb-4">
                About Program
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                병원 근무 체험 프로그램
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                병원 인하우스 보험 설계사가 어떤 일을 하는지 직접 눈으로 보고,
                본인에게 맞는 일인지 확인해 볼 수 있는 기회입니다.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {programFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-2xl p-6 text-center hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-primary-100 flex items-center justify-center">
                    <svg className="w-7 h-7 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={feature.icon} />
                    </svg>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 하루 일과 */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div ref={(el) => addToRefs(el, 1)}>
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary-100 text-primary-700 text-sm font-medium mb-4">
                Daily Schedule
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                체험 하루 일과
              </h2>
              <p className="text-gray-600">
                실제 병원 인하우스 설계사의 하루를 함께 체험합니다.
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-[23px] sm:left-1/2 sm:-translate-x-px top-0 bottom-0 w-0.5 bg-primary-200" />

                {dailySchedule.map((item, index) => (
                  <div
                    key={index}
                    className={`relative flex items-start gap-4 sm:gap-8 mb-8 last:mb-0 ${
                      index % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'
                    }`}
                  >
                    {/* Time Badge - Mobile */}
                    <div className="sm:hidden flex-shrink-0 w-12 h-12 rounded-full bg-primary-600 text-white flex items-center justify-center text-xs font-bold z-10">
                      {item.time}
                    </div>

                    {/* Content */}
                    <div className={`flex-1 sm:w-1/2 ${index % 2 === 0 ? 'sm:pr-12 sm:text-right' : 'sm:pl-12'}`}>
                      <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                        <h3 className="font-bold text-gray-900 mb-1">{item.activity}</h3>
                        <p className="text-sm text-gray-600">{item.description}</p>
                      </div>
                    </div>

                    {/* Time Badge - Desktop */}
                    <div className="hidden sm:flex absolute left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-primary-600 text-white items-center justify-center text-sm font-bold z-10">
                      {item.time}
                    </div>

                    {/* Empty space for opposite side */}
                    <div className="hidden sm:block sm:w-1/2" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 체험 후기 */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div ref={(el) => addToRefs(el, 2)}>
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary-100 text-primary-700 text-sm font-medium mb-4">
                Reviews
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                체험 참가자 후기
              </h2>
              <p className="text-gray-600">
                실제 체험 프로그램에 참가하신 분들의 생생한 후기입니다.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((item, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-bold">
                      {item.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-500">{item.age}</p>
                    </div>
                    {item.joinedAfter && (
                      <span className="ml-auto px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                        입사 완료
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    <svg className="absolute -top-2 -left-1 w-8 h-8 text-primary-200" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                    <p className="text-gray-600 text-sm leading-relaxed pl-6">
                      {item.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div ref={(el) => addToRefs(el, 3)}>
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary-100 text-primary-700 text-sm font-medium mb-4">
                FAQ
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                자주 묻는 질문
              </h2>
            </div>

            <div className="max-w-3xl mx-auto space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-sm"
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

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-primary-600 to-primary-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div ref={(el) => addToRefs(el, 4)} className="text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
              직접 경험해보고 결정하세요
            </h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
              백문이 불여일견입니다. 하루 동안의 체험으로<br className="hidden sm:block" />
              병원 인하우스 설계사의 매력을 직접 느껴보세요.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/apply"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white text-primary-700 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                체험 신청하기
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <a
                href="tel:010-0000-0000"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white/10 text-white font-semibold border border-white/30 hover:bg-white/20 transition-all duration-300"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                전화 문의
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
