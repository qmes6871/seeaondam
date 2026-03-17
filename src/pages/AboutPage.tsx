import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// 수상 데이터 - 1차원 배열 (9개 이상)
const awardsData = [
  { year: '2024', title: 'MDRT 달성률', subtitle: '우수 본부', icon: 'trophy' },
  { year: '2024', title: '신인왕 배출', subtitle: '본부', icon: 'star' },
  { year: '2024', title: '고객만족도', subtitle: '1위', icon: 'heart' },
  { year: '2024', title: '영업 실적', subtitle: '최우수', icon: 'chart' },
  { year: '2023', title: '우수 영업', subtitle: '본부상', icon: 'chart' },
  { year: '2023', title: '최우수 팀워크', subtitle: '상', icon: 'team' },
  { year: '2023', title: '신규 계약', subtitle: '우수 본부', icon: 'document' },
  { year: '2023', title: '고객 신뢰', subtitle: '우수상', icon: 'heart' },
  { year: '2022', title: '신인 육성', subtitle: '최우수', icon: 'star' },
  { year: '2022', title: '서비스 혁신', subtitle: '대상', icon: 'trophy' },
]

// 보험라운지 운영 소개 데이터
const loungeFeatures = [
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
]

const managersData = [
  { name: '이승정', nameEn: 'Seungjung Lee', role: '본부장', image: '/images/person-4.png' },
  { name: '정호형', nameEn: 'Hohyung Jung', role: '지점장', image: '/images/person-3.png' },
  { name: '김현정', nameEn: 'Hyunjung Kim', role: '부지점장', image: '/images/person-5.png' },
  { name: '전우형', nameEn: 'Woohyung Jeon', role: '부지점장', image: '/images/person-6.png' },
  { name: '이영훈', nameEn: 'Younghoon Lee', role: '명예이사', image: '/images/person-2.png' },
  { name: '장안숙', nameEn: 'Ansook Jang', role: '명예이사', image: '/images/person-7.png' },
  { name: '김유정', nameEn: 'Yujeong Kim', role: '마스터CP', image: null },
  { name: '이상목', nameEn: 'Sangmok Lee', role: '퍼스트CP', image: null },
  { name: '이지영', nameEn: 'Jiyoung Lee', role: 'CP', image: null },
  { name: '박기온', nameEn: 'Kion Park', role: 'CP', image: null },
  { name: '김민경', nameEn: 'Minkyung Kim', role: 'CP', image: null },
  { name: '김영훈', nameEn: 'Younghoon Kim', role: 'CP', image: null },
  { name: '정이실', nameEn: 'Yisil Jung', role: 'CP', image: null },
  { name: '김예은', nameEn: 'Yeeun Kim', role: 'CP', image: null },
  { name: '최미리', nameEn: 'Miri Choi', role: 'CP', image: null },
  { name: '이미희', nameEn: 'Mihee Lee', role: 'CP', image: null },
  { name: '김기흥', nameEn: 'Kiheung Kim', role: 'CP', image: null },
  { name: '고혜진', nameEn: 'Hyejin Ko', role: 'CP', image: null },
  { name: '김진환', nameEn: 'Jinhwan Kim', role: 'CP', image: null },
  { name: '문형선', nameEn: 'Hyungsun Moon', role: 'CP', image: null },
  { name: '고대영', nameEn: 'Daeyoung Ko', role: 'CP', image: null },
  { name: '최민', nameEn: 'Min Choi', role: 'CP', image: null },
  { name: '김수정', nameEn: 'Sujeong Kim', role: 'CP', image: null },
  { name: '최윤성', nameEn: 'Yunsung Choi', role: 'CP', image: null },
  { name: '박채원', nameEn: 'Chaewon Park', role: 'CP', image: null },
]

// 본부 위치 좌표 (서울 송파구 위례서로 252)
const OFFICE_LOCATION = {
  lat: 37.4780,
  lng: 127.1450,
}

const historyData = [
  { year: '2021', events: ['원수사 명인 20년 경력으로 GA 설립 이동', '자체 고객관리 CRM 시스템 개발 참여'] },
  { year: '2022', events: ['온담 지점 승격', '보험라운지 운영 모델 개발', '시범 운영 시작'] },
  { year: '2023', events: ['병원 인하우스 사업 본격 시작', '핵심 인력 구성', '서울 경기 지역 병원 협업 진행'] },
  { year: '2024', events: ['시어에셋 온담본부 설립', '협력 병원 10개소 확보'] },
  { year: '2025', events: ['시어 온담본부 리더 육성 시스템 구축', '지점 분할 및 조직 확장 성공'] },
  { year: '2026', events: ['시어에셋 자체 DB 구축', '온라인 대학병원 및 다수 단독 컨소시엄 체결'] },
]

