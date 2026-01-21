import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import { Textarea } from '@/components/ui/Textarea'
import { Select } from '@/components/ui/Select'
import { Checkbox } from '@/components/ui/Checkbox'

const applicationSchema = z.object({
  name: z.string().min(2, '이름을 입력해주세요'),
  phone: z
    .string()
    .regex(/^01[0-9]-?[0-9]{3,4}-?[0-9]{4}$/, '올바른 연락처를 입력해주세요'),
  birthDate: z.string().min(1, '생년월일을 입력해주세요'),
  region: z.string().min(1, '거주 지역을 선택해주세요'),
  career: z.string().min(1, '경력을 선택해주세요'),
  reason: z.string().min(10, '지원 사유를 10자 이상 입력해주세요'),
  privacyConsent: z.boolean().refine((val) => val === true, {
    message: '개인정보 수집에 동의해주세요',
  }),
})

type ApplicationFormData = z.infer<typeof applicationSchema>

const regionOptions = [
  { value: '서울', label: '서울' },
  { value: '경기 북부', label: '경기 북부' },
  { value: '경기 남부', label: '경기 남부' },
  { value: '인천', label: '인천' },
  { value: '기타', label: '기타 지역' },
]

const careerOptions = [
  { value: '신입', label: '신입 (보험업 경험 없음)' },
  { value: '1년 미만', label: '보험업 1년 미만' },
  { value: '1-3년', label: '보험업 1-3년' },
  { value: '3-5년', label: '보험업 3-5년' },
  { value: '5년 이상', label: '보험업 5년 이상' },
]

export function ApplicationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

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
      birthDate: '',
      region: '',
      career: '',
      reason: '',
      privacyConsent: false as unknown as true,
    },
  })

  const onSubmit = async (data: ApplicationFormData) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/seeaondam/api/submit-application.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
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
      <section id="apply" className="py-14 sm:py-20 lg:py-32 bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center bg-white rounded-2xl p-8 sm:p-12 shadow-sm">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
              <svg
                className="w-10 h-10 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              지원이 완료되었습니다!
            </h2>
            <p className="text-gray-600 mb-8">
              입력하신 연락처로 빠른 시일 내에 연락드리겠습니다.<br />
              온담본부에 관심 가져주셔서 감사합니다.
            </p>
            <Button
              onClick={() => setSubmitStatus('idle')}
              variant="outline"
            >
              추가 지원하기
            </Button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="apply" className="py-14 sm:py-20 lg:py-32 bg-white">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <span className="inline-block px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-primary-100 text-primary-700 text-xs sm:text-sm font-medium mb-3 sm:mb-4">
            Join Us
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
            <span className="text-primary-600">입사 지원</span>하기
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600">
            온담본부와 함께할 준비가 되셨나요?<br />
            아래 양식을 작성해주시면 담당자가 연락드립니다.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 lg:p-10 shadow-sm"
        >
          {submitStatus === 'error' && (
            <div className="mb-6 p-4 rounded-lg bg-red-50 text-red-700 text-sm">
              제출 중 오류가 발생했습니다. 다시 시도해주세요.
            </div>
          )}

          <div className="space-y-6">
            {/* Name */}
            <div>
              <Label htmlFor="name" required>
                이름
              </Label>
              <Input
                id="name"
                placeholder="홍길동"
                error={!!errors.name}
                {...register('name')}
                className="mt-2"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <Label htmlFor="phone" required>
                연락처
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="010-1234-5678"
                error={!!errors.phone}
                {...register('phone')}
                className="mt-2"
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>
              )}
            </div>

            {/* Birth Date */}
            <div>
              <Label htmlFor="birthDate" required>
                생년월일
              </Label>
              <Input
                id="birthDate"
                type="date"
                error={!!errors.birthDate}
                {...register('birthDate')}
                className="mt-2"
              />
              {errors.birthDate && (
                <p className="mt-1 text-sm text-red-500">{errors.birthDate.message}</p>
              )}
            </div>

            {/* Region */}
            <div>
              <Label htmlFor="region" required>
                거주 지역
              </Label>
              <Select
                id="region"
                placeholder="지역을 선택해주세요"
                options={regionOptions}
                error={!!errors.region}
                {...register('region')}
                className="mt-2"
              />
              {errors.region && (
                <p className="mt-1 text-sm text-red-500">{errors.region.message}</p>
              )}
            </div>

            {/* Career */}
            <div>
              <Label htmlFor="career" required>
                경력
              </Label>
              <Select
                id="career"
                placeholder="경력을 선택해주세요"
                options={careerOptions}
                error={!!errors.career}
                {...register('career')}
                className="mt-2"
              />
              {errors.career && (
                <p className="mt-1 text-sm text-red-500">{errors.career.message}</p>
              )}
            </div>

            {/* Reason */}
            <div>
              <Label htmlFor="reason" required>
                지원 사유
              </Label>
              <Textarea
                id="reason"
                placeholder="온담본부에 지원하게 된 계기와 포부를 작성해주세요"
                error={!!errors.reason}
                {...register('reason')}
                className="mt-2"
              />
              {errors.reason && (
                <p className="mt-1 text-sm text-red-500">{errors.reason.message}</p>
              )}
            </div>

            {/* Privacy Consent */}
            <div className="pt-4 border-t border-gray-100">
              <Checkbox
                id="privacyConsent"
                label="개인정보 수집 및 이용에 동의합니다. 수집된 정보는 채용 절차 진행 목적으로만 사용되며, 채용 종료 후 파기됩니다."
                error={!!errors.privacyConsent}
                {...register('privacyConsent')}
              />
              {errors.privacyConsent && (
                <p className="mt-1 text-sm text-red-500">{errors.privacyConsent.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  제출 중...
                </>
              ) : (
                '지원서 제출하기'
              )}
            </Button>
          </div>
        </form>

        {/* Contact Info */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            문의사항이 있으신가요?{' '}
            <a href="tel:010-0000-0000" className="text-primary-600 hover:underline">
              전화 문의
            </a>
            {' '}또는{' '}
            <a href="mailto:recruit@example.com" className="text-primary-600 hover:underline">
              이메일 문의
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
