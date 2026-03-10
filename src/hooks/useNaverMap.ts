import { useEffect, useRef, useState, useCallback } from 'react'
import { hospitals, centerLocation, defaultSelectedHospitalId, type Hospital } from '@/data/hospitals'

declare global {
  interface Window {
    naver: {
      maps: {
        Map: new (element: HTMLElement, options: unknown) => NaverMap
        Marker: new (options: unknown) => NaverMarker
        LatLng: new (lat: number, lng: number) => NaverLatLng
        Size: new (width: number, height: number) => unknown
        Point: new (x: number, y: number) => unknown
        InfoWindow: new (options: unknown) => NaverInfoWindow
        Position: {
          TOP_RIGHT: number
        }
        Event: {
          addListener: (target: unknown, event: string, callback: () => void) => void
        }
      }
    }
  }
}

interface NaverLatLng {
  lat: () => number
  lng: () => number
}

interface NaverMap {
  setCenter: (latlng: NaverLatLng) => void
  panTo: (latlng: NaverLatLng) => void
  setOptions: (options: { draggable?: boolean; pinchZoom?: boolean; scrollWheel?: boolean }) => void
  getOptions?: (key: string) => boolean
}

interface NaverMarker {
  setMap: (map: NaverMap | null) => void
  getPosition: () => NaverLatLng
}

interface NaverInfoWindow {
  open: (map: NaverMap, marker: NaverMarker) => void
  close: () => void
}

interface MarkerData {
  marker: NaverMarker
  hospital: Hospital
}

