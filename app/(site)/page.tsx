import EcosystemSection from "../../components/shared/ecosystem"
import { LaserSideDiagnostics } from "../../components/shared/laser-side-diahnost"
import { MiransasSecurityFeatures } from "../../components/shared/miransas-sec-feature"


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
        <MiransasHero />
        <LaserSideDiagnostics />
        <TechStackSection /> 
        <MiransasSecurityFeatures />
        <EcosystemSection />
        {/* <FeaturesGrid /> */}

      </div>
      {/* <Footer /> */}
    </main>

  )
}

export default page