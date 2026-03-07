import React from 'react'
import Hero from '../components/shared/hero'
import TechStackSection from '../components/shared/TechStackSection'
import EcosystemSection from '../components/shared/ecosystem'
import FeaturesGrid from '../components/shared/features-grid'

const page = () => {
  return (
    <div className='mt-20'>
      <Hero />
      <div>
        <TechStackSection />
        <EcosystemSection />
        <FeaturesGrid />
      </div>
    </div>
  )
}

export default page