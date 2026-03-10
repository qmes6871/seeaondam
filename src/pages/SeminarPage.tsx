import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// 온담본부 지사 위치 정보
const ondamOffice = {
  name: '온담본부 지사',
  address: '서울 송파구 위례서로 252',
  lat: 37.4773,
  lng: 127.1428,
}

// 사업설명회 FAQ
const seminarFaqs = [
  {
    question: '사업설명회 참가 비용이 있나요?',
    answer: '아니요, 사업설명회는 무료로 진행됩니다. 참석하시는 모든 분께 교통비 5만원을 지원해 드립니다.',
  },
  {
    question: '보험 경력이 없어도 참석할 수 있나요?',
    answer: '네, 보험 경력과 관계없이 누구나 참석하실 수 있습니다. 오히려 경력이 없으신 분들께 온담본부의 시스템을 더 자세히 설명드립니다.',
  },
  {
    question: '설명회는 얼마나 진행되나요?',
    answer: '약 1시간 30분~2시간 정도 진행됩니다. 온담본부 소개, 병원 인하우스 시스템 설명, 질의응답 순으로 이루어집니다.',
  },
  {
    question: '설명회 참석 후 반드시 입사해야 하나요?',
    answer: '아니요, 전혀 부담 없이 참석하셔서 정보만 얻어가셔도 됩니다. 입사 여부는 충분히 고민하신 후 결정하시면 됩니다.',
  },
  {
    question: '설명회 일정은 어떻게 되나요?',
    answer: '매주 정기적으로 진행되며, 신청 후 담당자가 가능한 일정을 안내해 드립니다. 개인 일정에 맞춰 조율 가능합니다.',
  },
]

