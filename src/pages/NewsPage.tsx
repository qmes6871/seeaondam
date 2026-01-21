import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// 수상내역 데이터
const awardsData = [
  { year: '2024', title: 'MDRT 달성률 우수 본부', org: '시어에셋' },
  { year: '2024', title: '신인왕 배출 본부', org: '시어에셋' },
  { year: '2023', title: '우수 영업 본부상', org: '시어에셋' },
]

// 관리자 데이터
const managersData = [
  { name: '이승정', position: '본부장', description: '온담본부 총괄 관리' },
  { name: '홍길동', position: '부본부장', description: '영업 전략 및 교육 담당' },
  { name: '김철수', position: '팀장', description: '신규 인력 관리 및 육성' },
]

// 매체 인터뷰 데이터
const interviewsData = [
  { date: '2024.12', title: '병원 인하우스의 새로운 패러다임', media: '보험신문', thumbnail: '' },
  { date: '2024.10', title: '온담본부가 말하는 성공적인 보험 영업', media: '인슈어런스타임즈', thumbnail: '' },
  { date: '2024.08', title: 'MDRT 달성의 비결, 온담본부에서 찾다', media: '한국보험신문', thumbnail: '' },
]

// 보도자료 데이터
const pressData = [
  { date: '2024.12.15', title: '시어에셋 온담본부, 협력 병원 15개소 돌파', category: '성장' },
  { date: '2024.11.20', title: '온담본부 MDRT 달성률 40% 기록', category: '성과' },
  { date: '2024.10.10', title: '시어에셋, 온담본부 신규 교육 프로그램 런칭', category: '교육' },
  { date: '2024.09.05', title: '병원 인하우스 전문 조직 온담본부 출범', category: '출범' },
]

// 행사 및 이벤트 데이터
const eventsData = [
  { date: '2025.01', title: '2025 신년 킥오프 미팅', status: '예정', description: '새해 목표 설정 및 전략 공유' },
  { date: '2024.12', title: '송년회 및 시상식', status: '완료', description: '우수 설계사 시상 및 송년 행사' },
  { date: '2024.11', title: 'MDRT 달성자 축하 행사', status: '완료', description: 'MDRT 달성 설계사 축하 및 노하우 공유' },
  { date: '2024.10', title: '신입 설계사 OT', status: '완료', description: '신규 입사자 오리엔테이션' },
]

export function NewsPage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const sectionsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation
      if (heroRef.current) {
        gsap.fromTo(
          heroRef.current.children,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.15 }
        )
      }

      // Sections scroll animation
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
            PR Center
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6">
            홍보센터
          </h1>
          <p className="text-lg lg:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            시어에셋 온담본부의 소식과 성과를 확인해 보세요.
          </p>
        </div>
      </section>

      {/* 수상내역 Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div ref={(el) => addToRefs(el, 0)}>
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary-100 text-primary-700 text-sm font-medium mb-4">
                Awards
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">수상내역</h2>
              <p className="text-gray-600">온담본부의 자랑스러운 성과를 소개합니다.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {awardsData.map((award, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center flex-shrink-0 shadow-lg">
                      <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                      </svg>
                    </div>
                    <div>
                      <span className="inline-block px-2 py-0.5 rounded bg-primary-100 text-primary-700 text-xs font-medium mb-2">
                        {award.year}
                      </span>
                      <h3 className="font-bold text-gray-900 mb-1">{award.title}</h3>
                      <p className="text-sm text-gray-500">{award.org}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 관리자 Section */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div ref={(el) => addToRefs(el, 1)}>
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary-100 text-primary-700 text-sm font-medium mb-4">
                Leadership
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">시어에셋 온담본부 관리자</h2>
              <p className="text-gray-600">온담본부를 이끄는 리더들을 소개합니다.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {managersData.map((manager, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 text-center"
                >
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{manager.name}</h3>
                  <p className="text-primary-600 font-medium mb-3">{manager.position}</p>
                  <p className="text-sm text-gray-500">{manager.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 매체 인터뷰 Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div ref={(el) => addToRefs(el, 2)}>
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary-100 text-primary-700 text-sm font-medium mb-4">
                Media
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">매체 인터뷰</h2>
              <p className="text-gray-600">온담본부가 소개된 미디어 기사를 확인해 보세요.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {interviewsData.map((interview, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer"
                >
                  <div className="aspect-video bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                    <svg className="w-16 h-16 text-gray-400 group-hover:text-primary-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-2 py-0.5 rounded bg-primary-100 text-primary-700 text-xs font-medium">
                        {interview.media}
                      </span>
                      <span className="text-xs text-gray-400">{interview.date}</span>
                    </div>
                    <h3 className="font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                      {interview.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 보도자료 Section */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div ref={(el) => addToRefs(el, 3)}>
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary-100 text-primary-700 text-sm font-medium mb-4">
                Press Release
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">보도자료</h2>
              <p className="text-gray-600">온담본부의 공식 보도자료입니다.</p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="divide-y divide-gray-100">
                {pressData.map((press, index) => (
                  <div
                    key={index}
                    className="p-6 hover:bg-gray-50 transition-colors cursor-pointer group"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
                      <div className="flex items-center gap-3 sm:w-48 flex-shrink-0">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                          press.category === '성장' ? 'bg-green-100 text-green-700' :
                          press.category === '성과' ? 'bg-blue-100 text-blue-700' :
                          press.category === '교육' ? 'bg-purple-100 text-purple-700' :
                          'bg-orange-100 text-orange-700'
                        }`}>
                          {press.category}
                        </span>
                        <span className="text-sm text-gray-400">{press.date}</span>
                      </div>
                      <h3 className="flex-1 font-medium text-gray-900 group-hover:text-primary-600 transition-colors">
                        {press.title}
                      </h3>
                      <svg className="w-5 h-5 text-gray-300 group-hover:text-primary-500 transition-colors hidden sm:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 행사 및 이벤트 Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div ref={(el) => addToRefs(el, 4)}>
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary-100 text-primary-700 text-sm font-medium mb-4">
                Events
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">행사 및 이벤트</h2>
              <p className="text-gray-600">온담본부의 주요 행사와 이벤트 일정입니다.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {eventsData.map((event, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
                        event.status === '예정'
                          ? 'bg-gradient-to-br from-primary-500 to-primary-600'
                          : 'bg-gradient-to-br from-gray-400 to-gray-500'
                      }`}>
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <span className="text-sm font-medium text-gray-500 mt-2">{event.date}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-bold text-gray-900">{event.title}</h3>
                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                          event.status === '예정'
                            ? 'bg-primary-100 text-primary-700'
                            : 'bg-gray-100 text-gray-500'
                        }`}>
                          {event.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{event.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
