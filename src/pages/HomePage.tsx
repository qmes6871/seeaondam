import { VideoHeroSection } from '@/components/sections/VideoHeroSection'
import { CopySection } from '@/components/sections/CopySection'
import { MapSection } from '@/components/sections/MapSection'
import { IntroSection } from '@/components/sections/IntroSection'
import { StrengthsSection } from '@/components/sections/StrengthsSection'
// import { MessagesSection } from '@/components/sections/MessagesSection'
import { TeamSection } from '@/components/sections/TeamSection'
import { CustomerBenefitsSection } from '@/components/sections/CustomerBenefitsSection'
import { AgentBenefitsSection } from '@/components/sections/AgentBenefitsSection'
import { ApplicationForm } from '@/components/sections/ApplicationForm'

export function HomePage() {
  return (
    <>
      <VideoHeroSection />
      <CopySection />
      <IntroSection />
      <MapSection />
      <StrengthsSection />
      {/* <MessagesSection /> */}
      <TeamSection />
      <CustomerBenefitsSection />
      <AgentBenefitsSection />
      <ApplicationForm />
    </>
  )
}
