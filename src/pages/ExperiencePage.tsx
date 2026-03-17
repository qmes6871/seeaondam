import { useEffect, useRef, useState, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useNaverMap } from '@/hooks/useNaverMap'
import { hospitals } from '@/data/hospitals'

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
  {
    icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
    title: '실무 교육',
    description: '현장에서 바로 적용 가능한 실무 노하우를 배웁니다.',
  },
  {
    icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z',
    title: '팀 분위기 체험',
    description: '온담본부의 따뜻한 팀 문화를 직접 느껴보세요.',
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
  {
    name: '최OO',
    age: '29세',
    content: '콜드콜 없이 환자분들이 먼저 찾아오시는 환경이 인상적이었어요. 부담 없이 상담할 수 있는 분위기가 좋았습니다.',
    joinedAfter: true,
  },
  {
    name: '정OO',
    age: '31세',
    content: '점심도 제공되고, 하루 종일 세심하게 케어해 주셔서 감사했어요. 병원 인하우스 업무의 매력을 제대로 느꼈습니다.',
    joinedAfter: true,
  },
  {
    name: '한OO',
    age: '27세',
    content: '체험 후 입사를 결정했는데, 체험 때 본 것과 실제 근무 환경이 동일해서 만족스러웠습니다. 추천드려요!',
    joinedAfter: true,
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
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const { isLoaded, selectHospital, selectedHospitalId } = useNaverMap('experience-map')

  // Features carousel state
  const [featuresIndex, setFeaturesIndex] = useState(0)
  const [featuresItemsPerView, setFeaturesItemsPerView] = useState(3)
  const featuresTotalSlides = Math.ceil(programFeatures.length / featuresItemsPerView)

  // Testimonials carousel state
  const [testimonialsIndex, setTestimonialsIndex] = useState(0)
  const [testimonialsItemsPerView, setTestimonialsItemsPerView] = useState(3)
  const testimonialsTotalSlides = Math.ceil(testimonials.length / testimonialsItemsPerView)

  // Carousel navigation
  const goToFeaturesSlide = useCallback((index: number) => {
    setFeaturesIndex(index)
  }, [])

  const goToTestimonialsSlide = useCallback((index: number) => {
    setTestimonialsIndex(index)
  }, [])

  // Update items per view based on screen size
  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth < 768) {
        setFeaturesItemsPerView(1)
        setTestimonialsItemsPerView(1)
      } else if (window.innerWidth < 1024) {
        setFeaturesItemsPerView(2)
        setTestimonialsItemsPerView(2)
      } else {
        setFeaturesItemsPerView(3)
        setTestimonialsItemsPerView(3)
      }
    }

    updateItemsPerView()
    window.addEventListener('resize', updateItemsPerView)
    return () => window.removeEventListener('resize', updateItemsPerView)
  }, [])

  // Auto-play for features carousel
  useEffect(() => {
    if (featuresTotalSlides <= 1) return
    const interval = setInterval(() => {
      setFeaturesIndex((prev) => (prev === featuresTotalSlides - 1 ? 0 : prev + 1))
    }, 4000)
    return () => clearInterval(interval)
  }, [featuresTotalSlides])

  // Auto-play for testimonials carousel
  useEffect(() => {
    if (testimonialsTotalSlides <= 1) return
    const interval = setInterval(() => {
      setTestimonialsIndex((prev) => (prev === testimonialsTotalSlides - 1 ? 0 : prev + 1))
    }, 4000)
    return () => clearInterval(interval)
  }, [testimonialsTotalSlides])

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index)
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
      {/* Hero Section - AboutPage 스타일 */}
      <section className="relative h-[calc(100vh-128px)] lg:h-[calc(100vh-160px)] flex items-center overflow-hidden">
        {/* 배경 */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/images/hospital-experience.jpeg')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#847466]/30 to-[#847466]/95" />
        </div>
        
        <div ref={heroRef} className="relative w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 pt-20 flex justify-end">
          <div className="max-w-2xl text-right">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-primary-400 text-sm font-medium mb-8 border border-white/20">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-400" />
              Experience Program
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-8 leading-tight">
              병원 근무 체험
            </h1>
            <p className="text-base text-gray-300 leading-relaxed mb-12">
              병원 인하우스 보험 설계사의 하루를<br className="hidden sm:block" />
              직접 경험해 보세요.<br className="hidden sm:block" />
              백문이 불여일견, 직접 체험하고 결정하세요.
            </p>

            {/* CTA 버튼 */}
            <div className="pt-8 border-t border-white/10">
              <a
                href="#experience-cta"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-primary-700 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                체험 신청하기
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 실제 설계사 이야기 섹션 */}
      <section className="py-20 lg:py-28 bg-gradient-to-br from-primary-50/50 via-white to-gray-50 overflow-hidden">
        <div ref={(el) => addToRefs(el as HTMLDivElement, 10)} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* 왼쪽 - 폰 목업 */}
            <div className="relative">
              {/* 배경 장식 */}
              <div className="absolute -top-16 -left-16 w-72 h-72 bg-primary-200/30 rounded-full blur-3xl" />
              <div className="absolute -bottom-8 -right-8 w-56 h-56 bg-gray-200/40 rounded-full blur-3xl" />

              {/* 폰 프레임 */}
              <div className="relative mx-auto w-[270px] sm:w-[300px]">
                <div className="relative bg-gradient-to-b from-gray-800 to-gray-900 rounded-[2.8rem] p-3 shadow-2xl">
                  {/* 노치 */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-7 bg-gray-900 rounded-b-2xl z-10">
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-3 bg-gray-800 rounded-full" />
                  </div>

                  {/* 스크린 */}
                  <div className="relative bg-gradient-to-b from-gray-100 to-white rounded-[2.2rem] overflow-hidden min-h-[500px]">
                    {/* 상단 바 */}
                    <div className="bg-white/90 backdrop-blur-sm px-5 py-4 pt-10 border-b border-gray-100">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                          <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">온담본부 설계사 모임</p>
                          <p className="text-xs text-gray-500">멤버 24명</p>
                        </div>
                      </div>
                    </div>

                    {/* 채팅 메시지들 */}
                    <div className="p-4 space-y-3">
                      {/* 메시지 1 - 왼쪽 */}
                      <div className="flex gap-2">
                        <div className="w-7 h-7 rounded-full bg-blue-100 flex-shrink-0 flex items-center justify-center text-xs">👩</div>
                        <div>
                          <p className="text-[10px] text-gray-400 mb-1">김설계 · 3년차</p>
                          <div className="bg-white text-gray-700 px-3.5 py-2.5 rounded-2xl rounded-tl-sm shadow-sm border border-gray-100">
                            <p className="text-sm">오늘 상담 3건 완료했어요! 환자분들이 먼저 물어봐주시니까 너무 편해요 👍</p>
                          </div>
                        </div>
                      </div>

                      {/* 메시지 2 - 오른쪽 */}
                      <div className="flex gap-2 justify-end">
                        <div>
                          <div className="bg-primary-500 text-white px-3.5 py-2.5 rounded-2xl rounded-tr-sm shadow-sm">
                            <p className="text-sm">저도요! 콜드콜 안 해도 되니까 퇴근 후가 진짜 자유로워졌어요 ✨</p>
                          </div>
                        </div>
                        <div className="w-7 h-7 rounded-full bg-green-100 flex-shrink-0 flex items-center justify-center text-xs">👨</div>
                      </div>

                      {/* 메시지 3 - 왼쪽 */}
                      <div className="flex gap-2">
                        <div className="w-7 h-7 rounded-full bg-purple-100 flex-shrink-0 flex items-center justify-center text-xs">👩‍💼</div>
                        <div>
                          <p className="text-[10px] text-gray-400 mb-1">이팀장 · 5년차</p>
                          <div className="bg-white text-gray-700 px-3.5 py-2.5 rounded-2xl rounded-tl-sm shadow-sm border border-gray-100">
                            <p className="text-sm">신규분들 적응 잘 하고 계시죠? 모르는 거 있으면 언제든 물어보세요~</p>
                          </div>
                        </div>
                      </div>

                      {/* 메시지 4 - 오른쪽 */}
                      <div className="flex gap-2 justify-end">
                        <div>
                          <div className="bg-primary-500 text-white px-3.5 py-2.5 rounded-2xl rounded-tr-sm shadow-sm">
                            <p className="text-sm">팀장님 덕분에 빨리 적응했어요! 교육도 체계적이고 좋아요 🙏</p>
                          </div>
                        </div>
                        <div className="w-7 h-7 rounded-full bg-orange-100 flex-shrink-0 flex items-center justify-center text-xs">🧑</div>
                      </div>

                      {/* 메시지 5 - 왼쪽 */}
                      <div className="flex gap-2">
                        <div className="w-7 h-7 rounded-full bg-pink-100 flex-shrink-0 flex items-center justify-center text-xs">👱‍♀️</div>
                        <div>
                          <p className="text-[10px] text-gray-400 mb-1">박설계 · 1년차</p>
                          <div className="bg-white text-gray-700 px-3.5 py-2.5 rounded-2xl rounded-tl-sm shadow-sm border border-gray-100">
                            <p className="text-sm">저 입사 전에 체험 프로그램 했었는데, 분위기 보고 바로 결정했어요 😊</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 폰 하단 바 */}
                <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-28 h-1 bg-gray-600 rounded-full" />
              </div>
            </div>

            {/* 오른쪽 - 텍스트 영역 */}
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary-100 text-primary-700 text-sm font-medium mb-6">
                Real Stories
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-bold text-gray-900 mb-6 leading-tight">
                실제 <span className="text-primary-600">설계사분들</span>의<br />
                생생한 이야기
              </h2>

              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                병원 인하우스 근무가 어떤지 궁금하시죠?<br />
                온담본부에서 일하고 계신 설계사분들의<br className="hidden sm:block" />
                실제 경험담을 들어보세요.
              </p>

              {/* 핵심 포인트 */}
              <div className="space-y-4 mb-10">
                {[
                  { icon: '🏥', title: '안정적인 근무환경', desc: '병원 내 전용 공간에서 근무' },
                  { icon: '🤝', title: '팀 단위 협업', desc: '선배 설계사의 체계적인 지원' },
                  { icon: '📈', title: '꾸준한 성장', desc: '지속적인 교육과 역량 개발' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-white shadow-sm border border-gray-100">
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <p className="font-semibold text-gray-900">{item.title}</p>
                      <p className="text-sm text-gray-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <a
                href="#experience-cta"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors shadow-lg shadow-primary-500/25"
              >
                나도 체험해보기
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
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
                <br />
                본인에게 맞는 일인지 확인해 볼 수 있는 기회입니다.
              </p>
            </div>

            {/* Features Carousel */}
            <div className="relative">
              <div className="overflow-hidden rounded-2xl">
                <div
                  className="flex transition-transform duration-500 ease-out"
                  style={{ transform: `translateX(-${featuresIndex * 100}%)` }}
                >
                  {Array.from({ length: featuresTotalSlides }).map((_, slideIndex) => (
                    <div
                      key={slideIndex}
                      className="w-full flex-shrink-0 grid gap-6"
                      style={{ gridTemplateColumns: `repeat(${featuresItemsPerView}, minmax(0, 1fr))` }}
                    >
                      {programFeatures
                        .slice(slideIndex * featuresItemsPerView, (slideIndex + 1) * featuresItemsPerView)
                        .map((feature, index) => (
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
                  ))}
                </div>
              </div>

              {/* Dot Indicators */}
              {featuresTotalSlides > 1 && (
                <div className="flex items-center justify-center gap-2 mt-8">
                  {Array.from({ length: featuresTotalSlides }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToFeaturesSlide(index)}
                      className={`transition-all duration-300 rounded-full ${
                        index === featuresIndex
                          ? 'w-6 h-2 bg-primary-600'
                          : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 하루 일과 */}
      <section className="hidden py-16 lg:py-24 bg-gray-50">
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

            {/* Testimonials Carousel */}
            <div className="relative">
              <div className="overflow-hidden rounded-2xl">
                <div
                  className="flex transition-transform duration-500 ease-out"
                  style={{ transform: `translateX(-${testimonialsIndex * 100}%)` }}
                >
                  {Array.from({ length: testimonialsTotalSlides }).map((_, slideIndex) => (
                    <div
                      key={slideIndex}
                      className="w-full flex-shrink-0 grid gap-6"
                      style={{ gridTemplateColumns: `repeat(${testimonialsItemsPerView}, minmax(0, 1fr))` }}
                    >
                      {testimonials
                        .slice(slideIndex * testimonialsItemsPerView, (slideIndex + 1) * testimonialsItemsPerView)
                        .map((item, index) => (
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
                  ))}
                </div>
              </div>

              {/* Dot Indicators */}
              {testimonialsTotalSlides > 1 && (
                <div className="flex items-center justify-center gap-2 mt-8">
                  {Array.from({ length: testimonialsTotalSlides }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToTestimonialsSlide(index)}
                      className={`transition-all duration-300 rounded-full ${
                        index === testimonialsIndex
                          ? 'w-6 h-2 bg-primary-600'
                          : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 협력 병원 지도 섹션 */}
      <section className="py-16 lg:py-24 bg-gray-50 overflow-hidden">
        <div ref={(el) => addToRefs(el, 5)} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden shadow-2xl">
            {/* 왼쪽 - 통계 및 병원 리스트 */}
            <div className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 p-8 lg:p-10 text-white relative">
              {/* 배경 장식 */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

              <div className="relative">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-white/90 text-sm font-medium mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-white" />
                  Partner Hospitals
                </span>

                <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-bold mb-4 leading-tight">
                  온담본부는<br />
                  경험을 숫자로 증명합니다
                </h2>

                <p className="text-white/70 mb-8 leading-relaxed">
                  서울, 경기 지역 협력 병원에서<br className="hidden sm:block" />
                  체험 프로그램을 운영하고 있습니다.
                </p>

                {/* 통계 */}
                <div className="grid grid-cols-2 gap-3 mb-8">
                  <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20">
                    <div className="text-2xl sm:text-3xl font-bold text-white mb-1">
                      50<span className="text-base sm:text-lg">%+</span>
                    </div>
                    <div className="text-sm font-medium text-white/90">온담 청약/계약</div>
                    <div className="text-xs text-white/50">전환률</div>
                  </div>
                  <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20">
                    <div className="text-2xl sm:text-3xl font-bold text-white mb-1">
                      10<span className="text-base sm:text-lg">개</span>
                    </div>
                    <div className="text-sm font-medium text-white/90">서울 경기 지역</div>
                    <div className="text-xs text-white/50">협력병원</div>
                  </div>
                </div>

                {/* 병원 리스트 */}
                <div className="space-y-2 max-h-[280px] overflow-y-auto pr-2 custom-scrollbar">
                  {hospitals.map((hospital) => (
                    <button
                      key={hospital.id}
                      onClick={() => selectHospital(hospital.id)}
                      className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 text-left ${
                        selectedHospitalId === hospital.id
                          ? 'bg-white text-primary-700'
                          : 'bg-white/10 hover:bg-white/20 text-white'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        selectedHospitalId === hospital.id
                          ? 'bg-primary-100'
                          : 'bg-white/10'
                      }`}>
                        <svg className={`w-5 h-5 ${selectedHospitalId === hospital.id ? 'text-primary-600' : 'text-white'}`} fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM18 14H14V18H10V14H6V10H10V6H14V10H18V14Z"/>
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm truncate">{hospital.name}</h4>
                        <p className={`text-xs truncate ${selectedHospitalId === hospital.id ? 'text-primary-500' : 'text-white/60'}`}>
                          {hospital.address}
                        </p>
                      </div>
                      <svg className={`w-4 h-4 flex-shrink-0 ${selectedHospitalId === hospital.id ? 'text-primary-500' : 'text-white/40'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 오른쪽 - 네이버 지도 */}
            <div className="relative h-[400px] lg:h-auto lg:min-h-[550px]">
              <div id="experience-map" className="absolute inset-0 w-full h-full" />
              {!isLoaded && (
                <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-10 h-10 border-3 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                    <p className="text-gray-500 text-sm">지도를 불러오는 중...</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section - Glassmorphism Style */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        {/* Background with subtle gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50/30" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-primary-100/40 via-transparent to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-blue-100/30 via-transparent to-transparent rounded-full blur-3xl" />

        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div ref={(el) => addToRefs(el, 3)}>
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
                체험 프로그램 관련 궁금한 점을 확인해 보세요
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
                      openFaq === index
                        ? 'bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/30'
                        : 'bg-gray-100 text-gray-500'
                    }`}>
                      <span className="font-semibold text-sm">{String(index + 1).padStart(2, '0')}</span>
                    </div>

                    <h3 className={`flex-1 font-semibold transition-colors duration-300 ${
                      openFaq === index ? 'text-gray-900' : 'text-gray-700'
                    }`}>
                      {faq.question}
                    </h3>

                    {/* Arrow with rotation */}
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                      openFaq === index
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
                    openFaq === index ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
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

      {/* CTA Section with Form */}
      <section id="experience-cta" className="relative min-h-[600px] lg:min-h-[700px] overflow-hidden">
        {/* Background Image */}
        <img
          src="/images/apply-bg.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1614]/88 via-[#1A1614]/45 to-[#1A1614]/88 z-[1]" />
        <div ref={(el) => addToRefs(el, 4)} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-16">
            {/* Left Content */}
            <div className="flex-1 text-center lg:text-left lg:pt-12">
              <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm text-white rounded-full text-sm font-medium mb-6 border border-white/20">
                Join Our Team
              </span>
              <h2 className="text-[27px] sm:text-[33px] lg:text-[45px] font-bold text-white mb-6 leading-tight">
                직접 경험해보고<br />
                <span className="text-primary-300">결정하세요</span>
              </h2>
              <p className="text-base text-white/80 mb-8 max-w-md mx-auto lg:mx-0">
                백문이 불여일견입니다.<br />
                하루 동안의 체험으로<br />
                병원 인하우스 설계사의 매력을 직접 느껴보세요.
              </p>
            </div>

            {/* Right Form */}
            <div className="w-full max-w-lg flex-shrink-0">
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                <form className="p-6 sm:p-8">
                  <div className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                          이름 <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          placeholder="홍길동"
                          className="w-full px-4 py-3 rounded-xl border-2 bg-gray-50 text-gray-900 placeholder-gray-400 transition-all duration-200 focus:outline-none focus:border-primary-500 focus:bg-white focus:ring-4 focus:ring-primary-500/10 border-gray-200"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                          연락처 <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          placeholder="010-1234-5678"
                          className="w-full px-4 py-3 rounded-xl border-2 bg-gray-50 text-gray-900 placeholder-gray-400 transition-all duration-200 focus:outline-none focus:border-primary-500 focus:bg-white focus:ring-4 focus:ring-primary-500/10 border-gray-200"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                          출생년도 <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="birthYear"
                          placeholder="1990"
                          maxLength={4}
                          className="w-full px-4 py-3 rounded-xl border-2 bg-gray-50 text-gray-900 placeholder-gray-400 transition-all duration-200 focus:outline-none focus:border-primary-500 focus:bg-white focus:ring-4 focus:ring-primary-500/10 border-gray-200"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                          거주지역 <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="region"
                          placeholder="서울시 강남구"
                          className="w-full px-4 py-3 rounded-xl border-2 bg-gray-50 text-gray-900 placeholder-gray-400 transition-all duration-200 focus:outline-none focus:border-primary-500 focus:bg-white focus:ring-4 focus:ring-primary-500/10 border-gray-200"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                        보험경력 <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <select
                          name="insuranceCareer"
                          className="w-full px-4 py-3 rounded-xl border-2 bg-gray-50 text-gray-900 transition-all duration-200 appearance-none cursor-pointer focus:outline-none focus:border-primary-500 focus:bg-white focus:ring-4 focus:ring-primary-500/10 border-gray-200"
                        >
                          <option value="">(선택)</option>
                          <option value="없음">없음</option>
                          <option value="1년 미만">1년 미만</option>
                          <option value="1-3년">1-3년</option>
                          <option value="3-5년">3-5년</option>
                          <option value="5년 이상">5년 이상</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="py-3 px-4 bg-gradient-to-r from-primary-50 to-blue-50 rounded-xl border border-primary-100">
                      <p className="text-primary-700 font-medium text-sm flex items-center gap-2">
                        <svg className="w-4 h-4 text-primary-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                        사업설명회 참석시 교통비 5만원이 지급됩니다.
                      </p>
                    </div>
                    <div className="pt-3 border-t border-gray-100">
                      <p className="text-sm font-semibold text-gray-700 mb-2">
                        개인정보 수집 및 이용 동의 <span className="text-red-500">*</span>
                      </p>
                      <label className="flex items-start gap-3 cursor-pointer group">
                        <div className="relative flex-shrink-0 mt-0.5">
                          <input type="checkbox" name="privacyConsent" className="peer sr-only" />
                          <div className="w-5 h-5 border-2 rounded transition-all duration-200 peer-checked:bg-primary-500 peer-checked:border-primary-500 peer-focus:ring-4 peer-focus:ring-primary-500/20 border-gray-300" />
                          <svg className="absolute inset-0 w-5 h-5 text-white opacity-0 peer-checked:opacity-100 transition-opacity p-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                          개인정보 수집 및 이용에 동의합니다.
                        </span>
                      </label>
                    </div>
                    <button
                      type="submit"
                      className="w-full py-4 rounded-xl font-bold text-base text-white transition-all duration-300 bg-primary-600 hover:bg-primary-700 active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-primary-500/30 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-primary-600/25 hover:shadow-xl hover:shadow-primary-600/30"
                    >
                      신청하기
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
