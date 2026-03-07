import React from 'react'
import Hero from '../components/shared/hero'
import TechStackSection from '../components/shared/TechStackSection'

const page = () => {
  return (
    <div className='mt-20'>
      <Hero />
      <div>
        <TechStackSection />
      </div>
    </div>
  )
}

export default page