export function SeminarPage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [isMapLoaded, setIsMapLoaded] = useState(false)

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  // 온담본부 지사 전용 지도 초기화
  useEffect(() => {
    const initMap = () => {
      if (!window.naver || !window.naver.maps) return

      const container = document.getElementById('seminar-map')
      if (!container) return

      try {
        const { maps } = window.naver
        const isMobile = window.innerWidth < 768

        const map = new maps.Map(container, {
          center: new maps.LatLng(ondamOffice.lat, ondamOffice.lng),
          zoom: 16,
          minZoom: 8,
          maxZoom: 18,
          zoomControl: !isMobile,
          zoomControlOptions: {
            position: maps.Position.TOP_RIGHT,
          },
          scrollWheel: false,
        })

        // 온담본부 지사 마커 생성
        const marker = new maps.Marker({
          position: new maps.LatLng(ondamOffice.lat, ondamOffice.lng),
          map: map,
          title: ondamOffice.name,
          icon: {
            content: `<div style="
              width: 52px;
              height: 52px;
              background: linear-gradient(135deg, #9A8574 0%, #7D6B5C 100%);
              border-radius: 50%;
              border: 4px solid white;
              box-shadow: 0 6px 16px rgba(125, 107, 92, 0.5);
              display: flex;
              align-items: center;
              justify-content: center;
            ">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
            </div>`,
            size: new maps.Size(52, 52),
            anchor: new maps.Point(26, 26),
          },
        })

        // 온담본부 지사 InfoWindow
        const infoWindow = new maps.InfoWindow({
          content: `
            <div style="
              min-width: 280px;
              max-width: 320px;
              background: linear-gradient(135deg, #FAF8F5 0%, #F0EBE0 100%);
              border-radius: 16px;
              box-shadow: 0 20px 40px rgba(0,0,0,0.10), 0 8px 16px rgba(0,0,0,0.06);
              overflow: hidden;
              font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif;
            ">
              <div style="
                background: linear-gradient(135deg, #7D6B5C 0%, #9A8574 100%);
                padding: 20px 24px;
                position: relative;
                overflow: hidden;
              ">
                <div style="
                  position: absolute;
                  top: -20px;
                  right: -20px;
                  width: 80px;
                  height: 80px;
                  background: rgba(255,255,255,0.1);
                  border-radius: 50%;
                "></div>
                <div style="
                  display: flex;
                  align-items: center;
                  gap: 12px;
                  position: relative;
                  z-index: 1;
                ">
                  <div style="
                    width: 44px;
                    height: 44px;
                    background: rgba(255,255,255,0.2);
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                  ">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                      <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/>
                    </svg>
                  </div>
                  <div>
                    <div style="
                      font-size: 11px;
                      font-weight: 500;
                      color: rgba(255,255,255,0.8);
                      text-transform: uppercase;
                      letter-spacing: 0.5px;
                      margin-bottom: 2px;
                    ">시어에셋</div>
                    <h3 style="
                      margin: 0;
                      font-size: 18px;
                      font-weight: 700;
                      color: white;
                      line-height: 1.3;
                    ">${ondamOffice.name}</h3>
                  </div>
                </div>
              </div>

              <div style="padding: 20px 24px;">
                <div style="
                  display: flex;
                  align-items: flex-start;
                  gap: 10px;
                  margin-bottom: 16px;
                ">
                  <div style="
                    width: 32px;
                    height: 32px;
                    background: #E5E0D2;
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                  ">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="#5E5046">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                  </div>
                  <div>
                    <div style="
                      font-size: 11px;
                      font-weight: 600;
                      color: #B69D8A;
                      text-transform: uppercase;
                      letter-spacing: 0.3px;
                      margin-bottom: 4px;
                    ">주소</div>
                    <p style="
                      margin: 0;
                      font-size: 14px;
                      color: #5E5046;
                      line-height: 1.5;
                      font-weight: 500;
                    ">${ondamOffice.address}</p>
                  </div>
                </div>

                <div style="
                  display: inline-flex;
                  align-items: center;
                  gap: 6px;
                  padding: 8px 14px;
                  background: linear-gradient(135deg, #F0EBE0 0%, #E5E0D2 100%);
                  border-radius: 20px;
                  border: 1px solid #C6BEAF;
                ">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="#5E5046">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                  <span style="
                    font-size: 12px;
                    font-weight: 600;
                    color: #5E5046;
                  ">온담본부 인하우스 운영</span>
                </div>
              </div>
            </div>
          `,
          borderWidth: 0,
          disableAnchor: true,
          backgroundColor: 'transparent',
          pixelOffset: new maps.Point(0, -10),
        })

        // 기본으로 InfoWindow 열기
        infoWindow.open(map, marker)

        // 마커 클릭 시 InfoWindow 토글
        maps.Event.addListener(marker, 'click', () => {
          infoWindow.open(map, marker)
        })

        setIsMapLoaded(true)
      } catch (err) {
        console.error('지도 초기화 오류:', err)
      }
    }

    if (window.naver && window.naver.maps) {
      initMap()
    } else {
      const checkInterval = setInterval(() => {
        if (window.naver && window.naver.maps) {
          clearInterval(checkInterval)
          initMap()
        }
      }, 100)

      const timeout = setTimeout(() => {
        clearInterval(checkInterval)
      }, 5000)

      return () => {
        clearInterval(checkInterval)
        clearTimeout(timeout)
      }
    }
  }, [])

  useEffect(() => {
    // Hero animation only - simpler approach
    if (heroRef.current) {
      gsap.fromTo(
        heroRef.current.children,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: 'power3.out' }
      )
    }

    // Clean up all ScrollTriggers on unmount
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])


  return (
    <div className="pt-16 lg:pt-20">
      {/* Hero Section */}
      <section className="relative h-[calc(100vh-128px)] lg:h-[calc(100vh-160px)] flex items-center overflow-hidden">
        {/* 배경 */}
        <div className="absolute inset-0 bg-[#847466]">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/images/hero-hospital.png')" }}
          />
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
              Business Seminar
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-8 leading-tight">
              시어에셋 온담본부
            </h1>
            <p className="text-base text-gray-300 leading-relaxed mb-12">
              시어에셋 온담본부는<br className="hidden sm:block" />
              온 마음을 담은 상담으로<br className="hidden sm:block" />
              고객과 설계사 모두의 지속을 설계합니다.
            </p>

            {/* CTA 버튼 */}
            <div className="pt-8 border-t border-white/10">
              <a
                href="#seminar-cta"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-primary-700 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                사업설명회 참석 신청하기
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 두 번째 섹션 - 보험 영업 질문 */}
      <section className="relative">
        {/* 상단 - 이미지 + 텍스트 */}
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* 왼쪽 이미지 */}
          <div className="relative h-[350px] lg:h-[480px] overflow-hidden">
            <img
              src="/images/gallery/ondam-gallery-2.jpeg"
              alt="상담 이미지"
              className="w-full h-full object-cover"
            />
            {/* 이미지 오버레이 그라데이션 */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            <div className="absolute inset-0 bg-[#f5f3ef]/40 lg:bg-[#f5f3ef]/50" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#f5f3ef]/90" />
          </div>
          {/* 오른쪽 텍스트 */}
          <div className="relative flex items-center px-8 lg:px-16 py-14 lg:py-0 overflow-hidden">
            {/* 배경 패턴 */}
            <div className="absolute inset-0" style={{ backgroundColor: '#f5f3ef', backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(0,0,0,0.03) 1px, transparent 0)', backgroundSize: '32px 32px' }} />
            {/* 배경 장식 */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-100/40 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gray-200/30 rounded-full translate-y-1/2 -translate-x-1/2" />

            <div className="relative">
              {/* 작은 라벨 */}
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 text-primary-700 text-xs font-semibold mb-6 border border-primary-100">
                <span className="w-1 h-1 rounded-full bg-primary-500" />
                Question
              </span>
              <h2 className="text-2xl lg:text-[32px] font-bold text-gray-900 mb-6 leading-tight tracking-tight">
                보험 영업,<br />
                아직도 <span className="text-primary-600">'판매'</span>부터<br className="lg:hidden" /> 시작하고 있나요?
              </h2>
              <div className="w-12 h-[2px] bg-gradient-to-r from-primary-500 to-primary-200 mb-6" />
              <p className="text-gray-600 text-sm lg:text-[15px] leading-[1.8]">
                지인 영업, 반복되는 DB 구매,<br />
                만날 사람을 찾는 데 에너지를 다 쓰고 있지는 않으신가요?<br />
                <span className="text-gray-800 font-medium">보험의 본질은 판매가 아니라 도움이어야 합니다.</span><br />
                그러나 현실의 구조는 그 본질을 지키기 어렵게 만듭니다.
              </p>
            </div>
          </div>
        </div>

        {/* 하단 - 시어에셋 온담본부 */}
        <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-20 lg:py-28 overflow-hidden">
          {/* 배경 패턴 */}
          <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)', backgroundSize: '32px 32px' }} />
          {/* 장식 요소 */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary-500/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-primary-400/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />

          <div className="relative max-w-7xl mx-auto px-8 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
              {/* 왼쪽 타이틀 */}
              <div>
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-primary-300 text-xs font-semibold mb-5 border border-white/10">
                  Our Difference
                </span>
                <h3 className="text-3xl lg:text-[40px] font-bold text-white leading-tight tracking-tight">
                  시어에셋 온담본부는<br />
                  <span className="text-primary-400">다릅니다</span>
                </h3>
              </div>

              {/* 오른쪽 콘텐츠 */}
              <div className="relative">
                <div className="absolute -left-4 top-0 bottom-0 w-[3px] bg-gradient-to-b from-primary-400 via-primary-500 to-primary-600/50 rounded-full" />
                <div className="pl-8">
                  <p className="text-xl lg:text-2xl font-bold text-white mb-4 leading-snug">
                    도움에서 상담이 시작되는<br />
                    <span className="text-primary-400">구조</span>를 만듭니다
                  </p>
                  <p className="text-gray-400 text-base lg:text-lg leading-relaxed">
                    시어에셋 온담본부는 보험을 설계하지만,<br />
                    <span className="font-medium text-gray-300">영업보다 상담을, 판매보다 도움을 먼저 생각합니다.</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 참석자 후기 섹션 */}
      <section className="py-20 lg:py-28 bg-gradient-to-br from-primary-50/50 via-white to-gray-50 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
                    {/* 채팅 헤더 */}
                    <div className="bg-white/90 backdrop-blur-sm px-5 py-4 pt-10 border-b border-gray-100">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                          <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">설명회 참석자 모임</p>
                          <p className="text-xs text-gray-500">멤버 32명</p>
                        </div>
                      </div>
                    </div>

                    {/* 채팅 내용 */}
                    <div className="p-4 space-y-3">
                      <div className="flex gap-2">
                        <div className="w-7 h-7 rounded-full bg-blue-100 flex-shrink-0 flex items-center justify-center text-xs">👩</div>
                        <div>
                          <p className="text-[10px] text-gray-400 mb-1">김지영 · 참석자</p>
                          <div className="bg-white text-gray-700 px-3.5 py-2.5 rounded-2xl rounded-tl-sm shadow-sm border border-gray-100">
                            <p className="text-sm">설명회 듣고 바로 결정했어요! 이런 구조가 있는 줄 몰랐네요 👍</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2 justify-end">
                        <div>
                          <div className="bg-primary-500 text-white px-3.5 py-2.5 rounded-2xl rounded-tr-sm shadow-sm">
                            <p className="text-sm">저도요! 병원에서 바로 상담하는 시스템이 너무 좋아 보여요 ✨</p>
                          </div>
                        </div>
                        <div className="w-7 h-7 rounded-full bg-green-100 flex-shrink-0 flex items-center justify-center text-xs">👨</div>
                      </div>

                      <div className="flex gap-2">
                        <div className="w-7 h-7 rounded-full bg-purple-100 flex-shrink-0 flex items-center justify-center text-xs">👩‍💼</div>
                        <div>
                          <p className="text-[10px] text-gray-400 mb-1">박수진 · 참석자</p>
                          <div className="bg-white text-gray-700 px-3.5 py-2.5 rounded-2xl rounded-tl-sm shadow-sm border border-gray-100">
                            <p className="text-sm">교통비도 지원해주시고, 설명도 친절하셔서 좋았어요~</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2 justify-end">
                        <div>
                          <div className="bg-primary-500 text-white px-3.5 py-2.5 rounded-2xl rounded-tr-sm shadow-sm">
                            <p className="text-sm">궁금했던 부분 다 해소됐어요! 체험도 신청할 예정입니다 🙏</p>
                          </div>
                        </div>
                        <div className="w-7 h-7 rounded-full bg-orange-100 flex-shrink-0 flex items-center justify-center text-xs">🧑</div>
                      </div>

                      <div className="flex gap-2">
                        <div className="w-7 h-7 rounded-full bg-pink-100 flex-shrink-0 flex items-center justify-center text-xs">👱‍♀️</div>
                        <div>
                          <p className="text-[10px] text-gray-400 mb-1">이미나 · 참석자</p>
                          <div className="bg-white text-gray-700 px-3.5 py-2.5 rounded-2xl rounded-tl-sm shadow-sm border border-gray-100">
                            <p className="text-sm">다른 곳과는 확실히 다르더라고요. 설명회 참석 강추해요!</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 홈 인디케이터 */}
                  <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-28 h-1 bg-gray-600 rounded-full" />
                </div>
              </div>
            </div>

            {/* 오른쪽 - 텍스트 */}
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary-100 text-primary-700 text-sm font-medium mb-6">
                Real Stories
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-bold text-gray-900 mb-6 leading-tight">
                참석해 보신 분들의<br />
                <span className="text-primary-600">생생한 이야기</span>
              </h2>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                사업설명회가 어떻게 진행되는지 궁금하시죠?<br />
                직접 참석하신 분들의<br className="hidden sm:block" />
                솔직한 후기를 확인해보세요.
              </p>

              <div className="space-y-4 mb-10">
                <div className="flex items-start gap-4 p-4 rounded-xl bg-white shadow-sm border border-gray-100">
                  <span className="text-2xl">📋</span>
                  <div>
                    <p className="font-semibold text-gray-900">체계적인 설명</p>
                    <p className="text-sm text-gray-500">온담본부의 비전과 시스템을 상세히 안내</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 rounded-xl bg-white shadow-sm border border-gray-100">
                  <span className="text-2xl">💬</span>
                  <div>
                    <p className="font-semibold text-gray-900">자유로운 질의응답</p>
                    <p className="text-sm text-gray-500">궁금한 점을 편하게 질문할 수 있어요</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 rounded-xl bg-white shadow-sm border border-gray-100">
                  <span className="text-2xl">🎁</span>
                  <div>
                    <p className="font-semibold text-gray-900">교통비 지원</p>
                    <p className="text-sm text-gray-500">참석하시는 모든 분께 5만원 지원</p>
                  </div>
                </div>
              </div>

              <a
                href="#seminar-cta"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors shadow-lg shadow-primary-500/25"
              >
                설명회 참석 신청하기
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 시어에셋 온담본부는 다릅니다 섹션 */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        {/* 배경 */}
        <div className="absolute inset-0 bg-gray-50" />
        {/* 우측 상단 장식 */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-primary-50/60 via-transparent to-transparent rounded-full -translate-y-1/4 translate-x-1/4" />
        {/* 좌측 하단 장식 */}
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-gray-100/50 via-transparent to-transparent rounded-full translate-y-1/4 -translate-x-1/4" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            {/* 왼쪽 타이틀 */}
            <div className="lg:sticky lg:top-32">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-50 text-primary-700 text-sm font-semibold mb-6 border border-primary-100">
                Why Different
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-gray-900 leading-[1.2] tracking-tight mb-6">
                시어에셋 온담본부는<br />
                <span className="relative">
                  <span className="text-primary-600">다릅니다</span>
                  <span className="absolute -bottom-2 left-0 w-full h-[3px] bg-gradient-to-r from-primary-500 to-primary-300 rounded-full" />
                </span>
              </h2>
              <p className="text-gray-500 text-base lg:text-lg leading-relaxed">
                판매가 아닌 도움에서 시작하는<br />
                새로운 보험 영업의 패러다임
              </p>
            </div>

            {/* 오른쪽 카드들 */}
            <div className="space-y-6">
              {/* 카드 1 */}
              <div className="group relative bg-white rounded-2xl p-8 lg:p-10 shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-gray-100/80 hover:shadow-[0_8px_40px_rgba(0,0,0,0.08)] transition-all duration-500">
                {/* 넘버링 */}
                <div className="absolute -left-3 lg:-left-5 top-8 lg:top-10">
                  <span className="flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 text-white font-bold text-sm lg:text-base shadow-lg shadow-primary-500/30">
                    01
                  </span>
                </div>
                <div className="pl-6 lg:pl-8">
                  <h3 className="text-xl lg:text-[22px] font-bold text-gray-900 leading-snug mb-4">
                    도움에서 상담이 시작되는<br />
                    <span className="text-primary-600">구조</span>를 만듭니다
                  </h3>
                  <div className="w-10 h-[2px] bg-gradient-to-r from-primary-400 to-transparent mb-4" />
                  <p className="text-gray-600 leading-[1.8] text-sm lg:text-[15px]">
                    시어에셋 온담본부는 보험을 설계하지만,<br />
                    고객이 기억하는 것은 상품명이 아닌 상담의 온도, 대화의 여운,<br />
                    그리고 케어의 지속성이라고 믿습니다.
                    <span className="block mt-2 text-gray-800 font-medium">
                      그래서 우리는 보험금 청구와 지급을 먼저 돕고,<br />
                      그 과정에서 신뢰가 쌓인 상담으로 자연스럽게 연결됩니다.
                    </span>
                  </p>
                </div>
              </div>

              {/* 카드 2 */}
              <div className="group relative bg-white rounded-2xl p-8 lg:p-10 shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-gray-100/80 hover:shadow-[0_8px_40px_rgba(0,0,0,0.08)] transition-all duration-500">
                {/* 넘버링 */}
                <div className="absolute -left-3 lg:-left-5 top-8 lg:top-10">
                  <span className="flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 text-white font-bold text-sm lg:text-base shadow-lg shadow-primary-500/30">
                    02
                  </span>
                </div>
                <div className="pl-6 lg:pl-8">
                  <h3 className="text-xl lg:text-[22px] font-bold text-gray-900 leading-snug mb-4">
                    DB 구매 <span className="text-primary-600">0원</span>,<br />
                    고객이 먼저 찾아오는 <span className="text-primary-600">대면 연결</span> 구조
                  </h3>
                  <div className="w-10 h-[2px] bg-gradient-to-r from-gray-400 to-transparent mb-4" />
                  <p className="text-gray-600 leading-[1.8] text-sm lg:text-[15px]">
                    지인에게 연락하지 않아도, 별도의 DB를 구매하지 않아도 됩니다.<br />
                    온담본부는 병원 현장에서 도움이 필요한 고객과<br />
                    자연스럽게 연결되는 대면 기반 시스템을 갖추고 있습니다.
                    <span className="block mt-2 text-gray-800 font-medium">
                      그래서 설계사는 고객을 찾는 일이 아니라<br />
                      상담과 케어에만 집중할 수 있습니다.
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 온담본부가 약속합니다 섹션 */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        {/* 배경 */}
        <div className="absolute inset-0" style={{ backgroundColor: '#f5f3ef', backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(0,0,0,0.03) 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        {/* 장식 요소 */}
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-gradient-to-br from-primary-100/30 via-transparent to-transparent rounded-full -translate-y-1/4 -translate-x-1/4" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-tl from-gray-200/40 via-transparent to-transparent rounded-full translate-y-1/4 translate-x-1/4" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            {/* 왼쪽 - 온담 소개 */}
            <div className="lg:sticky lg:top-32">
              {/* 한자 타이틀 */}
              <div className="text-center mb-10">
                <p className="text-8xl lg:text-9xl font-serif text-gray-800 tracking-wider mb-4" style={{ fontFamily: 'serif' }}>
                  溫談
                </p>
                <p className="text-sm text-gray-400 tracking-widest">
                  따뜻할 온(溫) · 이야기 담(談)
                </p>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-bold text-gray-900 leading-tight tracking-tight text-center">
                온담본부가 <span className="text-primary-600">약속합니다</span>
              </h2>
            </div>

            {/* 오른쪽 - 약속 리스트 */}
            <div>
              {/* 약속 아이템들 */}
              <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.06)] border border-gray-100 overflow-hidden">
                {[
                  '만날 사람을 걱정하지 않는 환경',
                  '상담에만 집중할 수 있는 시스템',
                  '팀과 시장이 함께 성장하는 플랫폼',
                  '관리·팀 성장·시장 확장이 평생 소득으로 누적되는 구조',
                  '실적과 진정성으로 쌓는 장기적 안정과 지속',
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 px-6 lg:px-8 py-5 border-b border-gray-100 last:border-b-0 hover:bg-gray-50/50 transition-colors duration-200"
                  >
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-50 flex items-center justify-center">
                      <svg className="w-3.5 h-3.5 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <p className="text-gray-700 text-[15px] lg:text-base">{item}</p>
                  </div>
                ))}
              </div>

              {/* 교통비 안내 */}
              <div className="mt-5 px-6 lg:px-8 py-5 bg-gradient-to-r from-primary-600 to-primary-500 rounded-2xl">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-white/80 text-sm mb-1">
                      사업설명회 참석시
                    </p>
                    <p className="text-white font-bold text-lg lg:text-xl">
                      교통비 5만원 지급
                    </p>
                  </div>
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                    <span className="text-2xl">🎁</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 협력 병원 지도 섹션 */}
      <section className="py-16 lg:py-24 bg-gray-50 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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

                <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-bold mb-8 leading-tight">
                  온담본부는<br />
                  경험을 숫자로 증명합니다
                </h2>

                {/* 통계 */}
                <div className="flex-1 w-full max-w-lg">
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20">
                      <div className="text-2xl sm:text-3xl font-bold text-white mb-1">
                        <span className="transition-opacity duration-300 opacity-100">50<span className="text-base sm:text-lg">%+</span></span>
                      </div>
                      <div className="text-sm font-medium text-white/90">온담 청약/계약</div>
                      <div className="text-xs text-white/50">전환률</div>
                    </div>
                    <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20">
                      <div className="text-2xl sm:text-3xl font-bold text-white mb-1">
                        <span className="transition-opacity duration-300 opacity-100">10<span className="text-base sm:text-lg">개</span></span>
                      </div>
                      <div className="text-sm font-medium text-white/90">서울 경기 지역</div>
                      <div className="text-xs text-white/50">협력병원</div>
                    </div>
                  </div>
                  <div className="space-y-2.5">
                    <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center gap-4">
                      <div className="text-2xl sm:text-3xl font-bold text-white whitespace-nowrap min-w-[120px]">
                        <span className="transition-opacity duration-300 opacity-100">24,000<span className="text-base sm:text-lg">+</span></span>
                      </div>
                      <div className="text-sm text-white/60">병원 보험 상담수</div>
                    </div>
                    <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center gap-4">
                      <div className="text-2xl sm:text-3xl font-bold text-white whitespace-nowrap min-w-[120px]">
                        <span className="transition-opacity duration-300 opacity-100">95<span className="text-base sm:text-lg">% 이상</span></span>
                      </div>
                      <div className="text-sm text-white/60">온담 설계사 13회차 정착률</div>
                    </div>
                    <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center gap-4">
                      <div className="text-2xl sm:text-3xl font-bold text-white whitespace-nowrap min-w-[120px]">
                        <span className="transition-opacity duration-300 opacity-100">15,000<span className="text-base sm:text-lg">+</span></span>
                      </div>
                      <div className="text-sm text-white/60">온담 계약, 관리 고객수</div>
                    </div>
                    <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center gap-4">
                      <div className="text-2xl sm:text-3xl font-bold text-white whitespace-nowrap min-w-[120px]">
                        <span className="transition-opacity duration-300 opacity-100">40<span className="text-base sm:text-lg">%</span></span>
                      </div>
                      <div className="text-sm text-white/60">MDRT 비율 온담본부 구성원 중</div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* 오른쪽 - 네이버 지도 */}
            <div className="relative h-[400px] lg:h-auto lg:min-h-[550px]">
              <div id="seminar-map" className="absolute inset-0 w-full h-full" />
              {!isMapLoaded && (
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
          <div>
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
                사업설명회 관련 궁금한 점을 확인해 보세요
              </p>
            </div>

            {/* FAQ Items */}
            <div className="space-y-4">
              {seminarFaqs.map((faq, index) => (
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
                      <div className="px-6 pb-6 pl-[24px]">
                        <div className="border-l-2 border-primary-100 pl-4">
                          <p className="text-gray-600 leading-relaxed">
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
      <section id="seminar-cta" className="relative min-h-[600px] lg:min-h-[700px] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/images/apply-bg.jpg"
            alt="배경"
            className="w-full h-full object-cover"
          />
          {/* Left-to-right gradient: dark on both sides */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#1A1614]/88 via-[#1A1614]/45 to-[#1A1614]/88" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-16">
            {/* Left Content */}
            <div className="flex-1 text-center lg:text-left lg:pt-12">
              <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm text-white rounded-full text-sm font-medium mb-6 border border-white/20">
                Join Our Team
              </span>
              <h2 className="text-[27px] sm:text-[33px] lg:text-[45px] font-bold text-white mb-6 leading-tight">
                온담본부와 함께<br />
                병원 안에서 시작하는<br />
                <span className="text-primary-300">새로운 보험 커리어</span>
              </h2>
              <p className="text-base text-white/80 mb-8 max-w-md mx-auto lg:mx-0">
                보험을 '파는' 역할이 아닌,<br />
                병원 인하우스로 환자를 돕는 보험 상담 전문가로 성장하세요.<br />
                체계적인 교육과 현장 중심 지원으로 상담에만 집중할 수 있는 환경을 제공합니다.
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
