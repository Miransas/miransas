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
      <MiransasHero />
      <LaserSideDiagnostics />
      <TechStackSection />
      <MiransasSecurityFeatures />
      <EcosystemSection />
    </main>
  )
}

export default page