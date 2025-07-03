'use client'

import CTA_Section from "@/features/main/CTA_Section"
import DetailSection from "@/features/main/DetailSection"
import FeatureSection from "@/features/main/FeatureSection"
import HeroSection from "@/features/main/HeroSection"
import MainFooter from "@/features/main/MainFooter"
import MainHeader from "@/features/main/MainHeader"

const Home = () => {

  return (
    <main className="text-light-w">
      <MainHeader />
			<HeroSection />
			<FeatureSection />
			<DetailSection />
			<CTA_Section />
			<MainFooter />
		</main>
  )
}

export default Home