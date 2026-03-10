import { useState, useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { cn } from '@/lib/utils'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const applicationSchema = z.object({
  name: z.string().min(2, '이름을 입력해주세요'),
  phone: z
    .string()
    .regex(/^01[0-9]-?[0-9]{3,4}-?[0-9]{4}$/, '올바른 연락처를 입력해주세요'),
  birthYear: z.string().min(4, '출생년도를 입력해주세요'),
  region: z.string().min(1, '거주지역을 입력해주세요'),
  insuranceCareer: z.string().min(1, '보험경력을 선택해주세요'),
  privacyConsent: z.boolean().refine((val) => val === true, {
    message: '개인정보 수집에 동의해주세요',
  }),
})

type ApplicationFormData = z.infer<typeof applicationSchema>

const insuranceCareerOptions = [
  { value: '', label: '(선택)' },
  { value: '없음', label: '없음' },
  { value: '1년 미만', label: '1년 미만' },
  { value: '1-3년', label: '1-3년' },
  { value: '3-5년', label: '3-5년' },
  { value: '5년 이상', label: '5년 이상' },
]

type TabType = 'seminar' | 'experience'

export function ApplicationForm() {
  const [activeTab, setActiveTab] = useState<TabType>('seminar')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
            },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      name: '',
      phone: '',
      birthYear: '',
      region: '',
      insuranceCareer: '',
      privacyConsent: false as unknown as true,
    },
  })

  const onSubmit = async (data: ApplicationFormData) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/submit-application.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          applicationType: activeTab === 'seminar' ? '사업설명회' : '병원근무 체험',
        }),
      })

      if (!response.ok) {
        throw new Error('제출에 실패했습니다')
      }

      setSubmitStatus('success')
      reset()
    } catch {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitStatus === 'success') {
    return (
      <section id="apply" className="relative min-h-[800px] lg:min-h-[700px]">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/images/apply-bg.jpg"
            alt="배경"
            className="w-full h-full object-cover"
          />
          {/* Left-to-right gradient: dark on both sides */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#1A1614]/88 via-[#1A1614]/45 to-[#1A1614]/88" />
          {/* Subtle top/bottom for depth */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#1A1614]/15 via-transparent to-[#1A1614]/25" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 flex items-center justify-end min-h-[800px] lg:min-h-[700px]">
          <div className="w-full max-w-lg bg-white rounded-3xl p-8 sm:p-12 shadow-2xl text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              신청이 완료되었습니다!
            </h2>
            <p className="text-gray-600 mb-8">
              입력하신 연락처로 빠른 시일 내에 연락드리겠습니다.<br />
              온담본부에 관심 가져주셔서 감사합니다.
            </p>
            <button
              onClick={() => setSubmitStatus('idle')}
              className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
            >
              추가 신청하기
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section ref={sectionRef} id="apply" className="relative min-h-[900px] lg:min-h-[750px]">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/images/apply-bg.jpg"
          alt="배경"
          className="w-full h-full object-cover"
        />
        {/* Left-to-right gradient: dark on both sides */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1614]/88 via-[#1A1614]/45 to-[#1A1614]/88" />
        {/* Subtle top/bottom for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A1614]/15 via-transparent to-[#1A1614]/25" />
      </div>

      {/* Content */}
      <div ref={contentRef} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-16">
          {/* Left Side - Text Content */}
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
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 text-white/90">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-primary-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>체계적인 교육</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-primary-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>높은 수익</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-primary-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>안정적인 환경</span>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="w-full max-w-lg flex-shrink-0">
            {/* Tabs */}
            <div className="flex mb-0 relative">
              <button
                type="button"
                onClick={() => setActiveTab('seminar')}
                className={cn(
                  'flex-1 py-4 text-center font-bold text-sm sm:text-base transition-all duration-300 rounded-t-2xl',
                  activeTab === 'seminar'
                    ? 'bg-white text-gray-900 shadow-lg'
                    : 'bg-white/20 backdrop-blur-sm text-white/80 hover:bg-white/30'
                )}
              >
                온담본부 사업설명회
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('experience')}
                className={cn(
                  'flex-1 py-4 text-center font-bold text-sm sm:text-base transition-all duration-300 rounded-t-2xl',
                  activeTab === 'experience'
                    ? 'bg-white text-gray-900 shadow-lg'
                    : 'bg-white/20 backdrop-blur-sm text-white/80 hover:bg-white/30'
                )}
              >
                병원근무 체험하기
              </button>
            </div>

            {/* Form Card */}
            <div className="bg-white rounded-b-3xl rounded-tr-3xl shadow-2xl overflow-hidden">
              <form onSubmit={handleSubmit(onSubmit)} className="p-6 sm:p-8">
                {submitStatus === 'error' && (
                  <div className="mb-5 p-4 rounded-xl bg-red-50 text-red-700 text-sm border border-red-100">
                    제출 중 오류가 발생했습니다. 다시 시도해주세요.
                  </div>
                )}

                <div className="space-y-5">
                  {/* Row 1: 이름 & 연락처 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                        이름 <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="홍길동"
                        {...register('name')}
                        className={cn(
                          'w-full px-4 py-3 rounded-xl border-2 bg-gray-50 text-gray-900 placeholder-gray-400 transition-all duration-200',
                          'focus:outline-none focus:border-primary-500 focus:bg-white focus:ring-4 focus:ring-primary-500/10',
                          errors.name ? 'border-red-300 bg-red-50' : 'border-gray-200'
                        )}
                      />
                      {errors.name && (
                        <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                        연락처 <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        placeholder="010-1234-5678"
                        {...register('phone')}
                        className={cn(
                          'w-full px-4 py-3 rounded-xl border-2 bg-gray-50 text-gray-900 placeholder-gray-400 transition-all duration-200',
                          'focus:outline-none focus:border-primary-500 focus:bg-white focus:ring-4 focus:ring-primary-500/10',
                          errors.phone ? 'border-red-300 bg-red-50' : 'border-gray-200'
                        )}
                      />
                      {errors.phone && (
                        <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Row 2: 출생년도 & 거주지역 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                        출생년도 <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="1990"
                        maxLength={4}
                        {...register('birthYear')}
                        className={cn(
                          'w-full px-4 py-3 rounded-xl border-2 bg-gray-50 text-gray-900 placeholder-gray-400 transition-all duration-200',
                          'focus:outline-none focus:border-primary-500 focus:bg-white focus:ring-4 focus:ring-primary-500/10',
                          errors.birthYear ? 'border-red-300 bg-red-50' : 'border-gray-200'
                        )}
                      />
                      {errors.birthYear && (
                        <p className="mt-1 text-xs text-red-500">{errors.birthYear.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                        거주지역 <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="서울시 강남구"
                        {...register('region')}
                        className={cn(
                          'w-full px-4 py-3 rounded-xl border-2 bg-gray-50 text-gray-900 placeholder-gray-400 transition-all duration-200',
                          'focus:outline-none focus:border-primary-500 focus:bg-white focus:ring-4 focus:ring-primary-500/10',
                          errors.region ? 'border-red-300 bg-red-50' : 'border-gray-200'
                        )}
                      />
                      {errors.region && (
                        <p className="mt-1 text-xs text-red-500">{errors.region.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Row 3: 보험경력 */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                      보험경력 <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <select
                        {...register('insuranceCareer')}
                        className={cn(
                          'w-full px-4 py-3 rounded-xl border-2 bg-gray-50 text-gray-900 transition-all duration-200 appearance-none cursor-pointer',
                          'focus:outline-none focus:border-primary-500 focus:bg-white focus:ring-4 focus:ring-primary-500/10',
                          errors.insuranceCareer ? 'border-red-300 bg-red-50' : 'border-gray-200'
                        )}
                      >
                        {insuranceCareerOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                    {errors.insuranceCareer && (
                      <p className="mt-1 text-xs text-red-500">{errors.insuranceCareer.message}</p>
                    )}
                  </div>

                  {/* Notice - shows different message based on tab */}
                  <div className="py-3 px-4 bg-gradient-to-r from-primary-50 to-blue-50 rounded-xl border border-primary-100">
                    <p className="text-primary-700 font-medium text-sm flex items-center gap-2">
                      <svg className="w-4 h-4 text-primary-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      {activeTab === 'seminar'
                        ? '사업설명회 참석시 교통비 5만원이 지급됩니다.'
                        : '실제 병원 현장에서 하루 동안 업무를 체험해보세요.'}
                    </p>
                  </div>

                  {/* Privacy Consent */}
                  <div className="pt-3 border-t border-gray-100">
                    <p className="text-sm font-semibold text-gray-700 mb-2">
                      개인정보 수집 및 이용 동의 <span className="text-red-500">*</span>
                    </p>
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <div className="relative flex-shrink-0 mt-0.5">
                        <input
                          type="checkbox"
                          {...register('privacyConsent')}
                          className="peer sr-only"
                        />
                        <div className={cn(
                          'w-5 h-5 border-2 rounded transition-all duration-200',
                          'peer-checked:bg-primary-500 peer-checked:border-primary-500',
                          'peer-focus:ring-4 peer-focus:ring-primary-500/20',
                          errors.privacyConsent ? 'border-red-300' : 'border-gray-300'
                        )}>
                        </div>
                        <svg className="absolute inset-0 w-5 h-5 text-white opacity-0 peer-checked:opacity-100 transition-opacity p-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                        개인정보 수집 및 이용에 동의합니다.
                      </span>
                    </label>
                    {errors.privacyConsent && (
                      <p className="mt-1.5 text-xs text-red-500">{errors.privacyConsent.message}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={cn(
                      'w-full py-4 rounded-xl font-bold text-base text-white transition-all duration-300',
                      'bg-primary-600 hover:bg-primary-700 active:scale-[0.98]',
                      'focus:outline-none focus:ring-4 focus:ring-primary-500/30',
                      'disabled:opacity-70 disabled:cursor-not-allowed',
                      'shadow-lg shadow-primary-600/25 hover:shadow-xl hover:shadow-primary-600/30'
                    )}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        신청 중...
                      </span>
                    ) : (
                      '신청하기'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
