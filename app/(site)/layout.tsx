import React from 'react'
import { Navbar } from '../../components/shared/navbar'
import Footer from '../../components/shared/footer'

const SiteLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
        <Navbar />
     <div className="">
        {children}
     </div>
     <Footer/>
    </main>
  )
}

export default SiteLayout