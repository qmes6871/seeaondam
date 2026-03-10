import { useEffect, useRef, useState } from 'react'
import { useNaverMap } from '@/hooks/useNaverMap'
import { hospitals } from '@/data/hospitals'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function MapSection() {
  const { isLoaded, selectHospital, selectedHospitalId, showMapOverlay, isMobileDevice, isMapFocused, unfocusMap } = useNaverMap('map-section-map')
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const [isMobileListOpen, setIsMobileListOpen] = useState(false)

  useEffect(() => {
    if (titleRef.current && sectionRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      )
    }
  }, [])

  useEffect(() => {
    if (isLoaded && listRef.current) {
      gsap.fromTo(
        listRef.current,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.6, delay: 0.3 }
      )
    }
  }, [isLoaded])

  const handleSelectHospital = (hospitalId: number) => {
    selectHospital(hospitalId)
    setIsMobileListOpen(false)
  }

  const selectedHospital = hospitals.find(h => h.id === selectedHospitalId)

  return (
    <section id="map-section" ref={sectionRef} className="relative">
      {/* Section Title */}
      <div ref={titleRef} className="bg-gray-50 py-12 md:py-16 text-center">
        <span className="inline-block px-4 py-2 bg-primary-100 text-primary-600 rounded-full text-sm font-semibold mb-4">
          협력 병원
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          온담본부와 함께하는 병원들
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto px-4">
          우리는 이미 병원 안에서 일하고 있습니다.<br />
          병원 인하우스 보험팀으로 함께하고 있는 실제 운영 병원 네트워크입니다.
        </p>
      </div>

      {/* Map Container */}
      <div className="relative h-[70vh] md:h-[80vh]">
        {/* Naver Map */}
        <div className="absolute inset-0">
          <div id="map-section-map" className="w-full h-full" />

          {/* PC: 지도 포커스 해제 버튼 */}
          {!isMobileDevice && isMapFocused && (
            <button
              onClick={unfocusMap}
              className="hidden lg:flex absolute top-4 right-4 z-30 bg-white/95 backdrop-blur-md rounded-xl shadow-lg px-4 py-3 items-center gap-2 hover:bg-white transition-colors"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span className="text-sm font-medium text-gray-700">스크롤 모드로 전환</span>
            </button>
          )}

          {/* Map Control Overlay */}
          <div
            className={`absolute inset-0 bg-black/50 flex items-center justify-center transition-opacity duration-300 pointer-events-none z-30
              ${showMapOverlay ? 'opacity-100' : 'opacity-0'}`}
          >
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-xl flex items-center gap-4">
              {isMobileDevice ? (
                <>
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <svg className="w-7 h-7 text-primary-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 1 1 3 0m-3 6a1.5 1.5 0 0 0-3 0v2a7.5 7.5 0 0 0 15 0v-5a1.5 1.5 0 0 0-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 0 1 3 0v1m0 0V11m0-5.5a1.5 1.5 0 0 1 3 0v3m0 0V11" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">두 손가락으로 지도 이동</p>
                    <p className="text-sm text-gray-500">페이지 스크롤은 한 손가락으로</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <svg className="w-7 h-7 text-primary-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">지도를 클릭 후 스크롤</p>
                    <p className="text-sm text-gray-500">지도 확대/축소가 가능합니다</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Desktop: Hospital List Panel (Left Side) */}
        <div
          ref={listRef}
          className="hidden lg:block absolute top-4 left-4 z-20 w-80 max-h-[calc(100%-32px)] opacity-0"
        >
          <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden border border-white/20">
            {/* Panel Header */}
            <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">협력 병원</h3>
                  <p className="text-white/70 text-xs">총 {hospitals.length}개 병원</p>
                </div>
              </div>
            </div>

            {/* Hospital List */}
            <div className="max-h-[400px] overflow-y-auto">
              {hospitals.map((hospital) => (
                <button
                  key={hospital.id}
                  onClick={() => selectHospital(hospital.id)}
                  className={`w-full px-5 py-4 flex items-center gap-4 transition-all duration-200 text-left border-b border-gray-100 last:border-b-0
                    ${selectedHospitalId === hospital.id
                      ? 'bg-primary-50 border-l-4 border-l-primary-500'
                      : 'hover:bg-gray-50 border-l-4 border-l-transparent'
                    }`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-colors
                    ${selectedHospitalId === hospital.id
                      ? 'bg-primary-500 text-white'
                      : 'bg-primary-100 text-primary-600'
                    }`}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM18 14H14V18H10V14H6V10H10V6H14V10H18V14Z"/>
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className={`font-semibold text-sm truncate ${selectedHospitalId === hospital.id ? 'text-primary-700' : 'text-gray-900'}`}>
                      {hospital.name}
                    </h4>
                    <p className="text-xs text-gray-500 truncate mt-0.5">
                      {hospital.address}
                    </p>
                  </div>
                  <svg className={`w-4 h-4 flex-shrink-0 transition-colors ${selectedHospitalId === hospital.id ? 'text-primary-500' : 'text-gray-300'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile: Bottom Sheet Style */}
        <div className="lg:hidden absolute bottom-0 left-0 right-0 z-20">
          {/* Collapsed State */}
          <div
            className={`transition-all duration-300 ${isMobileListOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
          >
            <div className="mx-4 mb-4">
              <button
                onClick={() => setIsMobileListOpen(true)}
                className="w-full bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-4 flex items-center gap-3"
              >
                <div className="w-12 h-12 bg-primary-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM18 14H14V18H10V14H6V10H10V6H14V10H18V14Z"/>
                  </svg>
                </div>
                <div className="flex-1 text-left">
                  <p className="text-xs text-gray-500">선택된 병원</p>
                  <h4 className="font-bold text-gray-900">{selectedHospital?.name}</h4>
                </div>
                <div className="flex items-center gap-2 text-primary-600">
                  <span className="text-sm font-medium">전체 보기</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                </div>
              </button>
            </div>
          </div>

          {/* Expanded State */}
          <div
            className={`absolute bottom-0 left-0 right-0 transition-all duration-300 ease-out ${
              isMobileListOpen
                ? 'translate-y-0 opacity-100'
                : 'translate-y-full opacity-0 pointer-events-none'
            }`}
          >
            <div className="bg-white rounded-t-3xl shadow-2xl max-h-[60vh] flex flex-col">
              {/* Handle & Header */}
              <div className="flex-shrink-0">
                <div className="flex justify-center pt-3 pb-2">
                  <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
                </div>
                <div className="flex items-center justify-between px-5 pb-4 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center">
                      <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">협력 병원</h3>
                      <p className="text-xs text-gray-500">총 {hospitals.length}개 병원</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsMobileListOpen(false)}
                    className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center"
                  >
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Hospital List */}
              <div className="flex-1 overflow-y-auto pb-8">
                {hospitals.map((hospital) => (
                  <button
                    key={hospital.id}
                    onClick={() => handleSelectHospital(hospital.id)}
                    className={`w-full px-5 py-4 flex items-center gap-4 transition-all duration-200 text-left border-b border-gray-50
                      ${selectedHospitalId === hospital.id
                        ? 'bg-primary-50'
                        : 'active:bg-gray-50'
                      }`}
                  >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-colors
                      ${selectedHospitalId === hospital.id
                        ? 'bg-primary-500 text-white'
                        : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM18 14H14V18H10V14H6V10H10V6H14V10H18V14Z"/>
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className={`font-semibold truncate ${selectedHospitalId === hospital.id ? 'text-primary-700' : 'text-gray-900'}`}>
                        {hospital.name}
                      </h4>
                      <p className="text-sm text-gray-500 truncate mt-0.5">
                        {hospital.address}
                      </p>
                    </div>
                    {selectedHospitalId === hospital.id && (
                      <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Backdrop */}
          {isMobileListOpen && (
            <div
              className="fixed inset-0 bg-black/30 -z-10"
              onClick={() => setIsMobileListOpen(false)}
            />
          )}
        </div>
      </div>
    </section>
  )
}
