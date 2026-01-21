import { HeroSection } from '@/components/sections/HeroSection'
import { IntroSection } from '@/components/sections/IntroSection'
import { StrengthsSection } from '@/components/sections/StrengthsSection'
import { MessagesSection } from '@/components/sections/MessagesSection'
import { TeamSection } from '@/components/sections/TeamSection'
import { ApplicationForm } from '@/components/sections/ApplicationForm'

export function HomePage() {
  return (
    <>
      <HeroSection />
      <IntroSection />
      <StrengthsSection />
      <MessagesSection />
      <TeamSection />
      <ApplicationForm />
    </>
  )
}
