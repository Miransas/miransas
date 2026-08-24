import React from 'react'
import { HeroScroll } from '../components/shared/hero-scroll'


import { VoiceSection } from '../components/shared/voice-section'
import { Features } from '../components/shared/feature'
import { Faq } from '../components/shared/faq'
import { Bento } from '../components/shared/BentoSection'
import { VideoSections } from '../components/shared/video-section'
import Product from '../components/shared/product'





const page = () => {
  return (
    <div>
      <HeroScroll />
      <Product />
      <VideoSections />
      <VoiceSection />
      <Bento />
      <Faq />
      <Features />
    </div>
  )
}

export default page