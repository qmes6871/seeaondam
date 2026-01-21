import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// 본부 위치 좌표 (서울 송파구 위례서로 252)
const OFFICE_LOCATION = {
  lat: 37.4780,
  lng: 127.1450,
}

const historyData = [
  { year: '2024', events: ['시어에셋 온담본부 설립', '협력 병원 10개소 확보'] },
  { year: '2023', events: ['병원 인하우스 사업 기획', '핵심 인력 구성'] },
  { year: '2022', events: ['보험라운지 운영 모델 개발', '시범 운영 시작'] },
]

export function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const sectionsRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<HTMLDivElement>(null)

  // 네이버 지도 초기화
  useEffect(() => {
    const initMap = () => {
      if (!mapRef.current || !window.naver?.maps) return

      const { maps } = window.naver
      const location = new maps.LatLng(OFFICE_LOCATION.lat, OFFICE_LOCATION.lng)

      const map = new maps.Map(mapRef.current, {
        center: location,
        zoom: 16,
        zoomControl: true,
        zoomControlOptions: {
          position: maps.Position.TOP_RIGHT,
        },
      })

      // 마커 추가
      const marker = new maps.Marker({
        position: location,
        map: map,
        title: '시어에셋 온담본부',
      })

      // 정보창 추가
      const infoWindow = new maps.InfoWindow({
        content: `
          <div style="padding: 15px; min-width: 200px;">
            <h4 style="margin: 0 0 8px 0; font-weight: bold; color: #1f2937;">시어에셋 온담본부</h4>
            <p style="margin: 0; font-size: 13px; color: #6b7280;">서울특별시 송파구 위례서로 252<br/>유원플러스 송파</p>
          </div>
        `,
      })
      infoWindow.open(map, marker)
    }

    if (window.naver?.maps) {
      initMap()
    } else {
      const checkInterval = setInterval(() => {
        if (window.naver?.maps) {
          clearInterval(checkInterval)
          initMap()
        }
      }, 100)

      return () => clearInterval(checkInterval)
    }
  }, [])

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

      // Sections animation
      if (sectionsRef.current) {
        const sections = sectionsRef.current.querySelectorAll('.animate-section')
        sections.forEach((section) => {
          gsap.fromTo(
            section,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              scrollTrigger: {
                trigger: section,
                start: 'top 80%',
              },
            }
          )
        })
      }
    })

    return () => ctx.revert()
  }, [])

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
            About Us
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6">
            시어에셋 온담본부 소개
          </h1>
          <p className="text-lg lg:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            병원 인하우스 전문 조직으로서 안정적인 환경과 체계적인 시스템을 바탕으로<br className="hidden sm:block" />
            보험 전문가의 성장을 지원합니다.
          </p>
        </div>
      </section>

      <div ref={sectionsRef}>
        {/* 본부 소개 Section */}
        <section className="py-20 lg:py-28 bg-white animate-section">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-primary-100 text-primary-700 text-sm font-medium mb-4">
                  Introduction
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                  온담본부는 <span className="text-primary-600">따뜻한 동행</span>을<br />
                  추구합니다
                </h2>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>
                    시어에셋 온담본부는 '따뜻할 온(溫)', '담을 담(擔)'의 의미를 담아,
                    고객과 설계사 모두에게 따뜻한 동행이 되고자 설립되었습니다.
                  </p>
                  <p>
                    병원 인하우스 전문 조직으로서, 콜드콜 없이 환자분들과 자연스러운 만남을 통해
                    신뢰를 쌓아가며, 안정적인 근무 환경에서 전문성을 키워갈 수 있습니다.
                  </p>
                  <p>
                    체계적인 교육 시스템과 팀 단위 협업 문화를 바탕으로,
                    신입부터 경력까지 모든 구성원의 성장을 지원합니다.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-primary-100 to-primary-200 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-24 h-24 mx-auto mb-4 rounded-2xl bg-white/80 flex items-center justify-center shadow-lg">
                        <span className="text-3xl font-bold text-primary-600">온담</span>
                      </div>
                      <p className="text-primary-700 font-medium">따뜻한 동행</p>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary-500/10 rounded-2xl -z-10" />
              </div>
            </div>
          </div>
        </section>

        {/* 대표 인사말 Section */}
        <section className="py-20 lg:py-28 bg-gray-50 animate-section">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <span className="inline-block px-3 py-1 rounded-full bg-primary-100 text-primary-700 text-sm font-medium mb-4">
                  CEO Message
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
                  대표 인사말
                </h2>
              </div>

              <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-xl">
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  <div className="flex-shrink-0 mx-auto md:mx-0">
                    <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                      <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div className="text-center mt-4">
                      <p className="font-bold text-gray-900">이승정</p>
                      <p className="text-sm text-gray-500">시어에셋 온담본부 대표</p>
                    </div>
                  </div>
                  <div className="flex-1">
                    <svg className="w-10 h-10 text-primary-200 mb-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                    <div className="space-y-4 text-gray-600 leading-relaxed">
                      <p>
                        안녕하십니까, 시어에셋 온담본부 대표 이승정입니다.
                      </p>
                      <p>
                        온담본부는 '따뜻하게 담다'라는 의미처럼, 고객 한 분 한 분의 이야기에
                        귀 기울이고, 진심으로 함께하는 보험 서비스를 제공하고자 합니다.
                      </p>
                      <p>
                        병원이라는 특별한 공간에서 환자분들과 만나는 우리 설계사분들이
                        자부심을 가지고 일할 수 있도록, 최고의 환경과 지원을 아끼지 않겠습니다.
                      </p>
                      <p>
                        함께 성장하고, 함께 성공하는 온담본부가 되겠습니다. 감사합니다.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 보험라운지 운영 소개 Section */}
        <section className="py-20 lg:py-28 bg-white animate-section">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 lg:mb-16">
              <span className="inline-block px-3 py-1 rounded-full bg-primary-100 text-primary-700 text-sm font-medium mb-4">
                Insurance Lounge
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                보험라운지 운영 소개
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                병원 내 전용 공간에서 환자분들에게 편안하고 전문적인 보험 상담 서비스를 제공합니다.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {[
                {
                  icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
                  title: '병원 내 전용 공간',
                  description: '병원과 협약을 통해 전용 상담 공간을 운영하며, 환자분들이 편안하게 방문할 수 있습니다.',
                },
                {
                  icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z',
                  title: '전문 상담 인력',
                  description: '체계적인 교육을 받은 전문 설계사가 상주하며, 맞춤형 보험 상담을 제공합니다.',
                },
                {
                  icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
                  title: '신뢰 기반 서비스',
                  description: '콜드콜 없이 병원을 통해 자연스럽게 연결되어, 신뢰를 바탕으로 상담이 이루어집니다.',
                },
                {
                  icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
                  title: '정해진 근무 시간',
                  description: '병원 운영 시간에 맞춰 규칙적으로 근무하며, 워라밸을 보장받을 수 있습니다.',
                },
                {
                  icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
                  title: '체계적인 고객 관리',
                  description: '병원과 연계된 시스템을 통해 체계적인 고객 관리와 후속 서비스가 가능합니다.',
                },
                {
                  icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6',
                  title: '안정적인 성과',
                  description: '지속적인 고객 유입으로 안정적인 영업 기반을 확보할 수 있습니다.',
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="group p-6 lg:p-8 rounded-2xl border border-gray-100 bg-white hover:border-primary-200 hover:shadow-xl transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center mb-5 group-hover:bg-primary-600 group-hover:text-white transition-colors duration-300">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 연혁 Section */}
        <section className="py-20 lg:py-28 bg-gray-50 animate-section">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 lg:mb-16">
              <span className="inline-block px-3 py-1 rounded-full bg-primary-100 text-primary-700 text-sm font-medium mb-4">
                History
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                시어에셋 온담본부 연혁
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                온담본부의 발자취를 소개합니다.
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-primary-200 md:-translate-x-1/2" />

                {historyData.map((item, index) => (
                  <div key={item.year} className={`relative flex items-start gap-8 mb-12 last:mb-0 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    {/* Year Badge */}
                    <div className="absolute left-4 md:left-1/2 w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center -translate-x-1/2 z-10">
                      <div className="w-3 h-3 bg-white rounded-full" />
                    </div>

                    {/* Content */}
                    <div className={`ml-16 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                      <div className="bg-white rounded-2xl p-6 shadow-lg">
                        <span className="inline-block px-3 py-1 rounded-full bg-primary-100 text-primary-700 text-sm font-bold mb-3">
                          {item.year}
                        </span>
                        <ul className={`space-y-2 ${index % 2 === 0 ? 'md:text-right' : ''}`}>
                          {item.events.map((event, eventIndex) => (
                            <li key={eventIndex} className="text-gray-700">{event}</li>
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

        {/* 오시는 길 Section */}
        <section className="py-20 lg:py-28 bg-white animate-section">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 lg:mb-16">
              <span className="inline-block px-3 py-1 rounded-full bg-primary-100 text-primary-700 text-sm font-medium mb-4">
                Location
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                오시는 길
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                시어에셋 온담본부를 방문해 주세요.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Map */}
              <div className="lg:col-span-2">
                <div
                  ref={mapRef}
                  className="aspect-[16/9] lg:aspect-[16/10] rounded-2xl bg-gray-100 overflow-hidden"
                />
              </div>

              {/* Info */}
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-2xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">주소</h4>
                      <p className="text-gray-600 text-sm">
                        서울특별시 송파구 위례서로 252<br />
                        유원플러스 송파
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-2xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">대표전화</h4>
                      <p className="text-gray-600 text-sm">02-1234-5678</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-2xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">운영시간</h4>
                      <p className="text-gray-600 text-sm">
                        평일 09:00 - 18:00<br />
                        (주말 및 공휴일 휴무)
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-2xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">교통편</h4>
                      <p className="text-gray-600 text-sm">
                        지하철 8호선 위례역 3번 출구<br />
                        도보 5분
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