export function useNaverMap(containerId: string) {
  const mapRef = useRef<NaverMap | null>(null)
  const markersRef = useRef<MarkerData[]>([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedHospitalId, setSelectedHospitalId] = useState<number>(defaultSelectedHospitalId)
  const [showMapOverlay, setShowMapOverlay] = useState(false)
  const [isMobileDevice, setIsMobileDevice] = useState(false)
  const [isMapFocused, setIsMapFocused] = useState(false)
  const activeInfoWindowRef = useRef<NaverInfoWindow | null>(null)
  const createInfoWindowRef = useRef<((hospital: Hospital) => NaverInfoWindow) | null>(null)
  const overlayTimeoutRef = useRef<number | null>(null)

  const selectHospital = useCallback((hospitalId: number) => {
    const markerData = markersRef.current.find(m => m.hospital.id === hospitalId)
    if (!markerData || !mapRef.current || !createInfoWindowRef.current) return

    // Close existing InfoWindow
    if (activeInfoWindowRef.current) {
      activeInfoWindowRef.current.close()
    }

    // Pan to marker
    mapRef.current.panTo(markerData.marker.getPosition())

    // Open new InfoWindow
    const infoWindow = createInfoWindowRef.current(markerData.hospital)
    infoWindow.open(mapRef.current, markerData.marker)
    activeInfoWindowRef.current = infoWindow

    // Update selected state
    setSelectedHospitalId(hospitalId)
  }, [])

  useEffect(() => {
    const initMap = () => {
      if (!window.naver || !window.naver.maps) {
        setError('네이버 지도 API를 불러올 수 없습니다.')
        return
      }

      const container = document.getElementById(containerId)
      if (!container) {
        setError('지도 컨테이너를 찾을 수 없습니다.')
        return
      }

      try {
        const { maps } = window.naver

        // PC vs Mobile zoom level
        const isMobile = window.innerWidth < 768
        const zoomLevel = isMobile ? centerLocation.zoomMobile : centerLocation.zoomPC

        const map = new maps.Map(container, {
          center: new maps.LatLng(centerLocation.lat, centerLocation.lng),
          zoom: zoomLevel,
          minZoom: 8,
          maxZoom: 16,
          zoomControl: !isMobile, // 모바일에서는 줌 컨트롤 숨김
          zoomControlOptions: {
            position: maps.Position.TOP_RIGHT,
          },
          scrollWheel: false, // 기본 비활성화, Ctrl 키로 제어
        })

        setIsMobileDevice(isMobile)

        mapRef.current = map

        let defaultMarker: NaverMarker | undefined
        let defaultHospital: Hospital | undefined

        // InfoWindow 생성 함수
        const createInfoWindow = (hospital: Hospital): NaverInfoWindow => {
          return new maps.InfoWindow({
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
                        <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM18 14H14V18H10V14H6V10H10V6H14V10H18V14Z"/>
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
                      ">협력 병원</div>
                      <h3 style="
                        margin: 0;
                        font-size: 18px;
                        font-weight: 700;
                        color: white;
                        line-height: 1.3;
                      ">${hospital.name}</h3>
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
                      ">${hospital.address}</p>
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
        }

        // Store createInfoWindow for later use
        createInfoWindowRef.current = createInfoWindow

        // 마커 생성
        hospitals.forEach((hospital: Hospital) => {
          const marker = new maps.Marker({
            position: new maps.LatLng(hospital.lat, hospital.lng),
            map: map,
            title: hospital.name,
            icon: {
              content: `<div style="
                width: 44px;
                height: 44px;
                background: linear-gradient(135deg, #9A8574 0%, #7D6B5C 100%);
                border-radius: 50%;
                border: 3px solid white;
                box-shadow: 0 4px 12px rgba(125, 107, 92, 0.4);
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
              ">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                  <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM18 14H14V18H10V14H6V10H10V6H14V10H18V14Z"/>
                </svg>
              </div>`,
              size: new maps.Size(44, 44),
              anchor: new maps.Point(22, 22),
            },
          })

          // 클릭 이벤트 등록
          maps.Event.addListener(marker, 'click', function() {
            if (activeInfoWindowRef.current) {
              activeInfoWindowRef.current.close()
            }
            const infoWindow = createInfoWindow(hospital)
            infoWindow.open(map, marker)
            activeInfoWindowRef.current = infoWindow
            setSelectedHospitalId(hospital.id)
          })

          markersRef.current.push({ marker, hospital })

          if (hospital.id === defaultSelectedHospitalId) {
            defaultMarker = marker
            defaultHospital = hospital
          }
        })

        // 지도 클릭 시 InfoWindow 닫기
        maps.Event.addListener(map, 'click', function() {
          if (activeInfoWindowRef.current) {
            activeInfoWindowRef.current.close()
            activeInfoWindowRef.current = null
          }
        })

        // 기본 선택 병원 InfoWindow 열기
        if (defaultMarker && defaultHospital) {
          const defaultInfoWindow = createInfoWindow(defaultHospital)
          defaultInfoWindow.open(map, defaultMarker)
          activeInfoWindowRef.current = defaultInfoWindow
        }

        // 이벤트 리스너 정리를 위한 참조 저장
        const cleanupFns: (() => void)[] = []

        // 모바일에서 한 손가락 터치 시 지도 드래그 비활성화 + 오버레이 표시
        if (isMobile) {
          // 초기에 지도 드래그 비활성화
          map.setOptions({ draggable: false, pinchZoom: false })

          const handleTouchStart = (e: TouchEvent) => {
            if (e.touches.length === 1) {
              // 한 손가락 터치 - 지도 드래그 비활성화, 오버레이 표시
              map.setOptions({ draggable: false, pinchZoom: false })
              if (overlayTimeoutRef.current) {
                clearTimeout(overlayTimeoutRef.current)
              }
              setShowMapOverlay(true)
              overlayTimeoutRef.current = window.setTimeout(() => {
                setShowMapOverlay(false)
              }, 2000)
            } else {
              // 두 손가락 이상 - 지도 드래그 활성화, 오버레이 숨김
              map.setOptions({ draggable: true, pinchZoom: true })
              setShowMapOverlay(false)
              if (overlayTimeoutRef.current) {
                clearTimeout(overlayTimeoutRef.current)
              }
            }
          }

          const handleTouchEnd = () => {
            // 터치 종료 시 다시 비활성화
            map.setOptions({ draggable: false, pinchZoom: false })
          }

          container.addEventListener('touchstart', handleTouchStart, { passive: true })
          container.addEventListener('touchend', handleTouchEnd, { passive: true })

          cleanupFns.push(() => {
            container.removeEventListener('touchstart', handleTouchStart)
            container.removeEventListener('touchend', handleTouchEnd)
          })
        } else {
          // PC에서 지도 클릭 후 스크롤로 확대/축소
          const handleMapClick = () => {
            setIsMapFocused(true)
            map.setOptions({ scrollWheel: true })
          }

          const handleDocumentClick = (e: MouseEvent) => {
            if (!container.contains(e.target as Node)) {
              setIsMapFocused(false)
              map.setOptions({ scrollWheel: false })
            }
          }

          const handleWheel = () => {
            // 현재 상태 확인을 위해 scrollWheel 옵션 체크
            const mapScrollEnabled = map.getOptions?.('scrollWheel') ?? false
            if (!mapScrollEnabled) {
              // 지도 미클릭 상태에서 스크롤 - 오버레이 표시
              if (overlayTimeoutRef.current) {
                clearTimeout(overlayTimeoutRef.current)
              }
              setShowMapOverlay(true)
              overlayTimeoutRef.current = window.setTimeout(() => {
                setShowMapOverlay(false)
              }, 2000)
            }
          }

          container.addEventListener('click', handleMapClick)
          container.addEventListener('wheel', handleWheel, { passive: true })
          document.addEventListener('click', handleDocumentClick)

          cleanupFns.push(() => {
            container.removeEventListener('click', handleMapClick)
            container.removeEventListener('wheel', handleWheel)
            document.removeEventListener('click', handleDocumentClick)
          })
        }

        setIsLoaded(true)

        // 정리 함수 반환
        return () => {
          cleanupFns.forEach(fn => fn())
          if (overlayTimeoutRef.current) {
            clearTimeout(overlayTimeoutRef.current)
          }
          markersRef.current.forEach(({ marker }) => marker.setMap(null))
          markersRef.current = []
        }
      } catch (err) {
        setError('지도를 초기화하는 중 오류가 발생했습니다.')
        console.error(err)
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
        if (!isLoaded) {
          setError('네이버 지도 API 로드 시간 초과')
        }
      }, 5000)

      return () => {
        clearInterval(checkInterval)
        clearTimeout(timeout)
      }
    }
  }, [containerId, isLoaded])

  const unfocusMap = useCallback(() => {
    if (mapRef.current) {
      mapRef.current.setOptions({ scrollWheel: false })
      setIsMapFocused(false)
    }
  }, [])

  return { map: mapRef.current, isLoaded, error, selectHospital, selectedHospitalId, showMapOverlay, isMobileDevice, isMapFocused, unfocusMap }
}
