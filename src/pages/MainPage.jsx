import MainHeader from "../features/main/MainHeader"
import HeroSection from "../features/main/HeroSection"
import FeatureSection from '../features/main/FeatureSection'
import DetailSection from '../features/main/DetailSection'
import CTA_Section from '../features/main/CTA_Section'
import MainFooter from '../features/main/MainFooter'

function MainPage () {

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
export default MainPage