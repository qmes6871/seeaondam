import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function CopySection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (contentRef.current && sectionRef.current) {
      gsap.fromTo(
        contentRef.current.children,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    }
  }, [])

  return (
    <section ref={sectionRef} className="hidden py-24 md:py-32 bg-white">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <div ref={contentRef}>
          <span className="inline-block px-4 py-2 bg-primary-50 text-primary-600 rounded-full text-sm font-semibold mb-6">
            온담본부 소개
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-8 leading-tight">
            <span className="block">병원과 인재를 잇는</span>
            <span className="text-primary-600">신뢰의 파트너</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            온담본부는 의료 인력 채용의 새로운 기준을 제시합니다.
            <br className="hidden md:block" />
            병원과 인재 모두에게 최적의 매칭을 제공하여
            <br className="hidden md:block" />
            함께 성장하는 의료 생태계를 만들어갑니다.
          </p>
          <div className="mt-12 flex flex-wrap justify-center gap-8 md:gap-16">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary-600 mb-2">50+</div>
              <div className="text-gray-500 font-medium">협력 병원</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary-600 mb-2">1,000+</div>
              <div className="text-gray-500 font-medium">매칭 인재</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary-600 mb-2">98%</div>
              <div className="text-gray-500 font-medium">만족도</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