export function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const sectionsRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<HTMLDivElement>(null)
  const heroSection1Ref = useRef<HTMLDivElement>(null)
  const heroSection2Ref = useRef<HTMLDivElement>(null)
  const heroSection3Ref = useRef<HTMLDivElement>(null)
  const heroBg2Ref = useRef<HTMLDivElement>(null)
  const leftBlobRef = useRef<HTMLDivElement>(null)

  // 수상 캐러셀 상태
  const [awardIndex, setAwardIndex] = useState(0)
  const awardAutoSlideRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const [awardAutoSlideEnabled, setAwardAutoSlideEnabled] = useState(true)

  const [currentManager, setCurrentManager] = useState(0) // 현재 관리자 인덱스
  const managerAutoSlideRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const [managerAutoSlideEnabled, setManagerAutoSlideEnabled] = useState(true)
  const [currentGallery, setCurrentGallery] = useState(0) // 갤러리 인덱스
  const galleryAutoSlideRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const [galleryAutoSlideEnabled, setGalleryAutoSlideEnabled] = useState(true)

  // 보험라운지 캐러셀 상태
  const [loungeIndex, setLoungeIndex] = useState(0)
  const loungeAutoSlideRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const [loungeAutoSlideEnabled, setLoungeAutoSlideEnabled] = useState(true)


  // 갤러리 데이터
  const galleryData = [
    { id: 1, src: '/images/gallery/ondam-gallery-1.jpeg', title: '온담 갤러리', desc: '온담의 활동 모습' },
    { id: 2, src: '/images/gallery/ondam-gallery-2.jpeg', title: '온담 갤러리', desc: '온담의 활동 모습' },
    { id: 3, src: '/images/gallery/ondam-gallery-3.jpeg', title: '온담 갤러리', desc: '온담의 활동 모습' },
    { id: 4, src: '/images/gallery/ondam-gallery-4.jpeg', title: '온담 갤러리', desc: '온담의 활동 모습' },
    { id: 5, src: '/images/gallery/ondam-gallery-5.jpeg', title: '온담 갤러리', desc: '온담의 활동 모습' },
    { id: 6, src: '/images/gallery/ondam-gallery-6.jpeg', title: '온담 갤러리', desc: '온담의 활동 모습' },
    { id: 7, src: '/images/gallery/ondam-gallery-7.jpeg', title: '온담 갤러리', desc: '온담의 활동 모습' },
    { id: 8, src: '/images/gallery/ondam-gallery-8.jpeg', title: '온담 갤러리', desc: '온담의 활동 모습' },
  ]

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
            <h4 style="margin: 0 0 8px 0; font-weight: bold; color: #1A1918;">시어에셋 온담본부</h4>
            <p style="margin: 0; font-size: 13px; color: #737270;">서울특별시 송파구 위례서로 252<br/>유원플러스 송파</p>
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

  // 수상 캐러셀 자동 슬라이드 (느리고 부드럽게)
  useEffect(() => {
    if (awardAutoSlideEnabled) {
      awardAutoSlideRef.current = setInterval(() => {
        setAwardIndex((prev) => (prev + 1) % awardsData.length)
      }, 4500) // 느린 속도
    }

    return () => {
      if (awardAutoSlideRef.current) {
        clearInterval(awardAutoSlideRef.current)
      }
    }
  }, [awardAutoSlideEnabled])

  // 수상 캐러셀 네비게이션
  const handleAwardNavigation = (newIndex: number) => {
    setAwardAutoSlideEnabled(false)
    setAwardIndex(newIndex)
    setTimeout(() => setAwardAutoSlideEnabled(true), 6000)
  }

  const goToPrevAward = () => {
    const newIndex = awardIndex === 0 ? awardsData.length - 1 : awardIndex - 1
    handleAwardNavigation(newIndex)
  }

  const goToNextAward = () => {
    const newIndex = (awardIndex + 1) % awardsData.length
    handleAwardNavigation(newIndex)
  }

  // 관리자 캐러셀 자동 슬라이드
  useEffect(() => {
    if (managerAutoSlideEnabled) {
      managerAutoSlideRef.current = setInterval(() => {
        setCurrentManager((prev) => (prev + 1) % managersData.length)
      }, 4000)
    }

    return () => {
      if (managerAutoSlideRef.current) {
        clearInterval(managerAutoSlideRef.current)
      }
    }
  }, [managerAutoSlideEnabled])

  // 사용자 상호작용 시 자동 슬라이드 일시정지 후 재개
  const handleManagerNavigation = (newIndex: number) => {
    setManagerAutoSlideEnabled(false)
    setCurrentManager(newIndex)

    // 5초 후 자동 슬라이드 재개
    setTimeout(() => {
      setManagerAutoSlideEnabled(true)
    }, 5000)
  }

  const goToPrevManager = () => {
    const newIndex = currentManager === 0 ? managersData.length - 1 : currentManager - 1
    handleManagerNavigation(newIndex)
  }

  const goToNextManager = () => {
    const newIndex = (currentManager + 1) % managersData.length
    handleManagerNavigation(newIndex)
  }

  // 갤러리 캐러셀 자동 슬라이드
  useEffect(() => {
    if (galleryAutoSlideEnabled) {
      galleryAutoSlideRef.current = setInterval(() => {
        setCurrentGallery((prev) => (prev + 1) % galleryData.length)
      }, 5000)
    }

    return () => {
      if (galleryAutoSlideRef.current) {
        clearInterval(galleryAutoSlideRef.current)
      }
    }
  }, [galleryAutoSlideEnabled, galleryData.length])

  // 갤러리 네비게이션
  const handleGalleryNavigation = (newIndex: number) => {
    setGalleryAutoSlideEnabled(false)
    setCurrentGallery(newIndex)

    setTimeout(() => {
      setGalleryAutoSlideEnabled(true)
    }, 6000)
  }

  const goToPrevGallery = () => {
    const newIndex = currentGallery === 0 ? galleryData.length - 1 : currentGallery - 1
    handleGalleryNavigation(newIndex)
  }

  const goToNextGallery = () => {
    const newIndex = (currentGallery + 1) % galleryData.length
    handleGalleryNavigation(newIndex)
  }

  // 보험라운지 캐러셀 자동 슬라이드
  useEffect(() => {
    if (loungeAutoSlideEnabled) {
      loungeAutoSlideRef.current = setInterval(() => {
        setLoungeIndex((prev) => (prev + 1) % loungeFeatures.length)
      }, 4000)
    }

    return () => {
      if (loungeAutoSlideRef.current) {
        clearInterval(loungeAutoSlideRef.current)
      }
    }
  }, [loungeAutoSlideEnabled])

  const handleLoungeNavigation = (newIndex: number) => {
    setLoungeAutoSlideEnabled(false)
    setLoungeIndex(newIndex)
    setTimeout(() => setLoungeAutoSlideEnabled(true), 6000)
  }

  const goToPrevLounge = () => {
    const newIndex = loungeIndex === 0 ? loungeFeatures.length - 1 : loungeIndex - 1
    handleLoungeNavigation(newIndex)
  }

  const goToNextLounge = () => {
    const newIndex = (loungeIndex + 1) % loungeFeatures.length
    handleLoungeNavigation(newIndex)
  }

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

      // 히어로 섹션 1 → 2 → 3 스크롤 전환 애니메이션
      if (heroSection1Ref.current && heroSection2Ref.current && heroSection3Ref.current) {
        // 첫 번째 섹션 페이드 아웃
        gsap.to(heroSection1Ref.current, {
          opacity: 0,
          y: -50,
          scrollTrigger: {
            trigger: heroSection1Ref.current,
            start: 'center center',
            end: 'bottom top',
            scrub: 1,
          },
        })

        // 두 번째 섹션 페이드 인
        gsap.fromTo(
          heroSection2Ref.current,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            scrollTrigger: {
              trigger: heroSection2Ref.current,
              start: 'top bottom',
              end: 'center center',
              scrub: 1,
            },
          }
        )

        // 두 번째 섹션 페이드 아웃
        gsap.to(heroSection2Ref.current, {
          opacity: 0,
          y: -50,
          scrollTrigger: {
            trigger: heroSection2Ref.current,
            start: 'center center',
            end: 'bottom top',
            scrub: 1,
          },
        })

        // 세 번째 섹션 페이드 인
        gsap.fromTo(
          heroSection3Ref.current,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            scrollTrigger: {
              trigger: heroSection3Ref.current,
              start: 'top bottom',
              end: 'center center',
              scrub: 1,
            },
          }
        )

        // 두 번째 배경 이미지 페이드 인 (세 번째 섹션에서)
        if (heroBg2Ref.current) {
          gsap.fromTo(
            heroBg2Ref.current,
            { opacity: 0 },
            {
              opacity: 1,
              scrollTrigger: {
                trigger: heroSection3Ref.current,
                start: 'top bottom',
                end: 'top center',
                scrub: 1,
              },
            }
          )
        }

        // 왼쪽 Decorative Blob 페이드 아웃 (세 번째 섹션으로 스크롤 시)
        if (leftBlobRef.current) {
          gsap.to(leftBlobRef.current, {
            opacity: 0.1,
            scrollTrigger: {
              trigger: heroSection3Ref.current,
              start: 'top bottom',
              end: 'center center',
              scrub: 1,
            },
          })
        }
      }

      // Sections animation - 아래에서 위로 올라오는 효과
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
      {/* 히어로 + 인사말 Section */}
      <div className="relative">
        {/* 고정 배경 */}
        <div className="sticky top-16 lg:top-20 h-[calc(100vh-64px)] lg:h-[calc(100vh-80px)] overflow-hidden bg-[#847466]">
          {/* 첫 번째 배경 이미지 */}
          <div className="absolute inset-0 flex items-center">
            <img
              src="/images/about-person.png"
              alt=""
              className="w-auto h-[90%] max-w-none object-contain object-left ml-4 lg:ml-12"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#847466]/10 to-[#847466]/40" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#847466]/60 via-transparent to-[#847466]/30" />
          </div>
          {/* 두 번째 배경 이미지 - 스크롤 시 페이드 인 (세 번째 섹션) */}
          <div ref={heroBg2Ref} className="absolute inset-0 opacity-0">
            <img
              src="/images/about-hero-3.jpeg"
              alt=""
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#847466]/15 to-[#847466]/50" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#847466]/30 via-transparent to-transparent" />
          </div>
          {/* Dot Pattern */}
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(255, 255, 255) 1px, transparent 0px)', backgroundSize: '32px 32px' }} />
          {/* 왼쪽 상단 원형 장식 */}
          <div ref={leftBlobRef} className="absolute top-0 left-0 w-96 h-96 bg-gray-500 rounded-full -translate-x-1/2 -translate-y-1/2" />
          {/* 우측 하단 원형 장식 */}
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gray-400/10 rounded-full translate-x-1/3 translate-y-1/3" />
        </div>

        {/* 스크롤 컨텐츠 영역 */}
        <div className="relative -mt-[calc(100vh-64px)] lg:-mt-[calc(100vh-80px)]">
          {/* 첫 번째 섹션 - About ONDAM */}
          <section ref={heroSection1Ref} className="h-[calc(100vh-128px)] lg:h-[calc(100vh-160px)] flex items-center relative">
            <div ref={heroRef} className="relative w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 pt-20">
              <div className="max-w-2xl ml-auto text-right">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-primary-400 text-sm font-medium mb-8 border border-white/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-400" />
                  About Us
                </span>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-8 leading-tight">
                  About ONDAM
                </h1>
                <p className="text-base text-gray-300 leading-relaxed mb-12">
                  병원 인하우스 전문 조직인 온담본부가<br className="hidden sm:block" />
                  안정적인 환경과 체계적인 시스템을<br className="hidden sm:block" />
                  바탕으로 보험 전문가의 성장을 지원합니다.
                </p>

                {/* 본부장 정보 */}
                <div className="pt-8 border-t border-white/10">
                  <p className="text-sm text-gray-400 tracking-wider mb-2">DIVISION HEAD</p>
                  <p className="text-xl lg:text-2xl font-light text-white tracking-wide">
                    시어에셋 온담본부
                  </p>
                  <p className="text-2xl lg:text-3xl font-semibold text-white mt-1">
                    이승정 <span className="text-lg lg:text-xl font-light text-gray-400">본부장</span>
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 두 번째 섹션 - 인사말 */}
          <section ref={heroSection2Ref} className="h-[calc(100vh-128px)] lg:h-[calc(100vh-160px)] flex items-center relative">
            <div className="relative w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
              <div className="max-w-2xl ml-auto text-right">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-primary-400 text-sm font-medium mb-8 border border-white/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-400" />
                  CEO Message
                </span>
                <h2 className="text-[27px] sm:text-[33px] lg:text-[45px] font-bold text-white mb-8 leading-tight">
                  인사말
                </h2>

                <div className="space-y-6 text-base text-gray-300 leading-relaxed">
                  <p>
                    안녕하십니까,<br className="hidden sm:block" />
                    시어에셋 온담본부 본부장 이승정입니다.
                  </p>
                  <p>
                    온담본부는 '따뜻하게 담다'라는 의미처럼,<br className="hidden sm:block" />
                    고객 한 분 한 분의 이야기에 귀 기울이고,<br className="hidden sm:block" />
                    진심으로 함께하는 보험 서비스를 제공합니다.
                  </p>
                  <p>
                    함께 성장하고, 함께 성공하는<br className="hidden sm:block" />
                    온담본부가 되겠습니다.
                  </p>
                </div>

                {/* 서명 */}
                <div className="pt-10 mt-10 border-t border-white/10">
                  <p className="text-2xl lg:text-3xl font-light text-white italic">
                    이승정
                  </p>
                  <p className="text-sm text-gray-400 tracking-wider mt-2">
                    시어에셋 온담본부 본부장
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 세 번째 섹션 - Introduction */}
          <section ref={heroSection3Ref} className="h-[calc(100vh-128px)] lg:h-[calc(100vh-160px)] flex items-center relative">
            <div className="relative w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
              <div className="max-w-2xl ml-auto text-right">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-primary-400 text-sm font-medium mb-8 border border-white/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-400" />
                  Introduction
                </span>
                <h2 className="text-[27px] sm:text-[33px] lg:text-[45px] font-bold text-white mb-8 leading-tight">
                  온담본부는<br />
                  따뜻한 동행을 추구합니다
                </h2>

                <div className="space-y-6 text-base text-gray-300 leading-relaxed">
                  <p>
                    시어에셋 온담본부는 '따뜻할 온(溫)', '담을 담(擔)'의<br className="hidden sm:block" />
                    의미를 담아, 고객과 설계사 모두에게<br className="hidden sm:block" />
                    따뜻한 동행이 되고자 설립되었습니다.
                  </p>
                  <p>
                    병원 인하우스 전문 조직으로서, 콜드콜 없이<br className="hidden sm:block" />
                    환자분들과 자연스러운 만남을 통해 신뢰를 쌓아가며,<br className="hidden sm:block" />
                    안정적인 근무 환경에서 전문성을 키워갈 수 있습니다.
                  </p>
                  <p>
                    체계적인 교육 시스템과 팀 단위 협업 문화를 바탕으로,<br className="hidden sm:block" />
                    신입부터 경력까지 모든 구성원의 성장을 지원합니다.
                  </p>
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>

      <div ref={sectionsRef}>
        {/* 대표 인사말 Section - 히든 */}
        <section className="hidden py-20 lg:py-28 bg-white animate-section">
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

        {/* 보험라운지 운영 소개 Section - 캐러셀 */}
        <section className="hidden py-20 lg:py-28 bg-white animate-section">
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

            {/* 캐러셀 */}
            <div className="relative px-12 lg:px-16">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {[0, 1, 2].map((offset) => {
                  const cardIndex = (loungeIndex + offset) % loungeFeatures.length
                  const feature = loungeFeatures[cardIndex]

                  return (
                    <div
                      key={`${loungeIndex}-${offset}`}
                      className={`group transition-all duration-700 ${offset === 2 ? 'hidden lg:block' : ''} ${offset === 1 ? 'hidden sm:block' : ''}`}
                    >
                      <div className="p-6 lg:p-8 rounded-2xl border border-gray-100 bg-white hover:border-primary-200 hover:shadow-xl transition-all duration-300">
                        <div className="w-12 h-12 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center mb-5 group-hover:bg-primary-600 group-hover:text-white transition-colors duration-300">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={feature.icon} />
                          </svg>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* 네비게이션 버튼 */}
              <button
                onClick={goToPrevLounge}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-lg hover:bg-gray-50 flex items-center justify-center transition-colors border border-gray-200"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={goToNextLounge}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-lg hover:bg-gray-50 flex items-center justify-center transition-colors border border-gray-200"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* 인디케이터 */}
              <div className="flex items-center justify-center gap-2 mt-8">
                {loungeFeatures.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleLoungeNavigation(index)}
                    className={`transition-all duration-500 rounded-full ${
                      index === loungeIndex
                        ? 'w-6 h-2 bg-primary-600'
                        : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`${index + 1}번 슬라이드로 이동`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 갤러리 Section - Premium Glassmorphism */}
        <section className="relative py-24 lg:py-32 bg-gradient-to-b from-gray-50 via-white to-gray-50 animate-section overflow-hidden">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 lg:mb-16">
              <span className="inline-block px-3 py-1 rounded-full bg-primary-100 text-primary-700 text-sm font-medium mb-4">
                Gallery
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                온담 갤러리
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                온담의 주요 활동을 담았습니다.
              </p>
            </div>

            {/* 갤러리 캐러셀 */}
            <div className="relative max-w-5xl mx-auto">
              {/* 메인 이미지 컨테이너 */}
              <div className="relative aspect-[16/9] rounded-3xl overflow-hidden bg-white/50 backdrop-blur-xl border border-white/60 shadow-[0_8px_40px_rgba(0,0,0,0.08)]">
                {/* 이미지 슬라이드 */}
                <div className="relative w-full h-full">
                  {galleryData.map((item, index) => (
                    <div
                      key={item.id}
                      className={`absolute inset-0 transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                        index === currentGallery
                          ? 'opacity-100 scale-100'
                          : 'opacity-0 scale-105'
                      }`}
                    >
                      <img
                        src={item.src}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                      {/* 이미지 오버레이 그라데이션 */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
                    </div>
                  ))}
                </div>

                {/* 페이지 인디케이터 */}
                <div className="absolute bottom-6 right-6 hidden sm:flex items-center gap-2 text-white/60 text-sm bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-full">
                  <span className="text-white font-medium">{String(currentGallery + 1).padStart(2, '0')}</span>
                  <span>/</span>
                  <span>{String(galleryData.length).padStart(2, '0')}</span>
                </div>

                {/* 네비게이션 버튼 */}
                <button
                  onClick={goToPrevGallery}
                  className="absolute left-4 lg:left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center transition-all duration-300 hover:bg-white/40 hover:scale-105"
                >
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={goToNextGallery}
                  className="absolute right-4 lg:right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center transition-all duration-300 hover:bg-white/40 hover:scale-105"
                >
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              {/* 썸네일 인디케이터 */}
              <div className="flex items-center justify-center gap-3 mt-8">
                {galleryData.map((item, index) => (
                  <button
                    key={item.id}
                    onClick={() => handleGalleryNavigation(index)}
                    className={`relative overflow-hidden rounded-xl transition-all duration-500 ${
                      index === currentGallery
                        ? 'w-20 h-14 ring-2 ring-primary-500 ring-offset-2'
                        : 'w-14 h-10 opacity-50 hover:opacity-80 grayscale hover:grayscale-0'
                    }`}
                  >
                    <img
                      src={item.src}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>

              {/* 프로그레스 바 */}
              <div className="mt-6 max-w-md mx-auto">
                <div className="h-0.5 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full transition-all duration-500"
                    style={{ width: `${((currentGallery + 1) / galleryData.length) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 인터뷰 영상 Section */}
        <section className="py-24 lg:py-32 bg-white animate-section">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 lg:mb-16">
              <span className="inline-block px-3 py-1 rounded-full bg-primary-100 text-primary-700 text-sm font-medium mb-4">
                Interview
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                온담 인터뷰
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                온담본부 구성원들의 이야기를 들어보세요.
              </p>
            </div>

            {/* 영상 그리드 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {/* 영상 1 */}
              <div className="group">
                <div className="relative aspect-video rounded-2xl overflow-hidden bg-gray-100 shadow-lg">
                  {/* 비디오 플레이스홀더 - 나중에 실제 비디오로 교체 */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center group-hover:bg-primary-500 group-hover:border-primary-500 transition-all duration-300">
                        <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                      <p className="text-white/60 text-sm">영상 준비중</p>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <h3 className="text-lg font-bold text-gray-900">본부장 인터뷰</h3>
                  <p className="text-gray-600 text-sm mt-1">온담본부를 이끄는 리더의 비전</p>
                </div>
              </div>

              {/* 영상 2 */}
              <div className="group">
                <div className="relative aspect-video rounded-2xl overflow-hidden bg-gray-100 shadow-lg">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center group-hover:bg-primary-500 group-hover:border-primary-500 transition-all duration-300">
                        <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                      <p className="text-white/60 text-sm">영상 준비중</p>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <h3 className="text-lg font-bold text-gray-900">설계사 인터뷰</h3>
                  <p className="text-gray-600 text-sm mt-1">현직 설계사가 말하는 온담본부</p>
                </div>
              </div>

              {/* 영상 3 */}
              <div className="group">
                <div className="relative aspect-video rounded-2xl overflow-hidden bg-gray-100 shadow-lg">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center group-hover:bg-primary-500 group-hover:border-primary-500 transition-all duration-300">
                        <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                      <p className="text-white/60 text-sm">영상 준비중</p>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <h3 className="text-lg font-bold text-gray-900">병원 협력 스토리</h3>
                  <p className="text-gray-600 text-sm mt-1">협력 병원과 함께하는 이야기</p>
                </div>
              </div>
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
                시어온담 연혁
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                온담본부의 발자취를 소개합니다.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
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
                    <div className={`ml-16 md:ml-0 ${item.year === '2021' ? 'md:w-[55%]' : 'md:w-1/2'} ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                      <div className="bg-white rounded-2xl p-6 shadow-lg text-left">
                        {/* 첫 번째 줄: 연도 + 첫 번째 이벤트 */}
                        <div className="flex items-center gap-3 mb-2">
                          <span className="inline-block px-3 py-1 rounded-full bg-primary-100 text-primary-700 text-sm font-bold whitespace-nowrap">
                            {item.year}
                          </span>
                          <span className="text-primary-700 font-bold">{item.events[0]}</span>
                        </div>
                        {/* 나머지 이벤트들 - 연도 배지 너비만큼 들여쓰기 */}
                        {item.events.length > 1 && (
                          <ul className="space-y-1 ml-[70px]">
                            {item.events.slice(1).map((event, eventIndex) => (
                              <li key={eventIndex} className="text-gray-700">{event}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 명예의 전당 Section */}
        <section className="relative py-24 lg:py-32 bg-[#9A8574] animate-section overflow-hidden">
          {/* Shimmer 오버레이 */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -inset-full bg-gradient-to-r from-transparent via-[#c9a227]/5 to-transparent animate-[shimmer_4s_infinite] skew-x-12" />
          </div>

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* 헤더 */}
            <div className="text-center mb-12 lg:mb-16">
              <span className="inline-block px-4 py-1.5 rounded-full bg-white/15 text-white/90 text-xs font-medium tracking-wider mb-4">
                AWARDS
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
                명예의 전당
              </h2>
              <p className="text-white/70 max-w-2xl mx-auto">
                온담본부의 성과와 업적
              </p>
            </div>

            {/* 수상 캐러셀 */}
            <div className="relative px-12 lg:px-16">
              {/* 카드 그리드 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {[0, 1, 2].map((offset) => {
                  const cardIndex = (awardIndex + offset) % awardsData.length
                  const award = awardsData[cardIndex]

                  return (
                    <div
                      key={`${awardIndex}-${offset}`}
                      className={`group transition-all duration-700 ${offset === 2 ? 'hidden lg:block' : ''} ${offset === 1 ? 'hidden sm:block' : ''}`}
                    >
                      {/* 다크 브라운 카드 */}
                      <div className="relative bg-[#3d2e1e] rounded-[20px] p-6 min-h-[420px] flex flex-col group-hover:-translate-y-2 transition-all duration-500 shadow-xl overflow-hidden">
                        {/* Shimmer 효과 */}
                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                          <div className="absolute -inset-full bg-gradient-to-r from-transparent via-[#c9a227]/10 to-transparent animate-[shimmer_3s_infinite] skew-x-12" />
                        </div>

                        {/* 상단 헤더 */}
                        <div className="flex justify-between items-center mb-6 relative z-10">
                          <span className="text-white/80 text-xs font-medium tracking-[2px]">ONDAM</span>
                          <span className="text-white/60 text-sm">{String(cardIndex + 1).padStart(2, '0')}</span>
                        </div>

                        {/* 트로피 영역 */}
                        <div className="flex-1 flex items-center justify-center relative z-10">
                          <div className="relative">
                            {/* 글로우 효과 - 여러 레이어 */}
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="absolute w-40 h-40 bg-[#FFD700]/15 rounded-full blur-2xl animate-[pulse-glow_3s_ease-in-out_infinite]" />
                              <div className="absolute w-32 h-32 bg-[#FFD700]/25 rounded-full blur-xl animate-[pulse-glow_2s_ease-in-out_infinite_0.5s]" />
                            </div>
                            {/* 트로피 이미지 - 월계관 */}
                            <img
                              src="/images/trophy-laurel.png"
                              alt="Trophy"
                              className="w-44 h-44 object-contain relative z-10 drop-shadow-[0_0_20px_rgba(255,215,0,0.6)] drop-shadow-[0_8px_16px_rgba(0,0,0,0.4)] group-hover:scale-110 transition-transform duration-500"
                            />
                          </div>
                        </div>

                        {/* 수상 정보 */}
                        <div className="text-center pt-4 border-t border-[#c9a227]/20 relative z-10">
                          <p className="text-white/90 text-base font-normal mb-2">
                            {award.title}
                          </p>
                          <p className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-[#FFD700] via-[#c9a227] to-[#FFD700] bg-clip-text text-transparent mb-3">
                            {award.subtitle}
                          </p>
                          <p className="text-white/50 text-sm">
                            {award.year}.01
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* 네비게이션 버튼 */}
              <button
                onClick={goToPrevAward}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-[#3d2e1e] shadow-lg hover:bg-[#4d3e2e] flex items-center justify-center transition-all duration-300 border border-[#c9a227]/30 hover:scale-110 hover:shadow-xl group/btn"
                aria-label="이전 수상"
              >
                <svg className="w-5 h-5 text-[#c9a227] group-hover/btn:text-[#FFD700] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                onClick={goToNextAward}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-[#3d2e1e] shadow-lg hover:bg-[#4d3e2e] flex items-center justify-center transition-all duration-300 border border-[#c9a227]/30 hover:scale-110 hover:shadow-xl group/btn"
                aria-label="다음 수상"
              >
                <svg className="w-5 h-5 text-[#c9a227] group-hover/btn:text-[#FFD700] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* 인디케이터 */}
              <div className="flex items-center justify-center gap-2 mt-12">
                <div className="flex items-center gap-1.5">
                  {awardsData.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => handleAwardNavigation(index)}
                      className={`transition-all duration-500 rounded-full ${
                        index === awardIndex % awardsData.length
                          ? 'w-6 h-2 bg-gradient-to-r from-[#FFD700] via-[#c9a227] to-[#FFD700]'
                          : 'w-2 h-2 bg-white/30 hover:bg-[#c9a227]/50'
                      }`}
                      aria-label={`${index + 1}번 슬라이드로 이동`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 관리자 Section - 사원증 스타일 */}
        <section className="relative py-20 lg:py-32 bg-gradient-to-b from-gray-50 via-white to-gray-50 animate-section overflow-hidden">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 lg:mb-20">
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary-100 text-primary-700 text-sm font-medium mb-4">
                Leadership
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                온담본부 리더십
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                온담본부를 이끄는 핵심 리더들을 소개합니다
              </p>
            </div>

            <div className="relative px-8 lg:px-16">
              {/* 3장의 카드 표시 */}
              <div className="flex items-center justify-center gap-4 sm:gap-8 lg:gap-12 py-20 mt-4">
                {[-1, 0, 1].map((offset) => {
                  const index = (currentManager + offset + managersData.length) % managersData.length
                  const manager = managersData[index]
                  const isCenter = offset === 0

                  return (
                    <div
                      key={offset}
                      className="flex-shrink-0 transition-all duration-700 ease-out"
                      style={{
                        transform: isCenter
                          ? 'scale(1.05) translateY(-8px)'
                          : offset === -1
                          ? 'scale(0.85) rotate(-3deg) translateY(0)'
                          : 'scale(0.85) rotate(3deg) translateY(0)',
                        opacity: isCenter ? 1 : 0.4,
                        zIndex: isCenter ? 10 : 1,
                      }}
                    >
                      {/* 사원증 카드 - NHN 스타일 */}
                      <div className="relative">
                        {/* 블루 스트랩 */}
                        <div className="absolute left-1/2 -translate-x-1/2 -top-12 w-5 h-14 z-0">
                          <div className="absolute inset-x-0 top-0 bottom-2 bg-gradient-to-b from-primary-400 via-primary-500 to-primary-600 rounded-t-sm" />
                        </div>
                        {/* 메탈 클립 */}
                        <div className="absolute left-1/2 -translate-x-1/2 -top-1 z-20">
                          <div className="w-6 h-4 bg-gradient-to-b from-gray-300 via-gray-100 to-gray-300 rounded-sm shadow-md border border-gray-300" />
                        </div>

                        {/* 메인 카드 */}
                        <div className={`relative w-48 sm:w-56 bg-white rounded-xl overflow-hidden transition-all duration-700 ${isCenter ? 'shadow-2xl' : 'shadow-lg'}`}>

                          {/* 상단 로고 영역 */}
                          <div className="px-5 pt-6 pb-2 text-center">
                            <div className="flex items-center justify-center gap-1">
                              <span className={`text-2xl font-black tracking-tight ${isCenter ? 'text-primary-600' : 'text-gray-400'}`}>ONDAM</span>
                            </div>
                          </div>

                          {/* 이름 영역 */}
                          <div className="px-5 pb-4 text-center">
                            <h3 className="text-lg font-bold text-gray-900">{manager.name}</h3>
                            <p className="text-[11px] text-gray-400 mt-0.5">{manager.nameEn}</p>
                          </div>

                          {/* 큰 프로필 사진 영역 */}
                          <div className="px-4 pb-4">
                            <div className="w-full aspect-[4/5] overflow-hidden bg-gray-100 flex items-center justify-center">
                              {manager.image ? (
                                <img
                                  src={manager.image}
                                  alt={manager.name}
                                  className="w-full h-full object-cover object-top"
                                />
                              ) : (
                                <svg className="w-20 h-20 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                                </svg>
                              )}
                            </div>
                          </div>

                          {/* 하단 악센트 라인 */}
                          <div className="px-5 pb-4">
                            <div className={`w-12 h-1 rounded-full ${isCenter ? 'bg-primary-500' : 'bg-gray-300'}`} />
                            <p className="text-xs mt-2">
                              <span className="font-bold text-primary-600">{manager.role}</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* 네비게이션 버튼 */}
              <button
                onClick={goToPrevManager}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white shadow-lg border border-gray-200 hover:bg-gray-50 hover:border-primary-300 flex items-center justify-center transition-all duration-300 hover:scale-110 group"
              >
                <svg className="w-5 h-5 text-gray-400 group-hover:text-primary-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={goToNextManager}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white shadow-lg border border-gray-200 hover:bg-gray-50 hover:border-primary-300 flex items-center justify-center transition-all duration-300 hover:scale-110 group"
              >
                <svg className="w-5 h-5 text-gray-400 group-hover:text-primary-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* 인디케이터 */}
              <div className="flex items-center justify-center gap-2 mt-10">
                {managersData.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleManagerNavigation(index)}
                    className={`transition-all duration-500 rounded-full ${
                      index === currentManager
                        ? 'w-8 h-2 bg-primary-500'
                        : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`${index + 1}번 관리자로 이동`}
                  />
                ))}
              </div>

              {/* 현재/전체 표시 */}
              <div className="flex items-center justify-center gap-3 mt-5 text-sm">
                <span className="text-primary-600 font-bold text-lg">{String(currentManager + 1).padStart(2, '0')}</span>
                <span className="text-gray-300">/</span>
                <span className="text-gray-400">{String(managersData.length).padStart(2, '0')}</span>
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
