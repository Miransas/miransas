import EcosystemSection from "../../components/shared/ecosystem"


import MiransasHero from "../../components/shared/mirasnas-hero"
import TechStackSection from "../../components/shared/TechStackSection"

// import Navbar from "@/components/Navbar"; --- IGNORE ---
// import Footer from "@/components/Footer"; --- IGNORE ---
const page = () => {
  return (
    <main>
      {/* <Navbar /> */}
       <div className='mt-20'>
      {/* <Hero /> */}
      <MiransasHero/>
      <div>
        <TechStackSection />
        <EcosystemSection />
        {/* <FeaturesGrid /> */}
      </div>
    </div>
    {/* <Footer /> */}
    </main>
   
  )
}

export default page