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





const page = () => {
  return (
    <div>
      <HeroScroll />
      <Timeline />
      <AiTeamSection/>
      <VideoSections />
      <ExpandScroll />
      <VoiceSection />
      <Bento />
      <Faq />
      <Features />
      <ShaderCTA />
    </div>
  )
}

export default page