import React from 'react'
import Hero from '../components/shared/hero'
import TechStackSection from '../components/shared/TechStackSection'
import EcosystemSection from '../components/shared/ecosystem'
import FeaturesGrid from '../components/shared/features-grid'
import Navbar from '../components/shared/header'
import Footer from '../components/shared/footer'

const page = () => {
  return (
    <main>
      <Navbar />
       <div className='mt-20'>
      <Hero />
      <div>
        <TechStackSection />
        <EcosystemSection />
        <FeaturesGrid />
      </div>
    </div>
    <Footer />
    </main>
   
  )
}

export default page