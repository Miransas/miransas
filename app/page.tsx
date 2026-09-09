import React from 'react'
import { HeroScroll } from '../components/shared/hero-scroll'


import { VoiceSection } from '../components/shared/voice-section'
import { Features } from '../components/shared/feature'
import { Faq } from '../components/shared/faq'
import { Bento } from '../components/shared/BentoSection'
import { VideoSections } from '../components/shared/video-section'

import { ShaderCTA } from '../components/shaders/shader-cta'
import ExpandScroll from '../components/shared/expand-scroll'
import { ProductMock } from '../components/shared/product-mock'
import TestimonialSection from '../components/shared/TestimonialSection'





const page = () => {
  return (
    <div>
      <HeroScroll />
      {/* <TestimonialSection/> */}
      <VideoSections />
      <ExpandScroll />
      <VoiceSection />
      <Bento />
      <Faq />
      <Features />
      <ShaderCTA/>
    </div>
  )
}

export default page