import { useEffect, useRef, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Background images for slideshow
const backgroundImages = [
  '/images/team-bg.jpg',
  '/images/team-bg-2.jpg',
  '/images/team-bg-3.jpg',
  '/images/team-bg-4.jpg',
]

function AnimatedCounter({ value, suffix, duration = 2.5 }: { value: number; suffix: string; duration?: number }) {
  const [count, setCount] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const counterRef = useRef<HTMLSpanElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!counterRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true

            const startTime = performance.now()
            const endValue = value

            const animate = (currentTime: number) => {
              const elapsed = currentTime - startTime
              const progress = Math.min(elapsed / (duration * 1000), 1)

              const easeOutExpo = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
              const currentValue = Math.round(easeOutExpo * endValue)

              setCount(currentValue)

              if (progress < 1) {
                requestAnimationFrame(animate)
              } else {
                setCount(endValue)
                setIsComplete(true)
              }
            }

            requestAnimationFrame(animate)
          }
        })
      },
      { threshold: 0.3 }
    )

    observer.observe(counterRef.current)
    return () => observer.disconnect()
  }, [value, duration])

  return (
    <span ref={counterRef} className={`transition-opacity duration-300 ${isComplete ? 'opacity-100' : 'opacity-90'}`}>
      {count.toLocaleString()}<span className="text-base sm:text-lg">{suffix}</span>
    </span>
  )
}

export function TeamSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [currentBgIndex, setCurrentBgIndex] = useState(0)

  // Background image slideshow
  const nextBackground = useCallback(() => {
    setCurrentBgIndex((prev) => (prev + 1) % backgroundImages.length)
  }, [])

  useEffect(() => {
    const interval = setInterval(nextBackground, 5000)
    return () => clearInterval(interval)
  }, [nextBackground])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.team-content',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: '.team-section',
            start: 'top 70%',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="team">
      <div className="team-section relative overflow-hidden">
        {/* Background Images with Crossfade */}
        {backgroundImages.map((src, index) => (
          <div
            key={src}
            className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out ${
              index === currentBgIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={src}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        ))}

        {/* Solid Primary Background Overlay */}
        <div className="absolute inset-0 bg-primary-600" />

        {/* Subtle lines */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Content - Left & Right Layout */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            {/* Left - Text Content */}
            <div className="team-content flex-1 text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
                <span className="w-2 h-2 rounded-full bg-primary-400 animate-pulse" />
                <span className="text-white/80 text-sm font-medium">
                  함께하는 인재들
                </span>
              </div>

              {/* Heading */}
              <h2 className="text-[27px] sm:text-[33px] lg:text-[45px] font-bold text-white mb-5 leading-tight">
                다 같은 보험
                <br />
                <span className="text-primary-300">
                  전문가가 아닙니다
                </span>
              </h2>

              <p className="text-[14px] sm:text-base text-white/70 mb-8 max-w-md mx-auto lg:mx-0 leading-relaxed">
                당신도 온담본부의 다음 성공스토리가 될 수 있습니다.<br />
                검증된 시스템과 함께 성장하세요.
              </p>

              {/* CTA Button */}
              <Link
                to="/experience"
                className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-white text-primary-700 font-semibold hover:bg-primary-50 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <span>병원근무 체험하기</span>
                <svg
                  className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>

              {/* Background Image Indicators */}
              <div className="flex justify-center lg:justify-start gap-2 mt-10">
                {backgroundImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentBgIndex(index)}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      index === currentBgIndex
                        ? 'w-8 bg-white/70'
                        : 'w-1.5 bg-white/30 hover:bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Right - Stats Layout */}
            <div className="flex-1 w-full max-w-lg">
              {/* Top 2x2 Grid */}
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20">
                  <div className="text-2xl sm:text-3xl font-bold text-white mb-1">
                    <AnimatedCounter value={50} suffix="%+" />
                  </div>
                  <div className="text-sm font-medium text-white/90">온담 청약/계약</div>
                  <div className="text-xs text-white/50">전환률</div>
                </div>
                <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20">
                  <div className="text-2xl sm:text-3xl font-bold text-white mb-1">
                    <AnimatedCounter value={10} suffix="개" />
                  </div>
                  <div className="text-sm font-medium text-white/90">서울 경기 지역</div>
                  <div className="text-xs text-white/50">협력병원</div>
                </div>
              </div>

              {/* Full-width Stats */}
              <div className="space-y-2.5">
                <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center gap-4">
                  <div className="text-2xl sm:text-3xl font-bold text-white whitespace-nowrap min-w-[120px]">
                    <AnimatedCounter value={24000} suffix="+" />
                  </div>
                  <div className="text-sm text-white/60">병원 보험 상담수</div>
                </div>
                <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center gap-4">
                  <div className="text-2xl sm:text-3xl font-bold text-white whitespace-nowrap min-w-[120px]">
                    <AnimatedCounter value={95} suffix="% 이상" />
                  </div>
                  <div className="text-sm text-white/60">온담 설계사 13회차 정착률</div>
                </div>
                <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center gap-4">
                  <div className="text-2xl sm:text-3xl font-bold text-white whitespace-nowrap min-w-[120px]">
                    <AnimatedCounter value={15000} suffix="+" />
                  </div>
                  <div className="text-sm text-white/60">온담 계약, 관리 고객수</div>
                </div>
                <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center gap-4">
                  <div className="text-2xl sm:text-3xl font-bold text-white whitespace-nowrap min-w-[120px]">
                    <AnimatedCounter value={40} suffix="%" />
                  </div>
                  <div className="text-sm text-white/60">MDRT 비율 온담본부 구성원 중</div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
