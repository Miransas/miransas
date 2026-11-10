import { VoiceSection } from '@/components/shared/voice-section';
import { Features } from '@/components/shared/feature';
import { Faq } from '@/components/shared/faq';
import { Bento } from '@/components/shared/BentoSection';
import { ShaderCTA } from '@/components/shaders/shader-cta';
import { AiTeamSection } from '@/components/shared/ai-teamSection';
import Timeline from '@/components/shared/heroTimeline';
import ScrollText from '@/components/shared/scroll-text';
import StickySplitSection from '@/components/shared/StickySplitSection';
import { HeroTransition } from '@/components/shared/hero-transition';
import { NewHero } from '@/components/shared/new-hero';

export default function HomePage() {
  return (
    <>
      <HeroTransition><NewHero /></HeroTransition>
      <StickySplitSection />
      <Timeline />
      <ScrollText />
      <AiTeamSection />
      <VoiceSection />
      <Bento />
      <Faq />
      <Features />
      <ShaderCTA />
    </>
  );
}
