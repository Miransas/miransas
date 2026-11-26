import type { Metadata } from 'next';
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
import { ContentTheme } from '@/components/shared/content-theme';
import { EngineeringVisualSection } from '@/components/shared/engineering-visual-section';
import {
  EngineeringReality,
  ModelResearch,
  VoiceInfrastructure,
} from '@/components/shared/engineering-progress';
import { JsonLd } from '@/src/components/seo/JsonLd';
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_TITLE,
  createPageMetadata,
  getHomeJsonLd,
} from '@/src/lib/seo';

export const metadata: Metadata = createPageMetadata({
  title: DEFAULT_TITLE,
  description: DEFAULT_DESCRIPTION,
  path: '/',
});

export default function HomePage() {
  return (
    <>
      <JsonLd data={getHomeJsonLd()} />
      <HeroTransition>
        <NewHero />
      </HeroTransition>
      <ContentTheme>
        <StickySplitSection />
        <EngineeringReality />
        <ModelResearch />
        <VoiceInfrastructure />
        <Timeline />
        <ScrollText />
        <AiTeamSection />
        <VoiceSection />
        <Bento />
        <Faq />
        <Features />
        <EngineeringVisualSection />
        <ShaderCTA />
      </ContentTheme>
    </>
  );
}
