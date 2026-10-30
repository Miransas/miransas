import React from 'react'
import { HeroScroll } from '../components/shared/hero-scroll'


import { VoiceSection } from '../components/shared/voice-section'
import { Features } from '../components/shared/feature'
import { Faq } from '../components/shared/faq'
import { Bento } from '../components/shared/BentoSection'
import { VideoSections } from '../components/shared/video-section'

import { ShaderCTA } from '../components/shaders/shader-cta'
import ExpandScroll from '../components/shared/expand-scroll'

import { AiTeamSection } from '../components/shared/ai-teamSection'
import Timeline from '../components/shared/heroTimeline'

import RobotEyes from '../components/shared/RobotEyes'
import ScrollText from '../components/shared/scroll-text'
import StickySplitSection from '../components/shared/StickySplitSection'





const page = () => {
  return (
    <main className='smooth-scroll'> 
      <HeroScroll />
      <StickySplitSection/>
      <Timeline />
      <ScrollText/>
      <AiTeamSection/>
      {/* <VideoSections />
      <ExpandScroll /> */}
      <VoiceSection />
      <Bento />
      <Faq />
      <Features />
      <ShaderCTA />
    </main>
  )
}

export default page