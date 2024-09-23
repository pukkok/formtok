import React from "react";
import HomeHeader from "./HomeStyles/HomeHeader";
import HeroSection from "./HomeStyles/HomeHero";
import HomeFeatures from "./HomeStyles/HomeFeature";
import CallToAction from "./HomeStyles/HomeCallToAction";
import HomeFooter from "./HomeStyles/HomeFooter";

function HomePage () {
    return <>
    <HomeHeader />
    <HeroSection />
    {/* <HomeService />         */}
    <HomeFeatures />
    <CallToAction />
    <HomeFooter />
    </>
}
export default HomePage