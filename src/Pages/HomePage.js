import React from "react";
import HomeHeader from "./HomeStyles/HomeHeader";
import HeroSection from "./HomeStyles/HomeHero";
// import HomeFeatures from "./HomeStyles/HomeFeature";
import CallToAction from "./HomeStyles/HomeCallToAction";
import HomeFooter from "./HomeStyles/HomeFooter";
import GlobalStyle from "./HomeStyles/HomeStyle";
import HomeService from "./HomeStyles/HomeService";

function HomePage () {
    return <>
    <GlobalStyle />
    <HomeHeader />
    <HeroSection />
    {/* <HomeService />         */}
    {/* <HomeFeatures /> */}
    {/* <CallToAction /> */}
    {/* <HomeFooter /> */}
    </>
}
export default HomePage